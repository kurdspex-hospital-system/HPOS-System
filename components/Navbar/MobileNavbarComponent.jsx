import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Navbar } from "react-bootstrap";
import { useRouter } from "next/router";
import { navActions } from "../../store/nav-slice";
import useAuth from "../../hooks/useAuth";
import { signOut } from "next-auth/react"

import Nav from "./MobileNav";

import style from "./MobileNavbarComponent.module.css";

const MobileNavbarComponent = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const nav = useSelector((state) => state.nav.navName);
    const auth = useAuth();
    
    useEffect(() => {
      switch(router.pathname) {
        case '/records': dispatch(navActions.setNavName('Records')); break;
        case '/records/list': dispatch(navActions.setNavName('Records')); break;
        case '/records/account': dispatch(navActions.setNavName('Records')); break;
        case '/moneyConverter': dispatch(navActions.setNavName('MoneyConverter')); break;
        case '/user/account': dispatch(navActions.setNavName('Account')); break;
        case '/statistic': dispatch(navActions.setNavName('Statistic')); break;
        case '/controlPanel': dispatch(navActions.setNavName('ControlPanel')); break;
        case '/accountManager': dispatch(navActions.setNavName('ControlPanel')); break;
        case '/controlPanel/recycleBinPage': dispatch(navActions.setNavName('ControlPanel')); break;
        case '/controlPanel/updateHistoryPage': dispatch(navActions.setNavName('ControlPanel')); break;
        case '/controlPanel/backupPage': dispatch(navActions.setNavName('ControlPanel')); break;
        case '/inventory': dispatch(navActions.setNavName('Inventory')); break;
        case '/client': dispatch(navActions.setNavName('Client')); break;
        case '/dealer': dispatch(navActions.setNavName('Dealer')); break;
      }
    }, []);
  
    const signOutHandler = () => {
      signOut({ callbackUrl: '/login' });
    }
  
    return (
      <Navbar id={style.navbar} className={props.className} bg="dark" variant="dark">
        <Container>
            {auth.isAdmin && <Nav href="/records" src="/icons/account_balance.svg" navName='Records' nav={nav}/>}
            {auth.isAdmin && <Nav href="/statistic" src="/icons/statistics.svg" navName='Statistic' nav={nav}/>}
            {auth.isReceptionAccess && <Nav href="/client" src="/icons/client.svg" navName='Client' nav={nav}/>}
            {auth.isAdmin && <Nav href="/dealer" src="/icons/local_shipping.svg" navName='Dealer' nav={nav}/>}
            {auth.isInventoryAccess && <Nav href="/inventory" src="/icons/inventory.svg" navName='Inventory' nav={nav}/>}
            <Nav href="/moneyConverter" src="/icons/currency_exchange.svg" navName='MoneyConverter' nav={nav}/>
            <Nav href="/user/account" src="/icons/account.svg" navName='Account' nav={nav}/>
            <Nav href="#" src="/icons/logout.svg" navName='logout' onClick={signOutHandler}/>
        </Container>
      </Navbar>
    );
}

export default MobileNavbarComponent