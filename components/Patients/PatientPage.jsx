import React, { useState, useEffect } from "react";
import { useGetRequest } from "../../hooks/useRequest";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useDispatch } from "react-redux";
import { notificationActions } from "../../store/notification-slice";
import parseAll from "../../scripts/parseAll";

import PageLayout from "../Layout/PageLayout";
import Loading from "../UI/Loading";
import FloatingButton from "../UI/FloatingButton";
import NotFound from "../UI/NotFound";
import Modal from "../UI/Modal";
import PatientForm from "./PatientForm";
import Panel from "../UI/Panel";
import RecordTable from "../Records/RecordTable";
import AddData from "../DataComponent/AddData";
import RecordForm from "../Records/RecordForm";
import Print from "../Print/Print";
import DiseasesPDF from "../Print/DiseasesPDF";

import style from './PatientPage.module.css';
import moment from "moment";

const PatientPage = (props) => {
  const [patient, setPatient] = useState();
  const [records, setRecords] = useState([]);
  const [isUpdated, setIsUpdated] = useState(true);
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [isPrint, setIsPrint] = useState(false);
  const [data, setData] = useState([]);

  const dispatch = useDispatch();
  const getData = useGetRequest();
  const auth = useAuth();;

  useEffect(() => {
    if (isUpdated) {
      setIsUpdated(false);
      getData("/api/subscriber/data", { params: {id: props.id} }, (data) => {
        setPatient(data.patient);
        setRecords(data.records);
        setLoading(false);
      });
    }
  }, [isUpdated]);

  useEffect(() => {
    if(records && records.length) {
      parseData(records.filter((record) => record.sub_category === 'Thyroid'));
    }
  }, [records])

  const parseData = async (records) => {
    for(let i = 0; i < records.length; i++) {
      records[i] = await parseAll(records[i]);
    }

    setData(records);
  }

  const onUpdateHandler = (patient) => {
    axios.put("/api/subscriber", patient)
      .then((res) => {
        setIsUpdated(true);
        dispatch(notificationActions.activeNotification(res.data));
      })
      .catch((err) => {
        dispatch(notificationActions.activeNotification(err.response.data));
    });

    setModalShow(false);
  }

  const pinPatient = () => {
    axios.put("/api/subscriber/tag", {subscriber: patient})
      .then((res) => {
        setIsUpdated(true);
        dispatch(notificationActions.activeNotification(res.data));
      })
      .catch((err) => {
        dispatch(notificationActions.activeNotification(err.response.data));
    });
  }

  return (
    <PageLayout>
      <FloatingButton src="/icons/edit.svg" bottom="9" onClick={() => setModalShow(true)}/>

      {(patient && (patient.last_update ? moment(patient.last_update).isBefore(moment(), 'day') : moment(patient.publish_date).isBefore())) && 
        <FloatingButton src="/icons/push_pin.svg" bottom={data.length > 1 ? "236" : "161"} onClick={pinPatient}/>
      }

      <Modal show={modalShow} onHide={() => setModalShow(false)} title="Updating Patient Account" size="lg">
        <PatientForm buttonText="Update" data={patient} onSubmitData={onUpdateHandler} state/>
      </Modal>

      {!loading && patient && <>
        <AddData 
          title="Adding Record" 
          bottom="85" 
          apiUrl="/api/record" 
          Form={RecordForm} 
          formProps={{
            buttonText: 'Add Record', 
            category: 'Diseases', 
            patient,
            data: data.length > 0 ? {
              sub_category: data[0].sub_category,
              data1: data[0].data1,
              data2: {
                tsh: '',
                trab: '',
                antiTPO: '',
                freeT4: '',
                freeT3: '',
                STG: ''
              },
              data3: data[0].data3,
              data4: data[0].data4,
              data5: "",
              descriptions: data[0].descriptions
            } : undefined
          }}
          setIsUpdated={setIsUpdated} 
        />
        
        {data.length > 1 && <FloatingButton src="/icons/print.svg" bottom="161" onClick={() => setIsPrint(true)}/>}
        <Print Page={DiseasesPDF} pageProps={{records: data, patient}} isPrint={isPrint} setIsPrint={setIsPrint}/>
        
        <h1 className="text-center">{patient.fullname}</h1>
        <div className="row">
          <Panel className={`mt-4 ${style.data} d-flex flex-column`}>
            <div className="d-flex">
              <h3 className="text-light text-center col-sm-4">Phone Number: {patient.phoneNumber.replace(/(\d{4})(\d{3})(\d{4})/, "$1 $2 $3")}</h3>
              <h3 className="text-light text-center col-sm-4">Sex: {patient.sex}</h3>
              <h3 className="text-light text-center col-sm-4">Age: {patient.age}</h3>
            </div>

            <div className="d-flex mt-3">
              <h3 className="text-light text-center col-sm-4">Address: {patient.main_address}</h3>
              <h3 className="text-light text-center col-sm-4">Past Surgical: {patient.past_surgical}</h3>
              <h3 className="text-light text-center col-sm-4">Drug History: {patient.drug_history}</h3>
            </div>
          </Panel>

          <Panel className={`mt-4 ${style.data} d-flex flex-column`}>
            <h3 className="text-light text-left">Past Medical: {patient.past_medical}</h3>
          </Panel>

          <Panel className={`mt-4 ${style.data} d-flex flex-column mb-5`}>
            <h3 className="text-light text-left">{patient.descriptions}</h3>
          </Panel>

          <div className="px-0">
            <RecordTable records={records} patient={patient} setIsUpdated={setIsUpdated} setLoading={setLoading} auth={auth} noClient/>
          </div>
        </div>
      </>}

      {!loading && !patient && <NotFound />}
      {loading && <Loading />}
    </PageLayout>
  );
};

export default PatientPage;
