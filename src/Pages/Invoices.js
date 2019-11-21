import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { addInvoiceToFirestore } from "../_actions";
import { db, firestore } from "../utils/fire.js";

const Container = styled.div`
  padding-left: 25px;
`;
const Table = styled.table`
  table-layout: fixed;
  width: 100%;
  @media(min-width: 1024px){
  margin: 0;
  padding: 0;
  table-layout: fixed;
  max-width: 1000px;
  }

`
const TrHeader = styled.tr`
`

const Th = styled.th`
    cursor: default;
`
const Td = styled.td`
  padding: .625em;
  text-align: center;
`
const EBContainer = styled.td`
width:1%;
`
const ExpandableButton = styled.div`
color:brown;
  ${TrHeader}:hover & {
    width: 1000px;
    cursor: pointer;
    height: 35px;
    background: rgba(175, 175, 175, 0.28);
    position: relative;
  }
`

function Invoices() {
  const dispatch = useDispatch();
  const invoices = useSelector(state => state.invoices.invoices);

  const listOfInvoices = () => {
    // return invoices.map(invoice=>(
    //   <li>title: {invoice.title} #: {invoice.invoiceNumber} project: projects[invoice.projectId] client: clients[invoices.clientId]</li>
    // ))
    let tableContents = invoices.map((invoice,i) => (

      <TrHeader key={i}>
        <td width="1%">
        <ExpandableButton onClick={()=>alert("clicked")}></ExpandableButton>
          </td>
        <Td>{invoice.title}</Td>
        <Td width="5%">{invoice.invoiceNumber}</Td>
        <Td>projects[invoice.projectId]</Td>
        <Td>clients[invoices.clientId]</Td>
        <Td width="20%">invoice.dueDate</Td>
      </TrHeader>

    ));
    return (
      <Table>
        <thead>
        <tr>
          <Th width="1%" scope="col"></Th>
          <Th scope="col">Title</Th>
          <Th width="5%" scope="col">#</Th>
          <Th scope="col">Project</Th>
          <Th scope="col">Client</Th>
          <Th width="20%" scope="col">Due Date</Th>
          
        </tr>
        </thead>
        <tbody>
        {tableContents}
        </tbody>
        
      </Table>
    );
  };

  const newInvoiceSubmit = e => {
    // the "frontend" must build the Object that is sent to redux/firebase
    e.preventDefault();
    dispatch(
      addInvoiceToFirestore({
        title: "New Invoice",
        invoiceNumber: 2,
        projectId: 123,
        clientId: 1,
        columns: [{ name: "Tcing", description: "cyril", hours: 5, rate: 40 }]
      })
    );
  };
  console.log("listOfInvoices", listOfInvoices, "invoices", invoices);

  return (
    <Container>
      <h2>Invoices</h2>
      <button onClick={newInvoiceSubmit}>Create New Invoice</button>

      <ul>{listOfInvoices()}</ul>
    </Container>
  );
}

export default Invoices;
