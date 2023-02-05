import React, { useState, useEffect } from "react";
import { useGetRequest } from "../../hooks/useRequest";

import PageLayout from "../Layout/PageLayout";
import AddUser from "./AddUser";
import UserTable from "./UserTable";
import Form from "../UI/Form";
import UserAccessTypes from "../Options/UserAccessTypes";
import Loading from "../UI/Loading";

import style from './UserManager.module.css';

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [isUpdated, setIsUpdated] = useState(true);
  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState('');
  const [access, setAccess] = useState('All');

  const getData = useGetRequest();

  const params = {
    access,
    searchText
  }

  useEffect(() => {
    if(isUpdated) {
      setIsUpdated(false);
      getData('/api/user', {params}, (data) => {
        setUsers(data);
        setLoading(false);
      });
    }
  }, [isUpdated]);

  const onSubmitData = (form) => {
    setIsUpdated(true);
  }

  return (
    <PageLayout>
      <AddUser setIsUpdated={setIsUpdated} />

      <Form id={style.form} className='d-flex mt-3 mb-4 justify-content-center' onSubmit={onSubmitData}>
        <input type="text" name="search" className="ps-3 form-control" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="enter username" />
        <select className="form-select my-auto ms-0" value={access} onChange={(e) => setAccess(e.target.value)}>
          <option value="All">All</option>
          <UserAccessTypes />
        </select>
        <button className="btn btn-warning ms-0 px-4" type="submit">Search</button>
      </Form>

      {!loading && <UserTable users={users} setIsUpdated={setIsUpdated} />}
      {loading && <Loading />}
    </PageLayout>
  );
};

export default UserManager;
