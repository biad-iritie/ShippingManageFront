import React from "react";
import { Grid, Card, Icon, Fab } from "@material-ui/core";
import { FormattedMessage } from 'react-intl';

const StatCards2 = (props) => {
  return (
    <Grid container spacing={3} className="mb-6">
      <Grid item xs={12} md={6}>
        <Card elevation={3} className="p-4">
          <div className="flex items-center">
            <Fab
              size="medium"
              className="bg-light-green circle-44 box-shadow-none overflow-hidden"
            >
              <Icon>store</Icon>
            </Fab>
            <h5 className="font-medium text-secondary m-0 ml-3">
              <FormattedMessage
                id="title.readyForPickUp"
                defaultMessage="Ready For Pick Up"
              />
            </h5>
            <h2 className="m-0 ml-5 text-muted">
              {props.step5}
            </h2>
          </div>
          {/*<div className="pt-4 flex items-center">
            <h2 className="m-0 text-muted flex-grow">20</h2>
             <div className="ml-3 small-circle bg-error text-white">
              <Icon className="small-icon">expand_less</Icon>
            </div>
            <span className="text-13 text-error ml-1">(+21%)</span> 
          </div>*/}
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card elevation={3} className="p-4">
          <div className="flex items-center">
            <Fab
              size="medium"
              className="bg-green circle-44 box-shadow-none"
            >
              <Icon >done_all</Icon>
            </Fab>
            <h5 className="font-medium text-green m-0 ml-3">
              <FormattedMessage
                id="title.signed"
                defaultMessage="Signed"
              /></h5>

            <h2 className="m-0 ml-7 text-muted justify-end">
              {props.step6}</h2>
          </div>
          {/* <div className="pt-4 flex items-center">
            <h2 className="m-0 text-muted flex-grow">10</h2>
            <div className="ml-3 small-circle bg-green text-white">
              <Icon className="small-icon">expand_less</Icon>
            </div>
            <span className="text-13 text-green ml-1"> (+21%)</span>
          </div> */}
        </Card>
      </Grid>

    </Grid>
  );
};

export default StatCards2;
