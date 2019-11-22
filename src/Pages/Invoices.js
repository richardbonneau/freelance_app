import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { addInvoiceToFirestore } from "../_actions";
import { db, firestore } from "../utils/fire.js";
import Invoice from "../Components/Invoice";
import {
  Container,
  Table,
  Th,
  THead,
} from "../utils/globalStyledComponents";

function Invoices() {
  const dispatch = useDispatch();
  const invoices = useSelector(state => state.invoices.invoices);

  const listOfInvoices = () => {
    // return invoices.map(invoice=>(
    //   <li>title: {invoice.title} #: {invoice.invoiceNumber} project: projects[invoice.projectId] client: clients[invoices.clientId]</li>
    // ))
    let tableContents = invoices.map((invoice, i) => (
      <Invoice invoice={invoice} key={i} />
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
            <Th width="1%" scope="col"></Th>
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

  return (
    <Container>
      <h2>Invoices</h2>
      <button onClick={newInvoiceSubmit}>Create New Invoice</button>
      {listOfInvoices()}
    </Container>
  );
}

export default Invoices;
