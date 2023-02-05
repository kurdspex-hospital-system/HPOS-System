import React from "react";

import style from "./Loading.module.css";

const Loading = () => {
  return (
    <div id={style.background}>
      <div id={style.page} className='mx-auto'>
        <div className={style["lds-ellipsis"]}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
