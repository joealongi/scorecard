import axios from "axios";

export const postRequest = async (endpoint: string, payloadExt: unknown) => {
  try {
    const base = import.meta.env.VITE_BASE_API_URL ?? "";
    const body = new URLSearchParams(payloadExt as Record<string, string>);
    const proxy = import.meta.env.VITE_PROXY_URL ?? "";
    const { data } = await axios.post(
      proxy,
      { base: base, endpoint: endpoint, body: body },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return data;
  } catch (error) {
    console.log("Error posting request", error);
    throw error;
  }
};
