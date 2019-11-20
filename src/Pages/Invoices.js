import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { db, firestore } from '../utils/fire.js';


const Container = styled.div`
    padding-left: 25px;
`
function Invoices() {
  const invoices = useSelector(state=>state.invoices.invoices)
  const listOfInvoices = () => {
    return invoices.map(invoice=>(
      <div>{invoice.title}</div>
    ))
  }

  return (<Container>
    <h2>Invoices</h2>
    <button>Create New Invoice</button>

    <ul>
      {listOfInvoices}
    </ul>
    

    </Container>)

  
}

export default Invoices;
