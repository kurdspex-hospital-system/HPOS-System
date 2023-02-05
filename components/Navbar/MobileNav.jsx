import React from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";

import { navActions } from "../../store/nav-slice";

import style from "./Nav.module.css";

const MobileNav = (props) => {
    const dispatch = useDispatch();
    const iconStyle = (props.nav === props.navName) ? style.selected : style.icon;
  
    const onNavHandler = () => {
      dispatch(navActions.setNavName(props.navName));
      if(props.onClick) props.onClick()
    }
  
    return (
      <Link href={props.href}>
        <button id={style.button} onClick={onNavHandler} className="btn p-0">
          <img className={iconStyle} src={props.src} width="25" height="25" />
        </button>
      </Link>
    );
}

export default MobileNav