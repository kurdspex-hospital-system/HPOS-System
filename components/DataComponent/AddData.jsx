import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { notificationActions } from "../../store/notification-slice";

import FloatingButton from "../UI/FloatingButton";
import Modal from "../UI/Modal";

const AddData = ({title, bottom, icon, apiUrl, Form, formProps, setIsUpdated, size}) => {
  const [modalShow, setModalShow] = useState(false);

  const dispatch = useDispatch();

  const onAddDataHandler = (data) => {
    setModalShow(false);

    axios.post(apiUrl, data)
      .then((res) => {
        if(setIsUpdated) setIsUpdated(true);
        dispatch(notificationActions.activeNotification(res.data));
      })
      .catch((err) => {
        dispatch(notificationActions.activeNotification(err.response.data));
      });
  }

  return (
    <>
      <FloatingButton src={icon ? icon : "/icons/add.svg"} bottom={bottom} onClick={() => setModalShow(true)}/>
      <Modal show={modalShow} onHide={() => setModalShow(false)} title={title} size={size ? size : "lg"}>
        <Form {...formProps} onSubmitData={onAddDataHandler}/>
      </Modal>
    </>
  );
};

export default AddData;
