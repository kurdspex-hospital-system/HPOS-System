import React from "react";
import Head from "next/head";
import { getSession } from "next-auth/react";

import UserManager from "../../components/UserManager/UserManager";

const UserManagerPage = () => {
  return (
    <>
      <Head>
        <title>User Manager</title>
        <link rel="icon" href="/icons/KurdspexV2.svg" />
      </Head>
      <UserManager />
    </>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({req: context.req});

  if(!session || session.user.name.access !== "SuperAdmin") {
    return {
      redirect: {
        destination: '/',
        permanet: false
      }
    }
  }

  return {
    props: {
      session
    }
  }
}

export default UserManagerPage;
