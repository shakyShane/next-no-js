require("dotenv").config();
const fs = require("fs");
const { join } = require("path");

const CWD = process.cwd();
const GLOBAL = join(CWD, "queries", "__global_generated__");
const SCHEMA = require(join(GLOBAL, "schema.json"));

const possibleTypes = {};

SCHEMA.__schema.types.forEach((supertype) => {
    if (supertype.possibleTypes) {
        possibleTypes[supertype.name] = supertype.possibleTypes.map((subtype) => subtype.name);
    }
});

fs.writeFile(join(GLOBAL, "./possibleTypes.json"), JSON.stringify(possibleTypes, null, 4), (err) => {
    if (err) {
        console.error("Error writing possibleTypes.json", err);
    } else {
        // eslint-disable-next-line no-console
        console.log("Fragment types successfully extracted!");
    }
});
