import React from "react";

import style from './PatientRow.module.css';

const PatientRow = ({patient, getPatient, onDelete}) => {
  const getPatientHandler = (e) => {
    getPatient(patient);
  };

  const deleteHandler = () => {
    onDelete(patient);
  };

  return (
    <div id={style.patient} className={style.record + " d-flex text-dark"}>
      <div id={style.data} className="d-flex m-0 p-1" onClick={getPatientHandler}>
        <h5 className={style.id + " ps-2 my-auto"}>
          {patient.patient_id}
        </h5>
        <h5 className={style.name + " ps-2 my-auto"}>
          {patient.fullname}
        </h5>
        <h5 className={style.type + " ps-2 my-auto d-none d-sm-inline"}>
          {patient.sex}
        </h5>
        <h5 className={style.tel + " ps-2 my-auto"}>
          {patient.phoneNumber}
        </h5>
        <h5 className={style.add + " ps-2 my-auto d-none d-sm-inline"}>
          {patient.main_address}
        </h5>
        <h5 className={style.dis + " ps-2 my-auto d-none d-sm-inline"}>
          {patient.descriptions.substring(0, 50) + ((patient.descriptions.length >= 50) ? "..." : '')}
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

export default PatientRow;
