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
  padding: 5px 0;
`;

const SenderRecipientContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;
const SenderContainer = styled.div``;
const RecipientContainer = styled.div``;

function InvoiceCreator() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [titleInput, setTitleInput] = useState("");
  const [invoiceNumberInput, setInvoiceNumberInput] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [notesInput, setNotesInput] = useState("");
  const clients = useSelector(state => state.clients.clientsList);
  const [selectedClient, setSelectedClient] = useState(clients[0].id);

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
          clientId: Number(selectedClient),
          columns: [{ name: "Tcing", description: "cyril", hours: 5, rate: 40 }]
        },
        history
      )
    );

    setInvoiceNumberInput("");
    setTitleInput("");
  };

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
          </SenderContainer>

          <RecipientContainer>
            <h4>To</h4>
            <select
              value={selectedClient}
              onChange={e => setSelectedClient(e.target.value)}
            >
              {clients.map((client, i) => (
                <option key={i} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </RecipientContainer>
        </SenderRecipientContainer>

        <h5>Subtotal</h5>
        <h4>Total</h4>
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
