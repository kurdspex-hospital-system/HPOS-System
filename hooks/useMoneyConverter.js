import { useSelector } from "react-redux";

const useMoneyConverter = () => {
  const money = useSelector((state) => state.money);

  return (value, convertTo) => {
    if(convertTo === 'IQD') {
      return value * money.usdValue; 
    } 
    
    else if(convertTo === 'USD') {
      return value / money.usdValue;
    }

    return 0;
  }
};

export default useMoneyConverter;
