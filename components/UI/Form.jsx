import React from "react";

import style from "./Form.module.css";

const Form = (props) => {
  const onSubmitData = (e) => {
    e.preventDefault();
    props.onSubmit({
        data: e.target,
        errorStyle: style.error
    });
  };

  const className = style.form + ' ' + props.className;

  return (
    <form id={props.id} className={className} onSubmit={onSubmitData}>
      {props.children}
    </form>
  );
};

export default Form;
