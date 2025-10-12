/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

const connectInstance = axios.create({
  baseURL: "http://localhost:5008",
});

connectInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export const httpClient = connectInstance;
