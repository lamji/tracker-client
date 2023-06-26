/** @format */

import { useState, useEffect } from "react";

import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { UserProvider } from "../UserContext";
import AppHelper from "../app-helper";
import { store } from "../app/store";
import React from "react";
import Head from "next/head";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({
    email: null,
  });

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    const options = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    fetch(`${AppHelper.API_URL}/users/details`, options)
      .then(AppHelper.toJSON)
      .then((data) => {
        setUser({ email: data.email });
      });
  }, [user.email]);

  const unsetUser = () => {
    localStorage.clear();
    setUser({
      email: null,
    });
  };

  return (
    <Provider store={store}>
      <Head>
        <title>Tracker</title>
      </Head>
      <UserProvider value={{ user, setUser, unsetUser }}>
        <Component {...pageProps} />
      </UserProvider>
    </Provider>
  );
}

export default MyApp;
