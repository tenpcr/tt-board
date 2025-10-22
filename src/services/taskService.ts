/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpClient } from "@/lib/httpClient";

export const getTasks = (params: any): any => {
  return httpClient.get("/tasks/", { params: params });
};

export const getTaskById = (taskId: string): any => {
  return httpClient.get(`/tasks/${taskId}`);
};

export const addTask = (formData: any): any => {
  return httpClient.post("/tasks/add", formData);
};

export const deleteTaskById = (taskId: any): any => {
  return httpClient.delete(`/tasks/${taskId}`);
};

export const getTaskTypes = (): any => {
  return httpClient.get("/tasks/types");
};

export const updateTaskById = (id: string, formData: any) => {
  return httpClient.put(`/tasks/${id}`, formData);
};

export const updateTaskProgressById = (id: string, formData: any): any => {
  return httpClient.put(`/tasks/progress/update/${id}`, formData);
};
