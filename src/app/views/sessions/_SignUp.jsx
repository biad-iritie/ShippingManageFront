import React, { Component } from "react";
import {
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  Button
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { signUpCustomer } from "../../redux/actions/LoginActions";
import { connect } from "react-redux";
/* import { useMutation } from '@apollo/client';
import { SIGN_UP_CUSTOMER } from '../../../graphql/User' */
import { useQuery } from 'urql';
import { SIGN_UP_CUSTOMER, FEED } from '../../../graphql/User';


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
class SignUp extends Component {
  state = {
    names: "",
    email: "",
    phone: "",
    password: "",
    repassword: "",
    agreement: ""
  };

  handleChange = event => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleFormSubmit = event => {
    //alert("ok")

    //this.props.signUpCustomer({ ...this.state });
  };
  componentDidMount() {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
  }

  render() {
    let { names, email, phone, password, repassword } = this.state;
    return (
      <div className="signup flex justify-center w-full h-full-screen">
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
                  <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
                    <TextValidator
                      className="mb-6 w-full"
                      variant="outlined"
                      label="Full name"
                      onChange={this.handleChange}
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
                      onChange={this.handleChange}
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
                      label="Phone"
                      onChange={this.handleChange}
                      type="text"
                      name="phone"
                      value={phone}
                      validators={["required"]}
                      errorMessages={[
                        "this field is required",
                        "number is not valid"
                      ]}
                    />
                    <TextValidator
                      className="mb-4 w-full"
                      label="Password"
                      variant="outlined"
                      onChange={this.handleChange}
                      name="password"
                      type="password"
                      value={password}
                      validators={["required"]}
                      errorMessages={['this field is required']}
                    />
                    <TextValidator
                      className="mb-4 w-full"
                      label="Rewrite Password"
                      variant="outlined"
                      onChange={this.handleChange}
                      name="repassword"
                      type="password"
                      value={repassword}
                      validators={['isPasswordMatch', 'required']}
                      errorMessages={['password mismatch', 'this field is required']}
                    />
                    <FormControlLabel
                      className="mb-4"
                      name="agreement"
                      onChange={this.handleChange}
                      control={<Checkbox />}
                      label="I have read and agree to the terms of service."
                    />
                    <div className="flex items-center">
                      <Button
                        className="capitalize"
                        variant="contained"
                        color="primary"
                        //type="submit"
                        onClick={() =>
                          this.handleFormSubmit()
                        }
                      >
                        Sign up
                      </Button>
                      <span className="mx-2 ml-5">or</span>
                      <Button
                        className="capitalize"
                        onClick={() =>
                          this.props.history.push("/session/signin")
                        }
                      >
                        Sign in
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
}

const mapStateToProps = state => ({
  signUpCustomer: PropTypes.func.isRequired,
  // setUser: PropTypes.func.isRequired
});
export default withStyles(styles, { withTheme: true })(
  withRouter(connect(mapStateToProps, { signUpCustomer })(SignUp))
);
