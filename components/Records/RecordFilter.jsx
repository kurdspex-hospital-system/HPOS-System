import React, {useState, useEffect} from "react";
import { Typeahead } from 'react-bootstrap-typeahead';

import Form from "../UI/Form";
import FloatingButton from "../UI/FloatingButton";
import Modal from "../UI/PopupModal";
import MultiOptionButtons from "../UI/MultiOptionButtons";

import style from "./RecordFilter.module.css";

const RecordFilter = ({accounts, subscribers, tab, onSubmit}) => { 
    const [modalShow, setModalShow] = useState(false);
  
    const [minDate, setMinDate] = useState('');
    const [maxDate, setMaxDate] = useState('');
    const [user, setUser] = useState('All');
    const [receipt, setReceipt] = useState('');
    const [subscriber, setSubscriber] = useState({});
    const [plan, setPlan] = useState('All');
    const [planDate, setPlanDate] = useState({min: '', max: ''});
    const [imaging, setImaging] = useState('All');
    const [complant, setComplant] = useState([]);
    const [UST, setUST] = useState('All');
    const [FNAC, setFNAC] = useState('All');
    const [state, setState] = useState('All');

    const onSubmitData = () => {
      onSubmit({
        minDate,
        maxDate,
        user,
        receipt,
        subscriber: subscriber && subscriber.id ? subscriber.id : '',
        plan,
        planMinDate: planDate.min,
        planMaxDate: planDate.max,
        imaging,
        complant,
        UST,
        FNAC,
        state
      });

      setModalShow(false);
    }

    const renderPatient = (option, props) => (
        <div className={style.label}>
            {`${option.fullname} (${option.phoneNumber})`}
        </div>
    )

  return (
    <>
      <FloatingButton src={'/icons/filter.svg'} bottom="90" onClick={() => setModalShow(true)}/>
      <Modal show={modalShow} onHide={() => setModalShow(false)} size="lg">
        <div style={{fontSize: '40px'}} className="mb-3 text-light text-center">Filter</div>
        <Form id={style.form} onSubmit={onSubmitData}>
          <label className="mt-2 ms-2">Starting Date</label>
          <input className="form-control" type="date" value={minDate} onChange={(e) => setMinDate(e.target.value)} />

          <label className="mt-2 ms-2">End Date</label>
          <input className="form-control" type="date" value={maxDate} onChange={(e) => setMaxDate(e.target.value)} />

          <label className="mt-2 ms-2">Patient</label>
          <Typeahead
            highlightOnlyResult
            id={style.type}
            labelKey={(option) => `${option.fullname}`}
            minLength={1}
            onChange={(selected) => setSubscriber(selected[0])}
            options={subscribers ? subscribers : []}
            renderMenuItemChildren={renderPatient}
            filterBy={(patient, props) => patient.fullname.toLowerCase().includes(props.text.toLowerCase()) || patient.phoneNumber.includes(props.text)}
            placeholder="Choose a patient ..."
            selected={subscriber && subscriber.id ? [subscriber] : []}
          />

          <label className="mt-2 ms-2">Receipt Number</label>
          <input className="form-control" type="number" name='Receipt Number' min={0} value={receipt} onChange={(e) => setReceipt(e.target.value)}/>

          {tab && tab === 'Thyroid' && <>
            <div className="d-flex mt-3 mb-2">
              <label className="ms-3 my-auto">Thyroid State</label>
              <MultiOptionButtons
                className="ms-auto"
                onChange={(option) => setImaging(option)}
                options={["All", "Euthyroid", "Hypothyroid", "Hyperthyroid"]}
                value={imaging}
              />
            </div>

            <div className="d-flex mt-3 mb-2">
              <label className="ms-3 my-auto">Ultra Sound Type</label>
              <MultiOptionButtons
                className="ms-auto"
                onChange={(option) => setUST(option)}
                options={["All", "Non Nodule", "Nodule"]}
                value={UST}
              />
            </div>

            <div className="d-flex mt-3 mb-2">
              <label className="ms-3 my-auto">FNAC</label>
              <MultiOptionButtons
                className="ms-auto"
                onChange={(option) => setFNAC(option)}
                options={["All", "YES", "NO"]}
                value={FNAC}
              />
            </div>
          </>}

          {tab && tab === 'Breast' && <>
            <div className="d-flex mt-3 mb-2">
              <label className="ms-3 my-auto">Chief Complant</label>
              <MultiOptionButtons
                className="ms-auto"
                onChange={(options) => setComplant(options)}
                options={["Pain", "Mass", "Discharge"]}
                value={complant}
                multi
              />
            </div>

            <div className="d-flex mt-3 mb-2">
              <label className="ms-3 my-auto">Imaging</label>
              <MultiOptionButtons
                className="ms-auto"
                onChange={(option) => setImaging(option)}
                options={["All", "Ultra Sound", "Mammography", "None"]}
                value={imaging}
              />
            </div>
          </>}

          {tab && <>
            <div className="d-flex mt-3 mb-2">
              <label className="ms-3 my-auto">Plan</label>
              <MultiOptionButtons
                className="ms-auto"
                onChange={(option) => setPlan(option)}
                options={["All", "Surgery", "Follow Up"]}
                value={plan}
              />
            </div>

            {plan !== 'All' && <div className="d-flex mt-3 mb-2">
              <label className="ms-3 my-auto">Date</label>
              <div className="d-flex ms-auto" style={{width: '70%'}}>
                <label className="me-1 my-auto">Min</label>
                <input
                  className="form-control w-50"
                  type="date"
                  value={planDate.min}
                  onChange={(e) => setPlanDate((state) => { 
                    return {
                      ...state,
                      min: e.target.value
                    }
                  })}
                />

                <label className="ms-2 me-1 my-auto">Max</label>
                <input
                  className="form-control w-50"
                  type="date"
                  value={planDate.max}
                  onChange={(e) => setPlanDate((state) => { 
                    return {
                      ...state,
                      max: e.target.value
                    }
                  })}
                />
              </div>
            </div>}

            <div className="d-flex mt-3 mb-2">
              <label className="ms-3 my-auto">Record State</label>
              <MultiOptionButtons
                className="ms-auto"
                onChange={(option) => setState(option)}
                options={["All", "Done", "Pending", "Canceled"]}
                value={state}
              />
            </div>
          </>}

          <label className="mt-2 ms-2">Added By</label>
          <select className="form-select" value={user} onChange={(e) => setUser(e.target.value)}>
              <option value="All">All</option>
              {accounts.map((account) => (
                <option key={Math.random()} value={account.id}>{account.username}</option>
              ))}
          </select>
          <button className="btn btn-outline-warning px-4 mt-4 mx-auto d-flex" type="submit">Filter</button>
        </Form>
      </Modal>
    </>
  )
}

export default RecordFilter