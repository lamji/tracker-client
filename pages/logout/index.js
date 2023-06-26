/** @format */

import { useContext, useEffect } from "react";
import UserContext from "../../UserContext";
import Router from "next/router";
import { Skeleton, Stack } from "@mui/material";

export default function index() {
  const { unsetUser, setUser } = useContext(UserContext);

  useEffect(() => {
    unsetUser();
    Router.push("/login");
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Stack spacing={1}>
        {/* For variant="text", adjust the height via font-size */}
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        {/* For other variants, adjust the size with `width` and `height` */}
        <Skeleton variant="rectangular" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} />
      </Stack>
    </div>
  );
}
