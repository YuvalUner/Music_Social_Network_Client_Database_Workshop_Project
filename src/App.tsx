import React from 'react';
import './App.css';
import LogInPage from "./log-in-and-sign-up/LogInPage";
import SignUpPage from "./log-in-and-sign-up/SignUpPage";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MainApp from "./main-app/MainApp";


function App() {

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [username, setUsername] = React.useState("")

    const allowdRoutes = () => {
        if (!isLoggedIn){
            return (
                <Routes>
                    <Route path="/sign-up" element={<SignUpPage/>}/>
                    <Route path="/*" element={<LogInPage
                        isLoggedIn={isLoggedIn}
                        setIsLoggedIn={setIsLoggedIn}
                        setUsername={setUsername}/>}/>
                </Routes>
            )
        } else {
            return (
                <Routes>
                    <Route path="/*" element={<MainApp username={username}/>}/>
                </Routes>
            )
        }
    }

    return (
    <div className={"App h-100"}>
      <BrowserRouter>
            {allowdRoutes()}
      </BrowserRouter>
    </div>
    );
}

export default App;
