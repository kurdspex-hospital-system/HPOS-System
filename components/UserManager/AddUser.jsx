import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { notificationActions } from "../../store/notification-slice";

import FloatingButton from "../UI/FloatingButton";
import Modal from "../UI/Modal";
import UserForm from "./UserForm";

const AddUser = (props) => {
  const [modalShow, setModalShow] = useState(false);

  const dispatch = useDispatch();

  const onAddDataHandler = (record) => {
    setModalShow(false);

    axios.post('api/user', record)
      .then((res) => {
        props.setIsUpdated(true);
        dispatch(notificationActions.activeNotification(res.data));
      })
      .catch((err) => {
        dispatch(notificationActions.activeNotification(err.response.data));
      });
  }

  return (
    <>
      <FloatingButton src="/icons/add_user.svg" bottom="12" onClick={() => setModalShow(true)}/>
      <Modal show={modalShow} onHide={() => setModalShow(false)} title="Adding User Form" size="md">
        <UserForm buttonText='Add User' onSubmitData={onAddDataHandler}/>
      </Modal>
    </>
  );
};

export default AddUser;
