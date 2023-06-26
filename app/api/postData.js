/** @format */

import instance from "../axios";

export const addRecord = (requestBody) => {
  return instance.post("/users/addTransaction", requestBody);
};

export const login = (requestBody) => {
  return instance.post("/users/login", requestBody);
};
