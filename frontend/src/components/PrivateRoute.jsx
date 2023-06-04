import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth)
  return userInfo ? <Outlet /> : <Navigate to="/" replace />
}

export default PrivateRoute
