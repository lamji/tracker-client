/** @format */

import instance from "../axios";

export const updateRecord = (requestBody) => {
  return instance.put("/users/update-record", requestBody);
};
