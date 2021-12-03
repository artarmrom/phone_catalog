import TextField from "@material-ui/core/TextField";
import * as React from "react";
import {makeStyles} from "@material-ui/core/styles";

import './phoneModal.css'


const useStyles = makeStyles((theme) => ({
    textField: {
        width: "400px",
        height: "auto",
        marginBottom: "15px!important",
        padding: "5px",
        fontFamily: "Lato, sans-serif",
        border: "1px solid #B8C5D3",
        boxSizing: "border-box",
        borderRadius: "3px",
        fontSize: "16px"
    }
}));

export default function PhoneTextfield(props){
    const classes = useStyles();

    return(
        <div className='create-phone-input'>
            <p className='create-phone-title-input'>{props.text}</p>
            <TextField
                id="userName"
                value={props.value}
                InputProps={{
                    classes: {
                        input: classes.textField
                    },
                    disableUnderline: true
                }}
                placeholder={props.placeholder}
                onChange={props.handleChange}
                error={props.error}
                helperText={props.error && props.errorText!==''? props.errorText:null}
            />
        </div>
    )
}