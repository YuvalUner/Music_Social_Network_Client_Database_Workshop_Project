import React from "react";
import PasswordField from "./components/password-field";
import UsernameField from "./components/username-field";

class LogInPage extends React.Component<any, any>{

    showPassword: boolean = false;



    render() {
        return (
            <div className={"h-100 d-flex align-items-center justify-content-center"}>
                <form className={"border border-primary-subtle rounded"}>
                    <h3>Log in</h3>
                    <div>
                        <UsernameField></UsernameField>
                    </div>
                    <div>
                        <PasswordField></PasswordField>
                    </div>
                </form>
            </div>
        )
    }
}

export default LogInPage;