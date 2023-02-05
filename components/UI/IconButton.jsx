import React from "react";

import style from "./IconButton.module.css";

const IconButton = (props) => {
  let colorType = style.red;

  switch(props.color) {
    case 'red': colorType = style.red; break;
    case 'blue': colorType = style.blue; break;
    case 'green': colorType = style.green; break;
    case 'gold': colorType = style.gold; break;
  }

  return <button className={style.button + ' ' + colorType + ' ' + props.className} onClick={props.onClick}>
    <img src={props.src} />
    <div>{props.text}</div>
  </button>;
};

export default IconButton;
