import React, { useState, useEffect } from 'react'

import style from './Tabs.module.css';

const Tabs = ({tabs, tabNames, currentTab, className, small}) => {
  const [tab, setTab] = useState(tabs[0]);

  useEffect(() => {
    currentTab(tab);
  }, [tab])

  return (
    <div id={style.tabs} className={"d-flex justify-content-center " + className}>
      {tabs.map((tabName, index) =>
        <div id={tabName} key={tabName} className={(tabName === tabs[0] ? style.start : tabName === tabs[tabs.length - 1] ? style.end : '') + (tab === tabName ? ' ' + style.active : '') + (small ? ' ' + style.small : '')} onClick={(e) => setTab(e.target.id)}>{tabNames ? tabNames[index] : tabName}</div>
      )}
    </div>
  )
}

export default Tabs