import React, { useState, useRef, useEffect } from "react";
import {
    Card,
    Grid,
    Button,
    Icon,
    CircularProgress
} from "@material-ui/core";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { loading, error } from "../../redux/actions/LoginActions";
import ShowInfo from '../message/message';
import { useLazyQuery, useMutation } from '@apollo/client';
import { INFO_COMPANY, UPDATE_COMPANY } from '../../../graphql/User';
import { Breadcrumb } from "matx";
import { addCompany } from "../../redux/actions/CompanyAction";

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


        }
        /* this.setState({
            [event.target.name]: event.target.value
        }); */
    };

    //const [signup] = useMutation(SIGN_UP);
    const HandleFormSubmit = event => {
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

                console.log(res);
                if (res.data.update_company) {
                    setInfo("Modification done !");
                } else {
                    setInfo("Error, Try after !");
                }
                props.addCompany(res.data.update_company)
                setVariant('success')
                setShow(true);
                props.error();

            })
            .catch((error) => {
                //console.log("onError");
                //console.log(error);
                setVariant("error");
                //setInfo("You can't modify now , try it later .");
                if (error.networkError) {
                    setInfo("Please try after this action");
                }
                if (error.graphQLErrors)
                    error.graphQLErrors.map(({ message, locations, path }) =>
                        setInfo(message)
                    );

                setShow(true);
                props.error()
            });
    };
    useEffect(() => {
        info_company()
    }, [data])
    /* render() { */
    //let { username, email, password } = this.state;
    //console.log(props);
    const classes = useStyles();
    const [name, setName] = useState(props.company.name);
    const [phone1, setPhone1] = useState(props.company.phone1);
    const [phone2, setPhone2] = useState(props.company.phone2);
    const [email, setEmail] = useState(props.company.email);
    const [address, setAddress] = useState(props.company.address);
    const [variant, setVariant] = useState('error');
    const [info, setInfo] = useState(null);
    const [show, setShow] = useState(false);
    return (

        <div className="m-sm-30">
            <ShowInfo
                show={show}
                info={info}
                variant={variant} />
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: "Company", path: "/dashboard/analytics" },
                        { name: "Info" }
                    ]}
                />
            </div>
            <Card>
                <div className="p-9 h-full">
                    <div className={classes.root}>


                        <ValidatorForm ref={useRef("form")} onSubmit={HandleFormSubmit}>
                            <Grid container spacing={6}>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <TextValidator

                                        autoFocus={true}
                                        className="mb-6 w-full"
                                        variant="outlined"
                                        label="Name"
                                        onChange={handleChange}
                                        type="text"
                                        name="name"
                                        value={name}
                                        defaultValue={props.company.name}
                                        validators={["required"]}
                                        errorMessages={["this field is required"]}
                                    />
                                    <TextValidator
                                        className="mb-6 w-full"
                                        variant="outlined"
                                        label="Phone with code eg: +86........."
                                        onChange={handleChange}
                                        type="text"
                                        name="phone1"
                                        value={phone1}
                                        defaultValue="okk"
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
                                        name="phone2"
                                        value={phone2}
                                        defaultValue="ok"
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
                                        name="email"
                                        value={email}
                                        defaultValue="ok"
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
                                        defaultValue="ok"
                                        validators={["required"]}
                                        errorMessages={[
                                            "this field is required"
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
                                    <Icon>send</Icon>
                                    <span className="pl-2 capitalize">Submit</span>

                                </Button>
                                {props.login.loading && (
                                    <CircularProgress
                                        size={24}
                                        className={classes.buttonProgress}
                                    />
                                )}

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
    error: PropTypes.func.isRequired,
    login: state.login,
    company: state.company
});

export default connect(mapStateToProps, { error, loading, addCompany })(Info);
