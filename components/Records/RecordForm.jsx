import React, {useReducer, useState, useEffect} from 'react'
import moment from "moment";

import { Typeahead } from 'react-bootstrap-typeahead';
import MultiOptionButtons from '../UI/MultiOptionButtons';
import DataForm from '../DataComponent/DataForm';
import DiseaseRecordTypes from '../Options/DiseaseRecordTypes';

import ThyroidDiseaseForm from '../DiseasesRecord/ThyroidDiseaseForm';
import BreastDiseaseForm from '../DiseasesRecord/BreastDiseaseForm';
import OtherDiseaseForm from '../DiseasesRecord/OtherDiseaseForm';

import style from './RecordForm.module.css';

const defaultFormData = {
    category: '',
    sub_category: '',
    descriptions: ' ',
    subscriber: {},
    subscriber_id: '',
    subscriber_name: '',
    data_state: '',
    publish_date: '',
    publisher_name: '',
    editor_name: '',
    last_update: '',
    data1: '',
    data2: '',
    data3: '',
    data4: '',
    data5: '',
    plan_date: ''
};

const formReducer = (state, action) => {
    switch(action.type){
        case 'setCategory': return {...state, category: action.data};
        case 'setSubCategory': return {...state, sub_category: action.data};
        case 'setSubscriber': return {...state, subscriber: action.data};
        case 'setSubscriberName': return {...state, subscriber_name: action.data};
        case 'setData1': return {...state, data1: action.data};
        case 'setData2': return {...state, data2: action.data};
        case 'setData3': return {...state, data3: action.data};
        case 'setData4': return {...state, data4: action.data};
        case 'setData5': return {...state, data5: action.data};
        case 'setPlanDate': return {...state, plan_date: action.data};
        case 'setDescriptions': return {...state, descriptions: action.data};
        case 'set': return {...state, ...action.data};
        case 'default': return defaultFormData;
    }
}

