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
import InputModal from '../components/InputModal';
import ShowInfo from '../components/message';
import { loading, success } from "../../redux/actions/LoginActions";
import { useMutation, useQuery } from '@apollo/client';
import { ORDER_LIST, DELETE_ORDER, ADD_POSITION, ADD_PRICE } from '../../../graphql/Order';
import { refetchOrder, updateOrder, deleteOrder } from '../../redux/actions/OrderActions';
import { checkError } from "../../../utils";
import { FormattedMessage } from 'react-intl';
import ReturnServeur from "../components/ReturnServeur";

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
            setVariant("error");
            let msg = checkError(error)
            setInfo(<ReturnServeur info={msg} />);
            setShow(true);
            props.success();

        }
    });

    const [add_position, { data: dataPosition, loading: loadingPosition, error: errorPosition }] = useMutation(ADD_POSITION, {
        errorPolicy: 'all',
        variables: {
            id: id,
            status: packageStatut,
            description: descriptionStatut,
            who_confirmed_signed: props.user.names
        },
        onCompleted: (data) => {
            setOpenModalInput(false)
            //console.log(dataPosition);

            if (data.add_position) {
                props.updateOrder(data.add_position)
                setVariant("success");
                setInfo(
                    <FormattedMessage
                        id="result.POSITION_ADDED"
                        defaultMessage="Position updated"
                    />);
                setShow(true);

            }
            props.success()
        },
        onError: (error) => {
            //console.log("onError");
            //console.log(error);
            setOpenModalInput(false)

            setVariant("error");
            let msg = checkError(error)
            setInfo(<ReturnServeur info={msg} />);
            setShow(true);
            props.success();

        }
    });
    const goToSeeDetails = (id) => {
        props.history.push("/order/detail_order", [{
            order: {
                id: id
            },
        }])
    }

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
                setInfo(
                    <FormattedMessage
                        id="result.PRICE_ADDED"
                        defaultMessage="Price added"
                    />);
                setShow(true);
            }
        },
        onError: (error) => {
            //console.log("onError");
            //console.log(error);
            setOpenModalInput(false)
            setVariant("error");
            let msg = checkError(error)
            setInfo(<ReturnServeur info={msg} />);
            setShow(true);
            props.success();

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
            name: "current_statut",
            label: "Statut",
            options: {
                filter: true,
                sort: false,
                display: 'excluded',
                //setCellProps: () => ({ style: { whiteSpace: 'nowrap' } })
            }
        },
        {
            name: "code",
            label: "Code",
            options: {
                filter: true,
                sort: true,
                //setCellProps: () => ({ style: { whiteSpace: 'nowrap', justify: 'center' } }),
                customBodyRender: (value, tableMeta) => {
                    //alert(value)
                    return (
                        <div style={{ whiteSpace: 'normal' }}
                            onClick={() => {
                                //console.log(value);
                                goToSeeDetails(tableMeta.rowData[0])
                                /* props.history.push("/order/detail_order", [{
                                    order: {
                                        id: tableMeta.rowData[0]
                                    },
                                }]) */
                            }}>
                            {value}
                        </div >
                    );
                }
            }
        },
        {
            name: "paid",
            label: <FormattedMessage
                id="title.paid"
                defaultMessage="PAID"
            />,
            options: {
                filter: true,
                sort: false,
                //display: 'excluded',
                customBodyRender: (value, tableMeta) => {
                    //console.log(tableMeta.rowData[2] === "SIGNED" || props.user.role === "GUEST")
                    return (
                        <div onClick={() => {
                            goToSeeDetails(tableMeta.rowData[0])

                        }}>
                            <small className={`border-radius-4 ${value === true ? 'bg-green' : 'bg-secondary'} text-black px-2 py-2px`} >
                                {value === true ? <FormattedMessage
                                    id="info.PAID"
                                    defaultMessage='PAID'
                                /> : <FormattedMessage
                                        id="info.NOT_PAID"
                                        defaultMessage='NOT_PAID'
                                    />}
                            </small>
                        </div>
                    )
                }
            }
        },
        {
            name: "r_city",
            label: <FormattedMessage
                id="title.city"
                defaultMessage="City"
            />,
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <div onClick={() => {
                            goToSeeDetails(tableMeta.rowData[0])

                        }}>
                            {value}
                        </div >
                    );
                }
            }
        },
        {
            name: "r_phone",
            label: <FormattedMessage
                id="title.phone"
                defaultMessage="Phone"
            />,
            options: {
                filter: true,
                sort: false,
                /* setCellHeaderProps: () => ({
                    style: { width: '127px' }
                }), */
                //setCellProps: () => ({ style: { width: '200px' } }),
                customBodyRender: (value, tableMeta) => {
                    return (
                        <div style={{ whiteSpace: 'normal' }} onClick={() => {
                            goToSeeDetails(tableMeta.rowData[0])
                        }}>
                            {value}
                        </div >
                    );
                }
            }
        },
        {
            name: "r_name",
            label: <FormattedMessage
                id="title.receiver"
                defaultMessage="Receiver"
            />,
            options: {
                filter: true,
                sort: false,

                customBodyRender: (value, tableMeta) => {
                    return (
                        <div style={{ whiteSpace: 'normal' }}
                            onClick={() => {
                                goToSeeDetails(tableMeta.rowData[0])
                            }}>
                            {value}
                        </div >
                    );
                }
            },
        },
        {
            name: "content",
            label: <FormattedMessage
                id="title.content"
                defaultMessage="Content"
            />,
            options: {
                filter: true,
                sort: false,
                display: 'excluded',
                setCellHeaderProps: () => ({
                    //style: { width: '100px', align: 'center' }
                }),
            },
        },
        {
            name: "price",
            label: <FormattedMessage
                id="title.price"
                defaultMessage="Price"
            />,
            options: {
                filter: true,
                sort: false,
                /* setCellHeaderProps: () => ({
                    style: { width: '100px' }
                }), */
                customBodyRender: (value, tableMeta) => {

                    return (
                        <div style={{ whiteSpace: 'normal' }}
                            onClick={() => {
                                setShow(false);
                                //console.log(tableMeta.rowData);
                                if (props.user.role !== "GUEST" && tableMeta.rowData[1] !== "SIGNED") {
                                    addPrice(tableMeta.rowData[0], tableMeta.rowData[3])
                                } /* else if (props.user.role !== "OWNER" && value !== null) {
                                    addPrice(tableMeta.rowData[0], tableMeta.rowData[3])
                                }  */else {

                                    setVariant("warning");
                                    setInfo(
                                        <FormattedMessage
                                            id="error.NOT_ALLOW"
                                            defaultMessage="Sorry you can't apply this request"
                                        />);
                                    setShow(true);
                                    //alert("ok")
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
            label: <FormattedMessage
                id="title.agenceSender"
                defaultMessage="Agence Sender"
            />,
            options: {
                filter: true,
                sort: false,
                display: 'excluded',
                //setCellProps: () => ({ style: { whiteSpace: 'nowrap' } })
            }
        },
        {
            name: "numKuadi",
            label: <FormattedMessage
                id="title.pckCodeSender"
                defaultMessage="Pck Code Sender"
            />,
            options: {
                filter: true,
                sort: false,
                display: 'excluded',
                //setCellProps: () => ({ style: { whiteSpace: 'nowrap' } })
            }
        },
        {
            name: "company",
            label: <FormattedMessage
                id="title.company"
                defaultMessage="Company"
            />,
            options: {
                filter: false,
                sort: false,
                display: 'excluded',
            }
        },
        {
            name: "weight",
            label: <FormattedMessage
                id="title.weight"
                defaultMessage="Weight"
            />,
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
                /* setCellHeaderProps: () => ({
                    style: { width: '100px' }
                }), */
                //setCellProps: () => ({ style: { whiteSpace: 'nowrap' } }),
                customBodyRender: (value, tableMeta, updateValue) => {
                    //console.log(tableMeta.rowData[2] === "SIGNED" || props.user.role === "GUEST")
                    return (
                        <div style={{ whiteSpace: 'normal' }}
                            onClick={() => {
                                //console.log(tableMeta.rowData);
                                //tableMeta.rowData[2] !== "SIGNED" && addStatut(tableMeta.rowData[0], tableMeta.rowData[3], tableMeta.rowData[2])

                                setShow(false);
                                //console.log(value);
                                if (props.user.role !== "GUEST" && tableMeta.rowData[1] !== "SIGNED") {
                                    addStatut(tableMeta.rowData[0], tableMeta.rowData[2], tableMeta.rowData[1])
                                } else {

                                    setVariant("warning");
                                    setInfo(
                                        <FormattedMessage
                                            id="error.NOT_ALLOW"
                                            defaultMessage="Sorry you can't apply this request"
                                        />);
                                    setShow(true);
                                    //alert("ok")
                                }
                            }}>
                            {
                                /* tableMeta.rowData[2] === "SIGNED" ?
                                    (<IconButton >
                                        <Icon color="secondary">check_circle</Icon>
                                    </IconButton>
                                    ) :
                                    ( */

                                <small className={`border-radius-4 ${tableMeta.rowData[1] === "STAND BY" ? "bg-primary" :
                                    tableMeta.rowData[1] === "RECEIVED" ? "bg-secondary" :
                                        tableMeta.rowData[1] === "IN TRANSIT" ? "bg-light-primary" :
                                            tableMeta.rowData[1] === "ARRIVED" ? "bg-secondary" :
                                                tableMeta.rowData[1] === "READY FOR PICKUP" ? "bg-light-green" : "bg-green"} text-black px-2 py-2px`}>
                                    <ReturnServeur info={tableMeta.rowData[1]} />
                                </small>

                                //)
                            }
                            {/* <Icon color="primary">add_location</Icon> */}
                        </div>
                    )
                }
            }
        },

        {
            name: "Edit",
            label: <FormattedMessage
                id="title.edit"
                defaultMessage="Edit"
            />,
            options: {
                filter: false,
                sort: false,
                empty: true,
                /* setCellHeaderProps: () => ({
                    style: { width: '50px', justify: 'center' }
                }),
                setCellProps: () => ({
                    style: { width: '50px', justify: 'center' }
                }), */
                customBodyRender: (value, tableMeta, updateValue) => {
                    //console.log('customBodyRender');
                    //console.dir(tableMeta.rowData);
                    return (
                        <IconButton
                            onClick={() => {
                                //console.log(["OWNER", "ADMIN_MEMBER"].includes(props.user.role) && tableMeta.rowData[1] === "RECEIVED");
                                if (((props.user.role === "GUEST" && tableMeta.rowData[1] === "STAND BY") ||
                                    (["OWNER", "ADMIN_MEMBER"].includes(props.user.role) && tableMeta.rowData[1] === "RECEIVED"))) {
                                    props.history.push("/order/add_order", [{
                                        acion: "update",
                                        order: {
                                            id: tableMeta.rowData[0],
                                            current_statut: tableMeta.rowData[1],
                                            code: tableMeta.rowData[2],
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
                                            sender_name: tableMeta.rowData[19],
                                            sender_phone: tableMeta.rowData[20],
                                        },
                                        action: "update"
                                    }])
                                } else {
                                    if (tableMeta.rowData[1] !== "SIGNED") {
                                        setVariant("warning");
                                        setInfo(
                                            props.user.role === "GUEST" ? <FormattedMessage
                                                id="result.NOT_ALLOW_CONTACT_COMPANY"
                                                defaultMessage="Sorry you can't apply this request"
                                            /> : <FormattedMessage
                                                    id="error.NOT_ALLOW_COMPANY_MODIFY_COMPANY"
                                                    defaultMessage="Sorry you can't apply this request"
                                                />
                                        )
                                        setShow(true);
                                    }

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
            label: <FormattedMessage
                id="title.delete"
                defaultMessage="Delete"
            />,
            options: {
                filter: false,
                sort: false,
                empty: true,
                /* setCellHeaderProps: () => ({
                    style: { width: '50px' }
                }), */

                customBodyRender: (value, tableMeta, updateValue) => {
                    //alert(["SIGNED", "READY FOR PICKUP", "ARRIVED", "IN TRANSIT"].includes("IN TRANSIT"))
                    //console.log(tableMeta.rowData[2])
                    return (
                        <IconButton
                            onClick={() => {
                                if (((props.user.role === "GUEST" && tableMeta.rowData[1] === "STAND BY") ||
                                    (["OWNER", "ADMIN_MEMBER"].includes(props.user.role) && tableMeta.rowData[1] === "RECEIVED"))) {
                                    askConfirmation(tableMeta.rowData[0])
                                }

                            }}>
                            <Icon color="error">delete</Icon>
                        </IconButton >
                    );
                }
            }
        },
        {
            name: "sender_name",
            label: "sender_name",
            options: {
                filter: false,
                sort: false,
                display: 'excluded',
            }
        },
        {
            name: "sender_phone",
            label: <FormattedMessage
                id="title.customerPhone"
                defaultMessage="Customer phone"
            />,
            options: {
                filter: true,
                sort: false,
                display: 'excluded',
                //setCellProps: () => ({ style: { whiteSpace: 'nowrap' } })
            }
        },
    ];
    const options = {
        //filterType: 'dropdown',
        sortOrder: {
            name: 'id',
            direction: 'desc'
        },
        //responsive: "simple",
        //selectableRows: 'single',
        rowsPerPage: 20,
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
                if (data.data.delete_order.id) {

                    setInfo(
                        <FormattedMessage
                            id="result.PACKAGE_DELETED"
                            defaultMessage="Package deleted"
                        />);
                    setVariant('success');
                } else {
                    setInfo("Error, Try after !");
                    setVariant('error');
                }
                props.deleteOrder(data.data.delete_order.id)
                setShow(true);
                props.success();
            })
            .catch(error => {
                setVariant("error");
                let msg = checkError(error)
                setInfo(<ReturnServeur info={msg} />);
                setShow(true);
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
        setTitleModal(<FormattedMessage
            id="info.TRACKING_I_P"
            defaultMessage="Tracking information of package : "
            values={{
                code: code
            }}
        />);
        setContentTextModal(<FormattedMessage
            id="info.PUT_I_P"
            defaultMessage="Put more informations about the position of the package"
        />);
    };
    const handleChange = event => {
        //console.log(event);
        event.persist();
        switch (event.target.name) {
            case "price":
                setPrice(event.target.value)
                break;
            case "packageStatut":
                //console.log(event.target.value);
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
        //console.log(id);
        //console.log(price);
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
                        if (res.data) {
                            props.refetchOrder(res.data.order_list)
                        }
                        else {
                            setVariant("error");
                            let msg = checkError(res.errors)
                            setInfo(<ReturnServeur info={msg} />);
                            setShow(true);
                        }

                    })
                    .catch(error => {
                        //console.log("onError");
                        //console.log(error);
                        setVariant("error");
                        let msg = checkError(error)
                        setInfo(<ReturnServeur info={msg} />);
                        setShow(true);
                        props.success();
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
                message={
                    <FormattedMessage
                        id="message.questionDeletePackage"
                        defaultMessage="You won't see anymore this package on your table"
                    />
                }
                title={
                    <FormattedMessage
                        id="title.questionDeletePackage"
                        defaultMessage="Are you sure to delete this package ?"
                    />
                } />
            <div className="mb-sm-30">
                <div className="mb-sm-30">
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <Breadcrumb
                                routeSegments={[
                                    { name: "Dashboard", path: "/dashboard/analytics" },
                                    {
                                        name: <FormattedMessage
                                            id="title.packageList"
                                            defaultMessage="Package List"
                                        />
                                    }
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
                                            if (res.data) {
                                                props.refetchOrder(res.data.order_list)
                                                props.success();
                                            } else {
                                                setVariant("error");
                                                let msg = checkError(res.data.errors)
                                                setInfo(<ReturnServeur info={msg} />);
                                                setShow(true);
                                                props.success();
                                            }

                                        })
                                        .catch(error => {
                                            setVariant("error");
                                            let msg = checkError(error)
                                            setInfo(<ReturnServeur info={msg} />);
                                            setShow(true);
                                            props.success();
                                            //setInfo(error);
                                        })
                                }}
                                disabled={props.login.loading}
                            >
                                <Icon>sync</Icon>
                                <span className="pl-2 capitalize">
                                    <FormattedMessage
                                        id="title.reload"
                                        defaultMessage="Reload"
                                    /></span>
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
                                <span className="pl-2 capitalize">
                                    <FormattedMessage
                                        id="title.new"
                                        defaultMessage="New"
                                    /></span>
                            </Button>
                        </Grid>

                    </Grid>
                </div>
                <div className="mb-sm-30">
                    <div className="w-full overflow-auto">
                        <MUIDataTable
                            title={loading && <LinearProgress color="secondary" size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />}
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
    deleteOrder: PropTypes.func.isRequired,
    order: state.order
});
export default connect(mapStateToProps, { success, loading, deleteOrder, refetchOrder, updateOrder })(ListOrder);