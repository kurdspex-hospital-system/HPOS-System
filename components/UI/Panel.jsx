import React from "react";

import style from "./Panel.module.css";

const Panel = (props) => {
  return (
    <div id={style.panel} className={"row " + props.className}>
      {props.children}
    </div>
  );
};

export default Panel;
