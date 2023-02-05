import React, {useEffect} from "react";
import Head from "next/head";

import useAuth from "../../hooks/useAuth";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { notificationActions } from "../../store/notification-slice";

import Statistic from "../../components/Statistic/Statistic";

const StatisticPage = () => {
  const auth = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {    
    if(!auth.isAdmin) {
      dispatch(notificationActions.activeNotification({type: 'error', message: 'You Do Not Have Permission'}));
      router.replace('/');
    }
  }, [auth.status]);

  return (
    <>
      <Head>
        <title>Statistic</title>
        <link rel="icon" href="/icons/KurdspexV2.svg" />
      </Head>
      <Statistic />
    </>
  );
};

export default StatisticPage;
