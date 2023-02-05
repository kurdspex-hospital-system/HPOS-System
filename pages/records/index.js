import React from "react";
import Head from "next/head";

import Records from '../../components/Records/Records';

const RecordsPage = () => {
  return (
    <>
      <Head>
        <title>Records</title>
        <link rel="icon" href="/icons/KurdspexV2.svg" />
      </Head>
      <Records />
    </>
  );
};

export default RecordsPage;
