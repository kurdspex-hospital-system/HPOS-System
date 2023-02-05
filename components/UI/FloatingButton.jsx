import React, { useRef, useEffect } from "react";

import style from "./FloatingButton.module.css";

const FloatingButton = (props) => {
  const ref = useRef();

  useEffect(() => {
    ref.current.style.bottom = props.bottom + 'px'
  });

  return (
    <button id={style.button} ref={ref} onClick={props.onClick}>
      <img id={style.icon} src={props.src} />
    </button>
  );
};

export default FloatingButton;
