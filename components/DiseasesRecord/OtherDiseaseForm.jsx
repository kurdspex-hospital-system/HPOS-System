import React, { useEffect } from "react";
import moment from "moment/moment";

import MultiOptionButtons from "../UI/MultiOptionButtons";

const OtherDiseaseForm = ({ formData, dispatch, noEdit }) => {
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
      <div className="form-floating mt-2">
        <textarea
          className="form-control"
          name="data1"
          placeholder="Chief Complant Text"
          id="description"
          data-type="text"
          maxLength="1000"
          style={{ height: "200px" }}
          value={formData.data1}
          onChange={(e) => dispatch({ type: "setData1", data: e.target.value })}
          disabled={noEdit}
        ></textarea>
        <label htmlFor="description">Chief Complant</label>
      </div>

      <div className="form-floating mt-2">
        <textarea
          className="form-control"
          name="data2"
          placeholder="Treatment Text"
          id="description"
          maxLength="1000"
          style={{ height: "100px" }}
          value={formData.data2}
          onChange={(e) => dispatch({ type: "setData2", data: e.target.value })}
          disabled={noEdit}
        ></textarea>
        <label htmlFor="description">Treatment</label>
      </div>

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
              value={moment(formData.plan_date).format('YYYY-MM-DD')}
              onChange={(e) => dispatch({ type: "setPlanDate", data: e.target.value })}
              disabled={noEdit}
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
};

export default OtherDiseaseForm;
