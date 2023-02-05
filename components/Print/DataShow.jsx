import React from 'react'

const DataShow = ({className, title, data, dataStyle}) => {
  return (
    <div className={`d-flex mx-auto ${className}`}>
        <div className='me-2 h6 my-auto'>{title}</div>
        <div className={dataStyle}>{data}</div>
    </div>
  )
}

export default DataShow