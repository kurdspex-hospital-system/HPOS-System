import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { notificationActions } from "../../store/notification-slice";

import PopupModal from "../UI/PopupModal";
import ConfirmationPopup from "../UI/ConfirmationPopup";
import Table from "./Table";
import PatientForm from "../Patients/PatientForm";
import RecordForm from "../Records/RecordForm";

const DataTable = ({data, action, tab, apiUrl, setLoading, setIsUpdated}) => {
  const [modalShow, setModalShow] = useState(false);
  const [actionModalShow, setActionModalShow] = useState(false);
  const [actionModalText, setActionModalText] = useState('');
  const [actionModalType, setActionModalType] = useState('');
  const [dataModalShow, setDataModalShow] = useState(false);
  const [groupData, setGroupData] = useState([]);
  const [selectedData, setSelectedData] = useState({});

  const dispatch = useDispatch();

  const onDelete = (data) => {
    setSelectedData(data);
    setActionModalText(`Do You Want To Delete This ${tab}`);
    setActionModalType('Delete');
    setActionModalShow(true);
  }

  const onRestore = (data) => {
    setSelectedData(data);
    setActionModalText(`Do You Want To Rrestore This ${tab}`);
    setActionModalType('Restore');
    setActionModalShow(true);
  }

  const onGroupDelete = (data) => {
    if(action === 'Update') {
      setSelectedData(data);
      setActionModalText(`Do You Want To Delete This Group of ${tab}s`);
      setActionModalType('GroupDelete');
      setActionModalShow(true);
    } else {
      onDelete(data);
    }
  }

  const dataActionHandler = async () => {
    setLoading(true);

    try{
      let res = {} 
      
      if(actionModalType === 'Delete') {
        res = await axios.delete(apiUrl, {data: {...selectedData, tab}});
      } else if(actionModalType === 'Restore') {
        res = await axios.put(apiUrl, {...selectedData, tab});
      } else if(actionModalType === 'GroupDelete') {
        res = await axios.patch(apiUrl, {...selectedData, tab});
      }

      dispatch(notificationActions.activeNotification(res.data));
    } catch(err) {
      dispatch(notificationActions.activeNotification(err.response.data));
    }

    setIsUpdated(true);
    setActionModalShow(false);
  }

  const getGroupHandler = async (data) => {
    if(action === 'Update') {
        try {
          const res = await axios.get('/api/system/updateHistory/data', { params: {id: data.other_data, tab}})
          setGroupData(res.data);
          setModalShow(true);
        } catch(err) {
          dispatch(notificationActions.activeNotification(err.response.data));
        }
    } else {
      getRecordHandler(data);
    }
  }

  const getRecordHandler = (data) => {
    setSelectedData(data);
    setDataModalShow(true);
  };

  return (
    <>
      <Table type={action === 'Update' ? 'Published' : action} data={data} tab={tab} group={action === 'Update'} onDelete={onGroupDelete} onRestore={onRestore} getData={getGroupHandler}></Table>

      <PopupModal show={modalShow} onHide={() => setModalShow(false)} size="xl">
        <Table type={action} data={groupData} tab={tab} onDelete={onDelete} onRestore={onRestore} getData={getRecordHandler}></Table>
      </PopupModal>

      <PopupModal show={dataModalShow} onHide={() => setDataModalShow(false)} size="lg">
        {(tab === 'Patient') && 
          <PatientForm data={selectedData} state noEdit/>
        }
        {(tab === 'Record') && 
          <RecordForm data={selectedData} state noEdit/>
        }
      </PopupModal>

      <ConfirmationPopup text={actionModalText} btnText={'Yes, Do It'} show={actionModalShow} onHide={() => setActionModalShow(false)} onClick={dataActionHandler} />
    </>
  );
}

export default DataTable