import React from "react";
import { Grid, Card, Icon, IconButton, Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const styles = theme => ({
  icon: {
    fontSize: "44px",
    opacity: 0.6,
    color: theme.palette.primary.main
  }
});

const StatCards = (props) => {
  //console.log(props);
  //StatCards-icon-709
  return (
    <Grid container spacing={3} className="mb-3">
      <Grid item xs={12} md={6}>
        <Card className="play-card p-sm-24 bg-paper" elevation={6}>
          <div className="flex items-center">
            <Icon className={props.classes.icon}>group</Icon>
            <div className="ml-3">
              <small className="text-muted">Stand By</small>
              <h6 className="m-0 mt-1 text-primary font-medium">{props.step1} Package(s)</h6>
            </div>
          </div>
          {/* <Tooltip title="View Details" placement="top">
            <IconButton>
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip> */}
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card className="play-card p-sm-24 bg-paper" elevation={6}>
          <div className="flex items-center">
            <Icon className={props.classes.icon}>attach_money</Icon>
            <div className="ml-3">
              <small className="text-muted">Received</small>
              <h6 className="m-0 mt-1 text-primary font-medium">{props.step2} Package(s)</h6>
            </div>
          </div>
          {/* <Tooltip title="View Details" placement="top">
            <IconButton>
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip> */}
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card className="play-card p-sm-24 bg-paper" elevation={6}>
          <div className="flex items-center">
            <Icon className={props.classes.icon}>store</Icon>
            <div className="ml-3">
              <small className="text-muted">In Transit</small>
              <h6 className="m-0 mt-1 text-primary font-medium">
                {props.step3} Package(s)
              </h6>
            </div>
          </div>
          {/* <Tooltip title="View Details" placement="top">
            <IconButton>
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip> */}
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card className="play-card p-sm-24 bg-paper" elevation={6}>
          <div className="flex items-center">
            <Icon className={props.classes.icon}>shopping_cart</Icon>
            <div className="ml-3">
              <small className="text-muted">Arrived</small>
              <h6 className="m-0 mt-1 text-primary font-medium">{props.step4} Package(s)</h6>
            </div>
          </div>
          {/* <Tooltip title="View Details" placement="top">
            <IconButton>
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip> */}
        </Card>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles, { withTheme: true })(StatCards);
