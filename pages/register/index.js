/** @format */

import React from "react";
import { Form, Row, Col } from "react-bootstrap";

import Link from "next/link";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Model from "./model";

export default function index() {
  const {
    isMobile,
    setFirstName,
    setLastName,
    setEmail,
    setPassword1,
    setPassword2,
    isPasswordVisible,
    handleClickShowPassword,
    isActive,
    registerUser,
    firstName,
    lastName,
    password1,
    password2,
    email,
  } = Model();
  return (
    <React.Fragment>
      <Box>
        <Row
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!isMobile && (
            <Col
              xs={12}
              md={7}
              className=""
              style={{
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
            </Col>
          )}

          <Col
            xs={12}
            md={5}
            className="text-center  "
            style={{
              padding: "50px",
            }}
          >
            <Form>
              <h4 className="text-muted text-left mb-4">Register User</h4>
              <Row>
                <Col xs={6} className="px-2">
                  <TextField
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Col>
                <Col xs={6} className="px-2">
                  <TextField
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Col>
                <Col xs={12} className="px-2">
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                      width: "100%",
                      my: 2,
                    }}
                  />
                </Col>
                <Col xs={6} className="px-2">
                  <FormControl sx={{ p: 0 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      value={password1}
                      onChange={(e) => setPassword1(e.target.value)}
                      type={isPasswordVisible ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                            sx={{ zIndex: 9999 }}
                          >
                            {isPasswordVisible ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                </Col>
                <Col xs={6} className="px-2">
                  <FormControl sx={{ p: 0 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                      type={isPasswordVisible ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                            sx={{ zIndex: 9999 }}
                          >
                            {isPasswordVisible ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Verify Password"
                    />
                  </FormControl>
                </Col>
              </Row>
            </Form>
            <Button
              variant="contained"
              type="submit"
              id="submitBtn"
              sx={{ width: "100%", mt: 4 }}
              disabled={!isActive}
              onClick={registerUser}
            >
              Register
            </Button>
            <Link href="/login">
              <p className="text-10 pointer" style={{ marginTop: "20px" }}>
                Already have an account? Login Here
              </p>
            </Link>
          </Col>
        </Row>
      </Box>
    </React.Fragment>
  );
}
