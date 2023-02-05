import React from 'react'

const UserAccessTypes = () => {
  return (
    <>
      <option value="SuperAdmin">Super Admin</option>
      <option value="Admin">Admin</option>
      <option value="InventoryAccess">Inventory Access</option>
      <option value="receptionAccess">Reception Access</option>
      <option value="Disabled">Disabled</option>
    </>
  )
}

export default UserAccessTypes