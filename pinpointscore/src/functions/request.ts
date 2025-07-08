import axios from "axios";

import { encrypt, envelope } from "./security";

export const postRequest = async (endpoint: string, body: unknown) => {
  try {
    const base = import.meta.env.VITE_BASE_API_URL ?? "";
    const proxy = import.meta.env.VITE_PROXY_URL ?? "";
    const encrypted = await encrypt({
      base: base,
      endpoint: endpoint,
      body: body,
    });
    if (!encrypted) {
      throw new Error("Error posting request");
    }
    const packaged = await envelope(encrypted);
    const { data } = await axios.post(
      proxy,
      { encrypted: packaged },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return data;
  } catch (error) {
    console.log("Error posting request", error);
    return error;
  }
};
