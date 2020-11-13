import { authRoles } from "../../auth/authRoles";
import Info from "./Info";
import Rate from "./Rate";
import CU_Rate from "./CU_Rate";
import Employees from './Employees';
import CU_Employees from './CU_Employees';

const companyRoutes = [
    {
        path: "/company/info",
        component: Info,
        auth: authRoles.admin
    },
    {
        path: "/company/rate",
        component: Rate,
        auth: authRoles.editor
    },
    {
        path: "/company/action_rate",
        component: CU_Rate,
        auth: authRoles.admin
    },
    {
        path: "/company/employees",
        component: Employees,
        auth: authRoles.admin
    },
    {
        path: "/company/cu_employees",
        component: CU_Employees,
        auth: authRoles.guest
    }
];

export default companyRoutes;