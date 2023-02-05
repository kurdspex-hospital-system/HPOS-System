import React from "react";
import Head from "next/head";
import { useRouter } from 'next/router';
import PatientPage from "../../components/Patients/PatientPage";

const ClientViewPage = () => {
  const router = useRouter()

  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Patient Page</title>
        <link rel="icon" href="/icons/KurdspexV2.svg" />
      </Head>
      <PatientPage id={id} />
    </>
  )
}

export default ClientViewPage;
