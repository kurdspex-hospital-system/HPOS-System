import React, {useState, useEffect} from "react";

import style from './Notification.module.css';

const Notification = (props) => {
  const [notificationType, setNotificationType] = useState('');
  const [show, setShow] = useState(props.show);

  useEffect(() => {
    switch(props.type){
      case 'info': setNotificationType(style.info); break;
      case 'warning': setNotificationType(style.warning); break;
      case 'done': setNotificationType(style.done); break;
      case 'error': setNotificationType(style.error); break;
    }
  }, [props.type]);

  useEffect(() => {
    if(show) {
      let timeoutId = setTimeout(() => {
        props.onClose();
      }, 4500)
  
      return () => clearTimeout(timeoutId);
    }
  }, [show]);

  useEffect(() => {
    setShow(props.show);
  }, [props.show])

  const onClickHandler = () => {
    props.onClose();
  }

  return (
    <>
      {show && <div id={style.notification} className={notificationType + " alert d-flex align-items-center"} role="alert">
        {props.type === 'done' && <img src='/icons/check_circle.svg' />}
        {props.type === 'error' && <img src='/icons/error.svg' />}
        {props.type === 'warning' && <img src='/icons/warning.svg' />}
        {props.type === 'info' && <img src='/icons/info.svg' />}
        <div>{props.message}</div>
        <img id={style.close} src='/icons/close.svg' onClick={onClickHandler}/>
      </div>}
    </>
  );
};

export default Notification;
