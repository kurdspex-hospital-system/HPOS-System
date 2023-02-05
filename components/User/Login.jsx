import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useDispatch } from "react-redux";
import { notificationActions } from "../../store/notification-slice";

import PageLayout from "../Layout/PageLayout";
import Form from "../UI/Form";

import style from "./Login.module.css";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const onSubmitData = async (form) => {
    for(let i = 0; i < form.data.length; i++) {
        form.data[i].classList.remove(form.errorStyle)
    }

    if(username === ''){
      form.data[0].classList.add(form.errorStyle);
      dispatch(notificationActions.activeNotification({type: 'error', message: 'You Must Enter Your Username'}));
      return;
    } 

    if(password === ''){
      form.data[1].classList.add(form.errorStyle);
      dispatch(notificationActions.activeNotification({type: 'error', message: 'You Must Enter Your Password'}));
      return;
    }

    const result = await signIn('credentials', {
      redirect: false,
      username,
      password
    })

    if(result.error) {
      dispatch(notificationActions.activeNotification({type: 'error', message: result.error}));
    }
  };

  return (
    <PageLayout id={style.page} title="Login">
      {/* <img id={style.logo} className="d-block mx-auto mt-5" src="Logo.svg" /> */}
      <Form id={style.form} className="d-flex flex-column col-xl-4 mx-auto" onSubmit={onSubmitData}>
        <label className="mt-2">Username</label>
        <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <label className="mt-2">Password</label>
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button className="btn btn-light mt-4 mx-auto px-5" type="submit">Login</button>
      </Form>
    </PageLayout>
  );
};

export default Login;
