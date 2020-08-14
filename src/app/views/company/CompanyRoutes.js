import React from "react";
import { authRoles } from "../../auth/authRoles";
import Info from "./Info";
import Rate from "./Rate";
import CU_Rate from "./CU_Rate";

const companyRoutes = [
    {
        path: "/company/info",
        component: Info,
        auth: authRoles.admin
    },
    {
        path: "/company/rate",
        component: Rate,
        auth: authRoles.admin
    },
    {
        path: "/company/action_rate",
        component: CU_Rate,
        auth: authRoles.admin
    }
];

export default companyRoutes;