import React from "react";
import { withRouter } from "react-router-dom";
import { Icon, IconButton, Button, MenuItem } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { setLayoutSettings } from "app/redux/actions/LayoutActions";
import { logoutUser } from "app/redux/actions/UserActions";
import PropTypes from "prop-types";
import { MatxMenu, MatxSearchBox } from "matx";
import { isMdScreen, classList } from "utils";
import NotificationBar from "../SharedCompoents/NotificationBar";
import { Link } from "react-router-dom";
import { setLanguage } from "../../redux/actions/LanguageAction";
//import ShoppingCart from "../SharedCompoents/ShoppingCart";

const styles = theme => ({
  topbar: {
    "& .topbar-hold": {
      backgroundColor: theme.palette.primary.main,
      height: "80px",
      "&.fixed": {
        boxShadow: theme.shadows[8],
        height: "64px"
      }
    }
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    minWidth: 185
  }
});

const Layout1Topbar = (props) => {
  //state = {};
  const user = props.user
  const updateSidebarMode = sidebarSettings => {
    let { settings, setLayoutSettings } = props;

    setLayoutSettings({
      ...settings,
      layout1Settings: {
        ...settings.layout1Settings,
        leftSidebar: {
          ...settings.layout1Settings.leftSidebar,
          ...sidebarSettings
        }
      }
    });
  };

  const handleSidebarToggle = () => {
    let { settings } = props;
    let { layout1Settings } = settings;

    let mode;
    if (isMdScreen()) {
      mode = layout1Settings.leftSidebar.mode === "close" ? "mobile" : "close";
    } else {
      mode = layout1Settings.leftSidebar.mode === "full" ? "close" : "full";
    }
    updateSidebarMode({ mode });
  };

  const handleSignOut = () => {
    props.logoutUser();
    //alert('handleSignOut')
  };
  const changeLanguage = (local) => {
    props.setLanguage(local);
    alert('ok')
  };
  /* render() { */
  let { classes, fixed } = props;

  return (
    <div className={`topbar ${classes.topbar}`}>
      <div className={classList({ "topbar-hold": true, fixed: fixed })}>
        <div className="flex justify-between items-center h-full">
          <div className="flex">
            {
              user.role && (
                <IconButton
                  onClick={handleSidebarToggle}
                  className="hide-on-pc"
                >
                  <Icon>menu</Icon>
                </IconButton>)
            }


            <div>
              <IconButton>
                <Icon>help</Icon>
              </IconButton>


              <MatxMenu
                menuButton={
                  <IconButton>
                    <Icon>public</Icon>
                  </IconButton>
                }>
                <MenuItem>
                  <span className="pl-4"
                    onClick={() => { props.setLanguage('fr') }}
                  >
                    Français
                  </span>
                </MenuItem>
                <MenuItem>
                  <span className="pl-4"
                    onClick={() => { props.setLanguage('en-GB') }}
                  > English </span>
                </MenuItem>
              </MatxMenu>
              {/* <IconButton>
                  <Icon>star_outline</Icon>
                </IconButton> */}
            </div>
          </div>
          <div className="flex items-center">
            {/* <ShoppingCart></ShoppingCart> */}
            <MatxSearchBox />
            {
              //user.role && (<NotificationBar />)
            }

            {
              user.role &&

              <MatxMenu MatxMenu
                menuButton={
                  <IconButton>
                    <Icon>person_pin</Icon>
                  </IconButton>
                }
              >
                <MenuItem>
                  <Link className={classes.menuItem} to="/">
                    <Icon> home </Icon>
                    <span className="pl-4"> Home </span>
                  </Link>
                </MenuItem>
                <MenuItem onClick={() => {
                  props.history.push("/session/profile")
                }}>

                  <Icon> person </Icon>
                  <span className="pl-4"> Profile </span>

                </MenuItem>
                {/* <MenuItem className={classes.menuItem}>
                  <Icon> settings </Icon>
                  <span className="pl-4"> Settings </span>
                </MenuItem> */}
                <MenuItem
                  onClick={handleSignOut}
                  className={classes.menuItem}
                >
                  <Icon> exit_to_app </Icon>
                  <span className="pl-4"> Logout </span>
                </MenuItem>
              </MatxMenu>
            }
            {
              !user.role &&
              <Button
                className="capitalize"
                variant="outlined"
                color="secondary"
                onClick={() => {
                  props.history.push("/session/signin")
                }}
              //disabled={this.props.login.loading}
              //type="submit"
              >
                <Icon>perm_identity</Icon>
                <span className="pl-2 capitalize">
                  Login
                                    </span>

              </Button>
            }
          </div>
        </div>
      </div>
    </div >
  );
  //}
}

Layout1Topbar.propTypes = {
  setLayoutSettings: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  setLanguage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  setLayoutSettings: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  setLanguage: PropTypes.func.isRequired,
  settings: state.layout.settings,
  user: state.user,
  language: state.language
});

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(mapStateToProps, { setLayoutSettings, logoutUser, setLanguage })(Layout1Topbar)
  )
);
