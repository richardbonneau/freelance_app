import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter, Route } from "react-router-dom";
import styled from "styled-components";
import MobileNavBar from "./Components/MobileNavBar";
import SideBar from "./Components/SideBar";
import Dashboard from "./Pages/Dashboard";
import Clients from "./Pages/Clients";
import Login from "./Pages/Login";
import ProtectedRoute from './Components/ProtectedRoute'

const PageStructure = styled.div`
@media (min-width:1024px) {
  display: flex;
}
`;
const RoutesContainer = styled.div`
@media (min-width:1024px) {
  margin-left: 220px;
}
`;



function App() {
const isAuthenticated = useSelector(state=>state.auth.isAuthenticated);
const isVerifying = useSelector(state=>state.auth.isVerifying);

  return (
    <BrowserRouter>
          <Route exact={true} path="/" component={Login} />
          <ProtectedRoute 
          exact 
          path="/dashboard" 
          component={Dashboard} 
          isAuthenticated={isAuthenticated} 
          isVerifying={isVerifying} />
          <Route exact={true} path="/clients" component={Clients} />
    </BrowserRouter>
  );
}

export default App;
