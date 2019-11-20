import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Dashboard from "./Pages/Dashboard";
import Clients from "./Pages/Clients";
import Login from "./Pages/Login";
import Invoices from "./Pages/Invoices";
import MobileNavBar from "./Components/MobileNavBar"
import SideBar from "./Components/SideBar"
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isVerifying = useSelector(state => state.auth.isVerifying);

  const renderNav = () => {
    return (<div>
      <MobileNavBar />
      <SideBar />
    </div>)
  }
  return (
    <BrowserRouter>

      <Switch>
        <Route exact={true} path="/" component={Login} />
        <Route path="/" render={renderNav} />
      </Switch>

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
