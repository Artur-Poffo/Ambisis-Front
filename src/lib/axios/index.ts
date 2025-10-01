import axios from "axios";

export const externalApi = axios.create({
  baseURL: process.env.API_URL || "http://localhost:3333",
});
