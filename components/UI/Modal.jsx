import React from 'react'
import { Modal } from 'react-bootstrap';

import style from './Modal.module.css';

const ModalBox = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size={props.size}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {props.title&& <Modal.Header className={style.title}>
        <Modal.Title id="contained-modal-title-vcenter" className='mx-auto'>
          <span className='display-6'>{props.title}</span>
        </Modal.Title>
      </Modal.Header>}
      <Modal.Body className={style.body}>
        {props.children}
      </Modal.Body>
    </Modal>
  )
}

export default ModalBox