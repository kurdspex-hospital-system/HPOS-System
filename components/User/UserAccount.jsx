import React, { useState, useEffect } from 'react'
import { useGetRequest } from '../../hooks/useRequest'
import axios from 'axios'
import { useDispatch } from "react-redux";
import { notificationActions } from "../../store/notification-slice";

import PageLayout from '../Layout/PageLayout'
import FloatingButton from '../UI/FloatingButton'
import Modal from '../UI/Modal'
import PasswordForm from './PasswordForm'
import Loading from '../UI/Loading';

const UserAccount = () => {
  const [passwordModelShow, setPasswordModelShow] = useState(false);
  const [isUpdated, setIsUpdated] = useState(true);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    username: '',
    phoneNumber: ''
  });

  const getUserData = useGetRequest();
  const dispatch = useDispatch();

  useEffect(() => {
    if(isUpdated) {
      getUserData('/api/user/account', {}, (user) => {
        setIsUpdated(false);
        setUser(user);
        setLoading(false);
      });
    }
  }, [isUpdated]);

  const onPasswordChangeHandler = (password) => {
    axios.put('/api/user/account', {password})
      .then((res) => {
        setPasswordModelShow(false);
        dispatch(notificationActions.activeNotification(res.data));
      })
      .catch((err) => {
        dispatch(notificationActions.activeNotification(err.response.data));
      });
  }

  return (
    <PageLayout>
      <FloatingButton src="/icons/key.svg" bottom="12" onClick={() => setPasswordModelShow(true)}/>
      <h1 className="text-light text-center mt-2 title display-3">Account Settings</h1>
      {!loading && <>
        <div className="col-6 col-md-2 mx-auto text-center mt-4">
          <img className='w-100' src="/icons/account_circle.svg" />
        </div>
        <div className="col-10 mx-auto mt-2 text-center">
            <div className="display-6 mt-2 text-light">{user.username}</div>
            <div className="display-6 mt-2 text-light">{user.phoneNumber}</div>
        </div>
      </>}
      {loading && <Loading />}
      <Modal show={passwordModelShow} onHide={() => setPasswordModelShow(false)} title="Change Password" size="md">
        <PasswordForm onSubmitData={onPasswordChangeHandler}/>
      </Modal>
    </PageLayout>
  )
}

export default UserAccount