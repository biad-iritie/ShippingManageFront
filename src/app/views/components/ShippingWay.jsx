import React from 'react'
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles } from "@material-ui/core/styles";
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles(theme => ({
    formControl: {
        marginRight: theme.spacing(3),
        marginLeft: theme.spacing(3)
    },
    group: {
        margin: theme.spacing(1, 5)
    }
}));


export default function ShippingWay(props) {
    const classes = useStyles();
    return (
        <div>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">
                    <FormattedMessage
                        id="info.shippingMethod"
                        defaultMessage="Shipping Method *"
                    />
                </FormLabel>
                <RadioGroup
                    isRequired={true}
                    aria-label="shipMethod"
                    className={classes.group}
                    name="shipMethod"
                    value={props.shipMethod}
                    onChange={props.handleChange}
                >
                    <FormControlLabel value="Airplane" control={<Radio />} label={
                        <FormattedMessage
                            id="info.airplane"
                            defaultMessage="Airplane"
                        />
                    } />
                    <FormControlLabel value="Boat" control={<Radio />} label={
                        <FormattedMessage
                            id="info.boat"
                            defaultMessage="Boat"
                        />
                    } />

                </RadioGroup>
            </FormControl>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">
                    <FormattedMessage
                        id="info.serviceType"
                        defaultMessage="Service Type *"
                    /></FormLabel>
                <RadioGroup
                    isRequired={true}
                    aria-label="typeService"
                    className={classes.group}
                    name="typeService"
                    value={props.typeService}
                    onChange={props.handleChange}
                >
                    <FormControlLabel value="Normal" control={<Radio />} label={
                        <FormattedMessage
                            id="info.normal"
                            defaultMessage="Normal"
                        />
                    } />
                    <FormControlLabel value="Express" control={<Radio />} label={
                        <FormattedMessage
                            id="info.express"
                            defaultMessage="Express"
                        />
                    } />

                </RadioGroup>
            </FormControl>
        </div>
    )
}
