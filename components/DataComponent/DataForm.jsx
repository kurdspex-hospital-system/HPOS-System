import React, {useState, useEffect} from 'react'
import { useDispatch } from "react-redux";
import { notificationActions } from "../../store/notification-slice";

import Form from '../UI/Form';

const DataForm = ({children, reducer, onSubmitDataHandler, formValidationObject, isEditedFunction, data}) => {
    const Validation = {
        text: (data) => data !== '',
        number: (data, form) => {
            if(!isNaN(data)) {
                return true;
            }

            form.value = ''
            form.placeholder = `Should Be Just Numbers`
            
            return false;
        },
        ...(formValidationObject ? formValidationObject : {})
    }

    const [formData, dispatch] = reducer;
    const [isValid, setIsValid] = useState(false);

    const dispatchNotification = useDispatch();

    useEffect(() => {
        if(isValid) {
            dispatch({type: 'default'});
            onSubmitDataHandler(formData);
        }
    }, [isValid]);

    const onSubmitData = (form) => {
        let isFormValid = true;
        let isSame = data ? true : false;

        if(data && isEditedFunction && isEditedFunction()) {
            isSame = false;
        }

        for(let i = 0; i < form.data.length; i++) {
            if(form.data[i].name && formData[form.data[i].name] && form.data[i].dataset.type && Validation[form.data[i].dataset.type]) {
                if(Validation[form.data[i].dataset.type](formData[form.data[i].name], form.data[i])) {
                    form.data[i].classList.remove(form.errorStyle);
                } else {
                    form.data[i].classList.add(form.errorStyle);
                    isFormValid = false;
                }
            } else if(form.data[i].dataset.type) {
                form.data[i].classList.add(form.errorStyle);
                form.data[i].placeholder = `Should Not Be Empty`
                isFormValid = false;
            }

            if(data && data[form.data[i].name] && formData[form.data[i].name] !== data[form.data[i].name]) {
                isSame = false;
            }
        }

        if(isSame) {
            dispatchNotification(notificationActions.activeNotification({type: 'warning', message: 'You Did Not Edit Anything'}));
            isFormValid = false;
        }

        setIsValid(isFormValid);
    }

  return (
    <Form className="validation" onSubmit={onSubmitData}>
        {children}
    </Form>
  )
}

export default DataForm