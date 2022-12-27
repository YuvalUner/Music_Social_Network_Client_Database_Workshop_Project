import React from 'react';
import './App.css';
import LogInPage from "./log-in-and-sign-up/LogInPage";
import SignUpPage from "./log-in-and-sign-up/SignUpPage";
import {BrowserRouter, Route, Routes} from 'react-router-dom';

let loggedIn: boolean = false;

const allowdRoutes = () => {
    if (!loggedIn){
        return (
            <Routes>
                <Route path="/sign-up" element={<SignUpPage/>}/>
                <Route path="/*" element={<LogInPage isLoggedIn={loggedIn}/>}/>
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


function App() {
  return (
    <div className={"App"}>
      <BrowserRouter>
            {allowdRoutes()}
      </BrowserRouter>
    </div>
  );
}

export default App;
