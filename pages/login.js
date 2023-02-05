import React from "react";
import Head from "next/head";

import Login from "../components/User/Login";

const loginPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/icons/KurdspexV2.svg" />
      </Head>
      <Login />
    </>
  );
};

export default loginPage;
