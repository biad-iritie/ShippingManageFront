import React, { Component, Fragment, useState, useEffect } from "react";
import { Grid, Card } from "@material-ui/core";

import DoughnutChart from "../charts/echarts/Doughnut";

import ModifiedAreaChart from "./shared/ModifiedAreaChart";
import StatCards from "./shared/StatCards";
import TableCard from "./shared/TableCard";
//import RowCards from "./shared/RowCards";
import StatCards2 from "./shared/StatCards2";
//import UpgradeCard from "./shared/UpgradeCard";
//import Campaigns from "./shared/Campaigns";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import ShowInfo from '../components/message';
import { loading, success } from "../../redux/actions/LoginActions";
import { useQuery, useSubscription } from '@apollo/client';
import { ORDER_LIST, COUNT_PACKAGE, SUB_NEW_PACK } from '../../../graphql/Order';
import { refetchOrder } from '../../redux/actions/OrderActions';
//import { addCompany } from "../../redux/actions/CompanyAction";

const Dashboard1 = (props) => {
  //state = {};
  //console.log(props);
  const [variant, setVariant] = useState('error')
  const [info, setInfo] = useState(null)
  const [show, setShow] = useState(false)
  const user = props.user;

  const [nb_standBy, set_nb_standBy] = useState()
  const [nb_received, set_nb_received] = useState()
  const [nb_inTransit, set_nb_inTransit] = useState()
  const [nb_arrived, set_nb_arrived] = useState()
  const [nb_pickUp, set_nb_pickUp] = useState()
  const [nb_signed, set_nb_signed] = useState()
  //render() {
  let { theme } = props;

  //Data for the table 
  const { refetch, loading, error, data } = useQuery(ORDER_LIST, {
    errorPolicy: 'all',
    variables: {
      role: props.user.role,
      skip: 0,
      take: 15,
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
        error.graphQLErrors.map(({ message, locations, path }) => {
          if (message === "Not authenticated" || message === "jwt expired") {
            window.location.reload()
          } else {
            setInfo(message)
          }
        }
        );
      //setInfo(error);

    }
  });

  // To have the number of package in different status
  const { refetch: check1 } = useQuery(COUNT_PACKAGE, {
    errorPolicy: 'all',
    variables: {
      role: props.user.role,
      current_statut: "STAND BY"
    },
    onCompleted: (data) => {
      set_nb_standBy(data.count_package)
    },
    onError: () => {
      //console.log("onError");
      //console.log(error);
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

    }
  });
  const { refetch: check2 } = useQuery(COUNT_PACKAGE, {
    errorPolicy: 'all',
    variables: {
      role: props.user.role,
      current_statut: "RECEIVED"
    },
    onCompleted: (data) => {
      set_nb_received(data.count_package)
    },
    onError: (error) => {
      //console.log("onError");
      //console.log(error);
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

    }
  });
  const { refetch: check3 } = useQuery(COUNT_PACKAGE, {
    errorPolicy: 'all',
    variables: {
      role: props.user.role,
      current_statut: "IN TRANSIT"
    },
    onCompleted: (data) => {
      set_nb_inTransit(data.count_package)
    },
    onError: () => {
      //console.log("onError");
      //console.log(error);
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

    }
  });
  const { refetch: check4 } = useQuery(COUNT_PACKAGE, {
    errorPolicy: 'all',
    variables: {
      role: props.user.role,
      current_statut: "ARRIVED"
    },
    onCompleted: (data) => {
      set_nb_arrived(data.count_package)
    },
    onError: () => {
      //console.log("onError");
      //console.log(error);
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

    }
  });
  const { refetch: check5 } = useQuery(COUNT_PACKAGE, {
    errorPolicy: 'all',
    variables: {
      role: props.user.role,
      current_statut: "READY FOR PICKUP"
    },
    onCompleted: (data) => {
      set_nb_pickUp(data.count_package)
    },
    onError: () => {
      //console.log("onError");
      //console.log(error);
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

    }
  });
  const { refetch: check6 } = useQuery(COUNT_PACKAGE, {
    errorPolicy: 'all',
    variables: {
      role: props.user.role,
      current_statut: "SIGNED"
    },
    onCompleted: (data) => {
      set_nb_signed(data.count_package)
    },
    onError: () => {
      //console.log("onError");
      //console.log(error);
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

    }
  });

  //RealTime check for the new package
  const {
    data: newPack,
  } = useSubscription(SUB_NEW_PACK, {
    variables: { company: props.company.id, userId: user.id },
    onSubscriptionData: (newPack) => {
      console.log(newPack.subscriptionData.data.newPack);
    }
  });
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

  return (
    <Fragment>
      <ShowInfo
        show={show}
        info={info}
        variant={variant}
      />
      {/* {
        user.role === 'OWNER' &&
        <div className="pb-24 pt-7 px-8 bg-primary">
          <div className="card-title capitalize text-white mb-4 text-white-secondary">
            Shipping of this year
          </div>
          <ModifiedAreaChart
            height="280px"
            option={{
              series: [
                {
                  data: [34, 45, 31, 45, 31, 43, 26, 43, 31, 45, 33, 40],
                  type: "line"
                }
              ],
              xAxis: {
                data: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec"
                ]
              }
            }}
          ></ModifiedAreaChart>

        </div>
      } */}
      {/* user.role === 'OWNER' ? "analytics m-sm-30 mt--18" */}
      <div className="pb-24 pt-7 px-8 analytics m-sm-30 mt--30">
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <StatCards
              step1={nb_standBy}
              step2={nb_received}
              step3={nb_inTransit}
              step4={nb_arrived}
            />
            <StatCards2
              step5={nb_pickUp}
              step6={nb_signed}
            />
            {/*<h4 className="card-title text-muted mb-4">Ongoing Projects</h4>
               <RowCards /> */}
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            {/* <Card className="px-6 py-4 mb-6">
              <div className="card-title">Traffic Shipping</div>
              <div className="card-subtitle">Last 3 Months</div>
              <DoughnutChart
                height="300px"
                color={[
                  theme.palette.primary.dark,
                  theme.palette.primary.main,
                  theme.palette.primary.light
                ]}
              />
            </Card> */}

            {/* <UpgradeCard /> */}

            {/* <Campaigns /> */}
          </Grid>
          <Grid >
            {/* Top Selling Products */}
            <TableCard
              user={user}
              orders={props.orders} />
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
  //}
}
const mapStateToProps = state => ({
  loading: PropTypes.func.isRequired,
  user: state.user,
  orders: state.order,
  refetchOrder: PropTypes.func.isRequired,
  company: state.company
});

//export default withStyles({}, { withTheme: true })(Dashboard1);
export default withStyles({}, { withTheme: true })(
  connect(mapStateToProps, { refetchOrder, loading })(Dashboard1)
);
