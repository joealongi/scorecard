import axios from "axios";

import { encrypt, envelope } from "./security";

export const postRequest = async (
  endpoint: string,
  body: { [key: string]: unknown; continuation_token?: string }
) => {
  try {
    const obj = {
      payload: {
        base: import.meta.env.VITE_BASE_API_URL ?? "",
        endpoint: endpoint,
        body: body,
      },
      continuation_token: "",
    };
    if (body?.continuation_token) {
      obj["continuation_token"] = body?.continuation_token;
      delete body["continuation_token"];
    }
    const encrypted = await encrypt(obj?.payload);
    if (!encrypted) {
      throw new Error("Encryption failed: encrypted payload is undefined.");
    }
    const packaged = await envelope(encrypted);
    const proxy = import.meta.env.VITE_PROXY_URL ?? "";
    const { data } = await axios.post(
      proxy,
      {
        packaged: packaged,
        continuation_token: obj?.continuation_token,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    console.log("Error posting request");
    return error;
  }
};
