import React from "react";

import Row from "./Row";

import style from "./Table.module.css";

const Table = ({children, className, type, data, tab, onDelete, onRestore, getData, group}) => {
  return (
    <div id={style.table} className={"card text-light " + className}>
      <div id={style.tableHeader} className="card-header text-dark text-center p-0 pt-1">
        <h3 className="card-title d-flex">
          <div className={style.delete}>{type} By</div>
          <div className={style.type}>Type</div>
          <div className={style.info}>{type === 'Published' ? 'Number Of Updates' : 'Info'}</div>
          <div className={style.date}>{type === 'Published' ? 'Last Update' : (type + ' Date')}</div>
        </h3>
      </div>
      <div className="card-body p-0">
        {children}

        {data.map((data) => (
          <Row
            key={data.id}
            data={{
              ...data,
              row: {
                updatedBy: data.publisher_name,
                type: (tab === 'Patient') ? data.sex : data.sub_category,
                info: (tab === 'Record') ? data.subscriber_name : (group ? data.count : data.descriptions),
                date: data.last_update
              }
            }}
            onRestore={onRestore}
            onDelete={onDelete}
            getData={getData}
            group={group}
          />
        ))}
      </div>
    </div>
  );
};

export default Table;
