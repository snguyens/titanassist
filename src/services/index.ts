import { api } from "./apiConfig";
import { SearchOptions } from "../interfaces";

export const getClassInfo = async (classNumber: number) => {
  const { data } = await api.get("/classInfo", {
    params: {
      classNumber,
      cookie: localStorage.getItem("cookie"),
      ICSID: localStorage.getItem("ICSID")
    }
  });
  return data;
};

export const getClassSections = async (configs: SearchOptions) => {
  async function apiRequest() {
    const { data } = await api.get("/classSections", {
      params: {
        ...configs,
        cookie: localStorage.getItem("cookie"),
        ICSID: localStorage.getItem("ICSID")
      }
    });
    return data;
  }
  try {
    if (!localStorage.getItem("cookie") || !localStorage.getItem("ICSID")) {
      await setCookies();
    }
    return await apiRequest();
  } catch (e) {
    if (e.response.data === "expiredCookies") {
      await setCookies();
      try {
        return await apiRequest();
      } catch (e) {
        throw e;
      }
    }
    throw e;
  }
};

export const getCookies = async () => {
  const { data } = await api.get("/cookies");
  return data;
};

const setCookies = async () => {
  const {
    data: { completeCookie, ICSID }
  } = await api.get("/cookies");
  localStorage.setItem("cookie", completeCookie);
  localStorage.setItem("ICSID", ICSID);
};
