import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { notificationActions } from "../../store/notification-slice";

import Modal from "../UI/Modal";
import Table from "../UI/Table";
import UserForm from "./UserForm";
import UserRow from "./UserRow";
import ConfirmationPopup from "../UI/ConfirmationPopup";

const UserTable = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [data, setData] = useState({});
  const [user, setUser] = useState({});

  const dispatch = useDispatch();

  const onHideModal = () => {
    setModalShow(false);
  };

  const onUpdateHandler = (user) => {
    axios.put("/api/user", { user })
      .then((res) => {
        props.setIsUpdated(true);
        dispatch(notificationActions.activeNotification(res.data));
      })
      .catch((err) => {
        dispatch(notificationActions.activeNotification(err.response.data));
      });

    setModalShow(false);
  };

  const onDelete = (data) => {
    setData(data);
    setDeleteModalShow(true);
  };

  const deleteAccountHandler = () => {
    axios.delete("/api/user", { data })
    .then((res) => {
      props.setIsUpdated(true);
      dispatch(notificationActions.activeNotification(res.data));
    })
    .catch((err) => {
      dispatch(notificationActions.activeNotification(err.response.data));
    });

    setDeleteModalShow(false);
  }

  const getUserHandler = (user) => {
    setUser(user);
    setModalShow(true);
  };

  return (
    <>
      <Table title="Users">
        {props.users.map((user) => (
          <UserRow
            key={user.id}
            user={user}
            getUser={getUserHandler}
            onDelete={onDelete}
          />
        ))}
      </Table>

      <Modal show={modalShow} onHide={onHideModal} title="User" size="md">
        <UserForm buttonText="Update User" data={user} onSubmitData={onUpdateHandler} password/>
      </Modal>

      <ConfirmationPopup text={'Do you want to Delete this account'} btnText={'Yes, Delete it'} show={deleteModalShow} onHide={() => setDeleteModalShow(false)} onClick={deleteAccountHandler} />
    </>
  );
};

export default UserTable;
