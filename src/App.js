import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter, Route } from "react-router-dom";
import styled from "styled-components";
import Dashboard from "./Pages/Dashboard";
import Clients from "./Pages/Clients";
import Login from "./Pages/Login";
import Invoices from "./Pages/Invoices";
import ProtectedRoute from './Components/ProtectedRoute';

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
          
          <ProtectedRoute 
          exact 
          path="/clients" 
          component={Clients} 
          isAuthenticated={isAuthenticated} 
          isVerifying={isVerifying} />

          <ProtectedRoute 
          exact 
          path="/invoices" 
          component={Invoices} 
          isAuthenticated={isAuthenticated} 
          isVerifying={isVerifying} />

    </BrowserRouter>
  );
}

export default App;
