import React from 'react'
import { Modal } from 'react-bootstrap';

import style from './PopupModal.module.css';

const PopupModal = (props) => {
    return (
        <Modal
          show={props.show}
          onHide={props.onHide}
          size={props.size}
          aria-labelledby="Popup Modal"
          centered
        >
          <Modal.Body className={style.body}>
            {props.children}
          </Modal.Body>
        </Modal>
      )
}

export default PopupModal