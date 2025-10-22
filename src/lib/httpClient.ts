/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

const connectInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_API,
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
