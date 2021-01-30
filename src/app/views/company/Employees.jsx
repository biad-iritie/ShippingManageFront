import React, { useState, useEffect } from "react";
import { Breadcrumb } from "matx";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
    Icon,
    Button,
    IconButton,
    Grid,
    LinearProgress,
    Typography
} from "@material-ui/core";
import { useMutation, useQuery } from '@apollo/client';
import MUIDataTable from "mui-datatables";
import Confirmation from '../components/Confirmation';
import InputModal from '../components/InputModal';
import ShowInfo from '../components/message';
import { LIST_EMPLOYEES, DELETE_USER, UPDATE_EMPLOYEE_ROLE } from '../../../graphql/User';
import { loading, success } from "../../redux/actions/LoginActions";
import { deleteEmployee, refetchEmployee, } from '../../redux/actions/EmployeesActions';
import { manageMsg, checkError } from "../../../utils";

const Employees = (props) => {
    var moment = require('moment');
    const [variant, setVariant] = useState()
    const [info, setInfo] = useState(null)
    const [show, setShow] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [idDelete, setIdDelete] = useState()

    const [openModalInput, setOpenModalInput] = useState(false)
    const [id, setId] = useState();
    const [role, setRole] = useState();
    //const [numKuadi, setNumKuadi] = useState();
    const [submitInputModal, setSubmitInputModal] = useState();
    const [titleModal, setTitleModal] = useState();
    const [contentTextModal, setContentTextModal] = useState();
    const [action, setAction] = useState();
    const [descriptionStatut, setDescriptionStatut] = useState();


    const handleClose = () => {
        setOpenModal(false);
        setOpenModalInput(false)
    }
    const askConfirmation = (id) => {
        //console.log("OK");
        setOpenModal(true)
        setIdDelete(id)

    }
    const [delete_user] = useMutation(DELETE_USER);

    const deleteEmployee = () => {
        setShow(false);
        props.loading();
        delete_user({
            variables: {
                id: parseInt(idDelete),
                role: props.user.role
            }
        })
            .then(data => {
                if (data.data.delete_user.id) {
                    setInfo(manageMsg("EMPLOYEE_DELETED"));
                    setVariant('success');
                } /* else {
                    setInfo("Error, Try after !");
                    setVariant('error');
                } */
                props.deleteEmployee(data.data.delete_user.id)
                setShow(true);
                props.success();
            })
            .catch(error => {
                setVariant("error");
                let msg = checkError(error)
                setInfo(manageMsg(msg));
                setShow(true);
                props.success();
            })
        handleClose()
    }

    const { refetch, loading, error, data } = useQuery(LIST_EMPLOYEES, {
        errorPolicy: 'all',
        variables: {
            role: props.user.role
        },
        onCompleted: (data) => {
            //console.log("OKKK");
            const result = data.list_employees.map(res => res.user)
            props.refetchEmployee(result)
            //props.success();
        },
        onError: () => {
            setVariant("error");
            let msg = checkError(error)
            setInfo(manageMsg(msg));
            setShow(true);
            props.success();

        }
    });

    useEffect(() => {
        //console.log(loading);
        //console.log(data);
        loading === false &&
            (async () => {
                //alert("OK")
                await refetch()
                    .then(res => {
                        const result = res.data.list_employees.map(res => res.user)
                        props.refetchEmployee(result)
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
                            error.graphQLErrors.map(({ message, locations, path }) => {
                                if (message === "Not authenticated" || message === "jwt expired") {
                                    window.location.reload()
                                } else {
                                    setInfo(message)
                                }
                            }
                            );
                        //setInfo(error);
                    })

            })();
    }, [loading,]);
    const addRole = (id, role) => {
        //console.log("OK");
        setOpenModalInput(true);
        setId(id);
        setTitleModal("Change the role");
        setContentTextModal("Add the prices in different currencies");
        setSubmitInputModal("addRole");
        setAction("addRole")
        setRole(role)
    };

    const submitModal = () => {
        //console.log("submitModal");
        //console.log(submitInputModal);
        switch (submitInputModal) {
            case "addRole":
                //alert(role)
                add_role();
                break;
            default:
                break
        }
    }
    const [add_role] = useMutation(UPDATE_EMPLOYEE_ROLE, {
        errorPolicy: 'all',
        variables: {
            id: id,
            role: role,
        },
        onCompleted: (data) => {
            setOpenModalInput(false)
            //console.log(dataPosition);
            setVariant("success");
            if (data.update_employee_role) {
                setInfo(manageMsg("ROLE_ADDED"));
                setShow(true);
            }
        },
        onError: (error) => {
            //console.log("onError");
            //console.log(error);
            setOpenModalInput(false)

            setVariant("error");
            let msg = checkError(error)
            setInfo(manageMsg(msg));
            setShow(true);
            props.success();

        }
    });
    const handleChange = event => {
        //console.log(event);
        event.persist();
        switch (event.target.name) {
            case "role":
                setRole(event.target.value)
                break;
            default:
                break
        }

    };
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
            name: "names",
            label: "Names",
            options: {
                filter: true,
                sort: true,
                setCellHeaderProps: value => {
                    return {
                        style: {
                            width: '150px'
                        }
                    };
                },
                /* customBodyRender: (value, tableMeta,) => {
                    //console.log(value);
                    return (value.names)
 
                } */
            }
        },
        {
            name: "phone",
            label: "Phone",
            options: {
                filter: true,
                sort: true,
                /* customBodyRender: (value, tableMeta,) => {
                    //console.log(value);
                    return (value.phone)
 
                } */
            },
        },
        {
            name: "role",
            label: "Role",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta,) => {

                    return (
                        <div
                            onClick={() => {
                                //console.log();
                                addRole(tableMeta.rowData[0], value)
                            }}
                        >
                            {value === "STAFF_MEMBER" ?
                                "STAFF" : "ADMIN"}
                        </div>

                    )

                }
            },
        },
        {
            name: "last_login",
            label: "Last connection",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta,) => {
                    //console.log(value);
                    return (
                        value != null ?
                            moment(Number(value)).format("YYYY-MM-DD HH:mm")
                            : "???")
                },
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
            name: "Delete",
            options: {
                filter: false,
                sort: false,
                empty: true,

                customBodyRender: (value, tableMeta, updateValue) => {
                    //alert(dataIndex)
                    return (
                        <IconButton onClick={() => {
                            //console.log(tableMeta);
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
                role={role}
                descriptionStatut={descriptionStatut}
                //numKuadi={numKuadi}
                onSubmit={submitModal}
            />
            <Confirmation open={openModal}
                handleClose={handleClose}
                loading={props.login.loading}
                funcAction={deleteEmployee}
                message="You won't see anymore this employee on your table"
                title="Are you sure to delete?" />

            <div className="mb-sm-30">
                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Breadcrumb
                            routeSegments={[
                                { name: "Dashboard", path: "/dashboard/analytics" },
                                { name: "Employees" }
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
                                        const result = data.list_employees.map(res => res.user)
                                        props.refetchEmployee(result)
                                        props.success();
                                    })
                                    .catch(error => {
                                        setVariant("error");
                                        let msg = checkError(error)
                                        setInfo(manageMsg(msg));
                                        setShow(true);
                                        props.success();
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
                                props.history.push("/company/cu_employees", [{
                                    action: "add"
                                }])
                            }}
                            disabled={props.login.loading}
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
                        Employees list
                    {loading && <LinearProgress color="secondary" size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />}
                    </Typography>
                    }
                    data={props.employees}
                    columns={columns}
                    options={options}
                />

            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    // setUser: PropTypes.func.isRequired

    refetchEmployee: PropTypes.func.isRequired,
    deleteEmployee: PropTypes.func.isRequired,
    loading: PropTypes.func.isRequired,
    success: PropTypes.func.isRequired,
    employees: state.employees,
    user: state.user,
    login: state.login

});
export default connect(mapStateToProps, { success, loading, refetchEmployee, deleteEmployee })(Employees);
