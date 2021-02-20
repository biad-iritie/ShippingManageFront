import React, { useState, useRef } from "react";
import {
  Card,
  Grid,
  Button,
  Icon,
  CircularProgress,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { FormattedMessage } from 'react-intl';

import { loginWithEmailAndPassword, loading, success } from "../../redux/actions/LoginActions";
import { addCompany } from "../../redux/actions/CompanyAction"
import { useMutation, useQuery } from '@apollo/client';
import { LOGIN, GET_PUBLIC_KEY } from '../../../graphql/User';
import ShowInfo from '../components/message';
import { encryptData } from '../../../utils';
import { manageMsg, checkError } from "../../../utils";
import ReturnServeur from "../components/ReturnServeur";

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

const SignIn = (props) => {
  /* state = {
    email: "watson@example.com",
    password: "testpass",
    agreement: ""
  }; */
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [variant, setVariant] = useState('error');
  const [info, setInfo] = useState(null);
  const [show, setShow] = useState(false);
  const [public_key, setPublicKey] = useState();

  const handleChange = event => {
    event.persist();
    switch (event.target.name) {
      case "email":
        setEmail(event.target.value)
        break;
      case "password":
        setPassword(event.target.value)
        break;
    }
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

  const [login] = useMutation(LOGIN)

  const handleFormSubmit = event => {
    //props.loginWithEmailAndPassword({ ...this.state });
    setShow(false);
    var passwordEncrypted = encryptData(password, public_key.toString())
    var emailEncrypted = encryptData(email, public_key.toString())
    //console.log(passwordEncrypted);
    props.loading();
    login({
      variables: {
        email: emailEncrypted,
        password: passwordEncrypted,
        last_login: new Date()
      }
    })
      .then((res) => {
        /* console.log("onCompleted");*/
        //console.log(res.data.login);
        //delete res.data.login.user.__typename;
        //GET INFORMATION ABOUT THE USER
        let user = res.data.login.user;
        //console.log(res.data.login.user);
        //GET THE TOKEN
        let token = res.data.login.token;
        props.loginWithEmailAndPassword(user, token);
        if (res.data.login.check) props.addCompany(res.data.login.check)
        setShow(false);
      })
      .catch((error) => {
        setVariant("error");
        //console.log(error);
        let msg = checkError(error);
        setInfo(<ReturnServeur info={msg} />)
        //setInfo(<ReturnServeur info={msg} />);
        setShow(true);
        props.success();
      })
  };
  //let { email, password } = this.state;
  const { classes } = props;
  return (
    <div className="signup flex justify-center h-full-screen">
      <ShowInfo
        show={show}
        info={info}
        variant={variant} />
      <div>
        {/* <div className="bg-white">
          <h1>
            <FormattedMessage
              id="app.hello"
              defaultMessage="Try it"
            />
            <br />
            <FormattedMessage
              id="app.value"
              defaultMessage="Try it"
              values={{ code: "T-130" }}
            />
            <br />
            <FormattedMessage
              id="app.code"
              defaultMessage="Try it"
              values={{ fileName: "src/App", code: (word) => <code>{word}</code> }}
            />
            <br />
            <FormattedDate
              value={new Date}
              hour="numeric"
              minute="numeric"
              year="numeric"
              month="long"
              day="numeric"
              weekday="long"
            />
          </h1>
        </div> */}
        <Card className="signup-card position-relative y-center">
          <Grid container>
            <Grid item lg={5} md={5} sm={5} xs={12}>
              <div className="p-8 flex justify-center items-center h-full">
                <img src="/assets/images/illustrations/dreamer.svg" alt="" />
              </div>
            </Grid>
            <Grid item lg={7} md={7} sm={7} xs={12}>
              <div className="p-9 h-full bg-light-gray position-relative">
                <ValidatorForm ref={useRef("form")} onSubmit={handleFormSubmit}>
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
                      />

                    ]}
                  />
                  <TextValidator
                    className="mb-3 w-full"
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
                  {/* <FormControlLabel
                    className="mb-3"
                    name="agreement"
                    onChange={handleChange}
                    control={<Checkbox checked />}
                    validators={["required"]}
                    errorMessages={["Read it and stick"]}
                    label="I have read and agree to the terms of service."
                  /> */}
                  <div className="flex flex-wrap items-center mb-4">
                    <div className={classes.wrapper}>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={props.login.loading}
                        type="submit"
                      >
                        <span className="pl-2 capitalize">
                          <FormattedMessage
                            id="button.login"
                            defaultMessage="Sign in to Enter Dashboard"
                          />
                        </span>
                        {props.login.loading && (
                          <CircularProgress
                            size={24}
                            color="secondary"
                            className={classes.buttonProgress}
                          />
                        )}
                      </Button>

                    </div>
                    <span className="mr-2 ml-5">
                      <FormattedMessage
                        id="or"
                        defaultMessage="Or"
                      />
                    </span>
                    <Button
                      className="capitalize"
                      disabled={props.login.loading}
                      onClick={() =>
                        props.history.push("/session/signup")
                      }
                    >
                      <FormattedMessage
                        id="button.signUp"
                        defaultMessage="Sign up"
                      />
                    </Button>
                  </div>
                  {/* <Button
                    className="text-primary"
                    disabled={props.login.loading}
                    onClick={() =>
                      props.history.push("/session/forgot-password")
                    }
                  >
                    Forgot password?
                    </Button> */}
                  <Button
                    className="capitalize ml-2"
                    variant="contained"
                    disabled={props.login.loading}
                    color="primary"
                    onClick={() =>
                      props.history.push("/session/comp-sign-up")
                    }
                  //disabled={this.props.login.loading}
                  //type="submit"
                  >
                    <Icon>business</Icon>
                    <span className="pl-2 capitalize">
                      <FormattedMessage
                        id="button.signUpCompany"
                        defaultMessage="Sign up for Company"
                      />
                    </span>
                  </Button>
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
  loginWithEmailAndPassword: PropTypes.func.isRequired,
  login: state.login,
  loading: PropTypes.func.isRequired,
  success: PropTypes.func.isRequired,
  addCompany: PropTypes.func.isRequired
});
export default withStyles(styles, { withTheme: true })(
  withRouter(connect(mapStateToProps, { addCompany, success, loading, loginWithEmailAndPassword })(SignIn))
);
