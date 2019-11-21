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
  border-collapse: separate; 
  border-spacing:0 20px;

  @media(min-width: 1024px){
  margin: 0;
  padding: 0;
  table-layout: fixed;
  max-width: 1000px;
  }


`
const Tr = styled.tr`
  border: 1px solid black;
  @media(min-width: 768px){
  border:none;
  }
`
const THead = styled.thead`
  @media(max-width:768px) {
    display:none;
  }
`
const Th = styled.th`
    cursor: default;
`
const Td = styled.td`
  padding: .625em;
  text-align: center;
  @media(max-width:768px){
    text-align:right;
    display:block;
    &::before{
      content: attr(label);
      float:left;
    }
  }
`
const EBContainer = styled.td`
width:1%;
`
const ExpandableButton = styled.div`
color:brown;
  ${Tr}:hover & {
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

      <Tr key={i}>
        <td width="1%">
        <ExpandableButton onClick={()=>alert("clicked")}></ExpandableButton>
          </td>
        <Td label="Title">{invoice.title}</Td>
        <Td label="#">{invoice.invoiceNumber}</Td>
        <Td label="Project">projects[invoice.projectId]</Td>
        <Td label="Client">clients[invoices.clientId]</Td>
        <Td label="Due Date">invoice.dueDate</Td>
      </Tr>

    ));
    return (
      <Table>
        <THead>
        <tr>
          <Th width="1%" scope="col"></Th>
          <Th scope="col">Title</Th>
          <Th width="5%" scope="col">#</Th>
          <Th scope="col">Project</Th>
          <Th scope="col">Client</Th>
          <Th width="20%" scope="col">Due Date</Th>
          
        </tr>
        </THead>
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
