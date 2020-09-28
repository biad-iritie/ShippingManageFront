import { authRoles } from "../../auth/authRoles";
import NewOrder from "./NewOrder";
import ListOrder from "./ListOrder";
import DetailOrder from './DetailOrder';
const orderRoutes = [
    {
        path: "/order/add_order",
        component: NewOrder,
        auth: authRoles.guest
    },
    {
        path: "/order/list_order",
        component: ListOrder,
        auth: authRoles.guest
    },
    {
        path: "/order/detail_order",
        component: DetailOrder,
        //auth: authRoles.guest
    },
];

export default orderRoutes;