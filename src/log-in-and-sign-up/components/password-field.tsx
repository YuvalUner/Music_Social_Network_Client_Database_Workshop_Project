import React from "react";
import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

class PasswordField extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {
            showPassword: false
        };
    }


    handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();};

    render() {
        return (
            <FormControl
                required
                error = {this.props.error}
                sx={{ m: 1, width: '25ch' }}
                variant="outlined"
                id = {this.props.id}>
                <InputLabel htmlFor={this.props.id}>{this.props.text}</InputLabel>
                <OutlinedInput
                    value={this.props.value}
                    onChange={this.props.setter}
                    type={this.state.showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => this.setState({showPassword: !this.state.showPassword})}
                                onMouseDown={this.handleMouseDownPassword}
                                edge="end"
                            >
                                {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label={this.props.text}
                />
            </FormControl>
        )
    }
}

export default PasswordField;