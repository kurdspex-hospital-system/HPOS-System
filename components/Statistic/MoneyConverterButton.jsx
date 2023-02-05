import React, {useState, useEffect} from 'react'

import FloatingButton from '../UI/FloatingButton';

const MoneyConverterButton = (props) => {
  const [moneyType, setMoneyType] = useState('IQD');

  useEffect(() => {
    props.getMoneyType(moneyType);
  }, [moneyType]);

  const convertMoneyTypeHandler = () => {
    if (moneyType === "USD") {
      setMoneyType("IQD");
    } else {
      setMoneyType("USD");
    }
  };

  return (
    <FloatingButton src="/icons/Logo.svg" bottom={props.bottom} onClick={convertMoneyTypeHandler} />
  )
}

export default MoneyConverterButton;