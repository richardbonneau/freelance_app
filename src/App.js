import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'
import styled from "styled-components";
import MobileNavBar from "./Components/MobileNavBar";
import SideBar from "./Components/SideBar";
import Dashboard from "./Pages/Dashboard";
import Clients from "./Pages/Clients";

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
  const counter = useSelector(state => state.counter)
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <PageStructure>
        <MobileNavBar />
        <SideBar />
        <RoutesContainer>
          <div>{counter}</div>
          <button onClick={()=>{dispatch({type:"increment"})}} />
          <Route exact={true} path="/" component={Dashboard} />
          <Route exact={true} path="/clients" component={Clients} />
        </RoutesContainer>
      </PageStructure>
    </BrowserRouter>
  );
}

export default App;
