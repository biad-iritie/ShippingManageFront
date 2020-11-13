import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
    IconButton,
    Icon,
    Button,
    Grid,
    LinearProgress,
    Typography
} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { Breadcrumb } from "matx";
import Confirmation from '../components/Confirmation';
import ShowInfo from '../components/message';
import { loading, success } from "../../redux/actions/LoginActions";
import { LIST_RATE, DELETE_RATE } from '../../../graphql/Rate';
import { useMutation, useQuery } from '@apollo/client';
import { addRate, deleteRate, refetchRate, } from '../../redux/actions/RateAction';

const Rate = (props) => {
    const [variant, setVariant] = useState()
    const [info, setInfo] = useState(null)
    const [show, setShow] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [idDelete, setIdDelete] = useState()
    /* const [updateState, setupdateState] = useState(
        props.history.location.state[0].action === "refresh" ? "true" : "false"
    ) */
    const { refetch, loading, error, data } = useQuery(LIST_RATE, {
        errorPolicy: 'all',
        onCompleted: (data) => {
            //console.log("OKKK");
            props.refetchRate(data.list_rate)
            //props.success();
        },
        onError: () => {
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
            //setInfo(error);

        }
    });
    const [delete_rate] = useMutation(DELETE_RATE);
    const deleteRate = () => {
        //console.log(idDelete);
        setShow(false);
        props.loading();
        delete_rate({
            variables: {
                id: parseInt(idDelete)
            }
        })
            .then(data => {
                if (data.data.delete_rate.id) {
                    setInfo("Rate deleted !");
                    setVariant('success');
                } else {
                    setInfo("Error, Try after !");
                    setVariant('error');
                }
                props.deleteRate(data.data.delete_rate.id)
                setShow(true);
                props.success();
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

                props.success();
            })
        handleClose()
    }
    useEffect(() => {
        //console.log(loading);
        //console.log(data);
        loading === false &&
            (async () => {
                //alert("OK")
                await refetch()
                    .then(res => {
                        props.refetchRate(res.data.list_rate)
                        props.success();
                    })
                    .catch(error => {
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
                    })

            })();
    }, [loading,]);

    //Close modal
    const handleClose = () => {
        setOpenModal(false);
    }
    const askConfirmation = (id) => {
        //console.log("OK");
        setOpenModal(true)
        setIdDelete(id)

    }
    //console.log(props.rate);
    //DELETE
    /*     <button onClick={() => {
            const { data } = this.state;
            data.shift();
            this.setState({ data });
        }}>
            Delete
        </button> */
    const columns = [

        {
            name: "id",
            label: "ID",
            options: {
                filter: false,
                sort: false,
                display: 'excluded',
            }
        },
        {
            name: "country",
            label: "Country",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    //console.log('customBodyRender');
                    //console.dir(value);
                    return value.name;
                }
            }
        },
        {
            name: "cities",
            label: "Cities",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "shipMethod",
            label: "Method",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "typeService",
            label: "Service",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "goods",
            label: "Goods",
            options: {
                filter: true,
                sort: true,
                setCellHeaderProps: value => {
                    return {
                        style: {
                            width: '200px'
                        }
                    };
                },
            },
        },
        {
            name: "interKg",
            label: "Weights",
            options: {
                filter: true,
                sort: false,
            },
        },
        {
            name: "price",
            label: "Price",
            options: {
                filter: true,
                sort: false,
                setCellHeaderProps: value => {
                    return {
                        style: {
                            width: '150px'
                        }
                    };
                },
            },
        },
        {
            name: "time",
            label: "Time",
            options: {
                filter: false,
                sort: false,
            },
        },
        {
            name: "Edit",
            options: {
                filter: false,
                sort: false,
                empty: true,
                setCellHeaderProps: value => {
                    return {
                        style: {
                            width: '50px'
                        }
                    };
                },
                customBodyRender: (value, tableMeta, updateValue) => {
                    //console.log('customBodyRender');
                    //console.log(tableMeta);
                    return (
                        <IconButton
                            onClick={() => {
                                props.history.push("/company/action_rate", [{
                                    rate: {
                                        id: tableMeta.rowData[0],
                                        cities: tableMeta.rowData[2],
                                        shipMethod: tableMeta.rowData[3],
                                        typeService: tableMeta.rowData[4],
                                        goods: tableMeta.rowData[5],
                                        interKg: tableMeta.rowData[6],
                                        price: tableMeta.rowData[7],
                                        time: tableMeta.rowData[8],
                                        country: tableMeta.rowData[1]
                                    },
                                    action: "update"
                                }])
                            }}>
                            <Icon color="primary">edit</Icon>
                        </IconButton>
                    )
                }
            }
        },
        {
            name: "Delete",
            options: {
                filter: false,
                sort: false,
                empty: true,
                /* setCellHeaderProps: value => {
                    return {
                        style: {
                            width: '50px'
                        }
                    };
                }, */
                customBodyRender: (value, tableMeta, updateValue) => {
                    //alert(dataIndex)
                    return (
                        <IconButton onClick={() => {
                            askConfirmation(tableMeta.rowData[0])
                        }}>
                            <Icon color="error">delete</Icon>
                        </IconButton >
                    );
                }
            }
        },

    ];

    const options = {
        //filterType: 'checkbox',
        sortOrder: {
            name: 'id',
            direction: 'desc'
        },
        responsive: "simple",
        //selectableRows: 'single',
        rowsPerPage: 10,
        selectableRows: false,
        responsive: 'standard',
        fixedHeader: true,
        download: false,
        print: false,
    };
    //console.log(props.rate);
    return (
        <div className="m-sm-30">
            <ShowInfo
                show={show}
                info={info}
                variant={variant} />
            <Confirmation open={openModal}
                handleClose={handleClose}
                loading={props.login.loading}
                funcAction={deleteRate}
                message="You won't see anymore this rate on your table"
                title="Are you sure to delete this row ?" />

            <div className="mb-sm-30">
                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Breadcrumb
                            routeSegments={[
                                { name: "Dashboard", path: "/dashboard/analytics" },
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
                <MUIDataTable
                    title={<Typography variant="h6">
                        Rate list
                    {loading && <LinearProgress color="secondary" size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />}
                    </Typography>
                    }
                    data={props.rate}
                    columns={columns}
                    options={options}
                />

            </div>
        </div>

    )
}

const mapStateToProps = state => ({
    // setUser: PropTypes.func.isRequired
    addRate: PropTypes.func.isRequired,
    refetchRate: PropTypes.func.isRequired,
    updateRate: PropTypes.func.isRequired,
    deleteRate: PropTypes.func.isRequired,
    loading: PropTypes.func.isRequired,
    success: PropTypes.func.isRequired,
    login: state.login,
    rate: state.rate
});
export default connect(mapStateToProps, { success, loading, addRate, refetchRate, deleteRate })(Rate);
/* const myTheme = createMuiTheme({
    overrides: {
        MUIDataTable: {
            responsiveScroll: {
                maxWidth: "2600px",
                //overflowY: 'scroll',
            }
        }
    }
}); */