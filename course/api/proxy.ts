import axios from "axios";

import { environment } from "../utils/environment";

export const getRequest = async (base: string, endpoint: string) => {
  try {
    const { data } = await axios.get(base + endpoint, {
      headers: {
        "Content-Type": "application/json",
      },
      auth: {
        username: (await environment("SPRING_SECURITY_USER_NAME")) ?? "",
        password: (await environment("SPRING_SECURITY_USER_PASSWORD")) ?? "",
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

export const postRequest = async (base: string, endpoint: string, body: any) => {
  try {
    const { data } = await axios.post(base + endpoint, body, {
      headers: {
        "Content-Type": "application/json",
      },
      auth: {
        username: (await environment("SPRING_SECURITY_USER_NAME")) ?? "",
        password: (await environment("SPRING_SECURITY_USER_PASSWORD")) ?? "",
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

export const patchRequest = async (base: string, endpoint: string, body: any) => {
  try {
    const { data } = await axios.patch(base + endpoint, body, {
      headers: {
        "Content-Type": "application/json",
      },
      auth: {
        username: (await environment("SPRING_SECURITY_USER_NAME")) ?? "",
        password: (await environment("SPRING_SECURITY_USER_PASSWORD")) ?? "",
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

export const deleteRequest = async (base: string, endpoint: string) => {
  try {
    const { data } = await axios.delete(base + endpoint, {
      headers: {
        "Content-Type": "application/json",
      },
      auth: {
        username: (await environment("SPRING_SECURITY_USER_NAME")) ?? "",
        password: (await environment("SPRING_SECURITY_USER_PASSWORD")) ?? "",
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

export const idpRequest = async (base: string, endpoint: string, body: any) => {
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
