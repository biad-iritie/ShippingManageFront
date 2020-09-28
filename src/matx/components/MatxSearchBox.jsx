import React, { Component, } from "react";
import { Icon, IconButton } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import history from "history.js";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&::placeholder": {
      color: theme.palette.primary.contrastText
    }
  }
});

class MatxSearchBox extends Component {
  state = {
    open: false,
    code: ""
  };

  toggle = () => {
    this.setState({ open: !this.state.open });
  };
  handleChange = event => {
    event.persist();
    switch (event.target.name) {

      case "code":

        this.setState({ code: event.target.value })
        //console.log(this.state.code);
        break;
      default:
        break;
    }
  }
  handleSubmit = (event) => {
    //alert('Le nom a été soumis : ' + this.state.code);
    event.preventDefault();
    history.push("/order/detail_order", [{
      order: {
        code: this.state.code.toUpperCase()
      },
    }])
  }
  render() {
    let { classes } = this.props;
    return (
      <React.Fragment>
        {!this.state.open && (
          <IconButton onClick={this.toggle}>
            <Icon>search</Icon>
          </IconButton>
        )}

        {this.state.open && (
          <div
            className={`flex items-center h-full matx-search-box ${classes.root}`}
          >
            {/* <ValidatorForm style={{ 'width': '100%' }} ref={useRef("form")} onSubmit={() => {
              alert(this.state.code)
            }}> */}
            <form style={{ 'width': '100%' }} onSubmit={this.handleSubmit}>
              <input
                className={`px-4 search-box w-full ${classes.root}`}
                type="text"
                name="code"
                value={this.state.code}
                placeholder="Search here..."
                autoFocus
                onChange={this.handleChange}
              />
            </form>

            {/*<TextValidator
                className={`px-4 search-box w-full ${classes.root}`}
                id="code"
                name="code"
                value={this.state.code}
                //onChange={this.handleChange}
                label="Put the package's code"
                placeholder="Search here..."
                type="text"
                fullWidth
                validators={["required"]}
                errorMessages={["this field is required"]}

              />
             </ValidatorForm> */}

            <IconButton onClick={this.toggle} className="align-middle mx-4">
              <Icon>close</Icon>
            </IconButton>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MatxSearchBox);
