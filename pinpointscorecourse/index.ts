import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import { post } from "./api/proxy";

// configures dotenv to work in your application
dotenv.config();
const app = express();

// Add CORS middleware to allow requests from the specified origin
const corsOptions = {
  origin: ["https://pinpointscore.golf", "http://localhost:5173"],
  preflightContinue: false,
  methods: "GET,POST,OPTIONS",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Add JSON body parsing middleware
app.use(express.json());
app.use(cors(corsOptions));

const PORT = process.env.PORT ?? 8080;

app.get("/", (request: Request, response: Response) => {
  response.status(200).send("Hello World");
});

app.post("/proxy", async (request: Request<any>, response: Response<any>) => {
  try {
    console.log("Received request to proxy:", request.body);
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

app
  .listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
  })
  .on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
  });
