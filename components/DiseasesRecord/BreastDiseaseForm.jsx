import React, { useEffect } from "react";
import moment from "moment/moment";

import MultiOptionButtons from "../UI/MultiOptionButtons";

const BreastDiseaseForm = ({formData, dispatch, noEdit}) => {
  useEffect(() => {
    if (formData.data3 === "" || (formData.data3 && !formData.data3.type)) {
      dispatch({
        type: "setData3",
        data: { type: [], usData: [], mData: []},
      });
    }
  }, [formData.data3]);

  useEffect(() => {
    if (formData.data5 === "" || (formData.data5 && !formData.data5.type)) {
      dispatch({
        type: "setData5",
        data: { type: "Follow Up", data: "", state: 'Pending'},
      });
    }
  }, [formData.data5]);

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
        <label className="ms-3 my-auto">Chief Complant</label>
        <MultiOptionButtons
          className="ms-auto"
          onChange={(option) => dispatch({ type: "setData1", data: option })}
          options={["Pain", "Mass", "Discharge"]}
          value={formData.data1 && formData.data1.find ? formData.data1 : []}
          disabled={noEdit}
          multi
        />
      </div>

      <div className="form-floating mt-2">
        <textarea
          className="form-control"
          name="data2"
          placeholder="enter Examination And History Text"
          id="description"
          data-type='text'
          maxLength="1000"
          style={{ height: "100px" }}
          value={formData.data2}
          onChange={(e) => dispatch({ type: "setData2", data: e.target.value })}
          disabled={noEdit}
        ></textarea>
        <label htmlFor="description">Examination And History</label>
      </div>

      <div className="d-flex mt-3 mb-2">
        <label className="ms-3 my-auto">Imaging</label>
        <MultiOptionButtons
          className="ms-auto"
          onChange={(option) => setData({ type: option }, 'setData3', 'data3')}
          options={["Ultra Sound", "Mammography"]}
          value={formData.data3 && formData.data3.type ? formData.data3.type : []}
          disabled={noEdit}
          multi
        />
      </div>

      {formData.data3 && formData.data3.type.includes('Ultra Sound') && <div className="d-flex mt-2 mb-2">
        <label className="ms-3 my-auto">Ultra Sound Options</label>
        <MultiOptionButtons
          className="ms-auto"
          onChange={(option) => setData({ usData: option }, 'setData3', 'data3')}
          options={["Normal", "Mass", "Breast LN", "Collection"]}
          value={formData.data3 && formData.data3.usData && formData.data3.usData.length > 0 ? formData.data3.usData : []}
          disabled={noEdit}
          multi
        />
      </div>}

      {formData.data3 && formData.data3.type.includes('Mammography') && <div className="d-flex mt-2 mb-2">
        <label className="ms-3 my-auto">Mammography Options</label>
        <MultiOptionButtons
          className="ms-auto"
          onChange={(option) => setData({ mData: option }, 'setData3', 'data3')}
          options={["Normal", "Mass", "Breast LN", "Collection"]}
          value={formData.data3 && formData.data3.mData && formData.data3.mData.length > 0 ? formData.data3.mData : []}
          disabled={noEdit}
          multi
        />
      </div>}

      <div className="d-flex mt-3 mb-2">
        <label className="ms-3 my-auto">Plan</label>
        <MultiOptionButtons
          className="ms-3"
          onChange={(option) => setData({ type: option }, 'setData5', 'data5')}
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
            />
          </>
        )}
      </div>

      {formData.data5 && formData.data5.type === "Surgery" && <div className="form-floating">
        <textarea
          className="form-control"
          name="data2"
          placeholder="Indication Text"
          id="description"
          maxLength="1000"
          style={{ height: "100px" }}
          value={formData.data5.data}
          onChange={(e) => setData({ data: e.target.value }, 'setData5', 'data5')}
          disabled={noEdit}
        ></textarea>
        <label htmlFor="description">Indication</label>
      </div>}

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
}

export default BreastDiseaseForm