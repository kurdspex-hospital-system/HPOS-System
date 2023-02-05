import React, {useState, useEffect} from "react";
import { useGetRequest } from "../../hooks/useRequest";

import PageLayout from '../Layout/PageLayout'
import FilterForm from './FilterForm'
import DataTable from './DataTable'
import Pagination from "../UI/Pagination";
import Loading from "../UI/Loading";
import Tabs from "../UI/Tabs";

const RecycleBin = () => {
  const [data, setData] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [isUpdate, setIsUpdate] = useState(true);
  const [loading, setLoading] = useState(true);

  const [params, setParams] = useState({});
  const [tab, setTab] = useState('Patient');

  const [page, setPage] = useState(1);
  const [pageNum, setPageNum] = useState(1);

  const getData = useGetRequest();

  useEffect(() => {
    if(isUpdate) {
      setLoading(true);
      setIsUpdate(false);

      getData('/api/system/recycleBin', {params: {...params, page, tab}}, (data) => {
        setPageNum(data.pageNum);
        setData(data.body);
        setLoading(false);
        setParams({});
      });
    }
  }, [isUpdate]);

  useEffect(() => {
    getData('/api/user/accountNames', {}, (data) => {
      setAccounts(data);
    })
  }, []);

  const onSubmitHandler = (data) => {
    setParams(data);
    setPage(1);
    setIsUpdate(true);
  }

  const onPageChangeHandler = (page) => {
    setPage(page);
    setIsUpdate(true);
  }

  const onTabChangeHandler = (tab) => {
    setTab(tab);
    setPage(1);
    setIsUpdate(true);
  }

  return (
    <PageLayout>
      <div className='text-light display-4 text-center mb-4'>Recycle Bin</div>

      <Tabs className='mt-2 mb-4' tabs={['Patient', 'Record']} tabNames={['Patients', 'Records']} currentTab={onTabChangeHandler} small/>
      <FilterForm accounts={accounts} tab={tab} onSubmit={onSubmitHandler} />

      {!loading && <>
        <DataTable action='Delete' data={data} tab={tab} setIsUpdated={() => setIsUpdate(true)} setLoading={setLoading} apiUrl='/api/system/recycleBin'/>
      </>}
      
      {loading && <Loading />}
      <Pagination pageNumber={pageNum} page={page} setPage={onPageChangeHandler}/>
    </PageLayout>
  )
}

export default RecycleBin