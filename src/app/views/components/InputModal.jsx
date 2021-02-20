import React, { useRef } from 'react'
//import PropTypes from 'prop-types'
import Button from "@material-ui/core/Button";
//import TextField from "@material-ui/core/TextField";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import {
    CircularProgress,
} from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { FormattedMessage } from 'react-intl';
import ReturnServeur from '../components/ReturnServeur';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const optionsStatut = [
    "STAND BY",
    "RECEIVED",
    "IN TRANSIT",
    "ARRIVED",
    "READY FOR PICKUP",
    "SIGNED",
];
const optionsRole = [
    "STAFF_MEMBER",
    "ADMIN_MEMBER"
]
function InputModal(props) {
    const radioGroupRef = React.useRef(null);
    return (
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            //onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title" className="center">{props.title}</DialogTitle>

            <ValidatorForm style={{ 'width': '100%' }} ref={useRef("form")} onSubmit={props.onSubmit}>
                <DialogContent>
                    <DialogContentText>
                        {props.ContentText}
                    </DialogContentText>
                    {/* <TextValidator
                        autoFocus
                        margin="dense"
                        id="name_agence_sender"
                        name="name_agence_sender"
                        value={props.name_agence_sender}
                        onChange={props.handleChange}
                        label="Name of company who is delivering the package"
                        //type="text"
                        fullWidth
                        validators={["required"]}
                        errorMessages={["this field is required"]}

                    /> */}
                    {
                        props.action === "addStatut" && (
                            <div>
                                <RadioGroup
                                    ref={radioGroupRef}
                                    aria-label="Ringtone"
                                    name="packageStatut"
                                    value={props.statut}
                                    onChange={props.handleChange}
                                >
                                    {optionsStatut.map(option => (
                                        <FormControlLabel
                                            className="capitalize"
                                            value={option}
                                            key={option}
                                            control={<Radio />}
                                            label={
                                                <ReturnServeur info={option} />}
                                            validators={["required"]}
                                            errorMessages={[
                                                <FormattedMessage
                                                    id="input.required"
                                                    defaultMessage="This field is required"
                                                />
                                            ]}
                                        />
                                    ))}
                                </RadioGroup>
                                <TextValidator
                                    margin="dense"
                                    id="descriptionStatut"
                                    name="descriptionStatut"
                                    value={props.descriptionStatut}
                                    onChange={props.handleChange}
                                    label={
                                        <FormattedMessage
                                            id="input.moreInfo"
                                            defaultMessage="More information"
                                        />
                                    }
                                    //type="text"
                                    fullWidth
                                    //validators={["required"]}
                                    errorMessages={[
                                        <FormattedMessage
                                            id="input.required"
                                            defaultMessage="This field is required"
                                        />
                                    ]}

                                />
                            </div>
                        )
                    }
                    {
                        props.action === "addRole" && (
                            <div>
                                <RadioGroup
                                    ref={radioGroupRef}
                                    aria-label="Ringtone"
                                    name="role"
                                    value={props.role}
                                    onChange={props.handleChange}
                                >
                                    {optionsRole.map(option => (
                                        <FormControlLabel
                                            className="capitalize"
                                            value={option}
                                            key={option}
                                            control={<Radio />}
                                            label={option === "STAFF_MEMBER" ?
                                                <FormattedMessage
                                                    id="formControl.label.staff"
                                                    defaultMessage="Staff"
                                                /> : <FormattedMessage
                                                    id="formControl.label.admin"
                                                    defaultMessage="Admin"
                                                />}
                                            validators={["required"]}
                                            errorMessages={[
                                                <FormattedMessage
                                                    id="input.required"
                                                    defaultMessage="This field is required"
                                                />
                                            ]}
                                        />
                                    ))}
                                </RadioGroup>
                            </div>
                        )
                    }
                    {
                        props.action === "addPrice" && (
                            <TextValidator
                                margin="dense"
                                id="price"
                                name="price"
                                value={props.price}
                                onChange={props.handleChange}
                                label={
                                    <FormattedMessage
                                        id="input.price"
                                        defaultMessage="eg : 100 RMB / 9000 XOF"
                                    />
                                }
                                //type="text"
                                fullWidth
                                validators={["required"]}
                                errorMessages={[
                                    <FormattedMessage
                                        id="input.required"
                                        defaultMessage="This field is required"
                                    />
                                ]}

                            />)
                    }

                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="secondary" disabled={props.loading} onClick={props.handleClose}>
                        <FormattedMessage
                            id="button.cancel"
                            defaultMessage="Cancel"
                        />
                    </Button>
                    <Button type="submit" color="primary" disabled={props.loading}>

                        {props.loading ? (
                            <CircularProgress
                                size={24}
                            //className={classes.buttonProgress}
                            />
                        ) : <FormattedMessage
                                id="button.submit"
                                defaultMessage="Submit"
                            />}
                    </Button>
                </DialogActions>
            </ValidatorForm>

        </Dialog>
    )
}

InputModal.propTypes = {

}

export default InputModal

