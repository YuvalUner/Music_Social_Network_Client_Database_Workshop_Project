import React from "react";
import {FormControl, InputLabel, OutlinedInput} from "@mui/material";

class UsernameField extends React.Component<any, any>{

    render() {
        return (
            <FormControl
                required
                error={this.props.error}
                sx={{ m: 1, width: '25ch' }}
                variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Username</InputLabel>
                <OutlinedInput
                    value={this.props.value}
                    onChange={this.props.setter}
                    autoFocus={true}
                    label="Username"
                />
            </FormControl>
        )
    }
}

export default UsernameField;