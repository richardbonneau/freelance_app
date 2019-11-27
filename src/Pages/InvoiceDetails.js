import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import styled from "styled-components";
import { backend } from "../utils/static.js";
import { useSelector, useDispatch } from "react-redux";
import Client from "../Components/Client";
import { addClientToFirestore } from "../_actions";
import {
  Container,
  Table,
  Th,
  THead,
  MaskOverlay,
  ModalContents,
  ModalTitle,
  ModalHr,
  FormInputContainer
} from "../utils/globalStyledComponents";

function InvoiceDetails(props) {
  const details = useSelector(state =>
    state.invoices.invoices.find(invoice =>invoice.id === Number(props.match.params.id))
  );
  const client = useSelector(state =>
    state.clients.clients.find(client => client.id === details.clientId)
  );
  console.log("InvoiceDetails", details);

  const displayColumns = () => {
    return details.columns.map(item => (
      <div>
        {/* <input type="text" value={} /> */}
        <div>{item.name}</div>
        <div>{item.description}</div>
        <div>{item.rate}</div>
        <div>{item.hours}</div>
      </div>
    ));
  };
  return (
    <Container>
      Invoice Details
      <div>{props.match.params.id}</div>
      <h3>Title</h3>
      <div>{details.title}</div>
      <h3>Client</h3>
      <div>{client.name}</div>
      <h3>Items</h3>
      <button>Add an item</button>
      {displayColumns()}
    </Container>
  );
}

export default InvoiceDetails;
