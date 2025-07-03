import axios from "axios";

export const post = async (base: string, endpoint: string, body: any) => {
  try {
    const { data } = await axios.post(`${base + endpoint}`, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return data;
  } catch (error) {
    console.log("Error proxying post request", error);
    return null;
  }
};
