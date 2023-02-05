import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { notificationActions } from "../../store/notification-slice";

import Table from "../UI/Table";
import PatientRow from "./PatientRow";
import PopupModal from "../UI/PopupModal";
import ConfirmationPopup from "../UI/ConfirmationPopup";

const PatientsTable = ({patients, setIsUpdated}) => {
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [data, setData] = useState({});

  const dispatch = useDispatch();
  const router = useRouter();

  const onDelete = (data) => {
    setData(data);
    setDeleteModalShow(true);
  };

  const deleteAccountHandler = () => {
    axios.delete("/api/subscriber", { data })
    .then((res) => {
      setIsUpdated(true);
      dispatch(notificationActions.activeNotification(res.data));
    })
    .catch((err) => {
      dispatch(notificationActions.activeNotification(err.response.data));
    });

    setDeleteModalShow(false);
  }

  const getPatientHandler = (patient) => {
    router.push(`/patients/${patient.id}`);
  };

  return (
    <>
      <Table title="Patients">
        {patients.map((patient) => (
          <PatientRow
            key={patient.id}
            patient={patient}
            getPatient={getPatientHandler}
            onDelete={onDelete}
          />
        ))}
      </Table>

      <ConfirmationPopup text={'Do you want to Delete this Patient Account'} btnText={'Yes, Delete it'} show={deleteModalShow} onHide={() => setDeleteModalShow(false)} onClick={deleteAccountHandler} />
    </>
  );
};

export default PatientsTable;
