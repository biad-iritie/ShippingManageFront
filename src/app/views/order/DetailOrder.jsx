import React, { useState, useEffect } from 'react'
import {
    Card,
    Grid,

} from "@material-ui/core";
//import DoneIcon from '@material-ui/icons/Done';
import Chip from '@material-ui/core/Chip';
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Breadcrumb } from "matx";
import { withRouter } from "react-router-dom";
//import { withStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import Paper from '@material-ui/core/Paper';
import { FormattedMessage, FormattedDate } from 'react-intl';

import Confirmation from '../components/Confirmation';
import { ORDER_DETAIL, UPDATE_ORDER } from '../../../graphql/Order';
import ShowInfo from '../components/message';
import { useQuery, useMutation } from '@apollo/client';
import { loading, success } from "../../redux/actions/LoginActions";
import Loading from '../Loading';
import { setLayoutSettings } from "app/redux/actions/LayoutActions";
import { checkError } from "../../../utils";
import { updateOrder } from 'app/redux/actions/OrderActions';
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
    },
    paper: {
        padding: '6px 16px',

    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },

}));
var step1 = [];
var step2 = [];
var step3 = [];
var step4 = [];
var step5 = [];
var step6 = [];

const DetailOrder = (props) => {
    //console.log(props.location.state.order.id);
    //var moment = require('moment');
    const classes = useStyles();
    const [expanded, setExpanded] = useState("panel1");
    const [variant, setVariant] = useState('error');
    const [info, setInfo] = useState(null);
    const [show, setShow] = useState(false);
    const [order, setOrder] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const user = props.user;

    //const [prevStatus, setPrevStatus] = useState(null)
    //const [firstIndexStatut, setFirstIndexStatut] = useState(true)
    //console.log(user);

    const updateSidebarMode = () => {
        let { settings, setLayoutSettings } = props;

        setLayoutSettings({
            ...settings,
            layout1Settings: {
                topbar: {
                    show: true
                },
                leftSidebar: {
                    show: false,
                    mode: "close"
                }
            },
            layout2Settings: {
                mode: "full",
                topbar: {
                    show: false
                },
                navbar: { show: false }
            },
        });
    };
    if (!user.id) {
        //updateSidebarMode()
    }
    const handleChangePanel = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const [update_order, { data: dataOrder1, loading: loadingUpdate_order, error: errorOrder1 }] = useMutation(UPDATE_ORDER)

    const submitMarkPaid = () => {
        //alert("submitMarkPaid")
        setShow(false);
        update_order({
            //errorPolicy: 'all',
            variables: {
                id: parseInt(order.id),
                company: Number(order.company.id),
                name_agence_sender: order.name_agence_sender.toUpperCase(),
                numKuadi: order.numKuadi.toUpperCase(),
                content: order.content.toUpperCase(),
                weight: order.weight,
                r_name: order.r_name.toUpperCase(),
                r_phone: order.r_phone,
                r_city: order.r_city,
                r_country: order.r_country,
                shipMethod: order.shipMethod,
                typeService: order.typeService,
                paid: true,
                who_add_paidId: user.id,
                who_add_paid: user.names,
                sender_phone: order.sender_phone,
                sender_name: order.sender_name
            }
        })
            .then(res => {
                //alert("ok")
                if (res.data.update_order.id) {
                    /* setOrder({
                        'user.names' : user.names,
                        paid: true
                    }) */

                    props.loading()
                    refetch()
                        .then(data => {
                            //console.log("success");

                            if (data.data.order_detail.length > 0) {
                                setOrder(data.data.order_detail[0]);
                                props.success()
                            } else {
                                setOrder(null);
                            }
                        })
                        .catch(error => {

                            setVariant("error");
                            let msg = checkError(error)
                            setInfo(<ReturnServeur info={msg} />);
                            setOpenModal(false);
                            setShow(true);
                            props.success()
                        })
                    //props.updateOrder([res.data.update_order])

                    setInfo(
                        <FormattedMessage
                            id="info.MARK_AS_PAID"
                            defaultMessage="Mark as PAID"
                        />);
                    setVariant('success');

                    //history.goBack();
                } else {
                    setVariant("error");
                    let msg = checkError(error)
                    setInfo(<ReturnServeur info={msg} />);
                    setShow(true);
                }
                setOpenModal(false);
                setShow(true);
            })
            .catch(error => {
                //alert("error")
                console.log(error);
                setVariant("error");
                let msg = checkError(error)
                setInfo(<ReturnServeur info={msg} />);
                setOpenModal(false);
                setShow(true);
                //props.success();
            })
    }
    //console.log(props.location.state[0].order.id);
    const { refetch, loading, error, data } = useQuery(ORDER_DETAIL, {
        errorPolicy: 'all',
        variables: {
            id: props.location.state[0].order.id,
            code: props.location.state[0].order.code,
            /* name_agence_sender: props.location.state[0].order.name_agence_sender,
            numKuadi: props.location.state[0].order.numKuadi */
        },
        onCompleted: (data) => {
            console.log(data);
            if (data.order_detail.length > 0) {
                setOrder(data.order_detail[0]);
                step1 = [];
                step2 = [];
                step3 = [];
                step4 = [];
                step5 = [];
                step6 = [];
                data.order_detail[0].detailStatuts.map((detail) => {
                    findStep(detail)
                })
            } else {
                setOrder(null);
            }

        },
        onError: () => {
            setVariant("error");
            let msg = checkError(error)
            setInfo(<ReturnServeur info={msg} />);
            setShow(true);
            props.success();
        }
    });

    const handleClose = () => {
        setOpenModal(false);
    }
    useEffect(() => {
        //console.log(step3);
        loading === false &&
            (async () => {
                /* await refetch()
                .then(data => {
                    if (data.order_detail.length>0) {
                        setOrder(data.order_detail[0]);
                        step1 = [];
                        step2 = [];
                        step3 = [];
                        step4 = [];
                        step5 = [];
                        step6 = [];
                    data.order_detail[0].detailStatuts.map((detail) =>{
                        findStep(detail)
                    })
                    }else{
                        setOrder(null);
                    }
                })
                .catch(error => {
                    //console.log("onError");
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
            })();
    }, [loading]);

    const findStep = (status) => {
        //console.log(status);
        /* if (status.status.id == 1) {
            setStep1([...step1, ...status])
        } else if(status.status.id == 2) {
            setStep2([...step2, ...status])
        }else if(status.status.id == 3) {
            setStep3([...step3, ...status])
        } */
        switch (status.status.id) {
            case "1":
                //console.log("step1");
                step1.push(status)
                break;
            case "2":
                step2.push(status)
                break;
            case "3":
                //setStep3([...step3, status])
                step3.push(status)
                break;
            case "4":
                step4.push(status)
                break;
            case "5":
                step5.push(status)
                break;
            case "6":
                step6.push(status)
                break;
            default:
                break;
        }
    }
    const Tracking = (order) => {

        if (order.length > 0) {
            //console.log(order[0].status.color);
            const result = (<TimelineItem>
                <TimelineSeparator>
                    <TimelineDot className={order[0].status.color}>
                        <BeenhereIcon />
                    </TimelineDot>
                    <TimelineConnector className={order[0].status.color} />
                </TimelineSeparator>
                <TimelineContent>
                    <Paper elevation={3} className={classes.paper}>
                        <Typography variant="h6" component="h1" className="capitalize">
                            <ReturnServeur info={order[0].status.name} />
                        </Typography>
                        {
                            order.map((detail) => (<div key={detail.id}>
                                <Typography variant="body2" color="textSecondary">
                                    {
                                        //moment(Number(detail.createdAt)).format("YYYY-MM-DD HH:mm")
                                        <FormattedDate
                                            value={Number(detail.createdAt)}
                                            hour="numeric"
                                            minute="numeric"
                                            year="numeric"
                                            month="numeric"
                                            day="numeric"
                                        //weekday="long"
                                        />
                                    }
                                </Typography>
                                <Typography key={detail.id}>{detail.description}</Typography>
                            </div>
                            ))
                        }


                    </Paper>

                </TimelineContent>
            </TimelineItem>)
            return result;
        }

    }
    //console.log(["OWNER","ADMIN_MEMBER"].includes(user.role));
    return (

        <div className="m-sm-30">
            <ShowInfo
                show={show}
                info={info}
                variant={variant} />
            <Confirmation open={openModal}
                handleClose={handleClose}
                loading={loadingUpdate_order}
                funcAction={submitMarkPaid}
                title={<FormattedMessage
                    id="info.MARK_PAID"
                    defaultMessage="You are going to mark this package as PAID"
                />}
            //message={manageMsg('MARK_PAID')}
            />
            <Loading open={loading} />
            <div className="mb-sm-30">
                {
                    user.id ?
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
                                        id="title.packageDetail"
                                        defaultMessage="Package Detail"
                                    />
                                }
                            ]}
                        />
                        : ""
                }

                {
                    (order !== null && loading === false) && (
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
                                            <Typography variant="h6" className="font-bold">
                                                {order.code}
                                            </Typography>
                                            <Typography className="font-bold pl-10">
                                                <small className={`border-radius-4 ${order.paid === true ? 'bg-green' : 'bg-secondary'} text-black px-2 py-2px`}
                                                    onClick={() => {
                                                        (user.role !== "GUEST" && !order.paid) && setOpenModal(true)
                                                    }} >
                                                    {order.paid === true ?
                                                        <FormattedMessage
                                                            id="info.PAID"
                                                            defaultMessage="PAID"
                                                        /> :
                                                        <FormattedMessage
                                                            id="info.NOT_PAID"
                                                            defaultMessage="NOT PAID"
                                                        />}
                                                </small>
                                            </Typography>
                                            {order.paid && ["OWNER", "ADMIN_MEMBER"].includes(user.role) ? (
                                                <Typography gutterBottom variant="text-32" className="capitalize font-light pl-2">
                                                    <FormattedMessage
                                                        id="title.confirmedBy"
                                                        defaultMessage="Confirmed by: "
                                                        values={{
                                                            code: order.who_add_paid
                                                        }}
                                                    />

                                                </Typography>) : ""}

                                            {
                                                user.role !== "GUEST" && (
                                                    <Typography className="capitalize font-light pl-10">
                                                        <FormattedMessage
                                                            id="title.createdBy"
                                                            defaultMessage="Created by: "
                                                            values={{
                                                                name: order.user.names
                                                            }}
                                                        />
                                                    </Typography>
                                                )
                                            }

                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <List className={classes.root}>
                                                <li>
                                                    <Typography
                                                        className={classes.dividerFullWidth}
                                                        color="textSecondary"
                                                        display="block"
                                                        variant="caption"
                                                    >
                                                        <FormattedMessage
                                                            id="title.receiver"
                                                            defaultMessage="Receiver"
                                                        />
                                                    </Typography>
                                                </li>
                                                <ListItem>
                                                    <Grid container alignItems="center">
                                                        <Grid item lg={6} md={6} sm={12} xs={12}>

                                                            <Typography gutterBottom variant="text-32" className="font-bold capitalize">
                                                                <FormattedMessage
                                                                    id="title.name"
                                                                    defaultMessage="Name "
                                                                /> : {order.r_name}
                                                            </Typography>
                                                            <br />
                                                            {props.user.role ? (
                                                                <Typography gutterBottom variant="text-32" className="font-bold capitalize">
                                                                    <FormattedMessage
                                                                        id="title.number"
                                                                        defaultMessage="Number"
                                                                    /> : {order.r_phone}
                                                                </Typography>) : ""}
                                                        </Grid>
                                                        <Grid item lg={6} md={6} sm={12} xs={12}>
                                                            <Typography gutterBottom variant="text-32" className="capitalize">
                                                                <FormattedMessage
                                                                    id="title.country"
                                                                    defaultMessage="Country"
                                                                /> : {order.r_country}
                                                            </Typography>
                                                            <br />
                                                            <Typography gutterBottom variant="text-32" className="capitalize">
                                                                <FormattedMessage
                                                                    id="title.city"
                                                                    defaultMessage="City"
                                                                /> : {order.r_city}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </ListItem>
                                                <Divider component="li" />
                                                <li>
                                                    <Typography
                                                        className={classes.dividerFullWidth}
                                                        color="textSecondary"
                                                        display="block"
                                                        variant="caption"
                                                    >
                                                        <FormattedMessage
                                                            id="title.package"
                                                            defaultMessage="Package"
                                                        />
                                                    </Typography>
                                                </li>
                                                <ListItem>
                                                    <Grid container alignItems="center">
                                                        <Grid item lg={6} md={6} sm={12} xs={12}>
                                                            <Typography gutterBottom variant="text-32" className="uppercase font-semibold">
                                                                <FormattedMessage
                                                                    id="title.from"
                                                                    defaultMessage="From"
                                                                /> : {order.name_agence_sender} / {order.numKuadi}
                                                            </Typography>
                                                            <br />
                                                            <Typography gutterBottom variant="text-32" className="capitalize font-semibold">
                                                                <FormattedMessage
                                                                    id="title.content"
                                                                    defaultMessage="Content"
                                                                /> : {order.content}
                                                            </Typography>
                                                            <br />
                                                            <Typography gutterBottom variant="text-32" className="font-semibold uppercase">
                                                                <FormattedMessage
                                                                    id="title.weight"
                                                                    defaultMessage="Weight"
                                                                /> : {order.weight}
                                                            </Typography>


                                                        </Grid>
                                                        <Grid item lg={6} md={6} sm={12} xs={12}>
                                                            <Typography gutterBottom variant="text-32" className="uppercase font-semibold">
                                                                <FormattedMessage
                                                                    id="title.price"
                                                                    defaultMessage="Price"
                                                                /> : {order.price ? order.price : "?"}
                                                            </Typography>
                                                            <br />


                                                            {
                                                                order.current_statut === "SIGNED" && (
                                                                    <div >
                                                                        <Chip size="medium"
                                                                            className="bg-green"
                                                                            label="Signed" />
                                                                        <small className="capitalize font-light pl-2">
                                                                            {`Via ${order.who_confirmed_signed}`}
                                                                        </small>
                                                                    </div>

                                                                )
                                                            }


                                                        </Grid>
                                                    </Grid>
                                                </ListItem>
                                                <Divider component="li" />
                                                <li>
                                                    <Typography
                                                        className={classes.dividerInset}
                                                        color="textSecondary"
                                                        display="block"
                                                        variant="caption"
                                                    >
                                                        <FormattedMessage
                                                            id="title.concerns"
                                                            defaultMessage="Concerns"
                                                        />
                                                    </Typography>
                                                </li>
                                                <ListItem>

                                                    <Grid container alignItems="center">
                                                        <Grid item lg={6} md={6} sm={12} xs={12}>
                                                            {props.user.role ? (
                                                                <Typography gutterBottom variant="text-32" className="font-bold capitalize">
                                                                    <FormattedMessage
                                                                        id="title.customerName"
                                                                        defaultMessage="Concerns"
                                                                        values={{
                                                                            name: order.sender_name
                                                                        }}
                                                                    />
                                                                </Typography>) : ""}


                                                            <br />
                                                            {props.user.role ? (<Typography gutterBottom variant="text-32" className="capitalize">
                                                                <FormattedMessage
                                                                    id="title.customerNumber"
                                                                    defaultMessage="Customer's number"
                                                                    values={{
                                                                        number: order.sender_phone
                                                                    }}
                                                                />
                                                            </Typography>) : ""}

                                                        </Grid>
                                                        <Grid item lg={6} md={6} sm={12} xs={12}>
                                                            <Typography gutterBottom variant="text-32" className="font-bold capitalize">
                                                                <FormattedMessage
                                                                    id="title.companyName"
                                                                    defaultMessage="Company "
                                                                    values={{
                                                                        name: order.company.name
                                                                    }}
                                                                />
                                                            </Typography>
                                                            <br />
                                                            <Typography gutterBottom variant="text-32" className="capitalize">
                                                                <FormattedMessage
                                                                    id="title.companyNumber"
                                                                    defaultMessage="Company's number "

                                                                />{order.company.phone1}{order.company.phone2 && (" / " + order.company.phone2)}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </ListItem>
                                            </List>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion
                                        expanded={expanded === "panel2"}
                                        onChange={handleChangePanel("panel2")}
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                        >
                                            <Typography className={classes.heading}><FormattedMessage
                                                id="title.tracking"
                                                defaultMessage="Tracking"
                                            /></Typography>
                                            <Typography className={classes.secondaryHeading}>
                                                <FormattedMessage
                                                    id="title.trackingInfo"
                                                    defaultMessage="Tracking information"
                                                />
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Timeline align="alternate">
                                                {/* <TimelineItem>

<TimelineOppositeContent>
    
    <Typography variant="body2" color="textSecondary">
      10:00 am
    </Typography>
  </TimelineOppositeContent> 
  <TimelineSeparator>
    <TimelineDot color="primary"  >
    <BeenhereIcon />
    </TimelineDot>
            <TimelineConnector className={classes.secondaryTail} />
  </TimelineSeparator>
  <TimelineContent>
    <Paper elevation={3} className={classes.paper}>

      <Typography variant="h6" component="h1">
        Sleep
      </Typography>

      <Typography variant="body2" color="textSecondary">
      10:00 am
    </Typography>
      <Typography>Because you need rest</Typography>
      <Typography variant="body2" color="textSecondary">
      10:00 am
    </Typography>
      <Typography>Because you need rest</Typography> 
      
    </Paper>
    
  </TimelineContent>
</TimelineItem> */}
                                                {Tracking(step6)}
                                                {Tracking(step5)}
                                                {Tracking(step4)}
                                                {Tracking(step3)}
                                                {Tracking(step2)}

                                                {
                                                    step1.length > 0 && (
                                                        <TimelineItem>
                                                            <TimelineOppositeContent>

                                                            </TimelineOppositeContent>
                                                            <TimelineSeparator>
                                                                <TimelineDot >
                                                                    <BeenhereIcon />
                                                                </TimelineDot>
                                                            </TimelineSeparator>
                                                            <TimelineContent>
                                                                <Paper elevation={3} className={classes.paper}>
                                                                    <Typography variant="h6" component="h1" className="capitalize">
                                                                        <ReturnServeur info={step1[0].status.name} />
                                                                    </Typography>
                                                                    <Typography variant="body2" color="textSecondary">
                                                                        <FormattedDate
                                                                            value={Number(step1[0].createdAt)}
                                                                            hour="numeric"
                                                                            minute="numeric"
                                                                            year="numeric"
                                                                            month="numeric"
                                                                            day="numeric"
                                                                        //weekday="long"
                                                                        />
                                                                        {
                                                                            //moment(Number(step1[0].createdAt)).format("YYYY-MM-DD HH:mm")
                                                                        }
                                                                    </Typography>
                                                                </Paper>
                                                            </TimelineContent>
                                                        </TimelineItem>
                                                    )
                                                }

                                            </Timeline>
                                        </AccordionDetails>
                                    </Accordion>

                                </div>
                            </div>
                        </Card>
                    )
                }
                {
                    (loading === false && order === null) && (
                        <Card>
                            <div className="p-9 h-full" >
                                <div className={classes.root}>
                                    <FormattedMessage
                                        id="info.packageNotExist"
                                        defaultMessage="This Package does'nt exist"
                                    />

                                </div>
                            </div>
                        </Card>
                    )
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    login: state.login,
    loading: PropTypes.func.isRequired,
    success: PropTypes.func.isRequired,
    user: state.user,
    setLayoutSettings: PropTypes.func.isRequired,
    updateOrder: PropTypes.func.isRequired
});

export default withStyles(styles, { withTheme: true })(
    withRouter(connect(mapStateToProps, { setLayoutSettings, success, updateOrder, loading })(DetailOrder))
)

