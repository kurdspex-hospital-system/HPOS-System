import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { notificationActions } from "../../store/notification-slice";
import parseAll from "../../scripts/parseAll";

import Modal from "../UI/Modal";
import Table from "../UI/Table";
import RecordForm from "./RecordForm";
import RecordRow from "./RecordRow";
import ConfirmationPopup from "../UI/ConfirmationPopup";
import Print from "../Print/Print";
import DiseasesPDF from "../Print/DiseasesPDF";

const RecordTable = ({records, patient, auth, setLoading, setIsUpdated}) => {
  const [modalShow, setModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [record, setRecord] = useState({});
  const [data, setData] = useState({});
  const [isPrint, setIsPrint] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    parseRecords(records);
  }, [records]);

  const parseRecords = async (records) => {
    for(let i = 0; i < records.length; i++) {
      records[i] = await parseAll(records[i]);
    }
  }

  const onHideModal = () => {
    setModalShow(false);
  };

  const onUpdateHandler = (record) => {
    setLoading(true);
    axios.put('/api/record', record)
      .then((res) => {
        setIsUpdated(true);
        dispatch(notificationActions.activeNotification(res.data));
      })
      .catch((err) => {
        dispatch(notificationActions.activeNotification(err.response.data));
      });
    setModalShow(false);
  }

  const onDelete = (data) => {
    setData(data);
    setDeleteModalShow(true);
  }

  const deleteRecordHandler = () => {
    setLoading(true);
    axios.delete('/api/record', {data})
      .then((res) => {
        setIsUpdated(true);
        dispatch(notificationActions.activeNotification(res.data));
      })
      .catch((err) => {
        dispatch(notificationActions.activeNotification(err.response.data));
      });

    setDeleteModalShow(false);
  }

  const getRecordHandler = (record) => {
    setRecord(record);
    setModalShow(true);
  };

  return (
    <>
      <Table title="Records">
        {records.map((record) => (
          <RecordRow
            key={record.id}
            record={record}
            getRecord={getRecordHandler}
            onDelete={onDelete}
            auth={auth}
          />
        ))}
      </Table>

      <Modal show={modalShow} onHide={onHideModal} title="Record" size="lg">
        <RecordForm buttonText="Update Record" data={record} onSubmitData={onUpdateHandler} onPrint={patient ? () => setIsPrint(true) : null} auth={auth} state/>
      </Modal>

      <Print Page={DiseasesPDF} pageProps={{records: [record], patient}} isPrint={isPrint} setIsPrint={setIsPrint}/>

      <ConfirmationPopup text={'Do you want to delete this record'} btnText={'Yes, Delete it'} show={deleteModalShow} onHide={() => setDeleteModalShow(false)} onClick={deleteRecordHandler} />
    </>
  );
};

export default RecordTable;
