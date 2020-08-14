import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
    Table,
    TableHead,
    TableCell,
    TableBody,
    IconButton,
    Icon,
    Button,
    TableRow,
    Grid,
    LinearProgress
} from "@material-ui/core";
import { Breadcrumb, SimpleCard } from "matx";
import Confirmation from '../message/Confirmation';
import ShowInfo from '../message/message';
import { loading, error } from "../../redux/actions/LoginActions";
import { LIST_RATE } from '../../../graphql/Rate';
import { useLazyQuery, useMutation } from '@apollo/client';
import { addRate } from '../../redux/actions/RateAction';

const subscribarList = [
    {
        name: "john doe",
        date: "18 january, 2019",
        amount: 1000,
        status: "close",
        company: "ABC Fintech LTD."
    },
    {
        name: "kessy bryan",
        date: "10 january, 2019",
        amount: 9000,
        status: "open",
        company: "My Fintech LTD."
    },
    {
        name: "james cassegne",
        date: "8 january, 2019",
        amount: 5000,
        status: "close",
        company: "Collboy Tech LTD."
    },
    {
        name: "lucy brown",
        date: "1 january, 2019",
        amount: 89000,
        status: "open",
        company: "ABC Fintech LTD."
    },
    {
        name: "lucy brown",
        date: "1 january, 2019",
        amount: 89000,
        status: "open",
        company: "ABC Fintech LTD."
    },
    {
        name: "lucy brown",
        date: "1 january, 2019",
        amount: 89000,
        status: "open",
        company: "ABC Fintech LTD."
    }
];

const Rate = (props) => {
    const [variant, setVariant] = useState('error')
    const [info, setInfo] = useState(null)
    const [show, setShow] = useState(false)

    const [list_rate, { loading, error, data }] = useLazyQuery(LIST_RATE, {
        errorPolicy: 'all',
        onCompleted: (data) => {
            //console.log(data);
            props.addRate(data.list_rate)
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
    useEffect(() => {
        props.loading();
        list_rate()
    }, [data])
    //console.log(props.rate);
    return (
        <div className="m-sm-30">
            <ShowInfo
                show={show}
                info={info}
                variant={variant} />
            <Confirmation />
            <div className="mb-sm-30">
                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Breadcrumb
                            routeSegments={[
                                { name: "Company", path: "/dashboard/analytics" },
                                { name: "Rate" }
                            ]}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                props.history.push("/company/action_rate", [{
                                    action: "add"
                                }])
                            }}
                        //disabled={props.login.loading}
                        >
                            <Icon>add</Icon>
                            <span className="pl-2 capitalize">New</span>

                        </Button>
                    </Grid>

                </Grid>
            </div>
            <div className="w-full overflow-auto">
                <Table className="whitespace-pre">
                    <TableHead>
                        <TableRow>
                            <TableCell className="px-0">Country</TableCell>
                            <TableCell className="px-0">Cities</TableCell>
                            <TableCell className="px-0">Method</TableCell>
                            <TableCell className="px-0">Service</TableCell>
                            <TableCell className="px-0">Goods</TableCell>
                            <TableCell className="px-0">Weights</TableCell>
                            <TableCell className="px-0">Price</TableCell>
                            <TableCell className="px-0">Time </TableCell>
                            <TableCell className="px-0">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {props.login.loading ? (
                            <LinearProgress style={{ width: '100%' }} color="secondary" />


                        ) : null}
                        {
                            props.rate.length !== 0 && props.login.loading ? (
                                props.rate.map((rate, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="px-0 capitalize" align="left">
                                            {rate.country.name}
                                        </TableCell>
                                        <TableCell className="px-0 capitalize" align="left">
                                            {rate.cities}
                                        </TableCell>
                                        <TableCell className="px-0 capitalize" align="left">
                                            {rate.shipMethod}
                                        </TableCell>
                                        <TableCell className="px-0 capitalize">
                                            {rate.typeService}
                                        </TableCell>
                                        <TableCell className="px-0  capitalize">
                                            {rate.goods}
                                        </TableCell>
                                        <TableCell className="px-0 capitalize">
                                            {rate.interKg}
                                        </TableCell>
                                        <TableCell className="px-0 capitalize">
                                            {rate.price}
                                        </TableCell>
                                        <TableCell className="px-0 capitalize">
                                            {rate.time}
                                        </TableCell>
                                        <TableCell className="px-0">
                                            <IconButton>
                                                <Icon color="primary"
                                                    onClick={() => {
                                                        props.history.push("/company/action_rate", [{
                                                            rate: rate,
                                                            action: "update"
                                                        }])
                                                    }}>edit</Icon>
                                            </IconButton>
                                            <IconButton>
                                                <Icon color="error">delete</Icon>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : null
                        }
                    </TableBody>
                </Table>

            </div>
        </div>

    )
}

const mapStateToProps = state => ({
    // setUser: PropTypes.func.isRequired
    addRate: PropTypes.func.isRequired,
    loading: PropTypes.func.isRequired,
    error: PropTypes.func.isRequired,
    login: state.login,
    rate: state.rate
});
export default connect(mapStateToProps, { error, loading, addRate })(Rate);
