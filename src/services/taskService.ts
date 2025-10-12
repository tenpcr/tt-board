/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpClient } from "@/lib/httpClient";

export const getTasks = (params: any): any => {
  return httpClient.get("/tasks/", { params: params });
};

export const getTaskById = (taskId: string): any => {
  return httpClient.get(`/tasks/${taskId}`);
};
