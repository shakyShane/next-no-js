set -euxo pipefail
export $(grep -v '^#' .env | xargs)
CWD="./node_modules/.bin"

SCHEMA_FILE="queries/__global_generated__/schema.json"
GLOBAL_FILE="queries/__global_generated__/globalTypes.ts"
INCLUDES="queries/**/*.graphql"


: <<'COMMENT'

This script will use the previously generated schema.json file
in combination with any queries you've written to generate
typescript types for your queries

COMMENT

${CWD}/apollo \
client:codegen \
--target=typescript \
--localSchemaFile="${SCHEMA_FILE}" \
--globalTypesFile="${GLOBAL_FILE}" \
--includes="${INCLUDES}"


: <<'COMMENT'

This part is here because the Typescript settings for this project require
"isolatedModules": true - but this code generation can create an empty file
so we add 'export {}' to ensure Typescript still treat this file as a module

COMMENT

echo "export {}" >> ${GLOBAL_FILE}
