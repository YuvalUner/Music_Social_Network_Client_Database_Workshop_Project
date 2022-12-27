import React from "react";
import {FormControl, InputLabel, OutlinedInput} from "@mui/material";

class UsernameField extends React.Component<any, any>{

    render() {
        return (
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Username</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    label="Username"
                />
            </FormControl>
        )
    }
}

export default UsernameField;