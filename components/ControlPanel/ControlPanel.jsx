import React from 'react'
import { useRouter } from 'next/router'

import PageLayout from '../Layout/PageLayout'
import IconButton from '../UI/IconButton'

const ControlPanel = () => {
  const router = useRouter();

  const userManegerClickHandler = () => {
    router.push('/accountManager');
  }

  const recycleBinClickHandler = () => {
    router.push('/controlPanel/recycleBinPage');
  }

  const updateHistoryClickHandler = () => {
    router.push('/controlPanel/updateHistoryPage');
  }

  const backupClickHandler = () => {
    router.push('/controlPanel/backupPage');
  }

  return (
    <PageLayout>
      <div className='row mt-5 align-items-center'>
        <div className='col-3 d-flex'>
          <IconButton className='mx-auto' src='/icons/manage_accounts.svg' text='Account Manager' color='blue' onClick={userManegerClickHandler} />
        </div>
        <div className='col-3 d-flex'>
          <IconButton className='mx-auto' src='/icons/auto_delete.svg' text='Recycle Bin' color='red' onClick={recycleBinClickHandler} />
        </div>
        {/* <div className='col-3 d-flex'>
          <IconButton className='mx-auto' src='/icons/update_white.svg' text='Update History' color='green' onClick={updateHistoryClickHandler} />
        </div> */}
        <div className='col-3 d-flex'>
          <IconButton className='mx-auto' src='/icons/backup.svg' text='System Backup' color='gold' onClick={backupClickHandler} />
        </div>
      </div>
    </PageLayout>
  )
}

export default ControlPanel