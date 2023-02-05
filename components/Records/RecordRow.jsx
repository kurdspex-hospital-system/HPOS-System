import React from 'react'
import moment from "moment";

import style from './RecordRow.module.css';

const RecordRow = ({record, auth, getRecord, onDelete}) => {
  let styleType;

  if(record.sub_category === 'Thyroid') styleType = style.thyroid;
  else if(record.sub_category === 'Breast') styleType = style.breast;
  else styleType = style.other;

  const getRecordHandler = (e) => {
    getRecord(record);
  }

  const deleteHandler = () => {
    onDelete(record);
  }

  return (
    <div id={styleType} className={style.record + " d-flex text-dark"}>
      <div id={style.data} className='d-flex m-0 p-1' onClick={getRecordHandler}>
        <h5 className={style.type + " my-auto ps-1 d-none d-sm-inline"}>{record.sub_category}</h5>
        <h5 className={style.name + " my-auto d-none d-sm-inline"}>{record.subscriber_name}</h5>
        <span className={style.description + " my-auto"}>{record.descriptions.substring(0, 80) + (record.descriptions.length > 80 ? "..." : '')}</span>
        <h5 className="my-auto ms-auto d-none d-sm-inline">{moment(record.publish_date).format('YYYY-MM-DD')}</h5>
      </div>
      {(auth.isSuperAdmin || auth.id === record.publisher_id) && <div className="ms-auto py-1 pe-1">
        <button id={style.btn} className="btn my-auto p-0" onClick={deleteHandler}><img className={style.delete} src='/icons/delete.svg' /></button>
      </div>}
    </div>
  )
}

export default RecordRow