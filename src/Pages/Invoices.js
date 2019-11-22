import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { addInvoiceToFirestore } from "../_actions";
import { db, firestore } from "../utils/fire.js";
import { Table, Tr, Td, Th, THead, ExpandableInvisibleButton } from "../utils/globalStyledComponents";

const Container = styled.div`
      padding: 0 25px;
`;


function Invoices() {
  const dispatch = useDispatch();
  const invoices = useSelector(state => state.invoices.invoices);

  const listOfInvoices = () => {
    // return invoices.map(invoice=>(
    //   <li>title: {invoice.title} #: {invoice.invoiceNumber} project: projects[invoice.projectId] client: clients[invoices.clientId]</li>
    // ))
    let tableContents = invoices.map((invoice, i) => (
      <Tr key={i}>
        <td width="1%">
          <ExpandableInvisibleButton onClick={() => alert("clicked")}></ExpandableInvisibleButton>
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
            <Th width="5%" scope="col">
              #
            </Th>
            <Th scope="col">Project</Th>
            <Th scope="col">Client</Th>
            <Th width="20%" scope="col">
              Due Date
            </Th>
          </tr>
        </THead>
        <tbody>{tableContents}</tbody>
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
