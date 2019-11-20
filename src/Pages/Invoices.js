import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { addInvoiceToFirestore } from "../_actions";
import { db, firestore } from '../utils/fire.js';


const Container = styled.div`
    padding-left: 25px;
`
function Invoices() {
  const dispatch = useDispatch();
  const invoices = useSelector(state=>state.invoices.invoices);

  const listOfInvoices = () => {
    return invoices.map(invoice=>(
      <li>{invoice.title}</li>
    ))
  }

  const newInvoiceSubmit = (e) => {
    // the "frontend" must build the Object that is sent to redux/firebase
    e.preventDefault();
    dispatch(addInvoiceToFirestore(
      { title: "New Invoice", invoiceNumber: 2, projectId: "new project", clientId: 1, 
        columns: [
            { name: "Tcing", description: "cyril", hours: 5, rate: 40 }
        ] 
    }
      ));
    
  }
  console.log("listOfInvoices",listOfInvoices,'invoices',invoices);

  return (<Container>
    <h2>Invoices</h2>
    <button onClick={newInvoiceSubmit}>Create New Invoice</button>

    <ul>
      {listOfInvoices()}
    </ul>
    

    </Container>)

  
}

export default Invoices;
