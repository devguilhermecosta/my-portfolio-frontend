import { ReactNode } from "react";
import { useContext } from "react";
import { AuthContext } from "../authContext";
import { Navigate } from "react-router-dom";

interface PrivateProps {
  children: ReactNode
}

type RouterData = ReactNode

export default function PrivateRoute({ children }: PrivateProps ): RouterData {
  const { userTokens } = useContext(AuthContext);

  return !userTokens ? <Navigate to='/admin/login'/> : children
}