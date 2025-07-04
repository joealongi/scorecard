import axios from "axios";

export const postRequest = async (endpoint: string, body: unknown) => {
  console.log("Received request to proxy:", {
    proxy: import.meta.env.VITE_PROXY_URL,
    base: import.meta.env.VITE_BASE_API_URL,
    endpoint: endpoint,
  });

  try {
    const base = import.meta.env.VITE_BASE_API_URL ?? "";
    const proxy = import.meta.env.VITE_PROXY_URL ?? "";
    const { data } = await axios.post(
      proxy,
      { base: base, endpoint: endpoint, body: body },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    console.log("Error posting request", error);
    return error;
  }
};
