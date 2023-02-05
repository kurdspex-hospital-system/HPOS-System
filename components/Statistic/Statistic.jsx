import React, { useEffect, useState } from "react";
import { useGetRequest } from "../../hooks/useRequest";

import PageLayout from '../Layout/PageLayout'
import Loading from "../UI/Loading";
import MoneyConverterButton from "./MoneyConverterButton";
import DateFilter from "./DateFilter";
import NormalStatistic from "./NormalStatistic";
import VersusStatistic from "./VersusStatistic";
import Panel from "../UI/Panel";
import Tabs from "../UI/Tabs";

const Statistic = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isUpdate, setIsUpdate] = useState(true);
  const [moneyType, setMoneyType] = useState('IQD');
  const [params, setParams] = useState({});
  const [mode, setMode] = useState('');
  const [tab, setTab] = useState('All')

  const getData = useGetRequest();

  useEffect(() => {
    if(isUpdate) {
      setIsUpdate(false);
      getData('/api/record/statistic', {params}, (data) => {
        if(params.mode !== 'versus') {
          data.income = modifyObject(data.income);
          data.clientsData.clients = modifyObject(data.clientsData.clients);
          data.genderData.male = modifyObject(data.genderData.male);
          data.genderData.female = modifyObject(data.genderData.female);
          data.genderDataCount.male = modifyObject(data.genderDataCount.male);
          data.genderDataCount.female = modifyObject(data.genderDataCount.female);
        } else {
          data.records1.income = modifyObject(data.records1.income);
          data.records1.clientsData.clients = modifyObject(data.records1.clientsData.clients);
          data.records1.genderData.male = modifyObject(data.records1.genderData.male);
          data.records1.genderData.female = modifyObject(data.records1.genderData.female);
          data.records1.genderDataCount.male = modifyObject(data.records1.genderDataCount.male);
          data.records1.genderDataCount.female = modifyObject(data.records1.genderDataCount.female);

          data.records2.income = modifyObject(data.records2.income);
          data.records2.clientsData.clients = modifyObject(data.records2.clientsData.clients);
          data.records2.genderData.male = modifyObject(data.records2.genderData.male);
          data.records2.genderData.female = modifyObject(data.records2.genderData.female);
          data.records2.genderDataCount.male = modifyObject(data.records2.genderDataCount.male);
          data.records2.genderDataCount.female = modifyObject(data.records2.genderDataCount.female);
        }

        setData(data);
        setLoading(false);
      });
    }
  }, [isUpdate]);

  const modifyObject = (data) => {
    let newData = {};

    const keysData = Object.keys(data);
    const valueData = Object.values(data);
    const sortedValueData = Object.values(data).sort((a, b) => b-a);

    for(let i = 0; i < sortedValueData.length; i++) {
      if(i < 8) {
        const keyIndex = valueData.findIndex((value) => value === sortedValueData[i]);
        const key = keysData[keyIndex];
        valueData[keyIndex] = 0;
        
        newData[key] = sortedValueData[i];
      } else {
        newData['Other'] = (newData['Other']) ? newData['Other'] + sortedValueData[i] : sortedValueData[i];
      }
    }

    return newData;
  }

  const onSubmitData = (params) => {
    setParams(params);
    setMode(params.mode)
    setIsUpdate(true);
    setLoading(true);
  }

  const onTabChangeHandler = (tab) => {
    setTab(tab);
    setIsUpdate(true);
  }

  return (
    <PageLayout>
      <MoneyConverterButton bottom="15" getMoneyType={(type) => setMoneyType(type)} />
      <Tabs className='mt-0 mb-4' tabs={['All', 'General', 'Client']} currentTab={onTabChangeHandler} small/>
      <DateFilter onSubmitData={onSubmitData}/>

      {!loading &&<>
        {mode !== 'versus' && <NormalStatistic data={data} moneyType={moneyType} tab={tab}/>}
        {mode === 'versus' && <div className="row mt-3 justify-content-around">
          <Panel className='col-5'>
            <VersusStatistic data={data.records1} moneyType={moneyType} tab={tab}/>
          </Panel>

          <Panel className='col-5'>
            <VersusStatistic data={data.records2} moneyType={moneyType} tab={tab}/>
          </Panel>
        </div>}
      </>}

      {loading && <Loading />}
    </PageLayout>
  )
}

export default Statistic