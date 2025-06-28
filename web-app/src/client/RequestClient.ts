import axios from "axios";

export const postRequest = async (endpoint: string, payloadExt: unknown) => {
  try {
    const body = new URLSearchParams(payloadExt as Record<string, string>);
    const baseurl = import.meta.env.VITE_BASE_API_URL ?? "";
    console.log("------baseurl", baseurl);
    console.log("------endpoint", endpoint);
    console.log("------body", body?.toString());
    const { data } = await axios.post(baseurl + endpoint, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return data;
  } catch (error) {
    console.log("Error posting request", error);
    throw error;
  }
};
