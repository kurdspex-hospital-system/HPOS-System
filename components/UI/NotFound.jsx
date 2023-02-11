import React from 'react'

import style from './NotFound.module.css'

const NotFound = () => {
  return (
    <div className={style.page}>
        <div className='text-center display-2'>404</div>
        <div className='text-center display-3'>Not Found</div>
    </div>
  )
}

export default NotFound