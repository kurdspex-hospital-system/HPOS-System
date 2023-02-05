import React from 'react'

import style from './MultiOptionButtons.module.css';

const MultiOptionButtons = ({value, onChange, options, className, multi, disabled}) => {
    const onClick = (e) => {
      if(!disabled) {
        if(multi) {
          if(value.findIndex((option) => option === e.target.textContent) !== -1) {
            onChange(value.filter((option) => e.target.textContent !== option))
          } else {
            onChange([...value, e.target.textContent])
          }
        } else {
          onChange(e.target.textContent)
        }
      }
    }
  
    return (
      <div id={style.options} className={"d-flex justify-content-center " + className}>
        {options.map((option) =>
          <div key={option} className={multi ? (value.findIndex((v) => v === option) !== -1 ? style.active : '') : (value === option ? style.active : '')} onClick={onClick}>{option}</div>
        )}
      </div>
    )
}

export default MultiOptionButtons;