/** @format */

import instance from "../axios";

export const deleteTransaction = (params) => {
  return instance.delete("/users/DeleteRecords", { data: params });
};
