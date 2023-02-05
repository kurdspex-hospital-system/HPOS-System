import React from 'react'
import { useRouter } from 'next/router'

const DashbordPage = () => {
  const router = useRouter();

  router.push(`/records`);

  return (
    <>
    </>
  )
}

export default DashbordPage
