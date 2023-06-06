import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
import useAuth from "../hooks/useAuth";

const PrivateWrapper = ({ allowedRoles }: { allowedRoles: string[] }) => {


    const { user } = useAppSelector(state => state.auth)

    return allowedRoles.includes(user?.role)
         ? <Outlet/>
         : <Navigate to={"/login"} />

};

export default PrivateWrapper;
