import React from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";

import { navActions } from "../../store/nav-slice";

import style from "./Nav.module.css";

const Nav = (props) => {
  const dispatch = useDispatch();
  const iconStyle = (props.nav === props.navName) ? style.selected : style.icon;

  const onNavHandler = () => {
    dispatch(navActions.setNavName(props.navName));
    if(props.onClick) props.onClick()
  }

  return (
    <Link href={props.href}>
      <button id={style.button} onClick={onNavHandler} className={"col-sm-12 mt-sm-3 p-0 btn mx-sm-auto " + props.className}>
        <img className={iconStyle} src={props.src} />
      </button>
    </Link>
  );
};

export default Nav;
