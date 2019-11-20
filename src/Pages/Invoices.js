import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { addInvoiceToFirestore } from "../_actions";
import { db, firestore } from "../utils/fire.js";

const Container = styled.div`
  padding-left: 25px;
`;
const Table = styled.table`
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
`
const TrHeader = styled.tr`
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
    width: 100vw;
    cursor: pointer;
    height: 30px;
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
        <Td>{invoice.invoiceNumber}</Td>
        <Td>projects[invoice.projectId]</Td>
        <Td>clients[invoices.clientId]</Td>
        <Td>invoice.dueDate</Td>
      </TrHeader>

    ));
    return (
      <Table>
        <thead>
        <tr>
          <th width="1%" scope="col"></th>
          <th scope="col">Title</th>
          <th scope="col">#</th>
          <th scope="col">Project</th>
          <th scope="col">Client</th>
          <th scope="col">Due Date</th>
          
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
