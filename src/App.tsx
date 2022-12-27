import React from 'react';
import './App.css';
import LogInPage from "./log-in-and-sign-up/LogInPage";
import SignUpPage from "./log-in-and-sign-up/SignUpPage";
import {BrowserRouter, Route, Routes} from 'react-router-dom';


function App() {

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    const allowdRoutes = () => {
        if (!isLoggedIn){
            return (
                <Routes>
                    <Route path="/sign-up" element={<SignUpPage/>}/>
                    <Route path="/*" element={<LogInPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
                </Routes>
            )
        } else {
            return (
                <Routes>
                    <Route path="/*" element={<LogInPage/>}/>
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
