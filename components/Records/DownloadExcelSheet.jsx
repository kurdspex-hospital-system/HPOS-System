import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from "react-redux";
import { notificationActions } from "../../store/notification-slice";
import excel from '../../scripts/excel';
import moment from "moment";

import FloatingButton from '../UI/FloatingButton'
import Modal from '../UI/Modal';
import Form from '../UI/Form';

import ItemCategories from '../Options/ItemCategories';

const DownloadExcelSheet = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [recordType, setRecordType] = useState('All');
  const [user, setUser] = useState('All');

  const dispatch = useDispatch();

  const downloadExcelSheetHandler = () => {
    axios.post('/api/record/list', {minDate, maxDate, recordType, user})
      .then((res) => {
        setModalShow(false);
        excel(res.data.map((data) => {
          return {
            Add_By: props.accounts.filter((account) => account.id === data.publisher_id)[0].username,
            Money: data.record_money,
            Currency: data.money_type,
            Action: data.action_type,
            Type: data.record_type,
            Description: data.record_description,
            Details: data.record_details,
            Last_Update: moment(data.created).format('YYYY-MM-DD')
          }
        })).downLoad();
      })
      .catch((err) => {
        console.log(err);
        dispatch(notificationActions.activeNotification(err.response.data));
      })
  }

  return (
    <>
      <FloatingButton src="/icons/excel.svg" bottom="90" onClick={() => setModalShow(true)}/>
      <Modal show={modalShow} onHide={() => setModalShow(false)} title="Adding Record Form" size="md">
        <Form onSubmit={downloadExcelSheetHandler}>
            <div>
                <label className="ms-2">From Data</label>
                <input className="w-100 py-2 px-3" type="date" value={minDate} onChange={(e) => setMinDate(e.target.value)} />
            </div>

            <div className='mt-3'>
                <label className="ms-2">To Data</label>
                <input className="w-100 py-2 px-3" type="date" value={maxDate} onChange={(e) => setMaxDate(e.target.value)} />
            </div>

            <div className='mt-3'>
                <label className="ms-2">Record Type</label>
                <select className="form-select " value={recordType} onChange={(e) => setRecordType(e.target.value)}>
                    <option value="All">All</option>
                    <ItemCategories />
                </select>
            </div>

            <div className='mt-3'>
                <label className="ms-2">Add By</label>
                <select className="form-select" value={user} onChange={(e) => setUser(e.target.value)}>
                    <option value="All">All</option>
                    {props.accounts.map((account) => (
                    <option key={Math.random()}>{account.username}</option>
                    ))}
                </select>
            </div>

            <div className='d-flex mt-4'>
                <button className="btn btn-outline-warning mx-auto px-4" type="submit">Download As Excel Sheet</button>
            </div>
        </Form>
      </Modal>
    </>
  )
}

export default DownloadExcelSheet;