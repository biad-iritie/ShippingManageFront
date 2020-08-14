import React, { useState, useRef, useEffect } from "react";
import {
    Card,
    Grid,
    Button,
    CircularProgress
} from "@material-ui/core";
import PropTypes from "prop-types";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { loginWithEmailAndPassword, loading, error } from "../../redux/actions/LoginActions";
import ShowInfo from '../message/message';
import { useMutation } from '@apollo/client';
import { SIGN_UP } from '../../../graphql/User';

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
    const [names, setNames] = useState("Biad Boss");
    const [phone, setPhone] = useState("+13872112262");
    const [password, setPassword] = useState("admin");
    const [repassword, setRepassword] = useState("admin");
    const [email, setEmail] = useState("biad@bs.com");
    const [name_company, setName_company] = useState("Biad Ship");
    const [phone_company1, setPhone_company1] = useState("+13872112263");
    const [phone_company2, setPhone_company2] = useState("+22507203382");
    const [email_company, setEmail_company] = useState("biad@sh.com");
    const [address, setAddress] = useState("石港区社区工作管理委员会 湖北省黄石市黄石港区磁湖路11号 湖北师范大学 22栋 303号");
    const [variant, setVariant] = useState('error')
    const [info, setInfo] = useState(null)
    const [show, setShow] = useState(false)



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
    const [signup] = useMutation(SIGN_UP);
    const HandleFormSubmit = event => {
        event.preventDefault();

        //ShowInfo("success", "Validation testing")
        setShow(false);
        props.loading();
        signup({
            variables: {
                names: names, email: email, password: password, phone: phone,
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
                console.log("onError");
                console.log(error);
                setVariant("error");
                if (error.networkError) {
                    setInfo("Please try after this action");
                }
                if (error.graphQLErrors)
                    error.graphQLErrors.map(({ message, locations, path }) =>
                        setInfo(message)
                    );
                //setInfo(error);
                setShow(true);
                props.error()
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

        <div className="signup flex justify-center w-full h-full-screen">
            <ShowInfo
                show={show}
                info={info}
                variant={variant} />
            <div className="p-8">
                <Card className=" position-relative y-center">
                    <Grid container>
                        <Grid item lg={3} md={5} sm={5} xs={12}>
                            <div className="p-8 flex justify-center bg-light-gray items-center h-full">
                                <img
                                    src="/assets/images/illustrations/posting_photo.svg"
                                    alt=""
                                />
                            </div>
                        </Grid>
                        <Grid item lg={9} md={7} sm={7} xs={12}>
                            <div className="p-9 h-full">
                                <div className={classes.root}>
                                    <ExpansionPanel
                                        expanded={expanded === "panel1"}
                                        onChange={handleChangePanel("panel1")}
                                    >
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                        >
                                            <Typography className={classes.heading}>Your information</Typography>
                                            <Typography className={classes.secondaryHeading}>
                                                Put informations about you
                                            </Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <ValidatorForm ref={useRef("form")} onSubmit={next}>
                                                <Grid container spacing={6}>
                                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                                        <TextValidator
                                                            className="mb-6 w-full"
                                                            variant="outlined"
                                                            label="Your full name"
                                                            onChange={handleChange}
                                                            type="text"
                                                            name="names"
                                                            value={names}
                                                            validators={["required"]}
                                                            errorMessages={["this field is required"]}
                                                        />
                                                        <TextValidator
                                                            className="mb-6 w-full"
                                                            variant="outlined"
                                                            label="Email"
                                                            onChange={handleChange}
                                                            type="email"
                                                            name="email"
                                                            value={email}
                                                            validators={["required", "isEmail"]}
                                                            errorMessages={[
                                                                "this field is required",
                                                                "email is not valid"
                                                            ]}
                                                        />
                                                        <TextValidator
                                                            className="mb-6 w-full"
                                                            variant="outlined"
                                                            label="Phone with code eg: +86........."
                                                            onChange={handleChange}
                                                            type="text"
                                                            name="phone"
                                                            value={phone}
                                                            validators={["required", 'matchRegexp:[^+][0-9]$']}
                                                            errorMessages={[
                                                                "this field is required",
                                                                "The number is not valid"
                                                            ]}
                                                        />
                                                    </Grid>
                                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                                        <TextValidator
                                                            className="mb-4 w-full"
                                                            label="Password"
                                                            variant="outlined"
                                                            onChange={handleChange}
                                                            name="password"
                                                            type="password"
                                                            value={password}
                                                            validators={["required"]}
                                                            errorMessages={["this field is required"]}
                                                        />
                                                        <TextValidator
                                                            className="mb-4 w-full"
                                                            label="Rewrite Password"
                                                            variant="outlined"
                                                            onChange={handleChange}
                                                            name="repassword"
                                                            type="password"
                                                            value={repassword}
                                                            validators={['isPasswordMatch', 'required']}
                                                            errorMessages={['password mismatch', 'this field is required']}
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
                                                        Validate
                                                    </Button>
                                                    <span className="mx-2 ml-5">or</span>
                                                    <Button
                                                        className="capitalize"
                                                        disabled={props.login.loading}
                                                        onClick={() =>
                                                            this.props.history.push("/session/signin")
                                                        }
                                                    >
                                                        Sign in
                                                    </Button>
                                                </div>
                                            </ValidatorForm>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                    <ExpansionPanel
                                        expanded={expanded === "panel2"}
                                    //onChange={handleChangePanel("panel2")}
                                    >
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2bh-content"
                                            id="panel2bh-header"
                                        >
                                            <Typography className={classes.heading}>Your company</Typography>
                                            <Typography className={classes.secondaryHeading}>
                                                Put informations about your company
                                            </Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <ValidatorForm ref={useRef("form")} onSubmit={HandleFormSubmit}>
                                                <Grid container spacing={6}>
                                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                                        <TextValidator
                                                            className="mb-6 w-full"
                                                            variant="outlined"
                                                            label="Name"
                                                            onChange={handleChange}
                                                            type="text"
                                                            name="name_company"
                                                            value={name_company}
                                                            validators={["required"]}
                                                            errorMessages={["this field is required"]}
                                                        />
                                                        <TextValidator
                                                            className="mb-6 w-full"
                                                            variant="outlined"
                                                            label="Phone with code eg: +86........."
                                                            onChange={handleChange}
                                                            type="text"
                                                            name="phone_company1"
                                                            value={phone_company1}
                                                            validators={["required", 'matchRegexp:[^+][0-9]$']}
                                                            errorMessages={[
                                                                "this field is required",
                                                                "The number is not valid"
                                                            ]}
                                                        />
                                                        <TextValidator
                                                            className="mb-6 w-full"
                                                            variant="outlined"
                                                            label="Phone with code eg: +86........."
                                                            onChange={handleChange}
                                                            type="text"
                                                            name="phone_company2"
                                                            value={phone_company2}
                                                            validators={['matchRegexp:[^+][0-9]$']}
                                                            errorMessages={[
                                                                "The number is not valid"
                                                            ]}
                                                        />
                                                    </Grid>
                                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                                        <TextValidator
                                                            className="mb-6 w-full"
                                                            variant="outlined"
                                                            label="Email"
                                                            onChange={handleChange}
                                                            type="email"
                                                            name="email_company"
                                                            value={email_company}
                                                            validators={["required", "isEmail"]}
                                                            errorMessages={[
                                                                "this field is required",
                                                                "email is not valid"
                                                            ]}
                                                        />
                                                        <TextValidator
                                                            className="mb-6 w-full"
                                                            variant="outlined"
                                                            label="Address"
                                                            onChange={handleChange}
                                                            type="text"
                                                            name="address"
                                                            value={address}
                                                            validators={["required"]}
                                                            errorMessages={[
                                                                "this field is required"
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
                                                        Sign Up
                                                    </Button>
                                                    {props.login.loading && (
                                                        <CircularProgress
                                                            size={24}
                                                            className={classes.buttonProgress}
                                                        />
                                                    )}
                                                    <span className="mx-2 ml-5">or</span>
                                                    <Button
                                                        className="capitalize"
                                                        disabled={props.login.loading}
                                                        onClick={() =>
                                                            this.props.history.push("/session/signin")
                                                        }
                                                    >
                                                        Sign in
                                                    </Button>
                                                </div>
                                            </ValidatorForm>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
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
});

export default connect(mapStateToProps, { error, loading, loginWithEmailAndPassword })(CompSignUp);
