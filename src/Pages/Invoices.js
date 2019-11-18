import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { backend } from '../utils/static.js'
import { useSelector, useDispatch } from "react-redux";
import { db, firestore } from '../utils/fire.js';


const Container = styled.div`
    padding-left: 25px;
`
function Invoices() {
  return (<Container>
    <h2>Invoices</h2>
    </Container>)


  
}

export default Invoices;
