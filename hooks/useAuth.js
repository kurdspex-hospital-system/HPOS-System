import { useSession } from 'next-auth/react'

const useAuth = () => {
  const {data, status} =  useSession();
  const role = (data) ? data.user.name.access : null;

  return {
    status,
    data,
    id: (data) ? data.user.name.id : null,
    isAuthorized: data ? true : false,
    isSuperAdmin: data && role === 'SuperAdmin',
    isAdmin: data && (role === 'Admin' || role === 'SuperAdmin'),
    isInventoryAccess: data && (role === 'InventoryAccess' || role === 'Admin' || role === 'SuperAdmin'),
    isReceptionAccess: data && (role === 'receptionAccess' || role === 'Admin' || role === 'SuperAdmin'),
    isDisabled: data && role === 'Disabled'
  }
}

export default useAuth