import React from "react";
import { withStyles, ThemeProvider } from "@material-ui/core/styles";
import { IconButton, Toolbar, AppBar, Icon } from "@material-ui/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Footer = ({ theme, settings }) => {
  const footerTheme = settings.themes[settings.footer.theme] || theme;
  return (
    <ThemeProvider theme={footerTheme}>
      <AppBar color="primary" position="static">
        <Toolbar className="footer flex items-center">
          <div className="flex items-center container w-full">
            {/* <a
              href="https://ui-lib.com/downloads/matx-react-material-design-admin-template/"
              className="mr-2"
            >
              <Button variant="contained">Download Matx</Button>
            </a> */}
            {/* <a href="https://ui-lib.com/downloads/matx-pro-react-material-design-admin-template/">
              <Button variant="contained" color="secondary">
                Get MatX Pro
              </Button>
            </a> */}
            <span className="m-auto"></span>
            <p className="m-0">
              Developed by Biad Iritie
              <IconButton>
                <a href="http://ui-lib.com">
                  <Icon color="primary">
                    twitter
                  </Icon>
                </a>

              </IconButton>
            </p>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

Footer.propTypes = {
  settings: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  settings: state.layout.settings
});

export default withStyles(
  {},
  { withTheme: true }
)(connect(mapStateToProps, {})(Footer));
