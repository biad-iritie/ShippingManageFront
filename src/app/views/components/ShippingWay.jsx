import React from 'react'
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles } from "@material-ui/core/styles";

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
                <FormLabel component="legend">Shipping Method</FormLabel>
                <RadioGroup
                    isRequired={true}
                    aria-label="shipMethod"
                    className={classes.group}
                    name="shipMethod"
                    value={props.shipMethod}
                    onChange={props.handleChange}
                >
                    <FormControlLabel value="Airplane" control={<Radio />} label="Airplane" />
                    <FormControlLabel value="Boat" control={<Radio />} label="Boat" />

                </RadioGroup>
            </FormControl>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Service Type</FormLabel>
                <RadioGroup
                    isRequired={true}
                    aria-label="typeService"
                    className={classes.group}
                    name="typeService"
                    value={props.typeService}
                    onChange={props.handleChange}
                >
                    <FormControlLabel value="Normal" control={<Radio />} label="Normal" />
                    <FormControlLabel value="Express" control={<Radio />} label="Express" />

                </RadioGroup>
            </FormControl>
        </div>
    )
}
