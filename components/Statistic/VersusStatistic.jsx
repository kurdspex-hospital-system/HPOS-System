import React from 'react'

import DataBord from "./DataBord";
import DoughnutChart from './DoughnutChart'

const VersusStatistic = (props) => {
  return (
    <>
      {(props.tab === 'All' || props.tab === 'General') && <>
        <DataBord className='my-auto' text= 'Total Company Money' moneyType={props.moneyType} totalMoney={props.data.total.money} usdValue={props.data.usdValue}/>
        <DoughnutChart className='mx-auto' data={Object.values(props.data.general)} moneyType={props.moneyType} usdValue={props.data.usdValue} labels={Object.keys(props.data.general)} />

        <DataBord text='Total Incomes' moneyType={props.moneyType} totalMoney={props.data.total.income} usdValue={props.data.usdValue}/>
        <DoughnutChart className='mx-auto' data={Object.values(props.data.income)} moneyType={props.moneyType} usdValue={props.data.usdValue} labels={Object.keys(props.data.income)} />

        <DataBord text='Total Expenses' moneyType={props.moneyType} totalMoney={props.data.total.expense} usdValue={props.data.usdValue}/>
        <DoughnutChart className='mx-auto' data={Object.values(props.data.expense)} moneyType={props.moneyType} usdValue={props.data.usdValue} labels={Object.keys(props.data.expense)} />

        <DataBord text='Male Clients' moneyType={props.moneyType} totalMoney={props.data.clientsData.gender.Male} usdValue={props.data.usdValue}/>
        <DoughnutChart className='mx-auto d-none d-sm-block' data={Object.values(props.data.genderData.male)} moneyType={props.moneyType} usdValue={props.data.usdValue} labels={Object.keys(props.data.genderData.male)} />

        <DataBord text='Female Clients' moneyType={props.moneyType} totalMoney={props.data.clientsData.gender.Female} usdValue={props.data.usdValue}/>
        <DoughnutChart className='mx-auto d-none d-sm-block' data={Object.values(props.data.genderData.female)} moneyType={props.moneyType} usdValue={props.data.usdValue} labels={Object.keys(props.data.genderData.female)} />

        <div className="text-light text-center display-6 mt-3">Male Operations</div>
        <div className="text-light text-center display-4">{props.data.genderDataCount.totalMale}</div>
        <DoughnutChart className='mx-auto d-none d-sm-block' data={Object.values(props.data.genderDataCount.male)} labels={Object.keys(props.data.genderDataCount.male)} />

        <div className="text-light text-center display-6 mt-3">Female Operations</div>
        <div className="text-light text-center display-4">{props.data.genderDataCount.totalFemale}</div>
        <DoughnutChart className='mx-auto d-none d-sm-block' data={Object.values(props.data.genderDataCount.female)} labels={Object.keys(props.data.genderDataCount.female)} />
      </>}

      {(props.tab === 'All' || props.tab === 'Client') && <>
        <div className="text-light text-center display-6 mt-3">Clients</div>
        <DoughnutChart className='mx-auto' data={Object.values(props.data.clientsData.clients)} moneyType={props.moneyType} usdValue={props.data.usdValue} labels={Object.keys(props.data.clientsData.clients)} />

        <div className="text-light text-center display-6 mt-3">Clients Gender</div>
        <DoughnutChart className='mx-auto' data={Object.values(props.data.clientsData.gender)} moneyType={props.moneyType} usdValue={props.data.usdValue} labels={Object.keys(props.data.clientsData.gender)} />
      </>}
    </>
  )
}

export default VersusStatistic