import React from 'react';
import logo from './logo.svg';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import styled from 'styled-components';
import Dashboard from './Pages/Dashboard'
import SideBar from './Components/SideBar'

const PageStructure = styled.div`
  display:flex;
`

function App() {
  return (
      <BrowserRouter>
      <PageStructure>
      <SideBar />
      <Route exact={true} path="/" component={Dashboard} />
      </PageStructure>
      </BrowserRouter>
      
  );
}

export default App;
