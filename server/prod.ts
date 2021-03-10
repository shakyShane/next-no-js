import { writeFileSync } from "fs";

import envalid from "envalid";

import { init } from "./index";

/**
 * Validate that the server is being started
 */
const releaseStages = ["default", "local", "develop", "staging", "staging-local", "master"];

const env = envalid.cleanEnv(process.env, {
    NODE_ENV: envalid.str({ default: "development" }),
    SERVE_LOCAL: envalid.bool({ default: false }),
    BACKEND_URL: envalid.str({ desc: "Backend" }),
    PORT: envalid.num({
        desc: "The port the PWA will listen on",
        default: 8080,
    }),
    RELEASE_STAGE: envalid.str({
        desc: `release stage is required, one of '${releaseStages.join(", ")}'`,
        choices: releaseStages,
    }),
});

// eslint-disable-next-line no-console
console.log("Validated env for ", env.RELEASE_STAGE);

/**
 *
 * -------------------------------------------------
 * NOTE:
 *
 * This script is here as a separate entry point for
 * when you want to run the NextJS application in
 * production environment with PM2
 *
 * The idea is that on a production server you'd run
 *
 *    $ pm2 start --only staging
 *
 * where 'staging' is the name of the application
 * in `ecosystem.config.js`. Doing so will write a
 * local .env.local file for NextJS to consume.
 *
 * Then, once the file is written we can init the
 * NextJS application in the normal way.
 * -------------------------------------------------
 */
writeFileSync(".env.local", [`RELEASE_STAGE=${env.RELEASE_STAGE}`, `BACKEND_URL=${env.BACKEND_URL}`].join("\n"));

init();
