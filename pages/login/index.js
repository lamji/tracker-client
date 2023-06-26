/** @format */

import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import RegLogin from "../../components/reLogin/index";
import { Box, Grid, Typography } from "@mui/material";

export default function Login() {
  const [isMobile, setIsMobile] = useState(false);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  return (
    <React.Fragment>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{
          height: "100vh",
        }}
      >
        {!isMobile && (
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              textAlign: "center",
              background: "rgb(2,0,36)",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              background:
                "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,13,121,1) 0%, rgba(0,212,255,1) 100%)",
              height: "100vh",
              color: "white",
            }}
          >
            <h1> BUDGET TRACKER</h1>
          </Grid>
        )}

        <Grid
          xs={12}
          md={4}
          sx={{
            textAlign: "center",
            p: 0,
            padding: {
              xs: "50px",
              md: "50px",
            },
            "& .MuiGrid-item": {
              paddingLeft: 0,
            },
          }}
        >
          <RegLogin />
          <Box
            sx={{
              marginTop: "10px",
            }}
          >
            <Link href="/register">
              <Typography sx={{ cursor: "pointer" }}>
                Not yet registered? <span>click here</span>
              </Typography>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
