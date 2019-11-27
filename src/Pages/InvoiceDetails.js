import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {Container} from "../utils/globalStyledComponents";

function InvoiceDetails(props) {
  let {id} = useParams();
  const details = useSelector(state =>
    state.invoices.invoicesList.find(invoice =>invoice.id === Number(id))
  );
  const client = useSelector(state =>
    state.clients.clientsList.find(client => client.id === details.clientId)
  );
  console.log("InvoiceDetails", details);

  const displayColumns = () => {
    return details.columns.map((item,i) => (
      <div key={i}>
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
