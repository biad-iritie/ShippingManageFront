import React, { useRef, useState, useEffect } from 'react'
import ShowInfo from '../components/message';
import { makeStyles } from "@material-ui/core/styles";
import { Breadcrumb } from "matx";
import {
    Card,
    Grid,
    Button,
    Icon,
    CircularProgress,
    Typography
} from "@material-ui/core";
import ReturnServeur from "../components/ReturnServeur";
import Divider from '@material-ui/core/Divider';
import PropTypes from "prop-types";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { loading, success } from "../../redux/actions/LoginActions";
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_PASSWORD, UPDATE, GET_PUBLIC_KEY } from '../../../graphql/User';
import { connect } from "react-redux";
import { updateUser } from '../../redux/actions/UserActions';
import { checkError } from "../../../utils";
import { encryptData } from '../../../utils';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: "33.33%",
        flexShrink: 0
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary
    },
    group: {
        margin: theme.spacing(1, 5)
    }
}));

const Profile = (props) => {
    const classes = useStyles();
    const [variant, setVariant] = useState("success");
    const [info, setInfo] = useState(null);
    const [show, setShow] = useState(false);

    const [names, setNames] = useState(props.user.names);

    const [phone, setPhone] = useState(props.user.phone);

    const [email, setEmail] = useState(props.user.email);
    const [oldPwd, setOldPwd] = useState();
    const [pwd, setPwd] = useState();
    const [rpwd, setRpwd] = useState();
    const [public_key, setPublicKey] = useState();


    //const [role, setRole] = useState();
    const [update_password] = useMutation(UPDATE_PASSWORD);
    const [update] = useMutation(UPDATE);
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

    const handleChange = event => {
        event.persist();
        switch (event.target.name) {

            case "names":
                setNames(event.target.value)
                break;
            case "phone":
                setPhone(event.target.value)
                break;
            case "email":
                setEmail(event.target.value)
                break;
            case "oldPwd":
                setOldPwd(event.target.value)
                break;
            case "pwd":
                setPwd(event.target.value)
                break;
            case "rpwd":
                setRpwd(event.target.value)
                break;
            /* case "rol
            /* case "role":
                setRole(event.target.value)
                break; */
        }
    }
    const handleFormSubmit1 = (event) => {
        event.preventDefault();
        setShow(false);
        props.loading();
        update({
            variables: {
                names: names,
                phone: phone,
                email: encryptData(email, public_key.toString())
            }
        })
            .then((res) => {
                props.updateUser(res.data.update)
                setInfo(<FormattedMessage
                    id="result.PROFILE_UPDATED"
                    defaultMessage='Profile updated !'
                />);
                setVariant('success');
                setShow(true);
                props.success();
            })
            .catch((error) => {
                setVariant("error");
                let msg = checkError(error)
                setInfo(<ReturnServeur info={msg} />);
                setShow(true);
                props.success();
            })
    }
    const handleFormSubmit2 = (event) => {
        event.preventDefault();
        setShow(false);
        props.loading();
        update_password({
            variables: {
                password: encryptData(oldPwd, public_key.toString()),
                new_password: encryptData(pwd, public_key.toString()),
            }
        })
            .then((res) => {
                //props.updateUser(res.data.update)
                if (res.data.update_password === "PWD_SUCCESS") {
                    setVariant('success');
                    setOldPwd("");
                    setPwd("");
                    setRpwd("");
                } else {
                    setVariant('error');

                }
                setInfo(<FormattedMessage
                    id="result.PWD_SUCCESS"
                    defaultMessage="Password updated !"
                />);
                setShow(true);
                props.success();
            })
            .catch((error) => {
                setVariant("error");
                let msg = checkError(error)
                setInfo(<ReturnServeur info={msg} />);
                setShow(true);
                props.success();
            })

    }

    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            //alert("ok")
            if (value !== pwd) {
                return false;
            }
            return true;
        });
    })

    return (
        <div className="m-sm-30">
            <ShowInfo
                show={show}
                info={info}
                variant={variant} />
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: "Profile" }
                    ]}
                />
            </div>
            <Card>
                <div className="p-9 h-full">
                    <div className={classes.root}>
                        <div className="mb-9">
                            <p className="center">
                                <Typography variant="h6">Informations</Typography>
                            </p>
                            <ValidatorForm ref={useRef("form")} onSubmit={handleFormSubmit1}>
                                <Grid container spacing={6}>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <TextValidator
                                            className="mb-6 w-full"
                                            variant="outlined"
                                            label="Full name"
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
                                            label="Phone number"
                                            onChange={handleChange}
                                            type="text"
                                            name="phone"
                                            value={phone}
                                            validators={["required"]}
                                            errorMessages={["this field is required"]}
                                        />

                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
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

                                    </Grid>
                                </Grid>
                                <div className="flex items-center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        disabled={props.login.loading}
                                    >
                                        <Icon>save</Icon>
                                        <span className="pl-2 capitalize">
                                            Save
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
                            </ValidatorForm>
                        </div>
                        <Divider variant="middle" />
                        <div>
                            <p className="center">
                                <Typography variant="h6">Change Password</Typography>
                            </p>
                            <ValidatorForm ref={useRef("form")} onSubmit={handleFormSubmit2}>
                                <Grid container spacing={6}>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <TextValidator
                                            className="mb-6 w-full"
                                            variant="outlined"
                                            label="Password"
                                            onChange={handleChange}
                                            type="password"
                                            name="oldPwd"
                                            value={oldPwd}
                                            validators={["required"]}
                                            errorMessages={["this field is required"]}
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <TextValidator

                                            className="mb-6 w-full"
                                            variant="outlined"
                                            label="New password"
                                            onChange={handleChange}
                                            type="password"
                                            name="pwd"
                                            value={pwd}
                                            validators={['required']}
                                            errorMessages={['this field is required']}

                                        />
                                        <TextValidator
                                            className="mb-6 w-full"
                                            variant="outlined"
                                            label="Rewrite password"
                                            onChange={handleChange}
                                            type="password"
                                            name="rpwd"
                                            value={rpwd}
                                            validators={['isPasswordMatch', 'required']}
                                            errorMessages={['password mismatch', 'this field is required']}

                                        />
                                    </Grid>
                                </Grid>
                                <div className="flex items-center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        disabled={props.login.loading}
                                    >
                                        <Icon>save</Icon>
                                        <span className="pl-2 capitalize">
                                            Save
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
                            </ValidatorForm>
                        </div>

                    </div>
                </div>

            </Card>

        </div>
    )
}
const mapStateToProps = state => ({
    loading: PropTypes.func.isRequired,
    success: PropTypes.func.isRequired,
    login: state.login,
    user: state.user,
    updateUser: PropTypes.func.isRequired
});
export default connect(mapStateToProps, { success, loading, updateUser })(Profile);