const RecordForm = ({auth, data, state, buttonText, noEdit, onSubmitData, type, category, patients, patient, onPrint, onOpenPatient}) => {
    const [formData, dispatch] = useReducer(formReducer, defaultFormData);
    const [access, setAccess] = useState(true);

    useEffect(() => {
        if(auth) {
            setAccess((auth.isSuperAdmin || auth.id === data.publisher_id));
        }
    }, [auth])

    useEffect(() => {
        if(data) {
            dispatch({type: 'set', data})
        }
    }, [data]);

    useEffect(() => {
        if(type && type !== 'All') {
            dispatch({type: 'setSubCategory', data: type})
        }
    }, [type]);

    useEffect(() => {
        if(category) {
            dispatch({type: 'setCategory', data: category})
        }
    }, [category]);

    useEffect(() => {
        if(patient) {
            dispatch({type: 'setSubscriber', data: {id: patient.id, fullname: patient.fullname}})
            dispatch({type: 'setSubscriberName', data: patient.fullname})
        }
    }, [patient]);

    useEffect(() => {
        if(!data || (formData.sub_category !== '' && formData.sub_category !== data.sub_category)) {
            dispatch({type: 'set', data: {
                data1: '',
                data2: '',
                data3: '',
                data4: '',
                data5: ''
            }})
        }
    }, [formData.sub_category, data])

    const renderPatient = (option, props) => (
        <div className={style.label}>
            {`${option.fullname} (${option.phoneNumber})`}
        </div>
    )

    const isEditedHandler = () => {
        const other = formData.sub_category === 'Other' && (
            (data.data5.type !== formData.data5.type) || (data.data5.data !== formData.data5.data) || (data.data5.state !== formData.data5.state)
        );

        const breast = formData.sub_category === 'Breast' && (
            (data.data1.length !== formData.data1.length) || 
            (data.data3.type !== formData.data3.type) || (data.data3.mData.length !== formData.data3.mData.length) || (data.data3.usData.length !== formData.data3.usData.length) ||
            (data.data5.type !== formData.data5.type) || (data.data5.data !== formData.data5.data) || (data.data5.state !== formData.data5.state)
        );

        const thyroid = formData.sub_category === 'Thyroid' && (
            (data.data1 !== formData.data1) || (data.data2.tsh !== formData.data2.tsh) || (data.data2.trab !== formData.data2.trab) || (data.data2.antiTPO !== formData.data2.antiTPO) || 
            (data.data2.freeT4 !== formData.data2.freeT4) || (data.data2.freeT3 !== formData.data2.freeT3) || (data.data2.STG !== formData.data2.STG) ||
            (data.data3.type !== formData.data3.type) || (data.data3.data !== formData.data3.data) || (data.data3.size !== formData.data3.size) || (data.data3.fnac !== formData.data3.fnac) ||
            (data.data4.drug.length !== formData.data4.drug.length) || (data.data4.dose !== formData.data4.dose) ||
            (data.data5.type !== formData.data5.type) || (data.data5.category !== formData.data5.category) || (data.data5.subCategory.length !== formData.data5.subCategory.length) || 
            (data.data5.option !== formData.data5.option) || (data.data5.size !== formData.data5.size) || (data.data5.state !== formData.data5.state)
        );

        return breast || other || thyroid
    }

  return (
    <DataForm reducer={[formData, dispatch]} data={data} onSubmitDataHandler={onSubmitData} isEditedFunction={isEditedHandler}>
        <div id={style.from} className="d-grid gap-1 col-12 mx-auto mb-1 text-light">
            <div className='d-flex'>
                {state && <div className='mx-auto' style={{width: '32%'}}>
                    <label className="ms-2">Added By</label>
                    <input className="form-control" name="state" type="text" value={formData.publisher_name} disabled/>
                </div>}

                {state &&<div className='mx-auto' style={{width: '32%'}}>
                    <label className="ms-2">State</label>
                    <input className="form-control" name="state" type="text" value={formData.data_state + (formData.data_state !== 'New' ? ' by ' + formData.editor_name : '')} disabled/>
                </div>}

                {!category && <div className='mx-auto' style={{width: '32%'}}>
                    <label className="ms-2">Category</label>
                    <select className="form-select" name="category" data-type='text' value={formData.category} onChange={(e) => dispatch({type: 'setCategory', data: e.target.value})} disabled={!access || noEdit || state}>
                        <option disabled value="">Category</option>
                        <option value="Diseases">Diseases Record</option>
                    </select>
                </div>}
            </div>

            <div className='d-flex'>
                <div className='mx-auto' style={{width: '49%'}}>
                    <label className="ms-2 mt-2">Type</label>
                    <select className="form-select" name="sub_category" data-type='text' value={formData.sub_category} onChange={(e) => dispatch({type: 'setSubCategory', data: e.target.value})} disabled={!access || noEdit || state}>
                        <option disabled value="">Select a Type</option>
                        <DiseaseRecordTypes />
                    </select>
                </div>

                <div className='mx-auto' style={{width: '49%'}}>
                    <label className="mt-2 ms-2">Patient Name</label>
                    {patients && <Typeahead
                        highlightOnlyResult
                        id={style.type}
                        labelKey={(option) => `${option.fullname}`}
                        minLength={1}
                        onChange={(selected) => dispatch({ type: "setSubscriber", data: selected[0]})}
                        options={patients ? patients : []}
                        renderMenuItemChildren={renderPatient}
                        filterBy={(patient, props) => patient.fullname.toLowerCase().includes(props.text.toLowerCase()) || patient.phoneNumber.includes(props.text)}
                        placeholder="Choose a patient ..."
                        selected={formData.subscriber && formData.subscriber.id ? [formData.subscriber] : []}
                        disabled={!access ||noEdit || !patients}
                    />}

                    {!patients && <input className="form-control" name="name" type="text" value={formData.subscriber_name} disabled/>}
                </div>
            </div>

            {formData.category === 'Diseases' && formData.sub_category === 'Thyroid' && <ThyroidDiseaseForm formData={formData} dispatch={dispatch} data={data} state={state} noEdit={!access ||noEdit} />}
            {formData.category === 'Diseases' && formData.sub_category === 'Breast' && <BreastDiseaseForm formData={formData} dispatch={dispatch} data={data} state={state} noEdit={!access ||noEdit} />}
            {formData.category === 'Diseases' && formData.sub_category === 'Other' && <OtherDiseaseForm formData={formData} dispatch={dispatch} data={data} state={state} noEdit={!access ||noEdit} />}

            <div id={style.textarea1} className="form-floating mt-2">
                <textarea className="form-control" name="descriptions" placeholder="description text" id="description" maxLength="500" value={formData.descriptions} onChange={(e) => dispatch({type: 'setDescriptions', data: e.target.value})} disabled={!access || noEdit}></textarea>
                <label htmlFor="description">Notes</label>
            </div>

            {state && formData.data_state !== 'New' && <>
              <label className="mt-2 ms-2">Last Update</label>
              <input className="form-control" name="state" type="text" value={moment(formData.last_update).format('YYYY-MM-DD HH:mm:ss')} disabled/>
            </>}

            {state && <>
              <label className="mt-2 ms-2">Add At</label>
              <input className="form-control" name="state" type="text" value={moment(formData.publish_date).format('YYYY-MM-DD HH:mm:ss')} disabled/>
            </>}

            {access && !noEdit && <div className='d-flex'>
                <button type="submit" className="btn btn-success mx-auto mt-3 p-2 px-4 submit">{buttonText}</button>
                {onPrint && <button type="button" className="btn btn-warning mx-auto mt-3 p-2 px-4 submit" onClick={onPrint}>Print</button>}
                {onOpenPatient && <button type="button" className="btn btn-warning mx-auto mt-3 p-2 px-4 submit" onClick={() => onOpenPatient(formData.subscriber_id)}>Open Patient Page</button>}
            </div>}
        </div>
    </DataForm>
  )
}

export default RecordForm