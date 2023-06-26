/** @format */
import { useState, useEffect } from "react";
import Router from "next/router";
import AppHelper from "../../../app-helper";
import Swal from "sweetalert2";

export default function Model() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [recovery, setRecovery] = useState("");
  const [image, setImage] = useState(
    "https://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
  );
  //state to determine whether submit button is enabled or not
  const [isActive, setIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to track password visibility

  /**
   * handletoggle of view password
   */
  const handleClickShowPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  useEffect(() => {
    if (
      email !== "" &&
      password1 !== "" &&
      password2 !== "" &&
      password1 === password2
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password1, password2]);

  const retrieveUserDetails = (accessToken) => {
    const options = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    fetch(`${AppHelper.API_URL}/users/details`, options)
      .then(AppHelper.toJSON)
      .then((data) => {
        setUser({ email: data.email });
        Swal.fire("", "Account Created", "success");
        Router.push("/add-data");
      });
  };

  function registerUser(e) {
    fetch(`${AppHelper.API_URL}/users/verify-Emailregister-id-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: firstName + " " + lastName,
        email: email,
        image: image,
        recovery: recovery,
        password: password1,
        loginType: "Email",
      }),
    })
      .then(AppHelper.toJSON)
      .then((data) => {
        if (typeof data.accessToken !== "undefined") {
          localStorage.setItem("token", data.accessToken);
          retrieveUserDetails(data.accessToken);
          setEmail("");
          setPassword1("");
          setPassword2("");
          setFirstName("");
          setLastName("");
        } else {
          if (data.error === "Email-Exist") {
            Swal.fire("Registration  Error", "Email already Exist.", "error");
          } else if (data.error === "email-recovery-exist") {
            Swal.fire(
              "Registration  Error",
              "Recovery Email already Exist.",
              "error"
            );
          }
        }
      });
  }

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

  return {
    user,
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
  };
}
