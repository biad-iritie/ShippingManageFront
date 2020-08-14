import React, { Component, Fragment } from "react";
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

const Dashboard1 = (props) => {
  //state = {};
  //console.log(props.user);
  const user = props.user
  //render() {
  let { theme } = props;

  return (
    <Fragment>
      {
        user.role === 'OWNER' &&
        <div className="pb-24 pt-7 px-8 bg-primary">
          <div className="card-title capitalize text-white mb-4 text-white-secondary">
            Last months Shipping
          </div>
          <ModifiedAreaChart
            height="280px"
            option={{
              series: [
                {
                  data: [34, 45, 31, 45, 31, 43, 26, 43, /* 31, 45, 33, 40 */],
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
                  /* "Sep",
                  "Oct",
                  "Nov",
                  "Dec" */
                ]
              }
            }}
          ></ModifiedAreaChart>

        </div>
      }

      <div className={user.role === 'OWNER' ? "analytics m-sm-30 mt--18" : "analytics m-sm-30 mt--30"}>
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <StatCards />



            <StatCards2 />

            {/*<h4 className="card-title text-muted mb-4">Ongoing Projects</h4>
               <RowCards /> */}
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Card className="px-6 py-4 mb-6">
              <div className="card-title">Traffic Sources</div>
              <div className="card-subtitle">Last 30 days</div>
              <DoughnutChart
                height="300px"
                color={[
                  theme.palette.primary.dark,
                  theme.palette.primary.main,
                  theme.palette.primary.light
                ]}
              />
            </Card>

            {/* <UpgradeCard /> */}

            {/* <Campaigns /> */}
          </Grid>
          <Grid >
            {/* Top Selling Products */}
            <TableCard />
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
});

//export default withStyles({}, { withTheme: true })(Dashboard1);
export default withStyles({}, { withTheme: true })(
  connect(mapStateToProps)(Dashboard1)
);
