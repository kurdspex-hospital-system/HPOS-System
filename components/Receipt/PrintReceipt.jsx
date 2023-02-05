import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import moment from "moment";

import { useDispatch } from "react-redux";
import { notificationActions } from "../../store/notification-slice";

import FloatingButton from "../UI/FloatingButton";
import Receipt from "./Receipt";
import Modal from "../UI/Modal";
import Form from "../UI/Form";

const PrintReceipt = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [minDate, setMinDate] = useState(moment(Date.now()).format("YYYY-MM-DD"));
  const [maxDate, setMaxDate] = useState("");
  const [data, setData] = useState(['start']);
  const [total, setTotal] = useState(0);

  const receipt = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data[0] !== 'start' && data.length > 0 && total > 0) {
      setModalShow(false);
      reactToPrint();
      setTotal(0);
    } else if(data[0] !== 'start' && data.length <= 0) {
      dispatch(notificationActions.activeNotification({ type: "warning", message: "No Data Found"}));
    }
  }, [data, total]);

  const reactToPrint = useReactToPrint({
    content: () => receipt.current,
  });

  const printReceiptHandler = () => {
    if (minDate !== "" && maxDate !== "") {
      setData(props.data.filter((data) => moment(data.created).isBetween(minDate, maxDate)));
    } else if (minDate !== "") {
      setData(props.data.filter((data) => moment(data.created).isAfter(minDate)));
    } else if (maxDate !== "") {
      setData(props.data.filter((data) => moment(data.created).isBefore(maxDate)));
    }
  };

  return (
    <div className={props.className}>
      <FloatingButton src="/icons/print.svg" bottom="230" onClick={() => setModalShow(true)} />
      <Receipt ref={receipt} data={data} client={props.client} setTotal={setTotal} total={total} />

      <Modal show={modalShow} onHide={() => setModalShow(false)} title="Printing Receipt" size="md">
        <Form onSubmit={printReceiptHandler}>
          <div>
            <label className="ms-2">From Data</label>
            <input className="w-100 py-2 px-3" type="date" value={minDate} onChange={(e) => setMinDate(e.target.value)} />
          </div>

          <div className="mt-3">
            <label className="ms-2">To Data</label>
            <input className="w-100 py-2 px-3" type="date" value={maxDate} onChange={(e) => setMaxDate(e.target.value)} />
          </div>
          <div className="d-flex mt-4">
            <button className="btn btn-outline-warning mx-auto px-4" type="submit">
              Print Receipt
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default PrintReceipt;
