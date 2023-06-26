/** @format */

import instance from "../axios";

export const getAll = (params) => {
  return instance.get("/users/details", { params });
};
