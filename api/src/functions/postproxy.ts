import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

import axios from "axios";

const postrequest = async (baseurl: string, endpoint: string, body: any) => {
  try {
    const { data } = await axios.post(baseurl + endpoint, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return data;
  } catch (error) {
    console.log("Error posting request in Azure", error);
    return null;
  }
};

export async function postproxy(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const baseurl = request.json.get("baseurl");
    const endpoint = request.json.get("endpoint");
    const body = request.json.get("body");
    const data = await postrequest(baseurl, endpoint, body);
    return data;
  } catch (error) {
    console.log("Error proxying posting request in Azure", error);
    return null;
  }
}

app.http("postproxy", {
  methods: ["GET", "HEAD", "POST", "OPTIONS"],
  authLevel: "anonymous",
  handler: postproxy,
});
