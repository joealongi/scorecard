import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import { post } from "./api/proxy";
import { decrypt } from "./utils/security";

// ENV Configuration
dotenv.config();

// Invoke Express Server
const app = express();

// Allowlist Middleware
if (process.env.NODE_ENV !== "development") {
  app.use((request, response, next) => {
    if (
      request?.hostname?.includes("pinpointscore.golf") ||
      request?.hostname?.includes("course.pinpointscore.golf")
    ) {
      next();
    } else {
      response.status(400).send();
    }
  });
}

// CORS Middleware
app.use(
  cors({
    origin: [
      "https://pinpointscore.golf",
      "https://course.pinpointscore.golf",
      "http://localhost:5173",
    ],
    preflightContinue: false,
    methods: "GET,POST,OPTIONS",
    optionsSuccessStatus: 200,
  })
);

// JSON Parsing Middleware
app.use(express.json());

// Static File Serving Middleware
app.use(express.static("public"));

// Health Check Endpoint
app.get("/", (request: Request, response: Response) => {
  response
    .status(200)
    .send(
      `<!DOCTYPE html> <html lang="en"> <head> <meta name="robots" content="noindex, nofollow" /> <meta name="googlebot" content="noindex, nofollow" /> <meta charset="UTF-8" /> <link rel="icon" type="image/svg+xml" href="/pinpointscore.svg" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Pinpointscore</title> <meta name="title" content="pinpointscore" /> <meta name="description" content="Tee box to green, track your golf game with ease" /> <meta property="og:type" content="website" /> <meta property="og:url" content="https://course.pinpointscore.golf/" /> <meta property="og:title" content="pinpointscore" /> <meta property="og:description" content="Tee box to green, track your golf game with ease" /> <meta property="og:image" content="https://course.pinpointscore.golf/pinpointscore.png" /> <meta property="twitter:card" content="summary_large_image" /> <meta property="twitter:url" content="https://course.pinpointscore.golf/" /> <meta property="twitter:title" content="pinpointscore" /> <meta property="twitter:description" content="Tee box to green, track your golf game with ease" /> <meta property="twitter:image" content="https://course.pinpointscore.golf/pinpointscore.png" /> <link rel="apple-touch-icon" sizes="180x180" href="https://course.pinpointscore.golf/apple-touch-icon.png" /> <link rel="icon" type="image/png" sizes="32x32" href="https://course.pinpointscore.golf/favicon-32x32.png" /> <link rel="icon" type="image/png" sizes="16x16" href="https://course.pinpointscore.golf/favicon-16x16.png" /> <link rel="icon" href="/favicon.ico" sizes="any" /> <link rel="manifest" href="/site.webmanifest" /> <link rel="preconnect" href="https://fonts.gstatic.com" /> <link href="https://fonts.googleapis.com/css2?family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap" rel="stylesheet" /> </head> <body style="overflow: hidden; background-color: #161616"> <h1 style=" overflow: hidden; text-align: center; width: 100%; margin: 50vh auto; color: #d4d4d4; font-family: 'Titillium Web', sans-serif; font-size: 60px; font-weight: 300; line-height: 125%; " > Pinpointscore </h1> </body> </html>`
    )
    .setHeader("Content-Type", "text/html");
});

// Proxy Endpoint
app.post("/proxy", async (request: Request<any>, response: Response<any>) => {
  try {
    const base64 = Buffer.from(request?.body?.encrypted, "base64");
    const decrypted = await decrypt(
      base64.buffer.slice(
        base64.byteOffset,
        base64.byteOffset + base64.byteLength
      )
    );
    const base = decrypted?.base;
    const endpoint = decrypted?.endpoint;
    const body = decrypted?.body;
    const resp = await post(base, endpoint, body);
    if (resp) {
      response.status(200).send({ ...resp });
    }
    response.status(400).send();
  } catch (error: any) {
    if (error?.response?.data) {
      response.status(400).send({ ...error?.response?.data });
    }
    response.status(400).send();
  }
});

// Application Start
app
  .listen(process.env.PORT ?? 8080, () => {
    console.log("Server running at PORT: ", process.env.PORT ?? 8080);
  })
  .on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
  });
