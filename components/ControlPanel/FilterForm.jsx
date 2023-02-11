import React, {useState, useEffect} from "react";

import Form from "../UI/Form";
import DiseaseRecordTypes from "../Options/DiseaseRecordTypes";
import Gender from "../Options/Gender";

import style from './FilterForm.module.css'

const FilterForm = ({tab, accounts, onSubmit}) => {  
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [recordType, setRecordType] = useState('All');
  const [user, setUser] = useState('All');

  useEffect(() => {
    if(tab) {
      setRecordType('All');
      setUser('All');
    }
  }, [tab]);

  const onSubmitData = () => {
    onSubmit({
        minDate,
        maxDate,
        recordType,
        user
    });
  };

  return (
    <Form id={style.form} className="d-flex mt-3 mb-5 justify-content-center" onSubmit={onSubmitData}>
      <label className="me-3 my-auto"> From </label>
      <input className="my-auto" type="date" value={minDate} onChange={(e) => setMinDate(e.target.value)}/>

      <label className="mx-3 my-auto"> To </label>
      <input className="my-auto" type="date" value={maxDate} onChange={(e) => setMaxDate(e.target.value)}/>

      <label className="mx-3 my-auto"> Of Type </label>
      <select className="form-select my-auto" value={recordType} onChange={(e) => setRecordType(e.target.value)}>
        <option value="All">All</option>
        {(tab === 'Patient') && <Gender />}
        {(tab === 'Record') && <DiseaseRecordTypes />}
      </select>
      
      <label className="mx-3 my-auto"> Deleted By </label>
      <select className="form-select my-auto" value={user} onChange={(e) => setUser(e.target.value)}>
        <option value="All">All</option>
        {accounts.map((account) => (
          <option key={Math.random()} value={account.id}>{account.username}</option>
        ))}
      </select>

      <button className="btn btn-warning ms-3 px-4" type="submit">
        Search
      </button>
    </Form>
  );
};

export default FilterForm;
