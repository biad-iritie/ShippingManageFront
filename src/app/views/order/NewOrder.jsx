import React, { useState, useRef, useEffect } from 'react';
import {
    Card,
    Grid,
    Button,
    CircularProgress,
    TextField,
    Icon
} from "@material-ui/core";
import { Breadcrumb } from "matx";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import history from "history.js";
import { FormattedMessage } from 'react-intl';
import { Autocomplete } from "@material-ui/lab";
import { LIST_COUNTRY, CHECK_COMPANY } from '../../../graphql/User';
import { ADD_ORDER, UPDATE_ORDER } from '../../../graphql/Order';
import { useMutation, useQuery } from '@apollo/client';
import { loading, success } from "../../redux/actions/LoginActions";
import ShowInfo from '../components/message';
import { makeStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { addOrder, updateOrder } from '../../redux/actions/OrderActions';
import ShippingWay from '../components/ShippingWay';
import { checkError } from "../../../utils";
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
/* const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option) => option,
}); */
const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: "33.33%",
        flexShrink: 0,
        fontWeight: theme.typography.fontWeightRegular
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary
    }
}));

const NewOrder = (props) => {
    const classes = useStyles();
    const user = props.user
    const [expanded, setExpanded] = useState("panel1");
    const [name_agence_sender, setName_agence_sender] = useState(
        props.history.location.state[0].action === "add" ? "" : props.history.location.state[0].order.name_agence_sender
    );
    const [numKuadi, setNumKuadi] = useState(
        props.history.location.state[0].action === "add" ? "" : props.history.location.state[0].order.numKuadi
    );
    const [id_company, setId_company] = useState();

    const [email_company, setEmail_company] = useState(
        props.history.location.state[0].action === "add" ? "" : props.history.location.state[0].order.email_company
    );
    const [weight, setWeight] = useState(
        props.history.location.state[0].action === "add" ? "" : props.history.location.state[0].order.weight
    );
    const [content, setContent] = useState(
        props.history.location.state[0].action === "add" ? "" : props.history.location.state[0].order.content
    );
    const [r_name, setR_name] = useState(
        props.history.location.state[0].action === "add" ? "" : props.history.location.state[0].order.r_name
    );
    const [r_phone, setR_phone] = useState(
        props.history.location.state[0].action === "add" ? "" : props.history.location.state[0].order.r_phone
    );
    const [r_country, setR_country] = useState(
        props.history.location.state[0].action === "add" ? "" : props.history.location.state[0].order.r_country
    );
    const [r_city, setR_city] = useState(
        props.history.location.state[0].action === "add" ? "" : props.history.location.state[0].order.r_city
    );
    const [shipMethod, setShipMethod] = useState(
        props.history.location.state[0].action === "add" ? "" : props.history.location.state[0].order.shipMethod
    );
    const [typeService, setTypeService] = useState(
        props.history.location.state[0].action === "add" ? "" : props.history.location.state[0].order.typeService
    );
    const [sender_name, setSender_name] = useState(
        props.history.location.state[0].action === "add" ? user.role === "GUEST" ? user.names : ""
            : props.history.location.state[0].order.sender_name
    );
    const [sender_phone, setSender_phone] = useState(
        props.history.location.state[0].action === "add" ? user.role === "GUEST" ? user.phone : ""
            : props.history.location.state[0].order.sender_phone
    );
    const [variant, setVariant] = useState('error')
    const [info, setInfo] = useState(null)
    const [show, setShow] = useState(false)


    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loadingInput = open && options.length === 0;
    var active = Boolean;
    var countries = [];

    const { refetch, data, error } = useQuery(LIST_COUNTRY, {
        errorPolicy: 'all',
        onCompleted: () => {
            //props.addCompany(data.info_company)
            //console.log(data)
            //console.log("List country");

            countries = data.listCountry;
            setOptions((countries).map(country => country));
            //console.log(countries);
            if (active) {
                setOptions((countries).map(country => country));
            }
            //console.log(options);
        },
        onError: (error) => {
            //console.log("onError");
            // console.log(error);
            setVariant("error");
            let msg = checkError(error);
            setInfo(<ReturnServeur info={msg} />);
            setShow(true);
            props.success();
        }

    })
    const [add_order, { data: dataOrder, loading: loadingOrder, error: errorOrder }] = useMutation(ADD_ORDER)
    const [update_order, { data: dataOrder1, loading: loadingOrder1, error: errorOrder1 }] = useMutation(UPDATE_ORDER)

    const { refetch: check_company, data: data_check_company, loading: loading_check_company, error: error_check_company } = useQuery(CHECK_COMPANY, {
        variables: {
            email: email_company
        },
        errorPolicy: 'all',
        onCompleted: () => {
            countries = data.listCountry;
            //console.log("check_company");
            if (active) {
                setOptions((countries).map(country => country.name));
            }
            //console.log(options);
        },
        /* onError: (error) => {

            setVariant("error");
            let msg = checkError(error)
            setInfo(<ReturnServeur info={msg} />);
            setShow(true);
            props.success();

        } */
    })

    const handleChangePanel = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const next = event => {
        //alert("ok");
        event.preventDefault();
        setShow(false);
        props.loading();
        check_company()
            .then(res => {
                //console.log(res);
                if (res.data.check_company) {
                    setExpanded("panel2");
                    setId_company(res.data.check_company)
                } else {
                    setVariant("error");
                    setInfo(<ReturnServeur info={res.errors[0].message} />);
                    setShow(true)
                }
                props.success();
                //console.log(response)
            })
            .catch(error => {
                //console.log(error);
                setVariant("error");
                let msg = checkError(error);
                setInfo(<ReturnServeur info={msg} />);
                setShow(true);
                props.success();
            })
        //console.log(data_check);


    };
    const handleChange = event => {
        //console.log(event);
        event.persist();
        switch (event.target.name) {
            case "name_agence_sender":
                setName_agence_sender(event.target.value)
                break;
            case "numKuadi":
                setNumKuadi(event.target.value)
                break;
            case "content":
                setContent(event.target.value)
                break;
            case "shipMethod":
                setShipMethod(event.target.value)
                break;
            case "typeService":
                setTypeService(event.target.value)
                break;
            case "weight":
                setWeight(event.target.value)
                break;
            case "email_company":
                setEmail_company(event.target.value)
                break;
            case "r_name":
                setR_name(event.target.value)
                break;
            case "r_phone":
                setR_phone(event.target.value)
                break;
            case "r_city":
                setR_city(event.target.value)
                break;
            case "sender_name":
                setSender_name(event.target.value)
                break;
            case "sender_phone":
                setSender_phone(event.target.value)
                break;
        }
        /* this.setState({
            [event.target.name]: event.target.value
        }); */
    };
    const handleSubmit = event => {
        setShow(false);

        event.preventDefault();
        if (!r_country || !shipMethod || !typeService) {
            setInfo(<ReturnServeur info="INFO_NOT_ENOUGH" />);
            setVariant('warning');
            setShow(true);
            loadingOrder = false;
        } else {
            if (props.history.location.state[0].action === "add") {

                add_order({
                    //errorPolicy: 'all',
                    variables: {
                        company: Number(id_company),
                        status: user.role === "GUEST" ? "STAND BY" : "RECEIVED",
                        current_statut: user.role === "GUEST" ? "STAND BY" : "RECEIVED",
                        name_agence_sender: name_agence_sender.toUpperCase(),
                        numKuadi: numKuadi.toUpperCase(),
                        content: content.toUpperCase(),
                        weight: weight,
                        r_name: r_name.toUpperCase(),
                        r_phone: r_phone,
                        r_city: r_city,
                        r_country: r_country,
                        shipMethod: shipMethod,
                        typeService: typeService,
                        sender_name: sender_name.toUpperCase(),
                        sender_phone: sender_phone,
                        createdAt: new Date()
                    }
                })
                    .then(res => {
                        //alert("ok")
                        setVariant("success");
                        if (res.data.add_order) {
                            setInfo(
                                <FormattedMessage
                                    id="result.ORDER_CREATED"
                                    defaultMessage="Order created, tracking number: "
                                    values={{
                                        code: res.data.add_order.code
                                    }}
                                />)
                            setShow(true);
                            setExpanded("panel1");
                            setName_agence_sender("");
                            setNumKuadi("");
                            setWeight("");
                            setContent("");
                            setR_name("");
                            setR_phone("");
                            setR_city("");
                            setSender_name("");
                            setSender_phone("");
                            props.addOrder([res.data.add_order])
                            setShow(true);

                        }
                    })
                    .catch(error => {
                        //alert("error")
                        /* if (error.networkError) {
                            setVariant("warning");
                            setInfo("Please check your network and try again this action");
                        } */
                        setVariant("error");
                        let msg = checkError(error)
                        setInfo(<ReturnServeur info={msg} />);
                        setShow(true);
                        props.success();
                    })
            } else {
                update_order({
                    //errorPolicy: 'all',
                    variables: {
                        id: parseInt(props.history.location.state[0].order.id),
                        company: Number(id_company),
                        name_agence_sender: name_agence_sender.toUpperCase(),
                        numKuadi: numKuadi.toUpperCase(),
                        content: content.toUpperCase(),
                        weight: weight,
                        r_name: r_name.toUpperCase(),
                        r_phone: r_phone,
                        r_city: r_city,
                        r_country: r_country,
                        shipMethod: shipMethod,
                        typeService: typeService,
                        sender_name: sender_name.toUpperCase(),
                        sender_phone: sender_phone
                    }
                })
                    .then(res => {
                        //alert("ok")
                        if (res.data.update_order.id) {
                            setInfo(
                                <FormattedMessage
                                    id="result.packagedUpdated"
                                    defaultMessage="Package Updated"
                                />);
                            setVariant('success');
                            props.updateOrder([res.data.update_order])
                            history.goBack();
                        } else {
                            setInfo(
                                <FormattedMessage
                                    id="error.default"
                                    defaultMessage="Error, Try after !"
                                />);
                            setVariant('error');
                        }
                        setShow(true);
                    })
                    .catch(error => {
                        //alert("error")
                        setVariant("error");
                        let msg = checkError(error)
                        setInfo(<ReturnServeur info={msg} />);
                        setShow(true);
                        props.success();
                    })
            }
            /* console.log("handleSubmit");
            setVariant("success");
            setInfo("Order created, tracking number: ");
            setShow(true); */

        }

    }
    useEffect(() => {
        active = true;
        //console.log(loadingInput);
        if (!loadingInput) {
            //console.log("!loadingInput");
            return undefined;
        }

        /* (async () => {
            //console.log("SYNC");
            await refetch()
                .then(res => {
                    //console.log("List country");
                     console.log(data);
                    countries = data.listCountry;
                    console.log(countries); 
                    if (active) {
                        setOptions((countries).map(country => country.name));
                    }
                })
                .catch(error => {
                    setVariant("error");
                    if (error.networkError) {
                        setInfo("Please try after this action");
                    }
                    if (error.graphQLErrors)
                        error.graphQLErrors.map(({ message, locations, path }) =>
                            setInfo(message)
                        );
                })

        })(); */

        return () => {
            active = false;
        };
    }, [loadingInput,]);

    /*     useEffect(() => {
            if (!open) {
                setOptions([]);
            }
        }, [open]); */
    //console.log(format(new Date().getTime(), "MM/dd/yyyy hh:mma"));
    return (
        <div className="m-sm-30">
            <ShowInfo
                show={show}
                info={info}
                variant={variant} />
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        {
                            name: <FormattedMessage
                                id="title.packageList"
                                defaultMessage="Package List"
                            />, path: "/order/list_order"
                        },
                        {
                            name: <FormattedMessage
                                id="title.new"
                                defaultMessage="New"
                            />, path: "/order/add_order"
                        },
                    ]}
                />
            </div>
            <Card>
                <div className="p-9 h-full" >
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
                                        id="title.packageInformation"
                                        defaultMessage="Package information"
                                    />
                                </Typography>
                                <Typography className={classes.secondaryHeading}>
                                    <FormattedMessage
                                        id="title.fillFormNewOrder"
                                        defaultMessage="Fill in all blanks to get more information about your package"
                                    />
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ValidatorForm style={{ 'width': '100%' }} ref={useRef("form")} onSubmit={next}>
                                    <Grid container spacing={6}>
                                        <Grid item lg={6} md={6} sm={12} xs={12}>

                                            {
                                                user.role !== "GUEST" && (
                                                    <div>
                                                        <TextValidator
                                                            className="mb-6 w-full"
                                                            variant="outlined"
                                                            label={
                                                                <FormattedMessage
                                                                    id="input.senderName"
                                                                    defaultMessage="Sender name *"
                                                                />
                                                            }
                                                            onChange={handleChange}
                                                            type="text"
                                                            name="sender_name"
                                                            value={sender_name}
                                                            validators={["required"]}
                                                            errorMessages={[<FormattedMessage
                                                                id="input.required"
                                                                defaultMessage="This field is required"
                                                            />]}
                                                        />
                                                        <TextValidator
                                                            className="mb-6 w-full"
                                                            variant="outlined"
                                                            label={
                                                                <FormattedMessage
                                                                    id="input.senderPhone"
                                                                    defaultMessage="Sender phone *"
                                                                />
                                                            }
                                                            onChange={handleChange}
                                                            type="text"
                                                            name="sender_phone"
                                                            value={sender_phone}
                                                            validators={["required"]}
                                                            errorMessages={[<FormattedMessage
                                                                id="input.required"
                                                                defaultMessage="This field is required"
                                                            />]}
                                                        />
                                                    </div>
                                                )
                                            }
                                            <TextValidator
                                                className="mb-6 w-full"
                                                variant="outlined"
                                                label={
                                                    <FormattedMessage
                                                        id="input.nameCompanyDeliver"
                                                        defaultMessage="Name of company who is delivering your package"
                                                    />
                                                }
                                                onChange={handleChange}
                                                type="text"
                                                name="name_agence_sender"
                                                value={name_agence_sender}
                                                //validators={["required"]}
                                                errorMessages={[<FormattedMessage
                                                    id="input.required"
                                                    defaultMessage="This field is required"
                                                />]}
                                            />
                                            <TextValidator
                                                className="mb-6 w-full"
                                                variant="outlined"
                                                label={
                                                    <FormattedMessage
                                                        id="input.numKuadi"
                                                        defaultMessage="Package number "
                                                    />
                                                }
                                                onChange={handleChange}
                                                type="text"
                                                name="numKuadi"
                                                value={numKuadi}
                                                //validators={["required"]}
                                                errorMessages={[<FormattedMessage
                                                    id="input.required"
                                                    defaultMessage="This field is required"
                                                />]}
                                            />

                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12}>
                                            <TextValidator
                                                className="mb-6 w-full"
                                                variant="outlined"
                                                label={
                                                    <FormattedMessage
                                                        id="input.content"
                                                        defaultMessage="Package content *"
                                                    />
                                                }
                                                onChange={handleChange}
                                                type="text"
                                                name="content"
                                                value={content}
                                                validators={["required"]}
                                                errorMessages={[<FormattedMessage
                                                    id="input.required"
                                                    defaultMessage="This field is required"
                                                />]}
                                            />
                                            <TextValidator
                                                className="mb-6 w-full"
                                                variant="outlined"
                                                label={
                                                    <FormattedMessage
                                                        id="input.weight"
                                                        defaultMessage="Package weight eg:10KG *"
                                                    />
                                                }
                                                onChange={handleChange}
                                                type="text"
                                                name="weight"
                                                value={weight}
                                                validators={["required"]}
                                                errorMessages={[<FormattedMessage
                                                    id="input.required"
                                                    defaultMessage="This field is required"
                                                />]}
                                            />
                                            <TextValidator
                                                /* disabled={() => {
                                                    return props.history.location.state[0].action === "add" ? false : true
                                                }} */
                                                className="mb-6 w-full"
                                                variant="outlined"
                                                label={
                                                    <FormattedMessage
                                                        id="input.email_company"
                                                        defaultMessage="Email of the shipping company *"
                                                    />
                                                }
                                                onChange={handleChange}
                                                type="text"
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
                                                    />
                                                ]}
                                            />
                                        </Grid>
                                    </Grid>
                                    <div className="flex items-center">
                                        <Button
                                            className="capitalize"
                                            variant="contained"
                                            disabled={props.login.loading}
                                            color="primary"
                                            type="submit"
                                        //disabled={props.login.loading}
                                        >
                                            <span className="pl-2">
                                                <FormattedMessage
                                                    id="button.validate"
                                                    defaultMessage="Validate"
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
                                        id="title.receiver_info"
                                        defaultMessage="Receiver\Shipping informations"
                                    /></Typography>
                                <Typography className={classes.secondaryHeading}>
                                    <FormattedMessage
                                        id="title.fillFormReceiver"
                                        defaultMessage="Fill in all blanks to get more information about the recipient"
                                    />
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ValidatorForm style={{ 'width': '100%' }} ref={useRef("form")} onSubmit={handleSubmit}>
                                    <Grid container spacing={6}>
                                        <Grid item lg={6} md={6} sm={12} xs={12}>
                                            <TextValidator
                                                className="mb-6 w-full"
                                                variant="outlined"
                                                label={
                                                    <FormattedMessage
                                                        id="input.name"
                                                        defaultMessage="Name *"
                                                    />}
                                                onChange={handleChange}
                                                type="text"
                                                name="r_name"
                                                value={r_name}
                                                validators={["required"]}
                                                errorMessages={[<FormattedMessage
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
                                                name="r_phone"
                                                value={r_phone}
                                                validators={["required"]}
                                                errorMessages={[<FormattedMessage
                                                    id="input.required"
                                                    defaultMessage="This field is required"
                                                />]}
                                            />
                                            <ShippingWay
                                                shipMethod={shipMethod}
                                                typeService={typeService}
                                                handleChange={handleChange} />
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12}>
                                            <Autocomplete
                                                id="asynchronous-demo"
                                                //openOnFocus={true}
                                                className="mb-6 w-full"
                                                open={open}
                                                onOpen={() => {
                                                    setOpen(true);

                                                }}
                                                onClose={() => {
                                                    setOpen(false);
                                                }}
                                                //getOptionSelected={(option, value) => option.name === value}
                                                getOptionLabel={option => option}
                                                options={options}
                                                loading={loadingInput}
                                                /* inputValue={r_country}
                                                onInputChange={(event, value) => {
                                                    value != null && setR_country(value.name)
                                                }} */
                                                value={r_country}
                                                onChange={(event, value) => {
                                                    value != null && setR_country(value)

                                                }}
                                                renderInput={params => (
                                                    <TextField
                                                        {...params}
                                                        label={
                                                            <FormattedMessage
                                                                id="select.country"
                                                                defaultMessage="Country of destination *"
                                                            />
                                                        }
                                                        fullWidth
                                                        variant="outlined"
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            endAdornment: (
                                                                <React.Fragment>
                                                                    {loadingInput ? (
                                                                        <CircularProgress color="inherit" size={20} />
                                                                    ) : null}
                                                                    {params.InputProps.endAdornment}
                                                                </React.Fragment>
                                                            )
                                                        }}
                                                    />
                                                )}
                                            />
                                            <TextValidator
                                                className="mb-6 w-full"
                                                variant="outlined"
                                                label={
                                                    <FormattedMessage
                                                        id="input.city"
                                                        defaultMessage="City *"
                                                    />
                                                }
                                                onChange={handleChange}
                                                type="text"
                                                name="r_city"
                                                value={r_city}
                                                validators={["required"]}
                                                errorMessages={[
                                                    <FormattedMessage
                                                        id="input.required"
                                                        defaultMessage="This field is required"
                                                    />,
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
                                            disabled={loadingOrder}
                                        >
                                            <Icon>send</Icon>
                                            <span className="pl-2 capitalize">
                                                {
                                                    props.history.location.state[0].action === "add" ?
                                                        <FormattedMessage
                                                            id="button.submit"
                                                            defaultMessage="Submit"
                                                        /> :
                                                        <FormattedMessage
                                                            id="button.update"
                                                            defaultMessage="Update"
                                                        />
                                                }
                                            </span>
                                            {(loadingOrder || loadingOrder1) && (
                                                <CircularProgress
                                                    size={24}
                                                    color="secondary"
                                                    className={classes.buttonProgress}
                                                />
                                            )}
                                        </Button>

                                    </div>
                                </ValidatorForm>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>
            </Card>
        </div>
    )
}

const mapStateToProps = state => ({
    login: state.login,
    loading: PropTypes.func.isRequired,
    success: PropTypes.func.isRequired,
    user: state.user,
    addOrder: PropTypes.func.isRequired,
    updateOrder: PropTypes.func.isRequired
});
export default withStyles(styles, { withTheme: true })(
    withRouter(connect(mapStateToProps, { success, loading, addOrder, updateOrder })(NewOrder))
);
