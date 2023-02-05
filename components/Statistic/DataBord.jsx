import React from 'react'

import style from './DataBord.module.css';

const DataBord = (props) => {
  return (
    <div id={style.text} className={props.className}>
        <h4 className='text-light text-center mt-3'>{props.text}</h4>
        <div className='text-light text-center mb-4 display-2'>
          {props.moneyType === 'USD' && <span className="display-2">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(props.totalMoney / props.usdValue)}</span>}
          {props.moneyType === 'IQD' && <span className="display-2">{new Intl.NumberFormat().format(props.totalMoney)} IQD</span>}
        </div>
    </div>
  )
}

export default DataBord;