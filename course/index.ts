import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import { get, post, idp } from "./api/proxy";
import { decrypt } from "./utils/security";

// ENVX Configuration
require("@dotenvx/dotenvx").config();

// Invoke Express Server
const app = express();

// // Redirect Middleware and CORS Middleware for Production
// if (process.env.NODE_ENV !== null && process.env.NODE_ENV === "development") {
//   // CORS Middleware
//   app.use(
//     cors({
//       origin: [
//         "http://localhost:5173",
//         "http://localhost:4000",
//         "http://localhost:8080",
//       ],
//       preflightContinue: false,
//       methods: "GET,POST,OPTIONS",
//       optionsSuccessStatus: 200,
//     })
//   );
// } else {
//   // Redirect Middleware
//   app.use((request, response, next) => {
//     if (
//       request?.hostname?.includes("pinpointscore.golf") ||
//       request?.hostname?.includes("course.pinpointscore.golf") ||
//       request?.hostname?.includes("clubhouse.pinpointscore.golf")
//     ) {
//       next();
//     } else {
//       response.status(400).send();
//     }
//   });

//   // CORS Middleware
//   app.use(
//     cors({
//       origin: [
//         "https://pinpointscore.golf",
//         "https://course.pinpointscore.golf",
//         "https://clubhouse.pinpointscore.golf",
//       ],
//       preflightContinue: false,
//       methods: "GET,POST,OPTIONS",
//       optionsSuccessStatus: 200,
//     })
//   );
// }

// CORS Middleware
app.use(
  cors({
    origin: ["*"],
    preflightContinue: false,
    methods: "GET,POST,OPTIONS",
    optionsSuccessStatus: 200,
  })
);

// JSON Parsing Middleware
app.use(express.json());

// Health Check Endpoint
app.get("/", (request: Request, response: Response) => {
  response
    .status(200)
    .send(
      `<!DOCTYPE html> <html lang="en"> <head> <meta name="robots" content="noindex, nofollow" /> <meta name="googlebot" content="noindex, nofollow" /> <meta charset="UTF-8" /> <link rel="icon" type="image/svg+xml" href="https://pinpointscore.golf/pinpointscore.svg" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Pinpointscore</title> <meta name="title" content="pinpointscore" /> <meta name="description" content="Tee box to green, track your golf game with ease" /> <meta property="og:type" content="website" /> <meta property="og:url" content="https://course.pinpointscore.golf/" /> <meta property="og:title" content="pinpointscore" /> <meta property="og:description" content="Tee box to green, track your golf game with ease" /> <meta property="og:image" content="https://pinpointscore.golf/pinpointscore.png" /> <meta property="twitter:card" content="summary_large_image" /> <meta property="twitter:url" content="https://course.pinpointscore.golf/" /> <meta property="twitter:title" content="pinpointscore" /> <meta property="twitter:description" content="Tee box to green, track your golf game with ease" /> <meta property="twitter:image" content="https://pinpointscore.golf/pinpointscore.png" /> <link rel="apple-touch-icon" sizes="180x180" href="https://pinpointscore.golf/apple-touch-icon.png" /> <link rel="icon" type="image/png" sizes="32x32" href="https://pinpointscore.golf/favicon-32x32.png" /> <link rel="icon" type="image/png" sizes="16x16" href="https://pinpointscore.golf/favicon-16x16.png" /> <link rel="icon" href="/favicon.ico" sizes="any" /> <link rel="manifest" href="/site.webmanifest" /> <link rel="preconnect" href="https://fonts.gstatic.com" /> <link href="https://fonts.googleapis.com/css2?family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap" rel="stylesheet" /> </head> <body style="overflow: hidden; background-color: #161616"> <h1 style=" overflow: hidden; text-align: center; width: 100%; margin: 50vh auto; color: #d4d4d4; font-family: 'Titillium Web', sans-serif; font-size: 60px; font-weight: 700; line-height: 125%; " > <span style="color: #65a30d">P</span>inpointscore </h1> </body> </html>`
    );
});

