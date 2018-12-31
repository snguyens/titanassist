const axios = require("axios");

export const instance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 60000
});
