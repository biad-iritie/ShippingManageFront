import React, { useState,useEffect } from 'react'
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

import { ORDER_DETAIL } from '../../../graphql/Order';
import ShowInfo from '../components/message';
import { useQuery } from '@apollo/client';
import { loading, success } from "../../redux/actions/LoginActions";
import Loading from '../Loading';

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
    var moment = require('moment'); 
    const classes = useStyles();
    const [expanded, setExpanded] = useState("panel1");
    const [variant, setVariant] = useState('error')
    const [info, setInfo] = useState(null)
    const [show, setShow] = useState(false)
    const [order, setOrder] = useState(null)
    

    //const [prevStatus, setPrevStatus] = useState(null)
    //const [firstIndexStatut, setFirstIndexStatut] = useState(true)

    const handleChangePanel = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    //console.log(props.location.state[0].order.id);
    const { refetch,loading, error, data } = useQuery(ORDER_DETAIL, {
        errorPolicy: 'all',
        variables: {
            id: props.location.state[0].order.id,
            code: props.location.state[0].order.code,
            /* name_agence_sender: props.location.state[0].order.name_agence_sender,
            numKuadi: props.location.state[0].order.numKuadi */
        },
        onCompleted: (data) => {
            //console.log(data);
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
            
            
            //props.addOrder(data.order_list)
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
    useEffect(() => {
        //console.log(step3);
        loading === false &&
            (async () => {
                await refetch();
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
    const Tracking = (order) =>{
        
        if (order.length >0) {
            //console.log(order[0].status.color);
            const result=(<TimelineItem>
                <TimelineSeparator>
                    <TimelineDot className={order[0].status.color}> 
                    <BeenhereIcon />
                    </TimelineDot>
                    <TimelineConnector className={order[0].status.color} />
                </TimelineSeparator>
                <TimelineContent>
                  <Paper elevation={3} className={classes.paper}>
                    <Typography variant="h6" component="h1" className="capitalize">
                      {order[0].status.name}
                    </Typography>
                   {
                        order.map((detail) => (<div>
                                <Typography variant="body2" color="textSecondary">
                    {
                        moment(Number(detail.createdAt)).format("YYYY-MM-DD HH:mm")
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
    
    return (
        <div className="m-sm-30">
            <ShowInfo
                show={show}
                info={info}
                variant={variant} />
            <Loading open={loading} />
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: "Package List", path: "/order/list_order" },
                        { name: "Package Detail" }
                    ]}
                />
                {
                    order !== null ? (
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
                                            <Typography className={classes.heading}>Package information</Typography>
                                            <Typography variant="h6" className="font-bold">
                                                {order.code}</Typography>
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
                                                        Receiver
                                            </Typography>
                                                </li>
                                                <ListItem>
                                                    <Grid container spacing={6} alignItems="center">
                                                        <Grid item lg={6} md={6} sm={12} xs={12}>
                                                            <Typography gutterBottom variant="text-32" className="font-bold capitalize">
                                                                Name : {order.r_name}
                                                            </Typography>
                                                            <br />
                                                            <Typography gutterBottom variant="text-32" className="capitalize">
                                                                Country : {order.r_country}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item lg={6} md={6} sm={12} xs={12}>
                                                            <Typography gutterBottom variant="text-32" className="font-bold capitalize">
                                                                Number : {order.r_phone}
                                                            </Typography>
                                                            <br />
                                                            <Typography gutterBottom variant="text-32" className="capitalize">
                                                                City : {order.r_city}
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
                                                        Package
        </Typography>
                                                </li>
                                                <ListItem>
                                                    <Grid container spacing={6} alignItems="center">
                                                        <Grid item lg={6} md={6} sm={12} xs={12}>
                                                            <Typography gutterBottom variant="text-32" className="uppercase font-semibold">
                                                                From : {order.name_agence_sender} / {order.numKuadi}
                                                            </Typography>
                                                            <br />

                                                            <Typography gutterBottom variant="text-32" className="uppercase font-semibold">
                                                                Price : {order.price ? order.price : "?"}
                                                            </Typography>
                                                            <br />
                                                            {order.who_add_paid && props.user.role === "OWNER" ? (<Typography gutterBottom variant="text-32" className="capitalize font-semibold">
                                                                Who confirmed the payement : {order.who_add_paid}
                                                            </Typography>) : ""}

                                                        </Grid>
                                                        <Grid item lg={6} md={6} sm={12} xs={12}>
                                                            <Typography gutterBottom variant="text-32" className="capitalize font-semibold">
                                                                Content : {order.content}
                                                            </Typography>
                                                            <br />
                                                            <Typography gutterBottom variant="text-32" className="font-semibold uppercase">
                                                                Weight : {order.weight}
                                                            </Typography>
                                                            <br />
                                                            {
                                                                order.paid === true && (
                                                                    <Chip size="medium" color="secondary"
                                                                        label="Paid" />
                                                                )
                                                            }
                                                            {
                                                                order.complete === true && (
                                                                    <Chip size="medium"
                                                                        className="bg-green"
                                                                        label="Received and Signed" />
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
                                                        Concerns
        </Typography>
                                                </li>
                                                <ListItem>

                                                    <Grid container spacing={6} alignItems="center">
                                                        <Grid item lg={6} md={6} sm={12} xs={12}>
                                                        {props.user.role ? (<Typography gutterBottom variant="text-32" className="font-bold capitalize">
                                                                Customer : {order.user.names}
                                                            </Typography>) : ""}
                                                            
                                                            
                                                            <br />
                                                            {props.user.role ? (<Typography gutterBottom variant="text-32" className="capitalize">
                                                                Customer's number : {order.user.phone}
                                                            </Typography>) : ""}
                                                            
                                                        </Grid>
                                                        <Grid item lg={6} md={6} sm={12} xs={12}>
                                                            <Typography gutterBottom variant="text-32" className="font-bold capitalize">
                                                                Company : {order.company.name}
                                                            </Typography>
                                                            <br />
                                                            <Typography gutterBottom variant="text-32" className="capitalize">
                                                                Company's number : {order.company.phone1}{order.company.phone2 && (" / " + order.company.phone2)}
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
                                            <Typography className={classes.heading}>Tracking</Typography>
                                            <Typography className={classes.secondaryHeading}>
                                            Tracking information
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
          <Typography variant="body2" color="textSecondary">
          {step1[0].createdAt}
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot >
            <BeenhereIcon />
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1" className="capitalize">
            {step1[0].status.name}
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
                    ):(
                        <Card>
                            <div className="p-9 h-full" >
                                <div className={classes.root}>
                                This Package does'nt exist
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
});
export default withStyles(styles, { withTheme: true })(
    withRouter(connect(mapStateToProps, { success, loading })(DetailOrder))
)

