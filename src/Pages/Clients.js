import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import styled from 'styled-components';
import { backend } from '../utils/static.js'

const Container = styled.div`
    padding-left: 25px;
`
function Clients() {
  return (
      <Container>
          <h2>Clients</h2>
          <button onClick={()=>{
            fetch(`${backend}/simpleEndpoint`).then(res=>res.text()).then(resBody=>{
              console.log("resBody",resBody)
            })
          }}>Fetch</button>
          </Container>
      
  );
}

export default Clients;
