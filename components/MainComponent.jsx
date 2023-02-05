import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { notificationActions } from "../store/notification-slice";

import NavbarComponent from "./Navbar/NavbarComponent";
import MainLayout from "./Layout/MainLayout";
import Loading from "./UI/Loading";
import Notification from "./UI/Notification";
import MobileNavbarComponent from "./Navbar/MobileNavbarComponent";

const MainComponent = (props) => {
  const notification = useSelector((state) => state.notification);

  const auth = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if(auth.status === 'unauthenticated' && router.pathname !== '/login') {
      router.replace('/login');
    } 
    
    if(auth.status === 'authenticated' && router.pathname === '/login') {
      router.replace('/');
    }
  }, [auth.status]);

  return (
    <>
      <Notification message={notification.message} type={notification.type} show={(notification.message && true)} 
        onClose={() => dispatch(notificationActions.closeNotification())}/>

      {auth.status === 'loading' && <div className="text-light">
        <Loading />
      </div>}

      {auth.status === 'authenticated' && <>
        <NavbarComponent className='d-none d-sm-flex'/>
        <MobileNavbarComponent className='d-sm-none'/>
        <MainLayout>{props.children}</MainLayout>
      </>}

      {auth.status === 'unauthenticated' && <>
        {props.children}
      </>}
    </>
  );
};

export default MainComponent;
