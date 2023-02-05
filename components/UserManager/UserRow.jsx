import React from "react";

import style from './UserRow.module.css';

const UserRow = (props) => {
  const getUserHandler = (e) => {
    props.getUser(props.user);
  };

  const deleteHandler = () => {
    props.onDelete(props.user.id);
  };

  return (
    <div id={style.user} className={style.record + " d-flex text-dark"}>
      <div id={style.data} className="d-flex m-0 p-1" onClick={getUserHandler}>
        <h5 className={style.name + " ps-2 my-auto"}>
          {props.user.username}
        </h5>
        <h5 className={style.tel + " ps-2 my-auto"}>
          {props.user.phoneNumber}
        </h5>
        <h5 className={style.access + " ps-2 my-auto"}>
          {props.user.code}
        </h5>
      </div>
      <div className="ms-auto py-1 pe-1">
        <button id={style.btn} className="btn my-auto p-0" onClick={deleteHandler}>
          <img className={style.delete} src="/icons/delete.svg" />
        </button>
      </div>
    </div>
  );
};

export default UserRow;
