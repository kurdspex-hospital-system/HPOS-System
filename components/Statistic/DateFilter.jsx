import React, { useState, useEffect } from "react";

import Form from "../UI/Form";

import style from "./DateFilter.module.css";

const DateFilter = (props) => {
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [mode, setMode] = useState("all");
  const [period, setPeriod] = useState("thisMonth");

  const [minDate2, setMinDate2] = useState("");
  const [maxDate2, setMaxDate2] = useState("");
  const [period2, setPeriod2] = useState("lastMonth");

  useEffect(() => {
    props.onSubmitData({minDate, maxDate, mode, period, minDate2, maxDate2, period2})
  }, [mode, period, period2])

  const onSubmit = () => {
    props.onSubmitData({minDate, maxDate, mode, period, minDate2, maxDate2, period2})
  }

  return (
    <>
      <div id={style.filter} className="d-flex mx-auto justify-content-center mt-3">
        <button id={mode === 'all' ? style.active : ''} className="btn btn-light mx-2" onClick={() => setMode('all')}>All</button>
        <button id={mode === 'period' ? style.active : ''} className="btn btn-light mx-2" onClick={() => setMode('period')}>Period</button>
        <button id={mode === 'custom' ? style.active : ''} className="btn btn-light mx-2" onClick={() => setMode('custom')}>Custom</button>
        <button id={mode === 'versus' ? style.active : ''} className="btn btn-light mx-2 d-none d-sm-block" onClick={() => setMode('versus')}>Versus</button>
      </div>

      {mode === 'period' && <div id={style.filter} className="d-flex mx-auto justify-content-center mt-4">
        <button id={period === 'today' ? style.active : ''} className="btn btn-light mx-2" onClick={() => setPeriod('today')}>Today</button>
        <button id={period === 'lastWeek' ? style.active : ''} className="btn btn-light mx-2" onClick={() => setPeriod('lastWeek')}>Last 7 Days</button>
        <button id={period === 'thisMonth' ? style.active : ''} className="btn btn-light mx-2" onClick={() => setPeriod('thisMonth')}>This Month</button>
        <button id={period === 'thisYear' ? style.active : ''} className="btn btn-light mx-2 d-none d-sm-block" onClick={() => setPeriod('thisYear')}>This Year</button>
        <button id={period === 'lastMonth' ? style.active : ''} className="btn btn-light mx-2 d-none d-sm-block" onClick={() => setPeriod('lastMonth')}>Last Month</button>
        <button id={period === 'lastYear' ? style.active : ''} className="btn btn-light mx-2 d-none d-sm-block" onClick={() => setPeriod('lastYear')}>Last Year</button>
      </div>}

      {mode === 'custom' && <Form id={style.form} className="d-flex mt-4 justify-content-center" onSubmit={onSubmit}>
        <label className="mx-3 my-auto"> From </label>
        <input className="my-auto" type="date" value={minDate} onChange={(e) => setMinDate(e.target.value)} />
        <label className="mx-3 my-auto"> To </label>
        <input className="my-auto" type="date" value={maxDate} onChange={(e) => setMaxDate(e.target.value)} />
        <button className="btn btn-outline-warning ms-3 px-4" type="submit">Search</button>
      </Form>}

      {mode === 'versus' && <div className="row mt-4 justify-content-around">
        <div className="col-5">
            <div id={style.filter} className="d-flex mx-auto justify-content-center mt-4">
                <button id={period === 'thisMonth' ? style.active : ''} className="btn btn-light mx-2" onClick={() => setPeriod('thisMonth')}>This Month</button>
                <button id={period === 'thisYear' ? style.active : ''} className="btn btn-light mx-2" onClick={() => setPeriod('thisYear')}>This Year</button>
                <button id={period === 'custom' ? style.active : ''} className="btn btn-light mx-2" onClick={() => setPeriod('custom')}>Custom</button>
            </div>
            {period === 'custom' && <Form id={style.form} className="d-flex mt-4 justify-content-center" onSubmit={onSubmit}>
                <label className="mx-3 my-auto"> From </label>
                <input className="my-auto" type="date" value={minDate} onChange={(e) => setMinDate(e.target.value)} />
                <label className="mx-3 my-auto"> To </label>
                <input className="my-auto" type="date" value={maxDate} onChange={(e) => setMaxDate(e.target.value)} />
                <button className="btn btn-outline-warning ms-3 px-4" type="submit">Search</button>
            </Form>}
        </div>

        <div className="col-5">
            <div id={style.filter} className="d-flex mx-auto justify-content-center mt-4">
                <button id={period2 === 'lastMonth' ? style.active : ''} className="btn btn-light mx-2" onClick={() => setPeriod2('lastMonth')}>Last Month</button>
                <button id={period2 === 'lastYear' ? style.active : ''} className="btn btn-light mx-2" onClick={() => setPeriod2('lastYear')}>Last Year</button>
                <button id={period2 === 'custom' ? style.active : ''} className="btn btn-light mx-2" onClick={() => setPeriod2('custom')}>Custom</button>
            </div>
            {period2 === 'custom' && <Form id={style.form} className="d-flex mt-4 justify-content-center" onSubmit={onSubmit}>
                <label className="mx-3 my-auto"> From </label>
                <input className="my-auto" type="date" value={minDate2} onChange={(e) => setMinDate2(e.target.value)} />
                <label className="mx-3 my-auto"> To </label>
                <input className="my-auto" type="date" value={maxDate2} onChange={(e) => setMaxDate2(e.target.value)} />
                <button className="btn btn-outline-warning ms-3 px-4" type="submit">Search</button>
            </Form>}
        </div>
      </div>}
    </>
  );
};

export default DateFilter;
