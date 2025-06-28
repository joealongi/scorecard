import type { ErrorResponseType } from "./ResponseTypes";

export const postRequest = async (url: string, payloadExt: unknown) => {
  const body = new URLSearchParams(payloadExt as Record<string, string>);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!response.ok) {
    try {
      const errorData: ErrorResponseType = await response.json();
      throw errorData;
    } catch (jsonError) {
      console.error("Failed to parse error response:", jsonError);
      const errorData = {
        error: response.status,
        description: response.statusText,
        codes: [],
        timestamp: "",
        trace_id: "",
        correlation_id: "",
      };
      throw errorData;
    }
  }

  return await response.json();
};
