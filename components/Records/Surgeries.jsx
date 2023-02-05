import React, { useEffect, useState } from "react";
import { useGetRequest } from "../../hooks/useRequest";
import useAuth from "../../hooks/useAuth";

import PageLayout from "../Layout/PageLayout";
import RecordTable from "./RecordTable";
import Pagination from "../UI/Pagination";
import Loading from "../UI/Loading";
import Tabs from "../UI/Tabs";
import DateFilter from "../UI/DateFilter";

const Surgeries = () => {
  const [records, setRecords] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("All");
  const [date, setDate] = useState({min: null, max: null});

  const [page, setPage] = useState(1);
  const [pageNum, setPageNum] = useState(1);

  const getData = useGetRequest();
  const auth = useAuth();

  useEffect(() => {
    getData("/api/user/accountNames", {}, (data) => {
      setAccounts(data);
    });
  }, []);

  useEffect(() => {
    if (isUpdated) {
      setIsUpdated(false);
      fetchData({
        category: "Diseases",
        type: tab,
        page,
        plan: "Surgery",
        planMinDate: date.min,
        planMaxDate: date.max,
      });
    }
  }, [isUpdated]);

  const fetchData = (params) => {
    getData("/api/record", {
        params
      },
      (data) => {
        setRecords(data.records);
        setPageNum(data.pageNum);
        setLoading(false);
      }
    );
  }

  const pageHandler = (page) => {
    setPage(page);
    setIsUpdated(true);
  };

  const onTabChangeHandler = (tab) => {
    setTab(tab);
    setPage(1);
    setIsUpdated(true);
  };

  const onDateChangeHandler = (date, state) => {
    setDate(date);
    fetchData({
      category: "Diseases",
      type: tab,
      page: 1,
      plan: "Surgery",
      state: state ? state : 'All',
      planMinDate: date.min,
      planMaxDate: date.max,
    });
  };

  return (
    <PageLayout title="Records">
      {/* <Tabs
        className="mt-2 mb-4"
        tabs={["All", "Thyroid", "Breast", "Other"]}
        tabNames={["All Of Diseases", "Thyroid Diseases", "Breast Diseases", "Other Diseases"]}
        currentTab={onTabChangeHandler}
        small
      /> */}

      <DateFilter onChange={onDateChangeHandler}/>

      {!loading && (
        <>
          <RecordTable
            records={records}
            setIsUpdated={setIsUpdated}
            setLoading={setLoading}
            auth={auth}
            accounts={accounts}
          />
          <Pagination pageNumber={pageNum} page={page} setPage={pageHandler} />
        </>
      )}

      {loading && <Loading />}
    </PageLayout>
  );
};

export default Surgeries;
