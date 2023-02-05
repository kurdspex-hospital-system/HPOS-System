import React from "react";
import Head from "next/head";
import PatientsManager from "../../components/Patients/PatientsManager";

const ClientsPage = () => {
  return (
    <>
      <Head>
        <title>Patients Manager</title>
        <link rel="icon" href="/icons/KurdspexV2.svg" />
      </Head>
      <PatientsManager />
    </>
  );
};

export default ClientsPage;
