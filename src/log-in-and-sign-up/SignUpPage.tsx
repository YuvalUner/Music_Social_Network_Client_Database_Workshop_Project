import React from "react";
import UsernameField from "./components/username-field";
import PasswordField from "./components/password-field";
import {NavLink} from "react-router-dom";
import configData from "../config.json";
import {Alert, AlertTitle} from "@mui/material";

/**
 * The application's sign up page.
 */
class SignUpPage extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            username: "",
            password: "",
            passwordConfirmation: "",
            usernameError: false,
            passwordError: false,
            duplicateError: false,
            signUpSuccess: false,
            usernameEmptyError: false,
        };
    }


    /**
     * Sets the password state to the user's input.
     * @param e
     */
    setPassword = (e: any): void => {
        this.setState({password: e.target.value});
    }

    /**
     * Sets the password confirmation state to the user's input.
     * @param e
     */
    setPasswordConfirmation = (e: any): void => {
        this.setState({passwordConfirmation: e.target.value});
    }

    /**
     * Sets the username state to the user's input.
     * @param e
     */
    setUsername = (e: any): void => {
        this.setState({username: e.target.value});
    }

    /***
     * Checks if the password and password confirmation fields match
     * Sets the passwordError state to true if they don't match
     */
    checkPasswordMatch = (): boolean => {
        if (this.state.password === "" || this.state.passwordConfirmation === "") {
            this.setState({passwordError: true});
            return false;
        } else if (this.state.password !== this.state.passwordConfirmation) {
            this.setState({error: true});
            return false;
        } else {
            this.setState({error: false});
            return true;
        }
    }

    /**
     * Checks if the form is valid
     * @returns {boolean} True if the form is valid, false if it isn't
     */
    isValid = (): boolean => {
        if (this.state.username === "") {
            this.setState({usernameError: true, usernameEmptyError: true});
            return false;
        }
        return this.checkPasswordMatch();
    }

    /***
     * Handles the submission of the form
     * If the passwords match, sends a POST request to the API to create a new user
     */
    onSubmit = async (event: any): Promise<void> => {
        event.preventDefault();
        if (this.isValid()) {
            const response: Response = await fetch(`${configData.apiBaseUrl}/${configData.artistApiUrl}/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: this.state.username,
                    password: this.state.password
                }),
            });
            if (response.status === 201) {
                this.setState({
                    signUpSuccess: true, usernameError: false,
                    passwordError: false, duplicateError: false
                });
            } else {
                this.setState({duplicateError: true, usernameError: false});
            }
        }
    }

    render() {
        return (
            <div className={"h-100 d-flex align-items-center justify-content-center"}>
                <form className={"border border-primary-subtle rounded pe-4 ps-4 pt-2 pb-2"}
                      onSubmit={async e => await this.onSubmit(e)}>
                    <h3>Sign up</h3>
                    <div className={"mb-3"}>
                        <UsernameField
                            value={this.state.username}
                            setter={this.setUsername}
                            error={this.state.usernameError}
                            id={"sign-up-username"}>
                        </UsernameField>
                        {this.state.usernameEmptyError &&
                            <Alert severity="error">Username must not be empty</Alert>
                        }
                    </div>
                    <div className={"mb-3"}>
                        <PasswordField
                            text={"Password"}
                            error={this.state.passwordError}
                            value={this.state.password}
                            setter={this.setPassword}
                            id={"sign-up-password"}>
                        </PasswordField>
                        {this.state.passwordError &&
                            <Alert severity="error">Passwords do not match or are empty</Alert>
                        }
                    </div>
                    <div className={"mb-3"}>
                        <PasswordField
                            text={"Confirm password"}
                            error={this.state.passwordError}
                            value={this.state.passwordConfirmation}
                            setter={this.setPasswordConfirmation}
                            id={"sign-up-pass-confirm"}>
                        </PasswordField>
                        {this.state.passwordError &&
                            <Alert severity="error">Passwords do not match or are empty</Alert>
                        }
                    </div>
                    <div className={"mb-3"}>
                        <button onClick={async (e) => await this.onSubmit(e)}
                                type="submit" className={"btn btn-primary"}>Sign up
                        </button>
                    </div>
                    {this.state.signUpSuccess && <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        <strong>You have successfully signed up, please return to the log in page to log in</strong>
                    </Alert>}
                    {this.state.duplicateError && <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        <strong>There is already an account with that username</strong>
                    </Alert>}
                    <div className={"mb-3"}>
                        Already have an account? <NavLink to="/" id={"link_to_log_in"}>Log in</NavLink>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignUpPage;