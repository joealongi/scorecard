import axios from "axios";

export const get = async (base: string, endpoint: string) => {
  try {
    const { data } = await axios.get(base + endpoint, {
      headers: {
        "Content-Type": "application/json",
      },
      auth: {
        username: process.env.SPRING_SECURITY_USER_NAME ?? "",
        password: process.env.SPRING_SECURITY_USER_PASSWORD ?? "",
      },
    });
    if (data) {
      return data;
    }
  } catch (error: any) {
    if (error?.response?.data) {
      return error?.response?.data;
    }
  }
};

export const post = async (base: string, endpoint: string, body: any) => {
  try {
    const { data } = await axios.post(base + endpoint, body, {
      headers: {
        "Content-Type": "application/json",
      },
      auth: {
        username: process.env.SPRING_SECURITY_USER_NAME ?? "",
        password: process.env.SPRING_SECURITY_USER_PASSWORD ?? "",
      },
    });
    if (data) {
      return data;
    }
  } catch (error: any) {
    if (error?.response?.data) {
      return error?.response?.data;
    }
  }
};

export const idp = async (base: string, endpoint: string, body: any) => {
  try {
    const { data } = await axios.post(base + endpoint, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    if (data) {
      return data;
    }
  } catch (error: any) {
    if (error?.response?.data) {
      return error?.response?.data;
    }
  }
};
