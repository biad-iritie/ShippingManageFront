import React, { useState, useRef, useEffect } from "react";
import {
    Card,
    Grid,
    Button,
    Icon,
    CircularProgress,
    FormControlLabel,
    Switch,
    FormGroup
} from "@material-ui/core";
import ReturnServeur from "../components/ReturnServeur";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { loading, success } from "../../redux/actions/LoginActions";
import ShowInfo from '../components/message';
import { useLazyQuery, useMutation } from '@apollo/client';
import { INFO_COMPANY, UPDATE_COMPANY } from '../../../graphql/User';
import { Breadcrumb } from "matx";
import { addCompany } from "../../redux/actions/CompanyAction";
import { checkError, getTimeDifference } from "../../../utils";
import { FormattedMessage } from 'react-intl';

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

const Info = (props) => {
    /* state = {
        username: "",
        email: "",
        password: "",
        agreement: ""
    }; */

    var moment = require('moment');
    //GET COMPANY INFO
    const [info_company, { loading, error, data }] = useLazyQuery(INFO_COMPANY, {
        errorPolicy: 'all',
        onCompleted: (data) => {
            props.addCompany(data.info_company)
            //console.log(data)
            setName(data.info_company.name)
            setEmail(data.info_company.email)
            setPhone1(data.info_company.phone1)
            setPhone2(data.info_company.phone2)
            setAddress(data.info_company.address)
            setIs_active(data.info_company.is_active)
        },
        onError: () => {
            setVariant("error");
            let msg = checkError(error)
            setInfo(<ReturnServeur info={msg} />);
            setShow(true);
            props.success();

        }
    })

    //GET COMPANY INFO
    const [update_company] = useMutation(UPDATE_COMPANY, /* {
        errorPolicy: 'all',
        onCompleted: (data) => {
            console.log(data)
            setId(data.info_company.id)
            setName(data.info_company.name)
            setEmail(data.info_company.email)
            setPhone1(data.info_company.phone1)
            setPhone2(data.info_company.phone2)
            setAddress(data.info_company.address)
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

        }
    } */)
    //console.log(data);
    /* .catch((error) => {
        console.log(error);
    }) */
    const handleChange = event => {
        //console.log(event);
        event.persist();
        switch (event.target.name) {

            case "name":
                setName(event.target.value)
                break;
            case "phone1":
                setPhone1(event.target.value)
                break;
            case "phone2":
                setPhone2(event.target.value)
                break;
            case "email":
                setEmail(event.target.value)
                break;
            case "address":
                setAddress(event.target.value)
                break;
            case "is_active":
                //console.log(!false);
                //console.log(typeof event.target.value);
                setIs_active(event.target.value === 'true' ? false : true)

        }
        /* this.setState({
            [event.target.name]: event.target.value
        }); */
    };

    //const [signup] = useMutation(SIGN_UP);
    const handleFormSubmit = event => {
        event.preventDefault();

        //ShowInfo("success", "Validation testing")
        setShow(false);
        props.loading();
        //console.log(typeof id);
        update_company({
            variables: {
                id: parseInt(props.company.id),
                name: name,
                address: address,
                phone1: phone1,
                phone2: phone2,
                email: email
            }
        })
            .then((res) => {

                //console.log(res);
                if (res.data.update_company) {
                    setInfo(<FormattedMessage
                        id="result.PROFILE_UPDATED"
                        defaultMessage="Profile updated !"
                    />);
                    //setInfo("Modification done !");
                    props.addCompany(res.data.update_company)
                    setVariant('success')
                } else {
                    setVariant("error");
                    let msg = checkError(res.errors)
                    setInfo(<ReturnServeur info={msg} />);
                    setShow(true);
                }

                setShow(true);
                props.success();

            })
            .catch((error) => {
                setVariant("error");
                let msg = checkError(error)
                setInfo(<ReturnServeur info={msg} />);
                setShow(true);
                props.success();
            });
    };
    useEffect(() => {
        info_company()
    }, [data]);
    /* render() { */
    //let { username, email, password } = this.state;
    //console.log(typeof props.company.is_active);
    const classes = useStyles();
    const [name, setName] = useState(props.company.name ? props.company.name : false);
    const [phone1, setPhone1] = useState(props.company.phone1);
    const [phone2, setPhone2] = useState(props.company.phone2);
    const [email, setEmail] = useState(props.company.email);
    const [address, setAddress] = useState(props.company.address);
    const [is_active, setIs_active] = useState(props.company.is_active ? props.company.is_active : false);
    const [variant, setVariant] = useState('error');
    const [info, setInfo] = useState(null);
    const [show, setShow] = useState(false);
    //console.log(is_active);
    return (
        <div className="m-sm-30">
            <ShowInfo
                show={show}
                info={info}
                variant={variant} />
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: "Dashboard", path: "/" },
                        {
                            name: <FormattedMessage
                                id="title.company"
                                defaultMessage="Company"
                            />
                        }
                    ]}
                />
                <Typography className="mt-5 font-bold">
                    <FormattedMessage
                        id="title.remainingSubs"
                        defaultMessage="Remaining Subscription Date:"
                    />
                    <small className="border-radius-4 bg-secondary text-black px-2 py-2px">
                        {
                            getTimeDifference(Number(props.company.limit_subscribe))
                            //moment(Number(props.company.limit_subscribe)).fromNow(true)
                        }

                    </small>
                </Typography>
            </div>
            <Card>
                <div className="p-9 h-full">
                    <div className={classes.root}>
                        <ValidatorForm ref={useRef("form")} onSubmit={handleFormSubmit}>
                            <Grid container spacing={6}>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <TextValidator
                                        autoFocus={true}
                                        className="mb-6 w-full"
                                        variant="outlined"
                                        label={
                                            <FormattedMessage
                                                id="title.name"
                                                defaultMessage="Name"
                                            />
                                        }
                                        onChange={handleChange}
                                        type="text"
                                        name="name"
                                        value={name}
                                        defaultValue={props.company.name}
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
                                                id="input.phone.label"
                                                defaultMessage="Phone with code eg: +86......... *"
                                            />
                                        }
                                        onChange={handleChange}
                                        type="text"
                                        name="phone1"
                                        value={phone1}
                                        defaultValue=" "
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
                                        name="phone2"
                                        value={phone2}
                                        defaultValue=" "
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
                                        name="email"
                                        value={email}
                                        defaultValue=" "
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
                                        className="mb-6 w-full"
                                        variant="outlined"
                                        label={
                                            <FormattedMessage
                                                id="input.address"
                                                defaultMessage="Address *"
                                            />
                                        }
                                        onChange={handleChange}
                                        type="text"
                                        name="address"
                                        value={address}
                                        defaultValue=" "
                                        validators={["required"]}
                                        errorMessages={[
                                            <FormattedMessage
                                                id="input.required"
                                                defaultMessage="This field is required"
                                            />
                                        ]}
                                    />
                                    <FormGroup row>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={is_active}
                                                    name="is_active"
                                                    onChange={handleChange}
                                                    value={is_active}
                                                />
                                            }
                                            label={
                                                <FormattedMessage
                                                    id="label.available"
                                                    defaultMessage="Available"
                                                />
                                            }
                                        />
                                    </FormGroup>

                                </Grid>
                            </Grid>
                            <div className="flex items-center">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    disabled={props.login.loading}
                                >
                                    <Icon>send</Icon>
                                    <span className="pl-2 capitalize">
                                        <FormattedMessage
                                            id="button.update"
                                            defaultMessage="Update"
                                        /></span>
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

            </Card>

        </div>
    );
    //}
}

const mapStateToProps = state => ({
    // setUser: PropTypes.func.isRequired
    addCompany: PropTypes.func.isRequired,
    loading: PropTypes.func.isRequired,
    success: PropTypes.func.isRequired,
    login: state.login,
    company: state.company
});

export default connect(mapStateToProps, { success, loading, addCompany })(Info);
