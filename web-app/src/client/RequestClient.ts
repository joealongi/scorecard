import axios from "axios";

// export const postRequest = async (endpoint: string, payloadExt: unknown) => {
//   try {
//     const body = new URLSearchParams(payloadExt as Record<string, string>);
//     const baseurl = import.meta.env.VITE_BASE_API_URL ?? "";
//     const { data } = await axios.post(baseurl + endpoint, body, {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//     });
//     return data;
//   } catch (error) {
//     console.log("Error posting request", error);
//     throw error;
//   }
// };

export const postRequest = async (endpoint: string, payloadExt: unknown) => {
  try {
    const body = new URLSearchParams(payloadExt as Record<string, string>);
    const baseurl = import.meta.env.VITE_AZURE_API_URL ?? "";
    const { data } = await axios.post(
      baseurl + endpoint,
      { baseurl, endpoint, body },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    console.log("Error posting request", error);
    throw error;
  }
};
