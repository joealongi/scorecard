import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import { post } from "./api/proxy";

// ENV Configuration
dotenv.config();
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
  response.status(200).sendFile(path.join(__dirname, "/index.html"));
});

// Proxy Endpoint
app.post("/proxy", async (request: Request<any>, response: Response<any>) => {
  try {
    const base = request?.body?.base;
    const endpoint = request?.body?.endpoint;
    const body = request?.body?.body;
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

// 404 / Match All - Last Endpoint Ever
app.get("*", (request: Request, response: Response) => {
  response.status(404).sendFile(path.join(__dirname, "/index.html"));
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
