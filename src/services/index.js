import { api } from "./apiConfig";

export const getClassSections = async configs => {
    const { data } = await api.get("/classSections", {
        params: configs
    });
    return data;
};
