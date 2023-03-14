import React, { useEffect } from "react";
import moment from "moment/moment";

import MultiOptionButtons from "../UI/MultiOptionButtons";

const ThyroidDiseaseForm = ({ formData, dispatch, noEdit }) => {
  useEffect(() => {
    if (!formData.data1) {
      dispatch({ type: "setData1", data: "Euthyroid" });
    }

    if (!formData.data2) {
      dispatch({ type: "setData2", data: {
        tsh: '',
        trab: '',
        antiTPO: '',
        freeT4: '',
        freeT3: '',
        STG: ''
      }});
    }

    if (!formData.data3) {
      dispatch({ type: "setData3", data: {
        type: 'Normal',
        data: [],
        size: '',
        fnac: 'NO',
        notes: ''
      }});
    }

    if (!formData.data4) {
      dispatch({ type: "setData4", data: {
        drug: [],
        dose: {
          thyroxine: '', 
          thiamazole: '',
          inderal: '', 
          propylthiouracil: '',
          carbimazole: ''
        }
      }});
    }

    if (!formData.data5) {
      dispatch({ type: "setData5", data: {
        type: 'Follow Up',
        category: [],
        subCategory: [],
        option: 'Lobecdomy',
        size: '',
        state: 'Pending'
      }});
    }
  }, [formData]);

  const setData = (obj, type, data) => {
    dispatch({
      type,
      data: {
        ...formData[data],
        ...obj,
      },
    });
  };

  return (
    <>
      <div className="d-flex mt-3 mb-2">
        <label className="ms-3 my-auto">Thyroid State</label>
        <MultiOptionButtons
          className="ms-auto"
          onChange={(option) => dispatch({ type: "setData1", data: option })}
          options={["Euthyroid", "Hypothyroid", "Hyperthyroid"]}
          value={formData.data1}
          disabled={noEdit}
        />
      </div>

      <label className="my-2 h4">Thyroid Function Tests (TFT)</label>
      <div className="d-flex">
        <div className="">
          <label className="ms-1 me-2 my-auto">TSH</label>
          <input className="form-control" type="number" style={{width: '113px'}} step='0.01' value={formData.data2.tsh ? formData.data2.tsh : ''} onChange={(e) => setData({tsh: e.target.value}, "setData2", "data2")} disabled={noEdit}/>
        </div>

        <div className="ms-3">
          <label className="ms-1 me-2 my-auto">AntiTSH</label>
          <input className="form-control" type="number" style={{width: '113px'}} step='0.01' value={formData.data2.trab ? formData.data2.trab : ''} onChange={(e) => setData({trab: e.target.value}, "setData2", "data2")} disabled={noEdit}/>
        </div>

        <div className="ms-3">
          <label className="ms-1 me-2 my-auto">AntiTPO</label>
          <input className="form-control" type="number" style={{width: '113px'}} step='0.01' value={formData.data2.antiTPO ? formData.data2.antiTPO : ''} onChange={(e) => setData({antiTPO: e.target.value}, "setData2", "data2")} disabled={noEdit}/>
        </div>

        <div className="ms-3">
          <label className="ms-1 me-2 my-auto">Free T4</label>
          <input className="form-control" type="number" style={{width: '113px'}} step='0.01' value={formData.data2.freeT4 ? formData.data2.freeT4 : ''} onChange={(e) => setData({freeT4: e.target.value}, "setData2", "data2")} disabled={noEdit}/>
        </div>

        <div className="ms-3">
          <label className="ms-1 me-2 my-auto">Free T3</label>
          <input className="form-control" type="number" style={{width: '113px'}} step='0.01' value={formData.data2.freeT3 ? formData.data2.freeT3 : ''} onChange={(e) => setData({freeT3: e.target.value}, "setData2", "data2")} disabled={noEdit}/>
        </div>

        <div className="ms-3">
          <label className="ms-1 me-2 my-auto">STG</label>
          <input className="form-control" type="number" style={{width: '113px'}} step='0.01' value={formData.data2.STG ? formData.data2.STG : ''} onChange={(e) => setData({STG: e.target.value}, "setData2", "data2")} disabled={noEdit}/>
        </div>
      </div>

      <label className="mb-1 mt-4 h4">Ultra Sound</label>
      <div className="d-flex">
        <label className="ms-3 my-auto">Type</label>
        <MultiOptionButtons
          className="ms-auto"
          onChange={(option) => setData({type: option}, "setData3", "data3")}
          options={["Normal", "Nodule"]}
          value={formData.data3.type}
          disabled={noEdit}
        />
      </div>

      {formData.data3.type === "Nodule" && <>
        <div className="d-flex mt-2">
          <label className="ms-3 my-auto">{formData.data3.type} Options</label>
          <MultiOptionButtons
            className="ms-auto"
            onChange={(option) => setData({data: option}, "setData3", "data3")}
            options={["RSE", "Pressure On Trachea"]}
            value={formData.data3 && formData.data3.data ? formData.data3.data : []}
            disabled={noEdit}
            multi
          />
        </div>

        <div className="d-flex mt-2">
          <label className="ms-3 my-auto">Size of Large Nodule</label>
          <input
            className="form-control w-75 ms-3"
            name="state"
            type="text"
            value={formData.data3.size}
            onChange={(e) => setData({size: e.target.value}, "setData3", "data3")}
            disabled={noEdit}
          />
        </div>
      </>}

      <div className="d-flex mt-2">
        <label className="ms-3 my-auto">FNAC</label>
        <MultiOptionButtons
          className="ms-auto"
          onChange={(option) => setData({fnac: option}, "setData3", "data3")}
          options={["YES", "NO"]}
          value={formData.data3.fnac}
          disabled={noEdit}
        />
      </div>

      <div className="form-floating mt-2">
        <textarea className="form-control" style={{height: '100px'}} name="descriptions" placeholder="description text" id="description" maxLength="200" value={formData.data3.notes ? formData.data3.notes: ''} onChange={(e) => setData({notes: e.target.value}, "setData3", "data3")} disabled={noEdit}></textarea>
        <label htmlFor="description">FNAC Notes</label>
      </div>

      <label className="mb-1 mt-4 h4">Treatment</label>
      <div className="d-flex">
        <label className="ms-3 my-auto">Drug</label>
        <MultiOptionButtons
          className="ms-auto"
          onChange={(option) => setData({drug: option}, "setData4", "data4")}
          options={["Thyroxine", "Thiamazole", "Inderal", "Propylthiouracil", "Carbimazole"]}
          value={formData.data4.drug && formData.data4.drug.find ? formData.data4.drug : []}
          disabled={noEdit}
          multi
        />
      </div>

      {formData.data4.drug && formData.data4.drug.includes('Thyroxine') && <div className="d-flex mt-2">
        <label className="ms-3 my-auto w-25">Thyroxine Dose</label>
        <input
          className="form-control w-75 ms-3"
          name="state"
          type="text"
          value={formData.data4.dose.thyroxine}
          onChange={(e) => setData({dose: {...formData.data4.dose, thyroxine: e.target.value}}, "setData4", "data4")}
          disabled={noEdit}
        />
      </div>}

      {formData.data4.drug && formData.data4.drug.includes('Thiamazole') && <div className="d-flex mt-2">
        <label className="ms-3 my-auto w-25">Thiamazole Dose</label>
        <input
          className="form-control w-75 ms-3"
          name="state"
          type="text"
          value={formData.data4.dose.thiamazole}
          onChange={(e) => setData({dose: {...formData.data4.dose, thiamazole: e.target.value}}, "setData4", "data4")}
          disabled={noEdit}
        />
      </div>}

      {formData.data4.drug && formData.data4.drug.includes('Inderal') && <div className="d-flex mt-2">
        <label className="ms-3 my-auto w-25">Inderal Dose</label>
        <input
          className="form-control w-75 ms-3"
          name="state"
          type="text"
          value={formData.data4.dose.inderal}
          onChange={(e) => setData({dose: {...formData.data4.dose, inderal: e.target.value}}, "setData4", "data4")}
          disabled={noEdit}
        />
      </div>}

      {formData.data4.drug && formData.data4.drug.includes('Propylthiouracil') && <div className="d-flex mt-2">
        <label className="ms-3 my-auto w-25">Propylthiouracil Dose</label>
        <input
          className="form-control w-75 ms-3"
          name="state"
          type="text"
          value={formData.data4.dose.propylthiouracil}
          onChange={(e) => setData({dose: {...formData.data4.dose, propylthiouracil: e.target.value}}, "setData4", "data4")}
          disabled={noEdit}
        />
      </div>}

      {formData.data4.drug && formData.data4.drug.includes('Carbimazole') && <div className="d-flex mt-2">
        <label className="ms-3 my-auto w-25">Carbimazole Dose</label>
        <input
          className="form-control w-75 ms-3"
          name="state"
          type="text"
          value={formData.data4.dose.carbimazole}
          onChange={(e) => setData({dose: {...formData.data4.dose, carbimazole: e.target.value}}, "setData4", "data4")}
          disabled={noEdit}
        />
      </div>}

      <label className="mb-1 mt-4 h4">Plan Options</label>
      <div className="d-flex mt-3 mb-2">
        <label className="ms-3 my-auto">Plan</label>
        <MultiOptionButtons
          className="ms-3"
          onChange={(option) => setData({type: option}, "setData5", "data5")}
          options={["Surgery", "Follow Up"]}
          value={formData.data5 ? formData.data5.type : ""}
          disabled={noEdit}
        />
        {formData.data5 && (formData.data5.type === "Surgery" || formData.data5.type === "Follow Up") && (
          <>
            <input
              className="form-control w-50 ms-auto"
              type="date"
              name="plan_date"
              data-type="text"
              value={formData.plan_date ? moment(formData.plan_date).format('YYYY-MM-DD') : ''}
              onChange={(e) => dispatch({ type: "setPlanDate", data: e.target.value })}
              disabled={noEdit}
            />
          </>
        )}
      </div>

      {formData.data5.type &&  formData.data5.type === 'Surgery' && <>
        <div className="d-flex mt-2 mb-2">
          <label className="ms-3 my-auto">Indication</label>
          <MultiOptionButtons
            className="ms-auto"
            onChange={(option) => setData({category: option}, "setData5", "data5")}
            options={["Nodular", "Hyperthyrodism Uncontrolled"]}
            value={formData.data5 && formData.data5.category && formData.data5.category.length ? formData.data5.category : []}
            disabled={noEdit}
            multi
          />
        </div>

        {formData.data5.category && formData.data5.category.includes('Nodular') && <div className="d-flex mt-2 mb-2">
          <label className="ms-3 my-auto">Indication</label>
          <MultiOptionButtons
            className="ms-auto"
            onChange={(option) => setData({subCategory: option}, "setData5", "data5")}
            options={["Large Nodule", "RSE", "Pressure On Trachea", "Suspicians Nodule"]}
            value={formData.data5 && formData.data5.subCategory ? formData.data5.subCategory : []}
            disabled={noEdit}
            multi
          />
        </div>}

        {formData.data5.category && formData.data5.category.includes('Nodular') && formData.data5.subCategory.includes('Large Nodule') && 
          <div className="d-flex mt-2">
            <label className="ms-3 my-auto">Size of Large Nodule</label>
            <input
              className="form-control w-75 ms-3"
              name="state"
              type="text"
              value={formData.data5.size}
              onChange={(e) => setData({size: e.target.value}, "setData5", "data5")}
              disabled={noEdit}
            />
          </div>
        }

        <div className="d-flex mt-2 mb-2">
          <label className="ms-3 my-auto">Surgery Type</label>
          <MultiOptionButtons
            className="ms-auto"
            onChange={(option) => setData({option}, "setData5", "data5")}
            options={["Lobecdomy", "Total Thyroidectomy"]}
            value={formData.data5 ? formData.data5.option : ""}
            disabled={noEdit}
          />
        </div>
      </>}

      <div className="d-flex mt-3 mb-2">
        <label className="ms-3 my-auto">Record State</label>
        <MultiOptionButtons
          className="ms-3"
          onChange={(option) => setData({ state: option }, 'setData5', 'data5')}
          options={["Done", "Pending", "Canceled"]}
          value={formData.data5 ? formData.data5.state : ""}
          disabled={noEdit}
        />
      </div>
    </>
  );
};

export default ThyroidDiseaseForm;
