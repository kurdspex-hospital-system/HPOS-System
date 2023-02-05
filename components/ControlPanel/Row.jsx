import React from 'react'
import moment from "moment";

import style from './Row.module.css';

const Row = ({data, group, getData, onDelete, onRestore}) => {
  const getDataHandler = (e) => {
    getData(data);
  }

  const deleteHandler = () => {
    onDelete(data);
  }

  const restoreHandler = () => {
    onRestore(data)
  }

  return (
    <div id={style.row} className={style.record + " d-flex text-dark"}>
      <div id={style.data} className='d-flex m-0 p-1' onClick={getDataHandler}>
        <h5 className={style.name + " my-auto"}>{data.row.updatedBy}</h5>
        <h5 className={style.type + " my-auto"}>{data.row.type}</h5>
        <h5 className={style.info + " my-auto"}>{data.row.info}</h5>
        <h5 className={style.date + " my-auto"}>{moment(data.row.date).format('YYYY-MM-DD')}</h5>
      </div>
      <div className="ms-auto py-1 pe-1 d-flex">
        {!group && <button id={style.btn} className="btn my-auto p-0" onClick={restoreHandler}><img className={style.restore} src='/icons/restore_from_trash.svg' /></button>}
        <button id={style.btn} className="btn my-auto p-0" onClick={deleteHandler}><img className={style.delete} src='/icons/delete.svg' /></button>
      </div>
    </div>
  )
}

export default Row;