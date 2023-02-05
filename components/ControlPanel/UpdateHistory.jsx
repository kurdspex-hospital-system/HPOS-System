import React, {useState, useEffect} from "react";
import { useGetRequest } from "../../hooks/useRequest";

import PageLayout from '../Layout/PageLayout'
import FilterForm from './FilterForm'
import DataTable from './DataTable'
import Loading from "../UI/Loading";
import Tabs from "../UI/Tabs";

const UpdateHistory = () => {
  const [data, setData] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [isUpdate, setIsUpdate] = useState(true);
  const [loading, setLoading] = useState(true);

  const [params, setParams] = useState({});
  const [tab, setTab] = useState('Patient');

  const getData = useGetRequest();

  useEffect(() => {
    if(isUpdate) {
      setLoading(true);
      setIsUpdate(false);
      getData('/api/system/updateHistory', {params: {...params, tab}}, (data) => {
        setData(data);
        setParams({});
      });
    }
  }, [isUpdate]);

  useEffect(() => {
    getData('/api/user/accountNames', {}, (data) => {
      setAccounts(data);
    })
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [data]);

  const onSubmitHandler = (data) => {
    setParams(data);
    setIsUpdate(true);
  }

  const onTabChangeHandler = (tab) => {
    setTab(tab);
    setIsUpdate(true);
  }

  return (
    <PageLayout>
      <div className='text-light display-4 text-center mb-4'>Update History</div>

      <Tabs className='mt-2 mb-4' tabs={['Patient']} tabNames={['Patients']} currentTab={onTabChangeHandler} small/>
      <FilterForm accounts={accounts} tab={tab} onSubmit={onSubmitHandler} />

      {!loading && <>
        {tab === 'Patient' &&
          <DataTable action='Update' data={data} tab={tab} setIsUpdated={() => setIsUpdate(true)} setLoading={setLoading} apiUrl='/api/system/updateHistory'/>
        }
      </>}
      
      {loading && <Loading />}
    </PageLayout>
  )
}

export default UpdateHistory