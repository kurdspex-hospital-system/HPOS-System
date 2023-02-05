import React from "react";
import Head from "next/head";

import Surgeries from "../../components/Records/Surgeries";

const SurgeriesPage = () => {
  return (
    <>
      <Head>
        <title>Surgeries</title>
        <link rel="icon" href="/icons/KurdspexV2.svg" />
      </Head>

      <Surgeries />
    </>
  );
};

export default SurgeriesPage;
