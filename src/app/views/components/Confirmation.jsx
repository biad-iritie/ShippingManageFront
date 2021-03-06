import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { FormattedMessage } from 'react-intl';
import {
    CircularProgress,
} from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Confirmation(props) {
    /* const [open, setOpen] = React.useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    } */
    //console.log(props);
    return (
        <div>

            <Dialog
                open={props.open}
                TransitionComponent={Transition}
                keepMounted
                //onClose={props.handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    {props.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {props.message}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary" disabled={props.loading}>
                        <FormattedMessage
                            id="button.disagree"
                            defaultMessage="Disagree"
                        />
                    </Button>
                    <Button onClick={props.funcAction} color="primary" disabled={props.loading}>

                        {props.loading ? (
                            <CircularProgress
                                size={24}
                            //className={classes.buttonProgress}
                            />
                        ) : <FormattedMessage
                                id="button.agree"
                                defaultMessage="Agree"
                            />}


                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
