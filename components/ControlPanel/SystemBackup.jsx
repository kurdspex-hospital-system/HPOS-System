import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useDispatch } from "react-redux";
import { notificationActions } from "../../store/notification-slice";
import { useGetRequest } from '../../hooks/useRequest';
import FileDownload from 'js-file-download';
import moment from 'moment';

import PageLayout from '../Layout/PageLayout'
import IconButton from '../UI/IconButton'
import PopupModal from '../UI/PopupModal';
import Loading from '../UI/Loading';
import Form from '../UI/Form';

const SystemBackup = () => {
  const [backups, setBackups] = useState([]);
  const [isUpdated, setIsUpdated] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [uploadModalShow, setUploadModalShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState('');
  const [file, setFile] = useState([]);

  const dispatch = useDispatch();
  const getData = useGetRequest();

  useEffect(() => {
    if(isUpdated) {
      getData('/api/system/backup', {}, (data) => {
        setIsUpdated(false);
        setLoading(false);
        setDate(data[data.length - 1]);
        setBackups(data);
      })
    }
  }, [isUpdated]);

  const downloadAsSql = (data, filename) => {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(data)));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

  const backupClickHandler = () => {
    setLoading(true);
    axios.post('/api/system/backup')
      .then((res) => {
        dispatch(notificationActions.activeNotification(res.data));
        setIsUpdated(true);
      })
      .catch((err) => {
        dispatch(notificationActions.activeNotification(err.response.data));
      })
  }

  const onSubmitData = () => {
    setLoading(true);
    axios.patch('/api/system/backup', {date})
      .then((res) => {
        dispatch(notificationActions.activeNotification(res.data));
        setIsUpdated(true);
        setModalShow(false);
      })
      .catch((err) => {
        console.log(err);
        dispatch(notificationActions.activeNotification(err.response.data));
      })
  }

  const onDownloadFile = () => {
    axios.post('/api/system/backup/download')
      .then((res) => {
        downloadAsSql(res.data, moment(Date.now()).format('YYYY-MM-DD') + '.backup');
      })
      .catch((err) => {
        console.log(err);
        dispatch(notificationActions.activeNotification(err.response.data));
      })
  }

  const onUploadFile = async () => {
    const promise = new Promise((resolve, reject) => { 
      const reader = new FileReader();

      reader.addEventListener('load', (e) => {
        resolve(e.target.result);
      });
      
      reader.readAsBinaryString(file);
    });
    
    if (file) {
      try {
        axios.post('/api/system/backup/upload', {data: await promise})
          .then((res) => {
            dispatch(notificationActions.activeNotification(res.data));
            setUploadModalShow(false)
          })
          .catch((err) => {
            console.log(err);
            dispatch(notificationActions.activeNotification(err.response.data));
          })
      } catch(err) {
        console.log(err);
      }
    }
  }

  return (
    <PageLayout>
      {!loading && <>
        <div className='text-light display-4 text-center mb-4'>System Backup</div>
        <div className='mt-5 d-flex'>
            {/* <IconButton className='mx-auto' src='/icons/backup.svg' text='Create Backup Image' color='blue' onClick={backupClickHandler}/>
            <IconButton className='mx-auto' src='/icons/cloud_download.svg' text='Retreve Backup Image' color='blue' onClick={() => setModalShow(true)}/> */}
            <IconButton className='mx-auto' src='/icons/download-file.svg' text='Download Backup Image' color='gold' onClick={onDownloadFile}/>
            <IconButton className='mx-auto' src='/icons/upload-file.svg' text='Upload Backup Image' color='gold' onClick={() => setUploadModalShow(true)}/>
        </div>
        <PopupModal show={modalShow} onHide={() => setModalShow(false)} size="md">
          <div className="display-6 text-light text-center">Select Backup Date to Restore</div>
          <Form onSubmit={onSubmitData}>
            <select className='w-100 py-2 text-center mx-2 mt-3 mx-auto' value={date} onChange={(e) => setDate(e.target.value)}>
              {backups.map((date) => {
                return <option key={date} value={date}>{date}</option>
              })}
            </select>
            <div className="d-flex mt-4">
              <button type='submit' className="btn btn-info mx-auto">Restore it</button>
            </div>
          </Form>
        </PopupModal>

        <PopupModal show={uploadModalShow} onHide={() => setUploadModalShow(false)} size="md">
          <div className="display-6 text-light text-center">Select Backup Date to Download</div>
          <Form onSubmit={onUploadFile}>
            <input className='w-100 text-center mt-3 mx-auto' type="file" accept=".backup" onChange={(e) => setFile(e.target.files[0])} />
            <div className="d-flex mt-4">
              <button type='submit' className="btn btn-info mx-auto">Restore it</button>
            </div>
          </Form>
        </PopupModal>
      </>}

      {loading && <Loading />}
    </PageLayout>
  )
}

export default SystemBackup