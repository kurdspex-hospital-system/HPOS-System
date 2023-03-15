import React from 'react';
import moment from 'moment/moment';

import DataShow from './DataShow';

import style from "./DiseasesPDF.module.css";

const DiseasesPDF = ({records, patient}, ref) => {
  return (
    <div className="d-none">
      <div className={style.page} style={{backgroundImage: `url("/images/${(records[0] && records[0].sub_category === 'Breast') ? 'HI3' : (records[0] && records[0].sub_category === 'Other') ? 'HI4' : 'HI2'}.png")`}} ref={ref}>
        {(patient && records && records.length && typeof records[0].data5 === 'object' && records[0].data5 !== null) && 
          <div className={`${records[0].sub_category === 'Breast' ? style.breast : records[0].sub_category === 'Other' ? style.other : ''}`}>
            <div className={style.title}>{records[0].sub_category}</div>

            <div className={'d-flex w-50 mt-3'} style={{marginLeft: '520px'}}>
              <DataShow title='Patient ID:' data={patient.patient_id} dataStyle={style.data}/>
              <DataShow title='Test ID::' data={records[0].id} dataStyle={style.data}/>
              <DataShow title='Test Date:' data={moment(records[0].publish_date).format("YYYY-MM-DD HH:mm")} dataStyle={style.data}/>
            </div>

            <div className={`${style.row} mt-5`}>
              <DataShow title='Patient Name:' data={patient.fullname} dataStyle={style.data}/>
              <DataShow title='Sex:' data={patient.sex} dataStyle={style.data}/>
              <DataShow title='Age:' data={patient.age} dataStyle={style.data}/>
              <DataShow title='Phone Number:' data={patient.phoneNumber.replace(/(\d{4})(\d{3})(\d{4})/, "$1 $2 $3")} dataStyle={style.data}/>
            </div>

            <div className={style.row}>
              <DataShow title='Main Address:' data={patient.main_address} dataStyle={style.data}/>
              <DataShow title='Past Surgical:' data={patient.past_surgical} dataStyle={style.data}/>
              <DataShow title='Drug History:' data={patient.drug_history} dataStyle={style.data}/>
            </div>

            <div className='ms-5 mt-5 h6 my-auto'>Past Medical: </div>
            <div className={`ms-5 ${style.data}`} style={{width: '1015px'}}>{patient.past_medical}</div>

            {records[0].sub_category === 'Thyroid' && <>
              <DataShow className={`${style.row} mt-5 ms-5`} title='Thyroid State:' data={records[0].data1} dataStyle={style.data}/>

              <div className={`${style.row} mt-5`}>
                <DataShow title='New TSH:' data={records[0].data2.tsh} dataStyle={style.data}/>
                <DataShow title='New AntiTSH:' data={records[0].data2.trab} dataStyle={style.data}/>
                <DataShow title='New AntiTPO:' data={records[0].data2.antiTPO} dataStyle={style.data}/>
                <DataShow title='New Free T4:' data={records[0].data2.freeT4} dataStyle={style.data}/>
                <DataShow title='New Free T3:' data={records[0].data2.freeT3} dataStyle={style.data}/>
                <DataShow title='New STG:' data={records[0].data2.STG} dataStyle={style.data}/>
              </div>

              {(records && records[1]) && <div className={`${style.row} mt-5`}>
                <DataShow title='Last TSH:' data={records[1].data2.tsh} dataStyle={style.data}/>
                <DataShow title='Last AntiTSH:' data={records[1].data2.trab} dataStyle={style.data}/>
                <DataShow title='Last AntiTPO:' data={records[1].data2.antiTPO} dataStyle={style.data}/>
                <DataShow title='Last Free T4:' data={records[1].data2.freeT4} dataStyle={style.data}/>
                <DataShow title='Last Free T3:' data={records[1].data2.freeT3} dataStyle={style.data}/>
                <DataShow title='Last STG:' data={records[1].data2.STG} dataStyle={style.data}/>
              </div>}

              <div className={`${style.row} mt-5`}>
                <DataShow title='Ultra Sound Type:' data={records[0].data3.type} dataStyle={style.data}/>
                {records[0].data3.type === 'Nodule' && <>
                  {records[0].data3.data.length > 0 && <>
                    <div className='ms-3 h6 my-auto'>Options: </div>
                    {records[0].data3.data.map((data) => <div key={data} className={`ms-2 ${style.data}`}>{data}</div>)}
                  </>}
                  <DataShow title='Size of Large Nodule:' data={records[0].data3.size} dataStyle={style.data}/>
                </>}
                <DataShow title='FNAC:' data={records[0].data3.fnac} dataStyle={style.data}/>
              </div>

              {records[0].data3.notes && records[0].data3.notes.length > 0 && <>
                <div className='ms-5 mt-2 mb-1 h6 my-auto'>Notes: </div>
                <div className={`ms-5 ${style.data}`} style={{width: '1015px'}}>{records[0].data3.notes}</div>
              </>}

              <div className={`${style.row}`}>
                <div className={`${style.row} flex-wrap`}>
                  <div className='ms-5 h6 my-auto mt-2'>Drug: </div>
                  {records[0].data4.drug.map((data, i) => <div key={data} className={`ms-4 mt-3 ${style.data}`}>{`${data} | Dose: ${records[0].data4.dose[data.toLowerCase()]}`}</div>)}
                </div>
              </div>

              {/* <div className={`${style.row} mt-4`}>
                {records[0].data4.drug.includes('Thyroxine') && <DataShow className={`${style.row} w-25 ms-3`} title='Thyroxine Dose:' data={records[0].data4.dose.thyroxine} dataStyle={style.data}/>}
                {records[0].data4.drug.includes('Thiamazele') && <DataShow className={`${style.row} w-25 ms-3`} title='Thiamazele Dose:' data={records[0].data4.dose.thiamazele} dataStyle={style.data}/>}
                {records[0].data4.drug.includes('Inderal') && <DataShow className={`${style.row} w-25 ms-3`} title='Inderal Dose:' data={records[0].data4.dose.inderal} dataStyle={style.data}/>}
                {records[0].data4.drug.includes('Propythioaracil') && <DataShow className={`${style.row} w-25 ms-3`} title='Propythioaracil Dose:' data={records[0].data4.dose.propythioaracil} dataStyle={style.data}/>}
              </div> */}

              <div className={`${style.row} mt-4 ms-5`}>
                <DataShow className='w-50 mx-1' title='Plan:' data={records[0].data5.type} dataStyle={style.data}/>
                <DataShow className='w-50 mx-1' title='Plan Date:' data={moment(records[0].data5.date).format("YYYY-MM-DD HH:mm")} dataStyle={style.data}/>
              </div>

              {records[0].data5.type && records[0].data5.type === 'Surgery' &&<>
                <div className={`${style.row} mt-5 ms-5`}>
                  <DataShow className='w-25 mx-1' title='Indication:' data={records[0].data5.category} dataStyle={style.data}/>

                  {records[0].data5.category &&  records[0].data5.category === 'Nodular' && <>
                    <div className='d-flex w-50'>
                      <div className='me-2 h6 my-auto'>Indication: </div>
                      {records[0].data5.subCategory.map((data) => <div key={data} className={`ms-4 ${style.data}`}>{data}</div>)}
                    </div>

                    {records[0].data5.subCategory.includes('Large Nodule') && <DataShow className='w-25' title='Size of Large Nodule:' data={records[0].data3.size} dataStyle={style.data}/>}
                  </>}
                </div>

                <div className={`${style.row} mt-5 ms-5`}>
                  <DataShow className='ms-0' title='Surgery Type:' data={records[0].data5.option} dataStyle={style.data}/>
                </div>
              </>}
            </>}

            {records[0].sub_category === 'Breast' && records[0].data3.type && <>
              <div className={`${style.row} mt-5`}>
                <div className='ms-5 h6 my-auto'>Chief Complant: </div>
                {records[0].data1.map((data) => <div key={data} className={`ms-4 ${style.data}`}>{data}</div>)}
              </div>

              <div className='ms-5 mt-5 mb-1 h6 my-auto'>Examination And History: </div>
              <div className={`ms-5 ${style.data}`} style={{width: '1015px'}}>{records[0].data2}</div>

              <div className={`${style.row} mt-4`}>
                <div className='ms-5 h6 my-auto'>Imaging: </div>
                {records[0].data3.type.map((data) => <div key={data} className={`ms-4 ${style.data}`}>{data}</div>)}
              </div>

              {records[0].data3.type.includes('Ultra Sound') && <div className={`${style.row} mt-4`}>
                <div className='ms-5 h6 my-auto'>Ultra Sound Options: </div>
                {records[0].data3.usData.map((data) => <div key={data} className={`ms-4 ${style.data}`}>{data}</div>)}
              </div>}

              {records[0].data3.type.includes('Mammography') && <div className={`${style.row} mt-4`}>
                <div className='ms-5 h6 my-auto'>Mammography Options: </div>
                {records[0].data3.mData.map((data) => <div key={data} className={`ms-4 ${style.data}`}>{data}</div>)}
              </div>}
            </>}

            {records[0].sub_category === 'Other' && <>
              <div className='ms-5 mt-5 mb-1 h6 my-auto'>Chief Complant: </div>
              <div className={`ms-5 ${style.data}`} style={{width: '1015px'}}>{records[0].data1}</div>

              <div className='ms-5 mt-5 mb-1 h6 my-auto'>Treatment: </div>
              <div className={`ms-5 ${style.data}`} style={{width: '1015px'}}>{records[0].data2}</div>
            </>}

            {(records[0].sub_category === 'Other' || records[0].sub_category === 'Breast') && <>
              <div className={`${style.row} w-50 mt-5 mx-auto`}>
                <DataShow className='w-50 mx-1' title='Plan:' data={records[0].data5.type} dataStyle={style.data}/>
                <DataShow className='w-50 mx-1' title='Plan Date:' data={moment(records[0].data5.date).format("YYYY-MM-DD HH:mm")} dataStyle={style.data}/>
              </div>

              {records[0].data5.type !== 'Follow Up' && <>
                <div className='ms-5 mt-3 mb-1 h6 my-auto'>Surgery Description: </div>
                <div className={`ms-5 ${style.data}`} style={{width: '1015px'}}>{records[0].data5.data}</div>
              </>}
            </>}

            {records[0].descriptions.length > 0 && <>
              <div className='ms-5 mt-5 mb-1 h6 my-auto'>Notes: </div>
              <div className={`ms-5 ${style.data}`} style={{width: '1015px'}}>{records[0].descriptions}</div>
            </>}
          </div>
        }
      </div>
    </div>
  )
}

export default React.forwardRef(DiseasesPDF);