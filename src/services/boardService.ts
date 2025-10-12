/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpClient } from "@/lib/httpClient";

export const getBoards = (): any => {
  return httpClient.get("/boards/");
};
