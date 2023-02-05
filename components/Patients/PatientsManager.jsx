import React, { useState, useEffect } from "react";
import { useGetRequest } from "../../hooks/useRequest";

import PageLayout from "../Layout/PageLayout";
import AddData from "../DataComponent/AddData";
import PatientForm from "./PatientForm"
import PatientsTable from "./PatientsTable";
import Form from "../UI/Form";
import Loading from "../UI/Loading";
import Pagination from "../UI/Pagination";
import Tabs from "../UI/Tabs";

import style from './PatientsManager.module.css';

const PatientsManager = () => {
  const [patients, setPatients] = useState([]);
  const [isUpdated, setIsUpdated] = useState(true);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [pageNum, setPageNum] = useState(1);

  const [tab, setTab] = useState('Today');
  const [searchText, setSearchText] = useState('');
  const [type, setType] = useState('id');

  const getData = useGetRequest();

  const params = {
    type,
    searchText,
    page,
    tab
  }

  useEffect(() => {
    if(isUpdated) {
      setIsUpdated(false);
      getData('/api/subscriber', {params}, (data) => {
        setPageNum(data.pageNum);
        setPatients(data.subscribers);
        setLoading(false);
      });
    }
  }, [isUpdated]);

  const onSubmitData = () => {
    setIsUpdated(true);
    setPage(1);
  }

  const pageHandler = (page) => {
    setPage(page);
    setIsUpdated(true);
  }

  const onTabChangeHandler = (tab) => {
    setTab(tab);
    setPage(1);
    setIsUpdated(true);
  }

  return (
    <PageLayout>
      <AddData title="Adding Patient" bottom="12" apiUrl="/api/subscriber" Form={PatientForm} formProps={{buttonText: 'Add Patient'}} setIsUpdated={setIsUpdated} />
      <Tabs className='mt-2 mb-4' tabs={['Today', 'All']} currentTab={onTabChangeHandler} />
      <Form id={style.form} className='d-flex mt-3 mb-4 justify-content-center' onSubmit={onSubmitData}>
        <input type="text" name="search" className="ps-3 form-control" maxLength={type === 'client name' ? 100 : 11} value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder={"enter client " + (type === 'client name' ? 'name' : 'phone number')} />
        <select className="form-select my-auto ms-0" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="phone number">Patient Phone Number</option>
          <option value="name">Patient Name</option>
          <option value="id">Patient ID</option>
        </select>
        <button className="btn btn-warning ms-0 px-4" type="submit">Search</button>
      </Form>

      {!loading &&<>
        <PatientsTable patients={patients} setIsUpdated={setIsUpdated} />
        <Pagination pageNumber={pageNum} page={page} setPage={pageHandler}/>
      </>}

      {loading && <Loading />}
    </PageLayout>
  );
};

export default PatientsManager;
