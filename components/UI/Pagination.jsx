import React from "react";

import style from "./Pagination.module.css";

const Pagination = (props) => {
  const className = "mt-5 d-flex justify-content-center " + props.className;

  const onClick = (e) => {
    if (e.target.name === "next") {
      props.setPage(props.page + 1);
    } else if (e.target.name === "back") {
      props.setPage(props.page - 1);
    } else if (e.target.name === "first") {
      props.setPage(1);
    } else if (e.target.name === "last"){
      props.setPage(props.pageNumber);
    }
  };

  return (
    <>
      {props.pageNumber > 1 && <div className={className}>
        <div id={style.pagination} className="d-inline-flex">
          <button className="btn text-light" onClick={onClick} disabled={props.page <= 1}>
            <img src="/icons/first_page.svg" name="first" />
          </button>
          <button className="btn text-light" onClick={onClick} disabled={props.page <= 1}>
            <img src="/icons/arrow_back.svg" name="back" />
          </button>
          <button className="btn text-light" onClick={onClick} disabled={props.page >= props.pageNumber}>
            <img src="/icons/arrow_forward.svg" name="next" />
          </button>
          <button className="btn text-light" onClick={onClick} disabled={props.page >= props.pageNumber}>
            <img src="/icons/last_page.svg" name="last" />
          </button>
        </div>
      </div>}
    </>
  );
};

export default Pagination;
