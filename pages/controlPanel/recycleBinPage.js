import React from "react";
import Head from "next/head";

import RecycleBin from "../../components/ControlPanel/RecycleBin";

const recycleBinPage = () => {
  return (
    <>
      <Head>
        <title>Recycle Bin</title>
        <link rel="icon" href="/icons/KurdspexV2.svg" />
      </Head>
      <RecycleBin />
    </>
  );
};

export default recycleBinPage;
