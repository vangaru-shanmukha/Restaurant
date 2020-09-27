import React from "react";
import { Typography } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';

const Email = ({ userEmail, onChange, label, placeHolder, emailError }) => {
    return (
        <React.Fragment>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label={label}
                placeHolder={placeHolder}
                value={userEmail}
                autoComplete="email"
                onChange={onChange}
            />
            <Typography color="error" variant="caption" data-testid="errorText">
                <br></br>
                {emailError}
            </Typography>
        </React.Fragment>
    );
};
export default Email;