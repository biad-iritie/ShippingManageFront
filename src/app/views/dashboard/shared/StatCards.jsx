import React from "react";
import { Grid, Card, Icon, IconButton, Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { FormattedMessage } from 'react-intl';

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
            <Icon className={props.classes.icon}>hourglass_empty</Icon>
            <div className="ml-3">
              <small className="text-muted">
                <FormattedMessage
                  id="title.standBy"
                  defaultMessage="Stand By"
                />
              </small>
              <h6 className="m-0 mt-1 text-primary font-medium">
                <FormattedMessage
                  id="count.package"
                  values={{
                    number: props.step1,
                    s: Number(props.step1) > 1 ? "s" : ""
                  }}
                />
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
            <Icon className={props.classes.icon}>hourglass_full</Icon>
            <div className="ml-3">
              <small className="text-muted">
                <FormattedMessage
                  id="title.received"
                  defaultMessage="Received"
                />
              </small>
              <h6 className="m-0 mt-1 text-primary font-medium">
                <FormattedMessage
                  id="count.package"
                  values={{
                    number: props.step2,
                    s: Number(props.step2) > 1 ? "s" : ""
                  }}
                />
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
            <Icon className={props.classes.icon}>redo</Icon>
            <div className="ml-3">
              <small className="text-muted">
                <FormattedMessage
                  id="title.inTransit"
                  defaultMessage="In Transit"
                />
              </small>
              <h6 className="m-0 mt-1 text-primary font-medium">
                <FormattedMessage
                  id="count.package"
                  values={{
                    number: props.step3,
                    s: Number(props.step3) > 1 ? "s" : ""
                  }}
                />
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
              <small className="text-muted">
                <FormattedMessage
                  id="title.arrived"
                  defaultMessage="Arrived"
                />
              </small>
              <h6 className="m-0 mt-1 text-primary font-medium">
                <FormattedMessage
                  id="count.package"
                  values={{
                    number: props.step4,
                    s: Number(props.step4) > 1 ? "s" : ""
                  }}
                /></h6>
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
