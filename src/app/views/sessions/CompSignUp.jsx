import React, { useState, useRef, useEffect } from "react";
import {
    Card,
    Grid,
    Button,
    CircularProgress
} from "@material-ui/core";
import PropTypes from "prop-types";
import { FormattedMessage } from 'react-intl';
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { loginWithEmailAndPassword, loading, success } from "../../redux/actions/LoginActions";
import ShowInfo from '../components/message';
import { useMutation, useQuery } from '@apollo/client';
import { SIGN_UP, GET_PUBLIC_KEY } from '../../../graphql/User';
import { encryptData } from '../../../utils';
import { manageMsg, checkError } from "../../../utils";
import ReturnServeur from "../components/ReturnServeur";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: "33.33%",
        flexShrink: 0
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary
    }
}));

const CompSignUp = (props) => {
    /* state = {
        username: "",
        email: "",
        password: "",
        agreement: ""
    }; */
    const classes = useStyles();
    const [expanded, setExpanded] = useState("panel1");
    const [names, setNames] = useState();
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const [repassword, setRepassword] = useState();
    const [email, setEmail] = useState();
    const [name_company, setName_company] = useState();
    const [phone_company1, setPhone_company1] = useState();
    const [phone_company2, setPhone_company2] = useState();
    const [email_company, setEmail_company] = useState();
    const [address, setAddress] = useState();
    const [variant, setVariant] = useState('error')
    const [info, setInfo] = useState(null)
    const [show, setShow] = useState(false)
    const [public_key, setPublicKey] = useState();


    const handleChangePanel = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleChange = event => {
        //console.log(event);
        event.persist();
        switch (event.target.name) {
            case "email":
                setEmail(event.target.value)
                break;
            case "names":
                setNames(event.target.value)
                break;
            case "phone":
                setPhone(event.target.value)
                break;
            case "password":
                setPassword(event.target.value)
                break;
            case "repassword":
                setRepassword(event.target.value)
                break;
            case "name_company":
                setName_company(event.target.value)
                break;
            case "phone_company1":
                setPhone_company1(event.target.value)
                break;
            case "phone_company2":
                setPhone_company2(event.target.value)
                break;
            case "email_company":
                setEmail_company(event.target.value)
                break;
            case "address":
                setAddress(event.target.value)
                break;


        }
        /* this.setState({
            [event.target.name]: event.target.value
        }); */
    };

    const { data, error } = useQuery(GET_PUBLIC_KEY, {
        onCompleted: (data) => {
            setPublicKey(data.getPublicKey)
        },
        onError: () => {
            setVariant("error");
            let msg = checkError(error)
            setInfo(<ReturnServeur info={msg} />);
            setShow(true);
            props.success();
        }
    });
    const [signup] = useMutation(SIGN_UP);
    const HandleFormSubmit = event => {
        event.preventDefault();

        //ShowInfo("success", "Validation testing")
        setShow(false);
        props.loading();
        signup({
            variables: {
                names: names,
                email: encryptData(email, public_key.toString()),
                password: encryptData(password, public_key.toString()),
                phone: phone,
                role: "OWNER",
                name_company: name_company,
                phone_company1: phone_company1,
                phone_company2: phone_company2,
                email_company: email_company,
                address: address
            }
        })
            .then((res) => {
                /* console.log("onCompleted");
                console.log(res.data.signup.user); */
                //delete res.data.signup.user.__typename;
                let user = res.data.signup.user
                let token = res.data.signup.token
                props.loginWithEmailAndPassword(user, token);
                setShow(false);
            })
            .catch((error) => {
                setVariant("error");
                let msg = checkError(error)
                setInfo(<ReturnServeur info={msg} />);
                setShow(true);
                props.success();
            })
    };
    const next = event => {
        //alert("ok");
        setExpanded("panel2");
    };
    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== password) {
                return false;
            }
            return true;
        });
        // Specify how to clean up after this effect:
        return function cleanup() {
            //ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
        };
    });
    /* render() { */
    //let { username, email, password } = this.state;
    return (

        <div className="signup flex justify-center h-full-screen">
            <ShowInfo
                show={show}
                info={info}
                variant={variant} />
            <div className="p-8">
                <Card className=" position-relative y-center">
                    <Grid container>
                        <Grid item lg={3} md={5} sm={5} xs={12}>
                            <div className="p-8 flex justify-center items-center h-full">
                                <img
                                    src="/assets/images/illustrations/LogoShipManCompagnie.png"
                                    alt=""
                                />
                            </div>
                        </Grid>
                        <Grid item lg={9} md={7} sm={7} xs={12}>
                            <div className="p-9 h-full">
                                <div className={classes.root}>
                                    <Accordion
                                        expanded={expanded === "panel1"}
                                        onChange={handleChangePanel("panel1")}
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                        >
                                            <Typography className={classes.heading}>
                                                <FormattedMessage
                                                    id="title.information"
                                                    defaultMessage="Your information"
                                                />
                                            </Typography>
                                            <Typography className={classes.secondaryHeading}>
                                                <FormattedMessage
                                                    id="title.putInformation"
                                                    defaultMessage="Put informations about you"
                                                />
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <ValidatorForm ref={useRef("form")} onSubmit={next}>
                                                <Grid container spacing={6}>
                                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                                        <TextValidator
                                                            className="mb-6 w-full"
                                                            variant="outlined"
                                                            label={
                                                                <FormattedMessage
                                                                    id="input.names.label"
                                                                    defaultMessage="Full name *"
                                                                />
                                                            }
                                                            onChange={handleChange}
                                                            type="text"
                                                            name="names"
                                                            value={names}
                                                            validators={["required"]}
                                                            errorMessages={[
                                                                <FormattedMessage
                                                                    id="input.required"
                                                                    defaultMessage="This field is required"
                                                                />]}
                                                        />
                                                        <TextValidator
                                                            className="mb-6 w-full"
                                                            variant="outlined"
                                                            label={
                                                                <FormattedMessage
                                                                    id="input.email.label"
                                                                    defaultMessage="Email *"
                                                                />
                                                            }
                                                            onChange={handleChange}
                                                            type="email"
                                                            name="email"
                                                            value={email}
                                                            validators={["required", "isEmail"]}
                                                            errorMessages={[
                                                                <FormattedMessage
                                                                    id="input.required"
                                                                    defaultMessage="This field is required"
                                                                />,
                                                                <FormattedMessage
                                                                    id="input.email.notValid"
                                                                    defaultMessage="Email is not valid"
                                                                />]}
                                                        />
                                                        <TextValidator
                                                            className="mb-6 w-full"
                                                            variant="outlined"
                                                            label={
                                                                <FormattedMessage
                                                                    id="input.phone.label"
                                                                    defaultMessage="Phone with code eg: +86......... *"
                                                                />
                                                            }
                                                            onChange={handleChange}
                                                            type="text"
                                                            name="phone"
                                                            value={phone}
                                                            validators={["required", 'matchRegexp:[^+][0-9]$']}
                                                            errorMessages={[
                                                                <FormattedMessage
                                                                    id="input.required"
                                                                    defaultMessage="This field is required"
                                                                />,
                                                                <FormattedMessage
                                                                    id="input.phone.notValid"
                                                                    defaultMessage="The number is not valid"
                                                                />
                                                            ]}
                                                        />
                                                    </Grid>
                                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                                        <TextValidator
                                                            className="mb-4 w-full"
                                                            label={
                                                                <FormattedMessage
                                                                    id="input.password.label"
                                                                    defaultMessage="Password"
                                                                />
                                                            }
                                                            variant="outlined"
                                                            onChange={handleChange}
                                                            name="password"
                                                            type="password"
                                                            value={password}
                                                            validators={["required"]}
                                                            errorMessages={[
                                                                <FormattedMessage
                                                                    id="input.required"
                                                                    defaultMessage="This field is required"
                                                                />
                                                            ]}
                                                        />
                                                        <TextValidator
                                                            className="mb-4 w-full"
                                                            label={
                                                                <FormattedMessage
                                                                    id="input.rePassword.label"
                                                                    defaultMessage="Rewrite Password *"
                                                                />
                                                            }
                                                            variant="outlined"
                                                            onChange={handleChange}
                                                            name="repassword"
                                                            type="password"
                                                            value={repassword}
                                                            validators={['isPasswordMatch', 'required']}
                                                            errorMessages={[
                                                                <FormattedMessage
                                                                    id="input.rePassword.mismatch"
                                                                    defaultMessage="Password mismatch"
                                                                />,
                                                                <FormattedMessage
                                                                    id="input.required"
                                                                    defaultMessage="This field is required"
                                                                />]}
                                                        />
                                                        {/* <FormControlLabel
                                                            className="mb-4"
                                                            name="agreement"
                                                            onChange={handleChange}
                                                            validators={["required"]}
                                                            control={<Checkbox />}
                                                            label="I have read and agree to the terms of service."
                                                        /> */}
                                                    </Grid>
                                                </Grid>

                                                <div className="flex items-center">
                                                    <Button
                                                        className="capitalize"
                                                        variant="contained"
                                                        color="primary"
                                                        type="submit"
                                                        disabled={props.login.loading}
                                                    >
                                                        <FormattedMessage
                                                            id="button.validate"
                                                            defaultMessage="Validate"
                                                        />

                                                    </Button>
                                                    <span className="mx-2 ml-5">
                                                        <FormattedMessage
                                                            id="or"
                                                            defaultMessage="Or"
                                                        />
                                                    </span>
                                                    <Button
                                                        className="capitalize"
                                                        disabled={props.login.loading}
                                                        onClick={() =>
                                                            props.history.push("/session/signin")
                                                        }
                                                    >
                                                        <FormattedMessage
                                                            id="button.loginSimple"
                                                            defaultMessage="Sign in"
                                                        />

                                                    </Button>
                                                </div>
                                            </ValidatorForm>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion
                                        expanded={expanded === "panel2"}
                                    //onChange={handleChangePanel("panel2")}
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2bh-content"
                                            id="panel2bh-header"
                                        >
                                            <Typography className={classes.heading}>
                                                <FormattedMessage
                                                    id="title.yourCompany"
                                                    defaultMessage="Your company"
                                                />
                                            </Typography>
                                            <Typography className={classes.secondaryHeading}>
                                                <FormattedMessage
                                                    id="title.putInformationCompany"
                                                    defaultMessage="Put informations about your company"
                                                />
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <ValidatorForm ref={useRef("form")} onSubmit={HandleFormSubmit}>
                                                <Grid container spacing={6}>
                                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                                        <TextValidator
                                                            className="mb-6 w-full"
                                                            variant="outlined"
                                                            //multiline
                                                            label={
                                                                <FormattedMessage
                                                                    id="input.name"
                                                                    defaultMessage="Name *"
                                                                />
                                                            }
                                                            onChange={handleChange}
                                                            type="text"
                                                            name="name_company"
                                                            value={name_company}
                                                            validators={["required"]}
                                                            errorMessages={[
                                                                <FormattedMessage
                                                                    id="input.required"
                                                                    defaultMessage="This field is required"
                                                                />
                                                            ]}
                                                        />
                                                        <TextValidator
                                                            className="mb-6 w-full"
                                                            variant="outlined"
                                                            label={
                                                                <FormattedMessage
                                                                    id="input.phone.label"
                                                                    defaultMessage="Phone with code eg: +86......... *"
                                                                />
                                                            }
                                                            onChange={handleChange}
                                                            type="text"
                                                            name="phone_company1"
                                                            value={phone_company1}
                                                            validators={["required", 'matchRegexp:[^+][0-9]$']}
                                                            errorMessages={[
                                                                <FormattedMessage
                                                                    id="input.required"
                                                                    defaultMessage="This field is required"
                                                                />,
                                                                <FormattedMessage
                                                                    id="input.phone.notValid"
                                                                    defaultMessage="The number is not valid"
                                                                />]}
                                                        />
                                                        <TextValidator
                                                            className="mb-6 w-full"
                                                            variant="outlined"
                                                            label={
                                                                <FormattedMessage
                                                                    id="input.phone.label2"
                                                                    defaultMessage="Phone with code eg: +86........."
                                                                />
                                                            }
                                                            onChange={handleChange}
                                                            type="text"
                                                            name="phone_company2"
                                                            value={phone_company2}
                                                            validators={['matchRegexp:[^+][0-9]$']}
                                                            errorMessages={[
                                                                <FormattedMessage
                                                                    id="input.phone.notValid"
                                                                    defaultMessage="The number is not valid"
                                                                />
                                                            ]}
                                                        />
                                                    </Grid>
                                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                                        <TextValidator
                                                            className="mb-6 w-full"
                                                            variant="outlined"
                                                            label={
                                                                <FormattedMessage
                                                                    id="input.email.label"
                                                                    defaultMessage="Email *"
                                                                />
                                                            }
                                                            onChange={handleChange}
                                                            type="email"
                                                            name="email_company"
                                                            value={email_company}
                                                            validators={["required", "isEmail"]}
                                                            errorMessages={[
                                                                <FormattedMessage
                                                                    id="input.required"
                                                                    defaultMessage="This field is required"
                                                                />,
                                                                <FormattedMessage
                                                                    id="input.email.notValid"
                                                                    defaultMessage="Email is not valid"
                                                                />]}
                                                        />
                                                        <TextValidator
                                                            className="mb-6 w-full"
                                                            variant="outlined"
                                                            label={
                                                                <FormattedMessage
                                                                    id="input.address"
                                                                    defaultMessage="Address *"
                                                                />
                                                            }
                                                            //multiline
                                                            onChange={handleChange}
                                                            type="text"
                                                            name="address"
                                                            value={address}
                                                            validators={["required"]}
                                                            errorMessages={[
                                                                <FormattedMessage
                                                                    id="input.required"
                                                                    defaultMessage="This field is required"
                                                                />
                                                            ]}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <div className="flex items-center">
                                                    <Button
                                                        className="capitalize"
                                                        variant="contained"
                                                        color="primary"
                                                        type="submit"
                                                        disabled={props.login.loading}
                                                    >
                                                        <FormattedMessage
                                                            id="button.signUp"
                                                            defaultMessage="Sign Up"
                                                        />
                                                        {props.login.loading && (
                                                            <CircularProgress
                                                                size={24}
                                                                color="secondary"
                                                                className={classes.buttonProgress}
                                                            />
                                                        )}
                                                    </Button>

                                                    <span className="mx-2 ml-5">
                                                        <FormattedMessage
                                                            id="or"
                                                            defaultMessage="Or"
                                                        />
                                                    </span>
                                                    <Button
                                                        className="capitalize"
                                                        disabled={props.login.loading}
                                                        onClick={() =>
                                                            props.history.push("/session/signin")
                                                        }
                                                    >
                                                        <FormattedMessage
                                                            id="button.loginSimple"
                                                            defaultMessage="Sign in"
                                                        />
                                                    </Button>
                                                </div>
                                            </ValidatorForm>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Card>
            </div>
        </div>
    );
    //}
}

const mapStateToProps = state => ({
    // setUser: PropTypes.func.isRequired
    loginWithEmailAndPassword: PropTypes.func.isRequired,
    loading: PropTypes.func.isRequired,
    login: state.login,
    success: PropTypes.func.isRequired
});

export default connect(mapStateToProps, { success, loading, loginWithEmailAndPassword })(CompSignUp);
