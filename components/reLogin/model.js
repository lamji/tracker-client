/** @format */

import { useState, useContext } from "react";
import UserContext from "../../UserContext";
import AppHelper from "../../app-helper";
import Router from "next/router";
import Swal from "sweetalert2";
import { login } from "../../app/api/postData";

function Model() {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Login user with the provided email and password.
   *
   * @param {Object} e - Event object.
   */
  async function loginUser(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const body = {
        email: email,
        password: password,
      };
      const { data } = await login(body);

      if (data.accessToken) {
        setUser({ email: data.email });
        localStorage.setItem("token", data.accessToken);
        Router.push("/add-data");
      } else {
        // Show error message based on the received error
        if (data.error === "Email-not-found") {
          Swal.fire("Login Failed", "Invalid Email.", "error");
        } else if (data.error === "Incorrect-Password") {
          Swal.fire("Login Failed", "Invalid Password.", "error");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    loginUser,
    isLoading,
    setIsLoading,
  };
}

export default Model;
