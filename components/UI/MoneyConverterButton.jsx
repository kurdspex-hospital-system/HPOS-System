import React, {useState, useEffect} from 'react'
import { updateUsdValue } from "../../store/money-slice";
import { useDispatch } from "react-redux";

import FloatingButton from './FloatingButton';

const MoneyConverterButton = (props) => {
  const [moneyType, setMoneyType] = useState('Diff');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateUsdValue());
  }, []);

  useEffect(() => {
    props.getMoneyType(moneyType);
  }, [moneyType]);

  const convertMoneyTypeHandler = () => {
    if (moneyType === "Diff") {
      setMoneyType("IQD");
    } else if (moneyType === "IQD") {
      setMoneyType("USD");
    } else {
      setMoneyType("Diff");
    }
  };

  return (
    <FloatingButton src="/icons/Logo.svg" bottom={props.bottom} onClick={convertMoneyTypeHandler} />
  )
}

export default MoneyConverterButton