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
import InputModal from '../components/InputModal'
import ShowInfo from '../components/message';
import { loading, success } from "../../redux/actions/LoginActions";
import { useMutation, useQuery } from '@apollo/client';
import { ORDER_LIST, DELETE_ORDER, ADD_POSITION, ADD_PRICE } from '../../../graphql/Order';
import { addOrder, refetchOrder, updateOrder } from '../../redux/actions/OrderActions';

const ListOrder = (props) => {
    const [variant, setVariant] = useState('error')
    const [info, setInfo] = useState(null)
    const [show, setShow] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [openModalInput, setOpenModalInput] = useState(false)
    const [id, setId] = useState();

    const [price, setPrice] = useState();
    //const [numKuadi, setNumKuadi] = useState();
    const [submitInputModal, setSubmitInputModal] = useState();
    const [titleModal, setTitleModal] = useState();
    const [contentTextModal, setContentTextModal] = useState();
    const [action, setAction] = useState();
    const [packageStatut, setPackageStatut] = useState();
    const [descriptionStatut, setDescriptionStatut] = useState();
    const { refetch, loading, error, data } = useQuery(ORDER_LIST, {
        errorPolicy: 'all',
        variables: {
            role: props.user.role,
            skip: 0,
            take: 50,
        },
        onCompleted: (data) => {
            //console.log(data.order_list);
            props.refetchOrder(data.order_list)
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

    const [add_position, { data: dataPosition, loading: loadingPosition, error: errorPosition }] = useMutation(ADD_POSITION, {
        errorPolicy: 'all',
        variables: {
            id: id,
            status: packageStatut,
            description: descriptionStatut
        },
        onCompleted: (data) => {
            setOpenModalInput(false)
            console.log(dataPosition);
            setVariant("success");
            if (data.add_position) {
                setInfo("Submitted");
                setShow(true);
            }
        },
        onError: (error) => {
            //console.log("onError");
            //console.log(error);
            setOpenModalInput(false)
            if (error.networkError) {
                setVariant("warning");
                setInfo("Please try after this action");
            }
            if (error.graphQLErrors)
                error.graphQLErrors.map(({ message, locations, path }) =>
                    setInfo(message)
                );
            setShow(true);

        }
    });

    const [add_price, { data: dataPrice, loading: loadingPrice, error: errorPrice }] = useMutation(ADD_PRICE, {
        errorPolicy: 'all',
        variables: {
            id: id,
            price: price,
            //who_add_paid: props.user.names,
        },
        onCompleted: (data) => {
            setOpenModalInput(false)
            //console.log(dataPrice);

            if (data.add_price) {
                setVariant("success");
                //console.log(data);
                props.updateOrder(data.add_price)
                /* refetch()
                    .then(res => {
                        //console.log(res);
                        props.refetchOrder(res.data.order_list)
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
                    }) */
                setInfo("Submitted");
                setShow(true);
            }
        },
        onError: (error) => {
            //console.log("onError");
            //console.log(error);
            setOpenModalInput(false)
            if (error.networkError) {
                setVariant("warning");
                setInfo("Please try after this action");
            }
            if (error.graphQLErrors)
                error.graphQLErrors.map(({ message, locations, path }) =>
                    setInfo(message)
                );
            setShow(true);

        }
    })

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
            name: "paid",
            label: "Paid",
            options: {
                filter: true,
                sort: false,
                display: 'excluded',
                setCellProps: () => ({ style: { whiteSpace: 'nowrap' } })
            }
        },
        {
            name: "current_statut",
            label: "Statut",
            options: {
                filter: true,
                sort: false,
                display: 'excluded',
                setCellProps: () => ({ style: { whiteSpace: 'nowrap' } })
            }
        },
        {
            name: "code",
            label: "Code",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta) => {
                    //alert(value)
                    return (
                        <div onClick={() => {
                            //console.log(value);
                            props.history.push("/order/detail_order", [{
                                order: {
                                    id: tableMeta.rowData[0]
                                },
                            }])
                        }}>
                            {value}
                        </div >
                    );
                }
            }
        },
        {
            name: "r_city",
            label: "City",
            options: {
                filter: true,
                sort: false,
                setCellProps: () => ({ style: { whiteSpace: 'nowrap' } })
            }
        },
        {
            name: "r_phone",
            label: "Phone",
            options: {
                filter: true,
                sort: false,
                setCellProps: () => ({ style: { whiteSpace: 'nowrap' } })
            }
        },
        {
            name: "r_name",
            label: "Receiver",
            options: {
                filter: true,
                sort: false,
                setCellProps: () => ({ style: { whiteSpace: 'nowrap' } })
            },
        },
        {
            name: "content",
            label: "Content",
            options: {
                filter: true,
                sort: false,
                setCellProps: () => ({ style: { whiteSpace: 'nowrap' } }),
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
            name: "price",
            label: "Price",
            options: {
                filter: true,
                sort: false,
                setCellProps: () => ({ style: { whiteSpace: 'nowrap' } }),
                customBodyRender: (value, tableMeta) => {

                    return (
                        <div
                            onClick={() => {
                                setShow(false);
                                //console.log(value);
                                if (value === null) {
                                    addPrice(tableMeta.rowData[0], tableMeta.rowData[3])
                                } else if (props.user.role === "OWNER" && value !== null) {
                                    addPrice(tableMeta.rowData[0], tableMeta.rowData[3])
                                } else {
                                    setVariant("warning");
                                    setInfo("Sorry, you're not allow to modify the price.");
                                    setShow(true);
                                }

                            }}>
                            {value ? value : (<IconButton>
                                <Icon color="primary">
                                    add_circle_outline
                                </Icon>
                            </IconButton>)}
                        </div >
                    );
                }
            },
        },
        {
            name: "name_agence_sender",
            label: "Agence Sender",
            options: {
                filter: true,
                sort: false,
                display: 'excluded',
                setCellProps: () => ({ style: { whiteSpace: 'nowrap' } })
            }
        },
        {
            name: "numKuadi",
            label: "Pck Code Sender",
            options: {
                filter: true,
                sort: false,
                display: 'excluded',
                setCellProps: () => ({ style: { whiteSpace: 'nowrap' } })
            }
        },
        {
            name: "company",
            label: "Company",
            options: {
                filter: false,
                sort: false,
                display: 'excluded',
            }
        },
        {
            name: "weight",
            label: "weight",
            options: {
                filter: false,
                sort: false,
                display: 'excluded',
            }
        },
        {
            name: "r_country",
            label: "r_country",
            options: {
                filter: false,
                sort: false,
                display: 'excluded',
            }
        },
        {
            name: "shipMethod",
            label: "shipMethod",
            options: {
                filter: false,
                sort: false,
                display: 'excluded',
            }
        },
        {
            name: "typeService",
            label: "typeService",
            options: {
                filter: false,
                sort: false,
                display: 'excluded',
            }
        },
        {
            name: "Statut",
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
                setCellProps: () => ({ style: { whiteSpace: 'nowrap' } }),
                customBodyRender: (value, tableMeta, updateValue) => {

                    return (
                        <IconButton disabled={tableMeta.rowData[2] === "SIGNED" && true}
                            onClick={() => {
                                console.log(tableMeta.rowData);
                                tableMeta.rowData[2] !== "SIGNED" && addStatut(tableMeta.rowData[0], tableMeta.rowData[3], tableMeta.rowData[2])

                            }}>
                            {
                                tableMeta.rowData[2] === "SIGNED" ?
                                    (
                                        <Icon color="secondary">check_circle</Icon>
                                    ) :
                                    (
                                        <Icon color="primary">add_location</Icon>
                                    )
                            }

                        </IconButton>
                    )
                }
            }
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
                    //console.dir(tableMeta.rowData);
                    return (
                        <IconButton disabled={tableMeta.rowData[2] === "SIGNED" && true}
                            onClick={() => {
                                if (tableMeta.rowData[2] !== "STAND BY" && props.user.role === "GUEST") {
                                    setVariant("warning");
                                    setInfo("Sorry, you're not allow to do this request. Contact the company.");
                                    setShow(true);
                                } else {
                                    props.history.push("/order/add_order", [{
                                        acion: "update",
                                        order: {
                                            id: tableMeta.rowData[0],
                                            current_statut: tableMeta.rowData[2],
                                            code: tableMeta.rowData[3],
                                            r_city: tableMeta.rowData[4],
                                            r_phone: tableMeta.rowData[5],
                                            r_name: tableMeta.rowData[6],
                                            content: tableMeta.rowData[7],
                                            name_agence_sender: tableMeta.rowData[9],
                                            numKuadi: tableMeta.rowData[10],
                                            email_company: tableMeta.rowData[11].email,
                                            weight: tableMeta.rowData[12],
                                            r_country: tableMeta.rowData[13],
                                            shipMethod: tableMeta.rowData[14],
                                            typeService: tableMeta.rowData[15],
                                        },
                                        action: "update"
                                    }])
                                }

                            }}>
                            <Icon color="primary" >edit</Icon>
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
                setCellProps: () => ({ style: { whiteSpace: 'nowrap' } }),
                /* setCellHeaderProps: value => {
                    return {
                        style: {
                            width: '50px'
                        }
                    };
                }, */
                customBodyRender: (value, tableMeta, updateValue) => {
                    //alert(["SIGNED", "READY FOR PICKUP", "ARRIVED", "IN TRANSIT"].includes("IN TRANSIT"))
                    //console.log(tableMeta.rowData[2])
                    return (
                        <IconButton disabled={() => {
                            if ((props.user.role === "GUEST" && tableMeta.rowData[2] !== "STAND BY") ||
                                (props.user.role !== "GUEST" && (["SIGNED", "READY FOR PICKUP", "ARRIVED", "IN TRANSIT"].includes(tableMeta.rowData[2])))
                            ) {
                                return true;
                            };
                            return false;
                        }}
                            onClick={() => {
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
        //filterType: 'dropdown',
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

        /*  onRowClick: (rowData) => {
             //console.log(rowData);
             props.history.push("/order/detail_order", [{
                 order: {
                     id: rowData[0]
                 },
             }]) 
 
         }*/
    };
    const [delete_order] = useMutation(DELETE_ORDER);
    const deleteOrder = () => {
        //console.log(idDelete);
        setShow(false);
        props.loading();
        delete_order({
            variables: {
                id: parseInt(id)
            }
        })
            .then(data => {
                if (data.data.delete_rate.id) {
                    setInfo("Deleted !");
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
    const askConfirmation = (id) => {
        //console.log("OK");
        setOpenModal(true)
        setId(id)
    };
    const addPrice = (id, code) => {
        //console.log("OK");
        setOpenModalInput(true);
        setId(id);
        setTitleModal("Price of package " + code);
        setContentTextModal("Add the prices in different currencies");
        setSubmitInputModal("addPrice");
        setAction("addPrice")
    };
    const addStatut = (id, code, statut) => {
        //console.log("OK");
        setOpenModalInput(true);
        setId(id);
        setSubmitInputModal("addStatut");
        setAction("addStatut");
        setPackageStatut(statut);
        setTitleModal("Tracking information of package " + code);
        setContentTextModal("Put more informations about the position of the package");


    };
    const handleChange = event => {
        //console.log(event);
        event.persist();
        switch (event.target.name) {
            case "price":
                setPrice(event.target.value)
                break;
            case "packageStatut":
                console.log(event.target.value);
                setPackageStatut(event.target.value)
                break;
            case "descriptionStatut":
                setDescriptionStatut(event.target.value)
                break;
            default:
                break
        }

    };
    const submitAddPrice = () => {
        setOpenModalInput(false)
        console.log(id);
        console.log(price);
    };
    /*     const submitAddStatut = () => {
    
            
        } */
    const submitModal = () => {
        //console.log("submitModal");
        //console.log(submitInputModal);
        switch (submitInputModal) {
            case "addPrice":
                //submitAddPrice();
                add_price();
                break;
            case "addStatut":
                //submitAddStatut()
                add_position();
                break;
            default:
                break
        }
    }

    const handleClose = () => {
        setOpenModal(false);
        setOpenModalInput(false)
    }
    useEffect(() => {

        loading === false &&
            (async () => {
                //alert("OK")
                await refetch()
                    .then(res => {
                        props.refetchOrder(res.data.order_list)
                        props.success();
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
                        //setInfo(error);
                    })

            })();
    }, [loading,]);

    return (
        <div className="m-sm-30">
            <ShowInfo
                show={show}
                info={info}
                variant={variant} />
            <InputModal open={openModalInput}
                loading={props.login.loading}
                handleClose={handleClose}
                handleChange={handleChange}
                action={action}
                title={titleModal}
                ContentText={contentTextModal}
                price={price}
                statut={packageStatut}
                descriptionStatut={descriptionStatut}
                //numKuadi={numKuadi}
                onSubmit={submitModal}
            />
            <Confirmation open={openModal}
                handleClose={handleClose}
                loading={props.login.loading}
                funcAction={deleteOrder}
                message="You won't see anymore this package on your table"
                title="Are you sure to delete this package ?" />
            <div className="mb-sm-30">
                <div className="mb-sm-30">
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <Breadcrumb
                                routeSegments={[
                                    { name: "Dashboard", path: "/dashboard/analytics" },
                                    { name: "Package List" }
                                ]}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={async () => {
                                    //setOpenModalSearch(true)
                                    props.loading();
                                    await refetch()
                                        .then(res => {
                                            props.refetchOrder(res.data.order_list)
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
                                }}
                                disabled={props.login.loading}
                            >
                                <Icon>sync</Icon>
                                <span className="pl-2 capitalize">Reload</span>
                            </Button>
                            <Button
                                className="ml-25"
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    props.history.push("/order/add_order", [{
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
                <div className="mb-sm-30">
                    <div className="w-full overflow-auto">
                        <MUIDataTable
                            title={<Typography variant="h6">
                                Package List
                    {loading && <LinearProgress color="secondary" size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />}
                            </Typography>
                            }
                            data={props.order}
                            columns={columns}
                            options={options}
                        />

                    </div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = state => ({
    // setUser: PropTypes.func.isRequired
    loading: PropTypes.func.isRequired,
    success: PropTypes.func.isRequired,
    login: state.login,
    user: state.user,
    //addOrder: PropTypes.func.isRequired,
    refetchOrder: PropTypes.func.isRequired,
    updateOrder: PropTypes.func.isRequired,
    order: state.order
});
export default connect(mapStateToProps, { success, loading, refetchOrder, updateOrder })(ListOrder);