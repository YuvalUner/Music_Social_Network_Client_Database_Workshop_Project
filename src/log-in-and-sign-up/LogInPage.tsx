import React from "react";
import PasswordField from "./components/password-field";
import UsernameField from "./components/username-field";
import {NavLink} from "react-router-dom";
import configData from "../config.json";
import {Alert, AlertTitle} from "@mui/material";


class LogInPage extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {
            username: "",
            password: "",
            usernameError: false,
            passwordError: false,
            invalidError: false,
            usernameEmptyError: false,
            passwordEmptyError: false
        };
    }

    setPassword = (e: any) => {
        this.setState({password: e.target.value});
    }

    setUsername = (e: any) => {
        this.setState({username: e.target.value});
    }

    /***
     * Checks if the username and password fields are empty
     * Sets the usernameError and passwordError states to true if they are
     */
    checkEmpty = (): boolean => {
        if (this.state.username === "") {
            this.setState({usernameError: true, usernameEmptyError: true});
            return false;
        } else if (this.state.password === "") {
            this.setState({passwordError: true, passwordEmptyError: true});
            return false;
        } else {
            return true;
        }
    }

    /**
     * Checks if the form is valid
     * If it is, submits it to the server and logs the user in if the credentials are valid
     */
    onSubmit = async (e: any) => {
        e.preventDefault();
        if (this.checkEmpty()) {
            const response = await fetch(`${configData.apiBaseUrl}/${configData.artistApiUrl}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: this.state.username,
                    password: this.state.password
                })
            });
            const data = await response.json();
            if (data.result) {
                this.props.setIsLoggedIn(true);
                // Scuffed as hell way to navigate, thanks to react-router-dom v6 being a pain in the ass
                let link_to_home = document.getElementById("nav-to-home-hidden");
                link_to_home.click();
            } else {
                this.setState({invalidError: true, usernameError: true, passwordError: true});
            }
        }
    }

    render() {
        return (
                <>
                    <NavLink to="/home" id={"nav-to-home-hidden"} hidden={true}></NavLink>
                <div className={"h-100 d-flex align-items-center justify-content-center"}>
                    <form className={"border border-primary-subtle rounded pe-4 ps-4 pt-2 pb-2"}
                          onSubmit={async e => await this.onSubmit(e)}>
                        <h3>Log in</h3>
                        <div className={"mb-3"}>
                            <UsernameField
                            value={this.state.username}
                            setter={this.setUsername}
                            error={this.state.usernameError}
                            ></UsernameField>
                            {this.state.usernameEmptyError && <div className={"error-text"}>
                                You must fill in this field
                            </div>}
                        </div>
                        <div className={"mb-3"}>
                            <PasswordField
                                text={"Password"}
                                error={this.state.passwordError}
                                value={this.state.password}
                                setter={this.setPassword}>
                            </PasswordField>
                            {this.state.passwordEmptyError && <div className={"error-text"}>
                                You must fill in this field
                            </div>}
                        </div>
                        <div className={"mb-3"}>
                            <button type="submit" className={"btn btn-primary"}
                                    onClick={async e => this.onSubmit(e)}>Log in</button>
                        </div>
                        {this.state.invalidError && <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            <strong>Incorrect username or password</strong>
                        </Alert>}
                        <div className={"mb-3"}>
                            Don't have an account? <NavLink to="/sign-up">Sign up</NavLink>
                        </div>
                    </form>
                </div>
            </>
        )
    }
}

export default LogInPage;