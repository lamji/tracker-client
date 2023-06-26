/** @format */

import { Form } from "react-bootstrap";
import { Button } from "@mui/material";
import Loading from "../backdrop/index";
import Model from "./model";

export default function index() {
  const { email, setEmail, password, setPassword, loginUser, isLoading } =
    Model();
  return (
    <Form onSubmit={(e) => loginUser(e)}>
      <h4 className="text-muted text-left my-4">User Login</h4>
      <Form.Group controlId="userEmail">
        <Form.Control
          type="email"
          className="inputText"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Control
          className="inputText"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button
        variant="contained"
        type="submit"
        id="submitBtn"
        color="primary"
        sx={{
          width: "100%",
        }}
      >
        Login
      </Button>
      <Loading isOpen={isLoading} />
    </Form>
  );
}
