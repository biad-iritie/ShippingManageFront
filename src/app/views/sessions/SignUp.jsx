import React, { useState, useRef, useEffect } from 'react';
import {
    Card,
    Grid,
    Button,
    CircularProgress
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { FormattedMessage } from 'react-intl';

import { loginWithEmailAndPassword, loading, success } from "../../redux/actions/LoginActions";
import { connect } from "react-redux";
import { useMutation, useQuery } from '@apollo/client';
/*import { SIGN_UP_CUSTOMER } from '../../../graphql/User' */
//import { useQuery } from 'urql';
import { SIGN_UP, GET_PUBLIC_KEY } from '../../../graphql/User';
import ShowInfo from '../components/message';
import { encryptData } from '../../../utils';
import { manageMsg, checkError } from "../../../utils";


/* import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent"; */

const styles = theme => ({
    wrapper: {
        position: "relative"
    },

    buttonProgress: {
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -12,
        marginLeft: -12
    }
});
const SignUp = (props) => {

    /* const state = {
        names: "",
        email: "",
        phone: "",
        password: "",
        repassword: "",
        agreement: ""
    }; */
    //const input = useRef();
    const [names, setNames] = useState()
    const [phone, setPhone] = useState()
    const [password, setPassword] = useState()
    const [repassword, setRepassword] = useState()
    const [email, setEmail] = useState()

    const [variant, setVariant] = useState('error');
    const [info, setInfo] = useState(null);
    const [show, setShow] = useState(false);
    const [public_key, setPublicKey] = useState();

    const { classes } = props;
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
            setInfo(manageMsg(msg));
            setShow(true);
            props.success();
        }
    });
    const [signup] = useMutation(SIGN_UP/* , {
        errorPolicy: 'all',
        onCompleted: () => {
            console.log("onCompleted");
            console.log(data);
            console.log(error);
            //props.loginWithEmailAndPassword(data.user, data.token);
            setShow(false);
        },
        onError: () => {
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
            //props.loginWithEmailAndPassword(data.user, data.token);
        }
    } */)
    //const [signup, { loading, error, data }] = useLazyQuery(FEED)
    const HandleFormSubmit = event => {
        //alert("ok")
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
                role: "GUEST"
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
                setInfo(manageMsg(msg));
                setShow(true);
                props.success();
            })
        /* console.log("IN");
        console.log(loading);
        console.log(error);
        console.log(data); */
        //console.log(names);

        //props.signUpCustomer(names, email, phone, password);
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

    //let { names, email, phone, password, repassword } = this.state;
    return (
        <div className="signup flex justify-center h-full-screen">
            <ShowInfo
                show={show}
                info={info}
                variant={variant} />
            {/* <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <MySnackbarContentWrapper
                    onClose={handleClose}
                    variant={"success"}
                    message={"info"}
                />
            </Snackbar> */}
            <div className="p-8">
                <Card className="signup-card position-relative y-center">
                    <Grid container>
                        <Grid item lg={5} md={5} sm={5} xs={12}>
                            <div className="p-8 flex justify-center bg-light-gray items-center h-full">
                                <img
                                    src="/assets/images/illustrations/posting_photo.svg"
                                    alt=""
                                />
                            </div>
                        </Grid>
                        <Grid item lg={7} md={7} sm={7} xs={12}>
                            <div className="p-9 h-full">
                                <ValidatorForm ref={useRef("form")} onSubmit={
                                    HandleFormSubmit
                                }>
                                    <TextValidator
                                        className="mb-6 w-full"
                                        variant="outlined"
                                        label={
                                            <FormattedMessage
                                                id="input.names.label"
                                                defaultMessage="Full name"
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
                                                defaultMessage="Email"
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
                                                defaultMessage="Phone with code eg: +86........."
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
                                                defaultMessage="Rewrite Password"
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
                                        control={<Checkbox />}
                                        label="I have read and agree to the terms of service."
                                    /> */}
                                    <div className="flex items-center">
                                        <div className={classes.wrapper}>
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

                                        </div>
                                        <span className="mx-2 ml-5">or</span>

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
                            </div>
                        </Grid>
                    </Grid>
                </Card>
            </div>
        </div>
    );
}


const mapStateToProps = state => ({
    loading: PropTypes.func.isRequired,
    login: state.login,
    loginWithEmailAndPassword: PropTypes.func.isRequired,
});


export default withStyles(styles, { withTheme: true })(
    withRouter(connect(mapStateToProps, { success, loading, loginWithEmailAndPassword })(SignUp))
);
