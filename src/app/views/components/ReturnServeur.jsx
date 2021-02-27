import React from 'react'
import { FormattedMessage } from 'react-intl';

const ReturnServeur = (props) => {

    const messages = (info, code) => {
        switch (info) {
            case "Not authenticated":
            case "jwt expired":
            case "TokenExpiredError: jwt expired":
                //console.log(info);
                //window.location.reload()
                return (<FormattedMessage
                    id="error.session"
                    defaultMessage="Oups your session is expired, please you should re-connect your account. THANKS"
                />)
                break;
            case "ERROR IN SERVER":
                return (<FormattedMessage
                    id="error.serveur"
                    defaultMessage="Oups your session is expired, please you should re-connect your account. THANKS"
                />)
                break;
            case "PWD_SUCCESS":
                return (<FormattedMessage
                    id="result.PWD_SUCCESS"
                    defaultMessage="Password updated !"
                />)
                break;
            case "PWD_WRONG":
                return (<FormattedMessage
                    id="result.PWD_WRONG"
                    defaultMessage="Wrong password , verify your password"
                />)
                break;
            case "PROFILE_UPDATED":
                return (<FormattedMessage
                    id="result.PROFILE_UPDATED"
                    defaultMessage="Profile updated !"
                />)
                break;
            case "COMPANY_EXIST":
                return (<FormattedMessage
                    id="error.COMPANY_EXIST"
                    defaultMessage="A company exist already with this informations"
                />)
                break;
            case "USER_EXIST":
            case "Error: USER_EXIST":
                return (
                    <FormattedMessage
                        id="error.USER_EXIST"
                        defaultMessage="Sorry, a user use already this email"
                    />
                )
                break;
            case "LOGIN_FAILLED":
            case "USER_NOT_FIND":
                return <FormattedMessage
                    id="error.login"
                    defaultMessage="Invalid email or password"
                />
                break;
            case "ACCOUNT_CLOSED":
                return <FormattedMessage
                    id="error.ACCOUNT_CLOSED"
                    defaultMessage="Account closed, contact your Manager"
                />
                break;
            case "PACKAGE_ADDED":
                return <FormattedMessage
                    id="result.PACKAGE_ADDED"
                    defaultMessage="Package added"
                />
                break;
            case "POSITION_ADDED":
                return <FormattedMessage
                    id="result.POSITION_ADDED"
                    defaultMessage="Position updated"
                />
                break;
            case "PRICE_ADDED":
                return <FormattedMessage
                    id="result.PRICE_ADDED"
                    defaultMessage="Position updated"
                />
                break;
            case "PACKAGE_DELETED":
                return <FormattedMessage
                    id="result.PACKAGE_DELETED"
                    defaultMessage="Package deleted"
                />
                break;
            case "NOT_ALLOW":
                return <FormattedMessage
                    id="error.NOT_ALLOW"
                    defaultMessage="Sorry you can\'t apply this request"
                />
                break;
            case "NOT_ALLOW_COMPANY_MODIFY_COMPANY":
                return <FormattedMessage
                    id="error.NOT_ALLOW_COMPANY_MODIFY_COMPANY"
                    defaultMessage="Sorry you can\'t apply this request now, wait to receive the goods"
                />
                break
            case "ROLE_ADDED":
                return <FormattedMessage
                    id="result.ROLE_ADDED"
                    defaultMessage="Role added"
                />
                break;
            case "EMPOYEE_EXIST":
                return <FormattedMessage
                    id="error.EMPOYEE_EXIST"
                    defaultMessage="Please check carefully if you have information that will belongs to another account. Thanks"
                />
                break;
            case "EMPLOYEE_CREATED":
                return <FormattedMessage
                    id="result.EMPLOYEE_CREATED"
                    defaultMessage="Employee created"
                />
                break;
            case "EMPLOYEE_DELETED":
                return <FormattedMessage
                    id="result.EMPLOYEE_DELETED"
                    defaultMessage="Employee deleted"
                />
                break;
            case "COMPANY_NOT_AVAILABLE":
                return <FormattedMessage
                    id="error.COMPANY_NOT_AVAILABLE"
                    defaultMessage="Oups ! sorry this company is not available, please choose another company. THANKS"
                />
                break;
            case "COMPANY_NOT_EXIST":
                return <FormattedMessage
                    id="error.COMPANY_NOT_EXIST"
                    defaultMessage="Oups ! sorry this company is not available, please choose another company. THANKS"
                />
                break;
            case "INFO_NOT_ENOUGH":
                return <FormattedMessage
                    id="info.INFO_NOT_ENOUGH"
                    defaultMessage="Please enter all the required informations"
                />
                break;
            case "NOT_ALLOW_CONTACT_COMPANY":
                return <FormattedMessage
                    id="error.NOT_ALLOW_CONTACT_COMPANY"
                    defaultMessage="Sorry, you're not allow to do this request. Contact the company."
                />
                break;
            case "STAND BY":
                return (<FormattedMessage
                    id="title.standBy"
                    defaultMessage="Stand By"
                />)
                break;
            case "RECEIVED":
                return (<FormattedMessage
                    id="title.received"
                    defaultMessage="Received"
                />)
                break;
            case "IN TRANSIT":
                return (<FormattedMessage
                    id="title.inTransit"
                    defaultMessage="In Transit"
                />)
                break;
            case "ARRIVED":
                return (<FormattedMessage
                    id="title.arrived"
                    defaultMessage="Arrived"
                />)
                break;
            case "READY FOR PICKUP":
                return (<FormattedMessage
                    id="title.readyForPickUp"
                    defaultMessage="Ready For Pick Up"
                />)
                break;
            case "SIGNED":
                return (<FormattedMessage
                    id="title.signed"
                    defaultMessage="Signed"
                />)
                break;
            case "Dashboard":
                return (<FormattedMessage
                    id="Dashboard"
                    defaultMessage="Dashboard"
                />)
                break;
            case "Company":
                return (<FormattedMessage
                    id="Company"
                    defaultMessage="Company"
                />)
                break;
            case "Package":
                return (<FormattedMessage
                    id="Package"
                    defaultMessage="Package"
                />)
                break;
            case "Info":
                return (<FormattedMessage
                    id="Info"
                    defaultMessage="Info"
                />)
                break;
            case "Team":
                return (<FormattedMessage
                    id="Team"
                    defaultMessage="Team"
                />)
                break;
            default:
                return <FormattedMessage
                    id="error.default"
                    defaultMessage="Be sure you have connection, if yes so please contact us to resolve this problem ASAP . Thanks for your understanding"
                />
                break;
        }
    }
    return (messages(props.info))
}

export default ReturnServeur;