// @ts-nocheck

import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import { middleware, errorHandler } from "supertokens-node/framework/express";

import cors from "cors";
import morgan from "morgan";
import express from "express";
import helmet from "helmet";
import { config } from "dotenv";
import bodyParser from "body-parser";

const PORT = 3567;

config({ path: `.env` });

supertokens.init({
  framework: "express",
  supertokens: {
    connectionURI: process.env.SUPERTOKENS_CORE_INSTANCE_CONNECTION_URI,
    apiKey: process.env.SUPERTOKENS_CORE_INSTANCE_API_KEY,
  },
  appInfo: {
    appName: process.env.SUPERTOKENS_APP_NAME,
    apiDomain: process.env.SUPERTOKENS_API_DOMAIN,
    apiBasePath: process.env.SUPERTOKENS_API_BASE_PATH,
    websiteDomain: process.env.SUPERTOKENS_WEBSITE_DOMAIN,
    websiteBasePath: process.env.SUPERTOKENS_WEBSITE_BASE_PATH,
  },
  recipeList: [EmailPassword.init(), Session.init()],
});

const app = express();
/**
 * Uncomment to parse JSON even if `Content-Type` request header is missing.
 * Shouldn't have to do this if CORS didn't block the request header(s)?
 *
 * @see https://stackoverflow.com/questions/17227881/how-to-parse-http-request-with-a-missing-content-type-in-express-nodejs-by-ass
 */
// app.use(
//   express.json({
//     inflate: true,
//     strict: false,
//     type: () => {
//       return true;
//     },
//   })
// );
app.use(bodyParser.json());

app.use(
  cors({
    origin: process.env.SUPERTOKENS_WEBSITE_DOMAIN,
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(middleware());
app.use(errorHandler());

app.use(morgan("dev"));

app.listen(PORT, () => {
  console.log(
    `\nSuperTokens node backend service listening at ${process.env.SUPERTOKENS_API_DOMAIN}\n`
  );
});
