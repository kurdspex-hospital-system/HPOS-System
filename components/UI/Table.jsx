import React from "react";

import style from './Table.module.css';

const Table = (props) => {
  return (
    <div id={style.table} className="card text-light">
      <div id={style.tableHeader} className="card-header text-dark text-center p-0 pt-1">
        <h3 className="card-title">
          {props.title}
        </h3>
      </div>
      <div className="card-body p-0">
          {props.children}
        </div>
    </div>
  );
};

export default Table;
