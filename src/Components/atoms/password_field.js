import React from "react";
import { Typography } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';

const Password = ({ password, onChange, label, passwordError }) => {
    return (
        <React.Fragment>
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={label}
            value={password}
            type="password"
            autoComplete="current-password"
            onChange={onChange}
          />
          <Typography color="error" variant="caption" data-testid="errorText">
            <br></br>
            {passwordError}
          </Typography>
        </React.Fragment>
    );
};
export default Password;