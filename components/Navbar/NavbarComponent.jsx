import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Navbar } from "react-bootstrap";
import { useRouter } from "next/router";
import { navActions } from "../../store/nav-slice";
import useAuth from "../../hooks/useAuth";
import { signOut } from "next-auth/react"

import Nav from "./Nav";

import style from "./NavbarComponent.module.css";

const NavbarComponent = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const nav = useSelector((state) => state.nav.navName);
  const auth = useAuth();
  
  useEffect(() => {
    switch(router.pathname) {
      case '/': dispatch(navActions.setNavName('Records')); break;
      case '/records': dispatch(navActions.setNavName('Records')); break;
      case '/user/account': dispatch(navActions.setNavName('Account')); break;
      case '/statistic': dispatch(navActions.setNavName('Statistic')); break;
      case '/controlPanel': dispatch(navActions.setNavName('ControlPanel')); break;
      case '/accountManager': dispatch(navActions.setNavName('ControlPanel')); break;
      case '/controlPanel/recycleBinPage': dispatch(navActions.setNavName('ControlPanel')); break;
      case '/controlPanel/updateHistoryPage': dispatch(navActions.setNavName('ControlPanel')); break;
      case '/controlPanel/backupPage': dispatch(navActions.setNavName('ControlPanel')); break;
      case '/patients': dispatch(navActions.setNavName('Patients')); break;
      case '/surgeries': dispatch(navActions.setNavName('Surgeries')); break;
    }
  }, []);

  // monitor_heart

  const signOutHandler = () => {
    signOut({ callbackUrl: '/login' });
  }

  return (
    <Navbar id={style.navbar} className={props.className} bg="dark" variant="dark">
      <Container className="h-100 flex-sm-column">
        {auth.isAdmin && <Nav href="/records" src="/icons/hospita.svg" navName='Records' nav={nav}/>}
        {auth.isAdmin && <Nav href="/surgeries" src="/icons/monitor_heart.svg" navName='Surgeries' nav={nav}/>}
        {/* {auth.isAdmin && <Nav href="/statistic" src="/icons/statistics.svg" navName='Statistic' nav={nav}/>} */}
        {auth.isReceptionAccess && <Nav href="/patients" src="/icons/client.svg" navName='Patients' nav={nav}/>}
        {auth.isSuperAdmin && <Nav href="/controlPanel" src="/icons/admin_panel_settings.svg" navName='ControlPanel' nav={nav}/>}
        <div className='mb-auto'></div>

        <Nav href="/user/account" src="/icons/account.svg" navName='Account' nav={nav}/>
        <Nav href="#" src="/icons/logout.svg" navName='logout' onClick={signOutHandler}/>
        <div className="col-12 mt-2 text-light">V 1.8</div>    
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
