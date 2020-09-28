import React, { useRef, useState, useEffect } from 'react';
import { Breadcrumb } from "matx";
import ShowInfo from '../components/message';
import {
    Card,
    Grid,
    Button,
    Icon,
    CircularProgress,
    TextField,
} from "@material-ui/core";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { loading, success } from "../../redux/actions/LoginActions";
//import history from "history.js";
import { connect } from "react-redux";
import { useMutation, useQuery } from '@apollo/client';
import { LIST_COUNTRY } from '../../../graphql/User';
import { ADD_RATE, UPDATE_RATE } from '../../../graphql/Rate';
import { addRate, updateRate } from '../../redux/actions/RateAction'
import ShippingWay from '../components/ShippingWay';


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
const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option) => option.name,
});
const CU_Rate = (props) => {
    const classes = useStyles();
    const [variant, setVariant] = useState("success");
    const [info, setInfo] = useState(null);
    const [show, setShow] = useState(false);

    const [country, setCountry] = useState(
        props.history.location.state[0].action === "add" ? "" : props.history.location.state[0].rate.country
    );
    const [cities, setCities] = useState(
        props.history.location.state[0].action === "add" ? "" : props.history.location.state[0].rate.cities
    );
    const [shipMethod, setShipMethod] = useState(
        props.history.location.state[0].action === "add" ? "" : props.history.location.state[0].rate.shipMethod
    );
    const [typeService, setTypeService] = useState(
        props.history.location.state[0].action === "add" ? "" : props.history.location.state[0].rate.typeService
    );
    const [goods, setGoods] = useState(
        props.history.location.state[0].action === "add" ? "" : props.history.location.state[0].rate.goods
    );
    const [time, setTime] = useState(
        props.history.location.state[0].action === "add" ? "" : props.history.location.state[0].rate.time
    );
    const [price, setPrice] = useState(
        props.history.location.state[0].action === "add" ? "" : props.history.location.state[0].rate.price
    );
    const [interKG, setInterKG] = useState(
        props.history.location.state[0].action === "add" ? "" : props.history.location.state[0].rate.interKg
    );


    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loadingInput = open && options.length === 0;
    var active = Boolean;
    var countries = [];

    const [add_rate] = useMutation(ADD_RATE);
    const [update_rate] = useMutation(UPDATE_RATE);
    const { refetch, data, error } = useQuery(LIST_COUNTRY, {
        errorPolicy: 'all',
        onCompleted: () => {
            //props.addCompany(data.info_company)
            //console.log(data)
            //console.log("List country");
            //console.log(data);
            countries = data.listCountry;
            //console.log(countries);
            if (active) {
                setOptions((countries).map(country => country));
            }

        },
        onError: () => {
            //console.log("onError");
            // console.log(error);
            setVariant("error");
            if (error.networkError) {
                setInfo("Please try this action after !");
            }
            if (error.graphQLErrors)
                error.graphQLErrors.map(({ message, locations, path }) =>
                    setInfo(message)
                );
            //setInfo(error);

        }

    });

    const handleChange = event => {
        event.persist();
        switch (event.target.name) {

            case "cities":
                setCities(event.target.value)
                break;
            case "shipMethod":
                setShipMethod(event.target.value)
                break;
            case "typeService":
                setTypeService(event.target.value)
                break;
            case "goods":
                setGoods(event.target.value)
                break;
            case "time":
                setTime(event.target.value)
                break;
            case "price":
                setPrice(event.target.value)
                break;
            case "interKG":
                setInterKG(event.target.value)
                break;
        }
    }

    const handleFormSubmit = event => {
        //console.log(variant);
        event.preventDefault();
        setShow(false);
        props.loading();

        //history.goBack();

        if (!country) {
            setInfo("Select a country!");
            setVariant('error');
            setShow(true);
            props.success();
        } else {
            if (props.history.location.state[0].action === "add") {
                console.log(shipMethod);
                console.log(typeService);
                /* add_rate({
                    variables: {
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
                        if (res.data.add_rate.id) {
                            setInfo("Rate added !");
                            setVariant('success');
                        } else {
                            setInfo("Error, Try after !");
                            setVariant('error');
                        }
                        props.addRate([{
                            id: res.data.add_rate.id,
                            country: country.name,
                            shipMethod: shipMethod,
                            interKg: interKG,
                            price: price,
                            typeService: typeService,
                            goods: goods,
                            time: time,
                            cities: cities
                        }]);
                        setShow(true);
                        props.success();
                        //history.goBack();

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
                        setShow(true);
                        props.success();
                    }); */
            } else {
                update_rate({
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
                        } else {
                            setInfo("Error, Try after !");
                            setVariant('error');
                        }
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
                        setShow(true);
                        props.success();
                        //history.goBack();
                        /* props.history.push("/company/rate", [{
                            rate: {
                                id: res.data.update_rate.id,
                                country: country,
                                shipMethod: shipMethod,
                                interKg: interKG,
                                price: price,
                                typeService: typeService,
                                goods: goods,
                                time: time,
                                cities: cities
                            },
                            action: "refresh"
                        }]) */

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
                    })
            }
            setShow(true);

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
                    //console.log(data);
                    countries = data.listCountry;
                    //console.log(countries);
                    if (active) {
                        setOptions((countries).map(country => country.name));
                    }
                })
                .catch(error => {
                    //console.log("onError");
                    //console.log(error);
                    setVariant("error");
                    if (error.networkError) {
                        setInfo("Please try after this action");
                    }
                    if (error.graphQLErrors)
                        error.graphQLErrors.map(({ message, locations, path }) =>
                            setInfo(message)
                        );
                })


            //await sleep(1e3); // For demo purposes.

        })(); */

        return () => {
            active = false;
        };
    }, [loadingInput,]);

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
                        { name: "Rate", path: "/company/rate" },
                        { name: "Add or Edit Rate" }
                    ]}
                />
            </div>
            <Card>
                <div className="p-9 h-full">
                    <div className={classes.root}>
                        <ValidatorForm ref={useRef("form")} onSubmit={handleFormSubmit}>
                            <Grid container spacing={6}>
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
                                        getOptionLabel={option => option.name}
                                        options={options}
                                        loading={loadingInput}
                                        /* inputValue={country}
                                        onInputChange={(event, value) => {
                                            value != null && setCountry(value.name)
                                        }} */
                                        value={country}
                                        onChange={(event, value) => {
                                            //console.log(value);
                                            value != null && setCountry(value)

                                        }}
                                        filterOptions={filterOptions}
                                        renderInput={params => (
                                            <TextField
                                                {...params}
                                                label="Country of destination"
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
                                        label="Cities eg: City or city-city"
                                        onChange={handleChange}
                                        type="text"
                                        name="cities"
                                        value={cities}
                                        validators={["required"]}
                                        errorMessages={["this field is required"]}
                                    />
                                    <ShippingWay
                                        shipMethod={shipMethod}
                                        typeService={typeService}
                                        handleChange={handleChange} />

                                    {/* <TextValidator

                                        className="mb-6 w-full"
                                        variant="outlined"
                                        label="Shipping Method"
                                        onChange={handleChange}
                                        type="text"
                                        name="shipMethod"
                                        value={shipMethod}
                                        validators={["required"]}
                                        errorMessages={["this field is required"]}
                                    />
                                    <TextValidator

                                        className="mb-6 w-full"
                                        variant="outlined"
                                        label="Type of service"
                                        onChange={handleChange}
                                        type="text"
                                        name="typeService"
                                        value={typeService}
                                    /> */}
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <TextValidator

                                        className="mb-6 w-full"
                                        variant="outlined"
                                        label="Goods"
                                        onChange={handleChange}
                                        type="text"
                                        name="goods"
                                        value={goods}
                                        validators={["required"]}
                                        errorMessages={["this field is required"]}
                                    />
                                    <TextValidator

                                        className="mb-6 w-full"
                                        variant="outlined"
                                        label="Weights eg: 1-50 KG"
                                        onChange={handleChange}
                                        type="text"
                                        name="interKG"
                                        value={interKG}
                                        validators={["required"]}
                                        errorMessages={["this field is required"]}
                                    />
                                    <TextValidator

                                        className="mb-6 w-full"
                                        variant="outlined"
                                        label="Price eg: 100RMB / 130Currency by KG"
                                        onChange={handleChange}
                                        type="text"
                                        name="price"
                                        value={price}
                                        validators={["required"]}
                                        errorMessages={["this field is required"]}
                                    />
                                    <TextValidator

                                        className="mb-6 w-full"
                                        variant="outlined"
                                        label="Time of shipping (days)  eg: 4-7"
                                        onChange={handleChange}
                                        type="text"
                                        name="time"
                                        value={time}
                                        validators={["required"]}
                                        errorMessages={["this field is required"]}
                                    />
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
    rate: state.rate
});

export default connect(mapStateToProps, { success, loading, addRate, updateRate })(CU_Rate);