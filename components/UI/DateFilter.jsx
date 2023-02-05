import React, { useEffect, useState } from "react";
import moment from "moment/moment";

import MultiOptionButtons from "../UI/MultiOptionButtons";

const DateFilter = ({className, defaultMode, defaultOption, onChange}) => {
  const [mode, setMode] = useState(defaultMode || "Periods");
  const [option, setOption] = useState();

  useEffect(() => {
    switch(mode) {
      case 'All': 
        setOption("All");
        onChange({min: null, max: null}); 
      break;

      case 'Periods': setOption(defaultOption || "Today"); break;
      case 'Date': setOption(moment(Date.now()).format('YYYY-MM-DD')); break;
      case 'Custom': setOption({min: moment(Date.now()).format('YYYY-MM-DD'), max: moment(Date.now()).format('YYYY-MM-DD')}); break;
      case 'Over Time': 
        setOption("Pending");
        onChange({min: null, max: null}, 'Pending');
      break;
    }
  }, [mode])

  useEffect(() => {
    if(option && mode !== 'All') {
      switch(mode) {
        case 'Periods': setPeriods(); break;

        case 'Date': onChange({
          min: option, 
          max: option
        }); break;

        case 'Custom': onChange({
          min: option.min, 
          max: option.max
        }); break;
      }
    }
  }, [option]);

  const setPeriods = () => {
    switch(option) {
      case 'Today': onChange({
        min: moment(Date.now()).format('YYYY-MM-DD'), 
        max: moment(Date.now()).format('YYYY-MM-DD')
      }); break;

      case 'Tomorrow': onChange({
        min: moment(Date.now()).add(1, 'd').format('YYYY-MM-DD'),
        max: moment(Date.now()).add(1, 'd').format('YYYY-MM-DD')
      }); break;

      case 'The Next 7 Days': onChange({
        min: moment(Date.now()).add(1, 'd').format('YYYY-MM-DD'), 
        max: moment(Date.now()).add(8, 'd').format('YYYY-MM-DD')
      }); break;

      case 'This Month': onChange({
        min: moment(Date.now()).format('YYYY-MM') + '-1', 
        max: moment(Date.now()).add(1, 'M').format('YYYY-MM') + '-1'
      }); break;

      case 'Next Month': onChange({
        min: moment(Date.now()).add(1, 'M').format('YYYY-MM') + '-1', 
        max: moment(Date.now()).add(2, 'M').format('YYYY-MM') + '-1'
      }); break;
    }
  }

  return (
    <div className={className}>
      <MultiOptionButtons 
        className='mb-3'
        options={["Over Time", "Periods", "Date", "Custom", "All"]}
        value={mode}
        onChange={setMode}
      />

      {mode === 'Periods' && <MultiOptionButtons 
        className='mb-3'
        options={["Today", "Tomorrow", "The Next 7 Days", "This Month", "Next Month"]}
        value={option}
        onChange={setOption}
      />}

      {mode === 'Date' && <div className="d-flex mb-3">
        <input className="mx-auto px-3 py-2" style={{borderRadius: '13px'}} type="date" value={option} onChange={(e) => setOption(e.target.value)}/>
      </div>}

      {mode === 'Custom' && <div className="d-flex mb-3">
        <div className="d-flex mx-auto ">
          <label className="me-3 my-auto text-light display-6"> From </label>
          <input className="my-auto px-3 py-2" style={{borderRadius: '13px'}} type="date" value={option.min} onChange={(e) => setOption((state) => {
            return {...state, min: e.target.value}
          })}/>

          <label className="mx-3 my-auto text-light display-6"> To </label>
          <input className="my-auto px-3 py-2" style={{borderRadius: '13px'}} type="date" value={option.max} onChange={(e) => setOption((state) => {
            return {...state, max: e.target.value}
          })}/>
        </div>
      </div>}
    </div>
  )
}

export default DateFilter