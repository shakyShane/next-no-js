set -euxo pipefail
export $(grep -v '^#' .env | xargs)
CWD="./node_modules/.bin"

OUTPUT_FILE="queries/__global_generated__/schema.json";

: <<'COMMENT'

This script will download the GraphQL schema and save it
to the file specified above

COMMENT

${CWD}/apollo client:download-schema \
--endpoint=${BACKEND_URL}/graphql \
${OUTPUT_FILE}
