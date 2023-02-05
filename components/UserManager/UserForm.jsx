import React, {useReducer, useState, useEffect} from 'react'

import UserAccessTypes from '../Options/UserAccessTypes';
import Form from '../UI/Form';

const defaultFormData = {
    username: '',
    phoneNumber: '',
    user_password: '',
    code: 'receptionAccess'
};

const formReducer = (state, action) => {
    switch(action.type){
        case 'setUsername': return {...state, username: action.data};
        case 'setPhoneNumber': return {...state, phoneNumber: action.data};
        case 'setPassword': return {...state, user_password: action.data};
        case 'setCode': return {...state, code: action.data};
        case 'set': return action.data;
        case 'default': return defaultFormData;
    }
}

const UserForm = (props) => {
    const [formData, dispatch] = useReducer(formReducer, defaultFormData);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if(props.data) {
            dispatch({type: 'set', data: {
                ...props.data,
                user_password: ''
            }});
        }
    }, []);

    useEffect(() => {
        if(isValid) {
            dispatch({type: 'default'});
            props.onSubmitData(formData);
        }
    }, [isValid]);

    const onSubmitData = (form) => {
        let isFormValid = true;

        for(let i = 0; i < form.data.length; i++) {
            form.data[i].classList.remove(form.errorStyle)
        }

        if(formData.username === ''){
            form.data[0].classList.add(form.errorStyle);
            isFormValid = false;
        } 
        
        if (formData.phoneNumber === '') {
            form.data[1].classList.add(form.errorStyle);
            isFormValid = false;
        }

        if(!props.code && formData.code === ''){
            form.data[2].classList.add(form.errorStyle);
            isFormValid = false;
        } 

        if (!props.noPassword && !props.password && formData.user_password === '') {
            form.data[3].classList.add(form.errorStyle);
            isFormValid = false;
        }

        setIsValid(isFormValid);
    }

  return (
    <Form className="validation" onSubmit={onSubmitData}>
        <div className="d-grid gap-1 col-12 mx-auto mb-1 text-light">
            <label className="mt-2 ms-2">Username</label>
            <input className="form-control" type="text" name='username' value={formData.username} onChange={(e) => dispatch({type: 'setUsername', data: e.target.value})} />

            <label className="mt-2 ms-2">Phone Number</label>
            <input className="form-control" type="tel" name='phone Number' minLength='11' value={formData.phoneNumber} onChange={(e) => dispatch({type: 'setPhoneNumber', data: e.target.value})} required/>

            {!props.code && <>
                <label className="mt-2 ms-2">User Access</label>
                <select className="form-select" value={formData.code} onChange={(e) => dispatch({type: 'setCode', data: e.target.value})}>
                    <UserAccessTypes />
                </select>
            </>}

            {!props.noPassword && <>
                <label className="mt-2 ms-2">Password</label>
                <input className="form-control" type="password" placeholder={props.password && 'Enter a password if you want to change it'} value={formData.user_password} onChange={(e) => dispatch({type: 'setPassword', data: e.target.value})} />
            </>}

            <button type="submit" className="btn btn-success mx-auto mt-3 p-2 px-4 submit">{props.buttonText}</button>
        </div>
    </Form>
  )
}

export default UserForm