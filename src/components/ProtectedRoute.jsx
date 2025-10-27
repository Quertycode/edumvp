import { Navigate } from 'react-router-dom'
import { getCurrentUser } from '../utils/userStore'
export default function ProtectedRoute({roles=[],children}){
  const user=getCurrentUser(); if(!user) return <Navigate to='/login' replace/>;
  if(roles.length && !roles.includes(user.role)) return <Navigate to='/' replace/>;
  return children;
}