import React from 'react';
import PopupModal from "../UI/PopupModal";

const ConfirmationPopup = ({text, btnText, show, onHide, onClick, size = "md"}) => {
  return (
    <PopupModal show={show} onHide={onHide} size={size}>
        <div className="display-6 text-center">{text}</div>
        <div className="d-flex mt-4">
          <button className="btn btn-info mx-auto" onClick={onClick}>{btnText}</button>
        </div>
    </PopupModal>
  )
}

export default ConfirmationPopup