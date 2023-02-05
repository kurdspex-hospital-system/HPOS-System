import React from "react";
import Head from "next/head";

import UserAccount from "../../components/User/UserAccount";

const account = () => {
  return (
    <>
      <Head>
        <title>User Account</title>
        <link rel="icon" href="/icons/KurdspexV2.svg" />
      </Head>
      <UserAccount />
    </>
  );
};

export default account;
