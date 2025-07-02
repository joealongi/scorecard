import axios from "axios";

export const post = async (baseurl: string, endpoint: string, body: any) => {
  try {
    const { data } = await axios.post(baseurl + endpoint, body, {
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
