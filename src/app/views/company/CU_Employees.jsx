import React, { useRef, useState } from 'react';
import { Breadcrumb } from "matx";
import ShowInfo from '../components/message';
import {
    Card,
    Grid,
    Button,
    Icon,
    CircularProgress,
} from "@material-ui/core";
import PropTypes from "prop-types";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { loading, success } from "../../redux/actions/LoginActions";
//import history from "history.js";
import { connect } from "react-redux";
import { useMutation, useQuery } from '@apollo/client';
import { ADD_EMPLOYEE, GET_PUBLIC_KEY } from '../../../graphql/User';
import { addEmployee, } from '../../redux/actions/EmployeesActions'
import { manageMsg, checkError } from "../../../utils";
import { encryptData } from '../../../utils';
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
    },
    group: {
        margin: theme.spacing(1, 5)
    }
}));

const CU_Employees = (props) => {
    const classes = useStyles();
    const [variant, setVariant] = useState("success");
    const [info, setInfo] = useState(null);
    const [show, setShow] = useState(false);
    const [public_key, setPublicKey] = useState();

    const [names, setNames] = useState(
        props.history.location.state[0].action === "add" ? "" : props.history.location.state[0].employee.names
    );

    const [phone, setPhone] = useState(
        props.history.location.state[0].action === "add" ? "" : props.history.location.state[0].employee.phone
    );

    const [email, setEmail] = useState(
        props.history.location.state[0].action === "add" ? "" : props.history.location.state[0].employee.email
    );

    const [role, setRole] = useState(
        props.history.location.state[0].action === "add" ? "" : props.history.location.state[0].employee.role
    );
    const [password, setPassword] = useState();
    const [open, setOpen] = useState(false);


    const [add_employee] = useMutation(ADD_EMPLOYEE);
    //const [update_rate] = useMutation(UPDATE_RATE);


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
            case "role":
                setRole(event.target.value)
                break;
            case "password":
                setPassword(event.target.value)
                break;

        }
    }

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

    const handleFormSubmit = event => {
        //console.log(variant);
        event.preventDefault();
        setShow(false);
        props.loading();
        if (props.history.location.state[0].action === "add") {

            add_employee({
                variables: {
                    names: names,
                    phone: phone,
                    email: encryptData(email, public_key.toString()),
                    role: role,
                    roleRequest: props.user.role,
                    password: encryptData(password, public_key.toString()),
                }
            })
                .then(res => {
                    //if (res.data.add_employee.id) {

                    setInfo(manageMsg("EMPLOYEE_CREATED"));
                    setNames("")
                    setPhone("")
                    setEmail("")
                    setRole("")
                    props.addEmployee([{
                        user: {
                            id: res.data.add_employee.id,
                            names: names,
                            phone: phone,
                            email: email,
                            role: role,

                        }
                    }]);

                    /* }  else {
                         setInfo("Error, Try after !");
                         setVariant('error');
                     } */
                    setVariant('success');
                    props.success();
                    setShow(true);
                    //history.goBack();

                })
                .catch(error => {
                    setVariant("error");
                    let msg = checkError(error)
                    setInfo(manageMsg(msg));
                    setShow(true);
                    props.success();
                });
        } else {
            //alert("Update")
            /* update_rate({
                variables: {
                    id: parseInt(props.history.location.state[0].rate.id),
                    country: country.name,
                    shipMethod: shipMethod,
                    interKg: interKG,
                    price: price,
                    typeService: typeService,
                    goods: goods,
                    time: time,
                    cities: cities
                }
            })
                .then(res => {
                    if (res.data.update_rate.id) {
                        setInfo("Update Success !");
                        setVariant('success');
                        props.updateRate({
                            id: res.data.update_rate.id,
                            country: country.name,
                            shipMethod: shipMethod,
                            interKg: interKG,
                            price: price,
                            typeService: typeService,
                            goods: goods,
                            time: time,
                            cities: cities
                        });
                        props.success();
                        history.goBack();
                    } else {
                        setInfo("Error, Try after !");
                        setVariant('error');
                    }
                    setShow(true);
                    
        
                })
                .catch(error => {
                    setVariant("error");
                    //setInfo("You can't modify now , try it later .");
                    if (error.networkError) {
                        setInfo("Check your internet, and try again");
                    }
                    if (error.graphQLErrors)
                        error.graphQLErrors.map(({ message, locations, path }) =>
                            setInfo(message)
                        );
                    setShow(true)
                    props.success()
                }) */
        }
        setShow(true);



    }



    /* useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]); */
    //console.log(props.history.location.state[0]);
    return (

        <div className="m-sm-30">
            <ShowInfo
                show={show}
                info={info}
                variant={variant} />
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: "Employees", path: "/company/employees" },
                        { name: "Add or Edit Employee" }
                    ]}
                />
            </div>
            <Card>
                <div className="p-9 h-full">
                    <div className={classes.root}>
                        <ValidatorForm ref={useRef("form")} onSubmit={handleFormSubmit}>
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
                                    <FormControl component="fieldset" className={classes.formControl}>
                                        <FormLabel component="legend">Role</FormLabel>
                                        <RadioGroup
                                            isRequired={true}
                                            aria-label="role"
                                            className={classes.group}
                                            name="role"
                                            value={role}
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value="STAFF_MEMBER" control={<Radio />} label="Staff" />
                                            <FormControlLabel value="ADMIN_MEMBER" control={<Radio />} label="Admin" />

                                        </RadioGroup>
                                    </FormControl>
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
                                    {
                                        props.history.location.state[0].action === "add" ?
                                            <TextValidator

                                                className="mb-6 w-full"
                                                variant="outlined"
                                                label="Password"
                                                onChange={handleChange}
                                                type="text"
                                                name="password"
                                                value={password}
                                                validators={["required"]}
                                                errorMessages={[
                                                    "this field is required",
                                                ]}
                                            />
                                            : ""
                                    }



                                    {/* <TextValidator
                                        className="mb-6 w-full"
                                        variant="outlined"
                                        label="Email"
                                        onChange={handleChange}
                                        type="email"
                                        name="email"
                                        value={email}
                                        defaultValue="ok"
                                        validators={["required"]}
                                        errorMessages={[
                                            "this field is required",
                                        ]}
                                    />
                                    <TextValidator
                                        className="mb-6 w-full"
                                        variant="outlined"
                                        label="Address"
                                        onChange={handleChange}
                                        type="text"
                                        name="address"
                                        value={}
                                        defaultValue="ok"
                                        validators={["required"]}
                                        errorMessages={[
                                            "this field is required"
                                        ]}
                                    /> */}
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
                                        {
                                            props.history.location.state[0].action === "add" ? "Submit" : "Update"
                                        }
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

            </Card>
        </div>
    )
}
const mapStateToProps = state => ({
    // setUser: PropTypes.func.isRequired
    addRate: PropTypes.func.isRequired,
    updateRate: PropTypes.func.isRequired,
    loading: PropTypes.func.isRequired,
    success: PropTypes.func.isRequired,
    login: state.login,
    user: state.user
});

export default connect(mapStateToProps, { success, loading, addEmployee })(CU_Employees);