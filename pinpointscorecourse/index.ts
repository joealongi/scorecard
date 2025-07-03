import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import { post } from "./api/proxy";

// configures dotenv to work in your application
dotenv.config();
const app = express();

// Add CORS middleware to allow requests from the specified origin
const corsOptions = {
  origin: "https://pinpointscore.golf",
  preflightContinue: false,
  methods: "GET,POST,OPTIONS",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Add JSON body parsing middleware
app.use(express.json());

const PORT = process.env.PORT ?? 8080;

app.get("/", cors(corsOptions), (request: Request, response: Response) => {
  response.status(200).send("Hello World");
});

app.post(
  "/proxy",
  cors(corsOptions),
  async (request: Request<any>, response: Response<any>) => {
    try {
      console.log("Received request to proxy:", request.body);
      const baseurl = request?.body?.baseurl;
      const endpoint = request?.body?.endpoint;
      const body = request?.body?.body;
      console.log("Received request to proxy:", {
        baseurl,
        endpoint,
        body,
      });
      const resp = await post(baseurl, endpoint, body);
      response.status(200).send({ resp });
    } catch (error) {
      console.log("Error proxying post request", error);
      response.status(400).send({ error: "Not" });
    }
  }
);

app
  .listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
  })
  .on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
  });
