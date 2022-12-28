import React from "react";
import DiscoverTab from "./discover-tab/DiscoverTab";

class MainApp extends React.Component<any, any>{
    render() {
        return (
            <div className={"h-100"}>
                <DiscoverTab username={this.props.username}/>
                <div className={"d-flex align-items-center justify-content-center"}>
                    <h1>Hi</h1>
                </div>
            </div>
        );
    }
}

export default MainApp;