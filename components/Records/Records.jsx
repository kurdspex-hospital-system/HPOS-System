import React, { useEffect, useState } from "react";
import { useGetRequest } from "../../hooks/useRequest";
import useAuth from "../../hooks/useAuth";

import PageLayout from "../Layout/PageLayout";
import AddData from "../DataComponent/AddData";
import RecordForm from "./RecordForm";
import RecordTable from "./RecordTable";
import Pagination from "../UI/Pagination";
import Loading from "../UI/Loading";
import Tabs from "../UI/Tabs";
import RecordFilter from "./RecordFilter";

const Records = () => {
  const [records, setRecords] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [patients, setPatients] = useState([]);
  const [isUpdated, setIsUpdated] = useState(true);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('All');
  const [params, setParams] = useState({});

  const [page, setPage] = useState(1);
  const [pageNum, setPageNum] = useState(1);

  const getData = useGetRequest();
  const auth = useAuth();

  useEffect(() => {
    getData('/api/user/accountNames', {}, (data) => {
      setAccounts(data);
    })

    getData('/api/subscriber/names', {}, (data) => {
      setPatients(data);
    })
  }, []);

  useEffect(() => {
    if(isUpdated) {
      setIsUpdated(false);
      getData('/api/record', {params: {
        category: 'Diseases',
        type: tab, 
        page,
        ...params
      }}, (data) => {
        setRecords(data.records);
        setPageNum(data.pageNum);
        setLoading(false);
      });
    }
  }, [isUpdated]);

  const pageHandler = (page) => {
    setPage(page);
    setIsUpdated(true);
  }

  const onTabChangeHandler = (tab) => {
    setTab(tab);
    setPage(1);
    setIsUpdated(true);
  }

  const onFilter = (param) => {
    setParams(param);
    setIsUpdated(true);
  }

  return (
    <PageLayout title="Records">
      <AddData title="Adding Record" bottom="12" apiUrl="/api/record" Form={RecordForm} formProps={{buttonText: 'Add Record', auth, type: tab, category: 'Diseases', patients}} setIsUpdated={setIsUpdated} />
      <RecordFilter accounts={accounts} subscribers={patients} tab={tab} onSubmit={onFilter} />
      <Tabs className='mt-2 mb-4' tabs={['All', 'Thyroid', 'Breast', 'Other']} tabNames={['All Of Diseases', 'Thyroid Diseases', 'Breast Diseases', 'Other Diseases']} currentTab={onTabChangeHandler} small/>

      {!loading && <>
        <RecordTable records={records} setIsUpdated={setIsUpdated} setLoading={setLoading} auth={auth} accounts={accounts} />
        <Pagination pageNumber={pageNum} page={page} setPage={pageHandler}/>
      </>}

      {loading && <Loading />}
    </PageLayout>
  );
};

export default Records;