// GET Endpoint
app.post("/get", async (request: Request<any>, response: Response<any>) => {
  try {
    const obj: any = {};
    if (request?.body?.packaged) {
      const base64 = Buffer.from(request?.body?.packaged, "base64");
      const decrypted = await decrypt(
        base64.buffer.slice(
          base64.byteOffset,
          base64.byteOffset + base64.byteLength
        )
      );
      obj["base"] = await decrypted?.base;
      obj["endpoint"] = await decrypted?.endpoint;
    } else if (
      process.env.NODE_ENV !== null &&
      process.env.NODE_ENV === "development"
    ) {
      obj["base"] = await request?.body?.base;
      obj["endpoint"] = await request?.body?.endpoint;
    }
    const resp = await get(obj?.base, obj?.endpoint);
    if (resp) {
      response.status(200).send(resp);
    }
    response.status(400).send();
  } catch (error: any) {
    if (error?.response?.data) {
      response.status(400).send(error?.response?.data);
    }
    response.status(400).send();
  }
});

// POST Endpoint
app.post("/post", async (request: Request<any>, response: Response<any>) => {
  try {
    const obj: any = {};
    if (request?.body?.packaged) {
      const base64 = Buffer.from(request?.body?.packaged, "base64");
      const decrypted = await decrypt(
        base64.buffer.slice(
          base64.byteOffset,
          base64.byteOffset + base64.byteLength
        )
      );
      obj["base"] = await decrypted?.base;
      obj["endpoint"] = await decrypted?.endpoint;
      obj["body"] = await decrypted?.body;
      obj["payload"] = { ...obj, ...decrypted?.body };
    } else if (
      process.env.NODE_ENV !== null &&
      process.env.NODE_ENV === "development"
    ) {
      obj["base"] = await request?.body?.base;
      obj["endpoint"] = await request?.body?.endpoint;
      obj["body"] = await request?.body?.body;
      obj["payload"] = { ...obj, ...request?.body?.body };
    }
    const resp = await post(obj?.base, obj?.endpoint, obj?.payload);
    if (resp) {
      response.status(200).send(resp);
    }
    response.status(400).send();
  } catch (error: any) {
    if (error?.response?.data) {
      response.status(400).send(error?.response?.data);
    }
    response.status(400).send();
  }
});

// IDP Endpoint
app.post("/idp", async (request: Request<any>, response: Response<any>) => {
  try {
    const obj: any = {};
    if (request?.body?.continuation_token) {
      obj["continuation_token"] = request?.body?.continuation_token;
    }
    if (request?.body?.packaged) {
      const base64 = Buffer.from(request?.body?.packaged, "base64");
      const decrypted = await decrypt(
        base64.buffer.slice(
          base64.byteOffset,
          base64.byteOffset + base64.byteLength
        )
      );
      obj["base"] = await decrypted?.base;
      obj["endpoint"] = await decrypted?.endpoint;
      obj["body"] = await decrypted?.body;
      obj["payload"] = { ...obj, ...decrypted?.body };
    } else if (
      process.env.NODE_ENV !== null &&
      process.env.NODE_ENV === "development"
    ) {
      obj["base"] = await request?.body?.base;
      obj["endpoint"] = await request?.body?.endpoint;
      obj["body"] = await request?.body?.body;
      obj["payload"] = { ...obj, ...request?.body?.body };
    }
    const resp = await idp(obj?.base, obj?.endpoint, obj?.payload);
    if (resp) {
      response.status(200).send(resp);
    }
    response.status(400).send();
  } catch (error: any) {
    if (error?.response?.data) {
      response.status(400).send(error?.response?.data);
    }
    response.status(400).send();
  }
});

// Application Start
app
  .listen(process.env.PORT ?? 4040, () => {
    console.log("Server running at PORT: ", process.env.PORT ?? 4040);
  })
  .on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
  });
