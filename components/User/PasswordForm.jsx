import React, {useState, useEffect} from 'react'
import { useDispatch } from "react-redux";
import { notificationActions } from "../../store/notification-slice";

import Form from '../UI/Form';

const PasswordForm = (props) => {
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [isValid, setIsValid] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if(isValid) {
            props.onSubmitData(password);
        }
    }, [isValid]);

    const onSubmitData = (form) => {
        let isFormValid = true;

        for(let i = 0; i < form.data.length; i++) {
            form.data[i].classList.remove(form.errorStyle)
        }

        if(password === ''){
            form.data[0].classList.add(form.errorStyle);
            isFormValid = false;
        } 

        if(passwordConfirmation === ''){
            form.data[1].classList.add(form.errorStyle);
            isFormValid = false;
        } 

        if(password !== passwordConfirmation){
            isFormValid = false;
            dispatch(notificationActions.activeNotification({type: 'warning', message: 'The Tow Password Not Matching'}));
        } 

        setIsValid(isFormValid);
    }

  return (
    <Form className="validation" onSubmit={onSubmitData}>
        <div className="d-grid gap-1 col-12 mx-auto mb-1 text-light">
            <label className="mt-2 ms-2">Password</label>
            <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <label className="mt-2 ms-2">Password Confirmation</label>
            <input className="form-control" type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
            <button type="submit" className="btn btn-success mx-auto mt-3 p-2 px-4 submit">Update Password</button>
        </div>
    </Form>
  )
}

export default PasswordForm