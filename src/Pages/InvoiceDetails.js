import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {Container} from "../utils/globalStyledComponents";

const ItemRow = styled.div`
  display:flex;
  justify-content: space-around;
`

function InvoiceDetails(props) {

  let {id} = useParams();
  const details = useSelector(state =>
    state.invoices.invoicesList.find(invoice =>invoice.id === Number(id))
  );
  const client = useSelector(state =>
    state.clients.clientsList.find(client => client.id === details.clientId)
  );
  console.log("InvoiceDetails", details);

  const displayItems = () => {
    return details.items.map((item,i) => (
      <ItemRow key={i}>
        <div>{item.name}</div>
        <div>{item.rate}</div>
        <div>{item.hours}</div>
      </ItemRow>
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
      <h3>invoiceNumber</h3>
      <div>{details.invoiceNumber}</div>
      <h3>invoiceDate</h3>
      <div>{details.invoiceDate.toString()}</div>
      <h3>dueDate</h3>
      <div>{details.dueDate.toString()}</div>
      <h3>fromName</h3>
      <div>{details.fromName}</div>
      <h3>fromAddress</h3>
      <div>{details.fromAddress}</div>
      <h3>fromCity</h3>
      <div>{details.fromCity}</div>
      <h3>fromCountry</h3>
      <div>{details.fromCountry}</div>
      <h3>notes</h3>
      <div>{details.notes}</div>
      <h3>Items</h3>
      {displayItems()}
    </Container>
  );
}

export default InvoiceDetails;
