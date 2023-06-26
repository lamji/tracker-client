/** @format */

import React, { useState, useEffect } from "react";
import { Jumbotron, Button, Card } from "react-bootstrap";
import Link from "next/link";
import NavBar from "../../components/navBar";
import AppHelper from "../../app-helper";
import { Box } from "@mui/material";
export default function Login() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    fetch(`${AppHelper.API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserName(data.fullName);
      });
  }, []);

  return (
    <React.Fragment>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Card className="p-4 welcomeText  py-5">
          <h3>
            Welcome! <br /> {userName}
          </h3>
          <p className="">This is a simple budget tracker App.</p>
          <Link href="/add-data">
            <Button variant="primary">Get Started</Button>
          </Link>
        </Card>
      </Box>
    </React.Fragment>
  );
}
