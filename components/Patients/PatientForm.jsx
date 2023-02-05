import React, {useReducer, useEffect} from 'react'
import moment from "moment";
import MultiOptionButtons from '../UI/MultiOptionButtons';

import Gender from '../Options/Gender';
import DataForm from '../DataComponent/DataForm';

import style from './PatientForm.module.css'

const defaultFormData = {
    fullname: '',
    sex: '',
    age: '',
    phoneNumber: '',
    main_address: '',
    descriptions: 'None',
    past_medical: 'No',
    past_medical_text: '',
    past_surgical: 'No',
    drug_history: 'No',
    publisher_name: '',
    data_state: '',
    last_update: '',
    publish_date: '',
    editor_name: ''
};

const formReducer = (state, action) => {
    switch(action.type){
        case 'setFullname': return {...state, fullname: action.data};
        case 'setSex': return {...state, sex: action.data};
        case 'setAge': return {...state, age: action.data};
        case 'setPhoneNumber': return {...state, phoneNumber: action.data};
        case 'setMainAddress': return {...state, main_address: action.data};
        case 'setDescriptions': return {...state, descriptions: action.data};
        case 'setPastMedical': return {...state, past_medical: action.data};
        case 'setPastMedicalText': return {...state, past_medical_text: action.data};
        case 'setPastSurgical': return {...state, past_surgical: action.data};
        case 'setDrugHistory': return {...state, drug_history: action.data};
        case 'set': return action.data;
        case 'default': return defaultFormData;
    }
}

const ClientForm = ({data, state, buttonText, onSubmitData, noEdit, phoneNumber}) => {
    const [formData, dispatch] = useReducer(formReducer, defaultFormData);

    useEffect(() => {
        if(data) {
            let extra = {...data}
            if(extra.past_medical !== 'No') {
                if(extra.past_medical !== 'Yes') {
                    extra.past_medical_text = extra.past_medical;
                }
                
                extra.past_medical = 'Yes';
            } else {
                extra.past_medical_text = ''
            }

            dispatch({type: 'set', data: extra});
        } else if(phoneNumber) {
            dispatch({type: 'setPhoneNumber', data: phoneNumber})
        }
    }, []);

    const isEditedHandler = () => {
        return (data.past_medical !== formData.past_medical && data.past_medical !== formData.past_medical_text) || 
                data.past_surgical !== formData.past_surgical || data.drug_history !== formData.drug_history
    }

  return (
    <DataForm reducer={[formData, dispatch]} data={data} onSubmitDataHandler={onSubmitData} isEditedFunction={isEditedHandler}>
        <div className="d-grid gap-1 col-12 mx-auto mb-1 text-light">
            {state && <>
                <label className="mt-2 ms-2">Added By</label>
                <input className="form-control" type="text" value={formData.publisher_name} disabled />
            </>}

            {state && <>
                <label className="mt-2 ms-2">State</label>
                <input className="form-control" type="text" value={formData.data_state + (formData.data_state !== 'New' ? ' by ' + formData.editor_name : '')} disabled />
            </>}

            <label className="mt-2 ms-2">Full Name</label>
            <input className="form-control" type="text" name='fullname' data-type='text' value={formData.fullname} onChange={(e) => dispatch({type: 'setFullname', data: e.target.value})} disabled={noEdit} />

            <div className='d-flex justify-content-between'>
                <div className={style.gender}>
                    <label className="mt-2 ms-2">Sex</label>
                    <select className="form-select" value={formData.sex} name='sex' data-type='text' onChange={(e) => dispatch({type: 'setSex', data: e.target.value})} disabled={noEdit}>
                        <option value="" disabled>Select Sex</option>
                        <Gender />
                    </select>
                </div>

                <div className='w-25'>
                    <label className="mt-2 ms-2">Age</label>
                    <input className="form-control" type="number" name='age' data-type='text' min='1' max='120' value={formData.age} onChange={(e) => dispatch({type: 'setAge', data: e.target.value})} disabled={noEdit}/>
                </div>
            </div>

            <label className="mt-2 ms-2">Phone Number</label>
            <input className="form-control" type="tel" name='phoneNumber' data-type='number' minLength='11' maxLength='11' value={formData.phoneNumber} onChange={(e) => dispatch({type: 'setPhoneNumber', data: e.target.value})} disabled={noEdit}/>

            <label className="mt-2 ms-2">Main Address</label>
            <input className="form-control" type="text" name='main_address' value={formData.main_address} onChange={(e) => dispatch({type: 'setMainAddress', data: e.target.value})} disabled={noEdit} />

            <div className='d-flex mt-2'>
                <label className="me-auto">Past Surgical</label>
                <MultiOptionButtons onChange={(option) => dispatch({type: 'setPastSurgical', data: option})} options={['Yes', 'No']} value={formData.past_surgical} disabled={noEdit} />
            </div>

            <div className='d-flex mt-2'>
                <label className="me-auto">Drug History</label>
                <MultiOptionButtons onChange={(option) => dispatch({type: 'setDrugHistory', data: option})} options={['Yes', 'No']} value={formData.drug_history} disabled={noEdit} />
            </div>

            <div className='d-flex mt-2'>
                <label className="me-auto">Past Medical</label>
                <MultiOptionButtons onChange={(option) => dispatch({type: 'setPastMedical', data: option})} options={['Yes', 'No']} value={formData.past_medical} disabled={noEdit} />
            </div>

            {formData.past_medical !== 'No' && <div className="form-floating mt-2">
                <textarea id={style.textarea} className="form-control" name="past_medical_text" placeholder="Enter the Past Medical" maxLength="500" value={formData.past_medical_text} onChange={(e) => dispatch({type: 'setPastMedicalText', data: e.target.value})} disabled={noEdit}></textarea>
                <label htmlFor="description">Past Medical</label>
            </div>}

            <div className="form-floating mt-2">
                <textarea id={style.textarea} className="form-control" name="descriptions" placeholder="description text" maxLength="500" value={formData.descriptions} onChange={(e) => dispatch({type: 'setDescriptions', data: e.target.value})} disabled={noEdit}></textarea>
                <label htmlFor="description">Description</label>
            </div>

            {state && formData.data_state !== 'New' &&  <>
                <label className="mt-2 ms-2">Last Update</label>
                <input className="form-control" type="text" value={moment(formData.last_update).format('YYYY-MM-DD HH:mm:ss')} disabled />
            </>}

            {state &&  <>
                <label className="mt-2 ms-2">Add At</label>
                <input className="form-control" type="text" value={moment(formData.publish_date).format('YYYY-MM-DD HH:mm:ss')} disabled />
            </>}

            {!noEdit && <button type="submit" className="btn btn-success mx-auto mt-3 p-2 px-4 submit">{buttonText}</button>}
        </div>
    </DataForm>
  )
}

export default ClientForm;