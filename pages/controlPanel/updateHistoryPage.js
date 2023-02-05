import React from "react";
import Head from "next/head";

import UpdateHistory from "../../components/ControlPanel/UpdateHistory";

const updateHistoryPage = () => {
  return (
    <>
      <Head>
        <title>Update History</title>
        <link rel="icon" href="/icons/KurdspexV2.svg" />
      </Head>
      <UpdateHistory />
    </>
  );
};

export default updateHistoryPage;
