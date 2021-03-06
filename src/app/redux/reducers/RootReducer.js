import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import UserReducer from "./UserReducer";
import LayoutReducer from "./LayoutReducer";
import ScrumBoardReducer from "./ScrumBoardReducer";
import NotificationReducer from "./NotificationReducer";
import EcommerceReducer from "./EcommerceReducer";
import NavigationReducer from "./NavigationReducer";
import CompanyReducer from "./CompanyReducer";
import RateReducer from "./RateReducer";
import OrderReducer from "./OrderReducer";
import EmployeesReducer from './EmployeesReducer'
import LanguageReducer from './LanguageReducer'
const RootReducer = combineReducers({
  order: OrderReducer,
  rate: RateReducer,
  login: LoginReducer,
  company: CompanyReducer,
  user: UserReducer,
  layout: LayoutReducer,
  scrumboard: ScrumBoardReducer,
  notification: NotificationReducer,
  ecommerce: EcommerceReducer,
  navigations: NavigationReducer,
  employees: EmployeesReducer,
  language: LanguageReducer
});

export default RootReducer;
