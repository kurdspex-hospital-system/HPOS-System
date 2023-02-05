import React from 'react'

import style from './MainLayout.module.css';

const MainLayout = (props) => {
  return (
    <div id={style.page}>
        {props.children}
    </div>
  )
}

export default MainLayout