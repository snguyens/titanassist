import { api } from "./apiConfig";

export const getClassInfo = async classNumber => {
    const { data } = await api.get("/classInfo", {
        params: {
            classNumber
        }
    });
    return data;
};

export const getClassSections = async configs => {
    const { data } = await api.get("/classSections", {
        params: configs
    });
    return data;
};
