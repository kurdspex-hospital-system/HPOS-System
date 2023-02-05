import React from 'react'

import DataBord from "./DataBord";
import DoughnutChart from './DoughnutChart'
import Panel from "../UI/Panel";

const NormalStatistic = (props) => {
  return (
    <>
      {(props.tab === 'All' || props.tab === 'General') && <>
        <Panel className="mt-5">
          <DataBord className='col-lg-6 my-auto mx-auto' text= 'Total Company Money' moneyType={props.moneyType} totalMoney={props.data.total.money} usdValue={props.data.usdValue}/>
          <DoughnutChart className='col-lg-6 mx-auto d-none d-sm-block' data={Object.values(props.data.general)} moneyType={props.moneyType} usdValue={props.data.usdValue} labels={Object.keys(props.data.general)} />
          <DoughnutChart className='col-lg-6 mx-auto d-sm-none' data={Object.values(props.data.general)} moneyType={props.moneyType} usdValue={props.data.usdValue} labels={Object.keys(props.data.general)} noLegend/>
        </Panel>

        <Panel className="mt-5">
          <div className="col-lg-6">
            <DataBord text='Total Incomes' moneyType={props.moneyType} totalMoney={props.data.total.income} usdValue={props.data.usdValue}/>
            <DoughnutChart className='mx-auto d-none d-sm-block' data={Object.values(props.data.income)} moneyType={props.moneyType} usdValue={props.data.usdValue} labels={Object.keys(props.data.income)} />
            <DoughnutChart className='mx-auto d-sm-none' data={Object.values(props.data.income)} moneyType={props.moneyType} usdValue={props.data.usdValue} labels={Object.keys(props.data.income)} noLegend/>
          </div>

          <div className="col-lg-6">
            <DataBord text='Total Expenses' moneyType={props.moneyType} totalMoney={props.data.total.expense} usdValue={props.data.usdValue}/>
            <DoughnutChart className='mx-auto d-none d-sm-block' data={Object.values(props.data.expense)} moneyType={props.moneyType} usdValue={props.data.usdValue} labels={Object.keys(props.data.expense)} />
            <DoughnutChart className='mx-auto d-sm-none' data={Object.values(props.data.expense)} moneyType={props.moneyType} usdValue={props.data.usdValue} labels={Object.keys(props.data.expense)} noLegend/>
          </div>
        </Panel>

        <Panel className="mt-5">
          <div className="col-lg-6">
            <DataBord text='Male Clients' moneyType={props.moneyType} totalMoney={props.data.clientsData.gender.Male} usdValue={props.data.usdValue}/>
            <DoughnutChart className='mx-auto d-none d-sm-block' data={Object.values(props.data.genderData.male)} moneyType={props.moneyType} usdValue={props.data.usdValue} labels={Object.keys(props.data.genderData.male)} />
            <DoughnutChart className='mx-auto d-sm-none' data={Object.values(props.data.genderData.male)} moneyType={props.moneyType} usdValue={props.data.usdValue} labels={Object.keys(props.data.genderData.male)} noLegend/>
          </div>

          <div className="col-lg-6">
            <DataBord text='Female Clients' moneyType={props.moneyType} totalMoney={props.data.clientsData.gender.Female} usdValue={props.data.usdValue}/>
            <DoughnutChart className='mx-auto d-none d-sm-block' data={Object.values(props.data.genderData.female)} moneyType={props.moneyType} usdValue={props.data.usdValue} labels={Object.keys(props.data.genderData.female)} />
            <DoughnutChart className='mx-auto d-sm-none' data={Object.values(props.data.genderData.female)} moneyType={props.moneyType} usdValue={props.data.usdValue} labels={Object.keys(props.data.genderData.female)} noLegend/>
          </div>
        </Panel>

        <Panel className="mt-5">
          <div className="col-lg-6">
            <div className="text-light text-center display-6">Male Operations</div>
            <div className="text-light text-center display-4">{props.data.genderDataCount.totalMale}</div>
            <DoughnutChart className='mx-auto d-none d-sm-block' data={Object.values(props.data.genderDataCount.male)} labels={Object.keys(props.data.genderDataCount.male)} />
            <DoughnutChart className='mx-auto d-sm-none' data={Object.values(props.data.genderDataCount.male)} labels={Object.keys(props.data.genderDataCount.male)} noLegend/>
          </div>

          <div className="col-lg-6">
            <div className="text-light text-center display-6">Female Operations</div>
            <div className="text-light text-center display-4">{props.data.genderDataCount.totalFemale}</div>
            <DoughnutChart className='mx-auto d-none d-sm-block' data={Object.values(props.data.genderDataCount.female)} labels={Object.keys(props.data.genderDataCount.female)} />
            <DoughnutChart className='mx-auto d-sm-none' data={Object.values(props.data.genderDataCount.female)} labels={Object.keys(props.data.genderDataCount.female)} noLegend/>
          </div>
        </Panel>
      </>}

      {(props.tab === 'All' || props.tab === 'Client') && <>
        <Panel className="mt-5">
          <div className="col-lg-6">
            <div className="text-light text-center display-6">Clients</div>
            <DoughnutChart className='mx-auto d-none d-sm-block' data={Object.values(props.data.clientsData.clients)} moneyType={props.moneyType} usdValue={props.data.usdValue} labels={Object.keys(props.data.clientsData.clients)} />
            <DoughnutChart className='mx-auto d-sm-none' data={Object.values(props.data.clientsData.clients)} moneyType={props.moneyType} usdValue={props.data.usdValue} labels={Object.keys(props.data.clientsData.clients)} noLegend/>
          </div>

          <div className="col-lg-6">
            <div className="text-light text-center display-6">Clients Gender</div>
            <DoughnutChart className='mx-auto d-none d-sm-block' data={Object.values(props.data.clientsData.gender)} moneyType={props.moneyType} usdValue={props.data.usdValue} labels={Object.keys(props.data.clientsData.gender)} />
            <DoughnutChart className='mx-auto d-sm-none' data={Object.values(props.data.clientsData.gender)} moneyType={props.moneyType} usdValue={props.data.usdValue} labels={Object.keys(props.data.clientsData.gender)} noLegend/>
          </div>
        </Panel>
      </>}
    </>
  )
}

export default NormalStatistic