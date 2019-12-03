import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import { addInvoiceToFirestore } from "../_actions";
import { Container } from "../utils/globalStyledComponents";

const NotesInput = styled.textarea``;
const DatePickContainer = styled.div`
  display: flex;
`;

const Hr = styled.hr`
  margin: 20px 0;
`;

const SenderRecipientContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;
const BlockInput = styled.input`
  display:block;
`
const SenderContainer = styled.div`
`;
const RecipientContainer = styled.div``;

function InvoiceCreator() {
  const dispatch = useDispatch();
  const history = useHistory();
  const clients = useSelector(state => state.clients.clientsList);
  const [selectedClientId, setSelectedClientId] = useState(Number(clients[0].id));
  const [titleInput, setTitleInput] = useState("");
  const [invoiceNumberInput, setInvoiceNumberInput] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [notesInput, setNotesInput] = useState("");
  const [fromName, setFromName] = useState("");
  const [fromAddress, setFromAddress] = useState("");
  const [fromCity, setFromCity] = useState("");
  const [fromCountry, setFromCountry] = useState("");

  const selectedClient = clients.find(c => c.id === selectedClientId);

  const newInvoiceSubmit = e => {
    e.preventDefault();
    let newInvoiceId = Date.now() * 10000 + Math.round(Math.random() * 99999);
    dispatch(
      addInvoiceToFirestore(
        {
          title: titleInput,
          invoiceNumber: invoiceNumberInput,
          id: newInvoiceId,
          projectId: 0,
          clientId: selectedClientId,
          columns: [{ name: "Tcing", description: "cyril", hours: 5, rate: 40 }]
        },
        history
      )
    );

    setInvoiceNumberInput("");
    setTitleInput("");
  };
  console.log("selectedClient", selectedClient)
  return (
    <Container>
      <h2>Invoice Creator</h2>
      <form onSubmit={newInvoiceSubmit}>
        <input
          type="text"
          placeholder="Invoice Title"
          value={titleInput}
          onChange={e => setTitleInput(e.target.value)}
        />
        <input
          type="text"
          placeholder="Invoice #"
          value={invoiceNumberInput}
          onChange={e => setInvoiceNumberInput(e.target.value)}
        />
        <DatePickContainer>
          {" "}
          <div>
            <h4>Invoice Date</h4>
            <DatePicker
              selected={invoiceDate}
              onChange={date => setInvoiceDate(date)}
            />
          </div>
          <div>
            <h4>Due Date</h4>
            <DatePicker
              selected={dueDate}
              onChange={date => setDueDate(date)}
            />
          </div>
        </DatePickContainer>
        <Hr />
        <SenderRecipientContainer>
          <SenderContainer>
            <h4>From</h4>
            <BlockInput type="text" placeholder="Name" value={fromName} onChange={(e) => setFromName(e.target.value)} />
            <BlockInput type="text" placeholder="Full Address" value={fromAddress} onChange={(e) => setFromAddress(e.target.value)} />
            <BlockInput type="text" placeholder="City, Province, ZIP" value={fromCity} onChange={(e) => setFromCity(e.target.value)} />
            <BlockInput type="text" placeholder="Country" value={fromCountry} onChange={(e) => setFromCountry(e.target.value)} />
          </SenderContainer>

          <RecipientContainer>
            <h4>To</h4>
            <select
              value={selectedClientId}
              onChange={e => setSelectedClientId(Number(e.target.value))}
            >
              {clients.map((client, i) => (
                <option key={i} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
            <div>{selectedClient.name}</div>
            <div>{selectedClient.street}</div>
            <div>{selectedClient.city} {selectedClient.province} {selectedClient.zip}</div>
            <div>selectedClient.country</div>
          </RecipientContainer>
        </SenderRecipientContainer>
        <Hr />
        <h5>Subtotal</h5>
        <h4>Total</h4>
        <Hr />
        <div>
          <NotesInput
            value={notesInput}
            placeholder="Notes"
            onChange={e => setNotesInput(e.target.value)}
          ></NotesInput>
        </div>

        <input type="submit" value="Submit Draft" />
      </form>
    </Container>
  );
}

export default InvoiceCreator;
