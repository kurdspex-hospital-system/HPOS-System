import React, { useEffect } from "react";
import moment from "moment";
import useMoneyConverter from "../../hooks/useMoneyConverter";

import style from "./Receipt.module.css";

const Receipt = (props, ref) => {
  const moneyConverter = useMoneyConverter();

  useEffect(() => {
    let total = 0
    for(let data of props.data) {
      if(data.money_type === 'IQD') {
        total += data.record_money;
      } else {
        total += moneyConverter(data.record_money, 'IQD');
      }
    }

    props.setTotal(total)
  }, [props.data]);

  let top = 405;

  return (
    <div className="d-none">
      <div id={style.receipt} ref={ref} >
        <img className={style.img} src="/images/invoice.png" />
        <div className={style.date}>{moment(Date.now()).format("YYYY/MM/DD")}</div>
        <div className={style.name}>{props.client.client_name}</div>
        <div className={style.age}>{props.client.age}</div>
        <div className={style.tel}>{props.client.phoneNumber.replace(/(\d{4})(\d{3})(\d{4})/, "$1 $2 $3")}</div>
        <div className={style.total}><span className="mx-auto my-auto">{new Intl.NumberFormat().format(props.total) + ' IQD'}</span></div>
        {props.data.map((data) => {
          top += 44;
          return (
            <div key={Math.random()} className={style.data} style={{top: `${top}px`}}>
              <div className={style.price}><span className="mx-auto my-auto">{(data.money_type === 'IQD') ? (new Intl.NumberFormat().format(data.record_money) + ' IQD') : ('$' + new Intl.NumberFormat().format(data.record_money))}</span></div>
              <div className={style.record}><span className="mx-auto my-auto">{data.record_description}</span></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.forwardRef(Receipt);
