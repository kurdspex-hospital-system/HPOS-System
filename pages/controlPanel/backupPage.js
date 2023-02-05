import React from "react";
import Head from "next/head";

import SystemBackup from "../../components/ControlPanel/SystemBackup";

const backupPage = () => {
  return (
    <>
      <Head>
        <title>System BackUp</title>
        <link rel="icon" href="/icons/KurdspexV2.svg" />
      </Head>
      <SystemBackup />
    </>
  );
};

export default backupPage;
