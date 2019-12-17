import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import { addInvoiceToFirestore } from "../_actions";
import { Container, AccentButton } from "../utils/globalStyledComponents";
import Item from "../Components/Item";
import Loading from "../Components/Loading";

const TitleContainer = styled.div`
  margin-top: 20px;

  .title {
    font-size: 18px;
    font-weight: 600;
    margin-right: 10px;
  }
  .invoice-number {
    width: 25px;
  }
`;
const NotesInput = styled.textarea`
  height: 80px;
  width: 100%;
  resize: none;
  outline: none;
`;
const DatePickContainer = styled.div`
  margin-top: 20px;

  display: flex;
  input {
    width: 78px;
  }
  .first-child {
    margin-right: 50px;
  }
`;

const SenderRecipientContainer = styled.div`
  display: flex;
  margin-top: 20px;
  flex-direction: column;
`;
const BlockInput = styled.input`
  display: block;
`;
const SenderContainer = styled.div`
  margin-bottom: 10px;
`;
const RecipientContainer = styled.div``;

const ItemsListContainer = styled.div`
  margin-top: 20px;
  a{
    padding:0;
    width:100%;
  }
`;
const SumContainer = styled.div`
  margin-top: 20px;
`;
function InvoiceCreator() {
  const dispatch = useDispatch();
  const history = useHistory();
  const isSendingReq = useSelector(state => state.invoices.isSendingReq);
  const clients = useSelector(state => state.clients.clientsList);
  const [selectedClientId, setSelectedClientId] = useState(
    Number(clients[0].id)
  );
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

  const newEntry = { name: "", hours: 0, rate: 0 };
  const [itemsList, setItemsList] = useState([Object.assign({}, newEntry)]);
  const [itemsSum, setItemsSum] = useState(0);

  const newItemsSum = newItemsList => {
    let newSum = 0;
    newItemsList.forEach(item => (newSum = newSum + item.hours * item.rate));
    setItemsSum(newSum);
  };
  const handleItemChange = e => {
    const index = e.target.id;
    let newItemsList = itemsList.slice();
    newItemsList[index][e.target.name] = e.target.value;
    setItemsList(newItemsList);
    newItemsSum(newItemsList);
  };
  const deleteItem = itemIndex => {
    let newItemsList = itemsList.filter((item, i) => itemIndex !== i);
    setItemsList(newItemsList);
    newItemsSum(newItemsList);
  };
  const addNewItem = e => {
    let newItem = Object.assign({}, newEntry);
    setItemsList(itemsList.concat(newItem));
  };

  const newInvoiceSubmit = e => {
    e.preventDefault();
    console.log("new", {
      title: titleInput,
      invoiceNumber: invoiceNumberInput,
      invoiceDate,
      dueDate,
      clientId: selectedClientId,
      fromName,
      fromAddress,
      fromCity,
      fromCountry,
      items: itemsList,
      notes: notesInput
    });
    let newInvoiceId = Date.now() * 10000 + Math.round(Math.random() * 99999);
    dispatch(
      addInvoiceToFirestore(
        {
          id: newInvoiceId,
          title: titleInput,
          invoiceNumber: invoiceNumberInput,
          invoiceDate,
          dueDate,
          clientId: selectedClientId,
          fromName,
          fromAddress,
          fromCity,
          fromCountry,
          items: itemsList,
          notes: notesInput
        },
        history
      )
    );
    setInvoiceNumberInput("");
    setTitleInput("");
  };
  if (isSendingReq) return <Loading />;
  return (
    <Container>
      <h2>Invoice Creator</h2>
      <form>
        <TitleContainer>
          <input
            type="text"
            className="title"
            placeholder="Invoice Title"
            value={titleInput}
            onChange={e => setTitleInput(e.target.value)}
          />
          <h4>Invoice Number</h4>
          <input
            type="number"
            className="invoice-number"
            placeholder="#"
            value={invoiceNumberInput}
            onChange={e =>
              e.target.value.length < 4
                ? setInvoiceNumberInput(e.target.value)
                : false
            }
          />
        </TitleContainer>

        <DatePickContainer>
          <div className="first-child">
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

        <SenderRecipientContainer>
          <SenderContainer>
            <h4>From</h4>
            <BlockInput
              type="text"
              placeholder="Name"
              value={fromName}
              onChange={e => setFromName(e.target.value)}
            />
            <BlockInput
              type="text"
              placeholder="Full Address"
              value={fromAddress}
              onChange={e => setFromAddress(e.target.value)}
            />
            <BlockInput
              type="text"
              placeholder="City, Province, ZIP"
              value={fromCity}
              onChange={e => setFromCity(e.target.value)}
            />
            <BlockInput
              type="text"
              placeholder="Country"
              value={fromCountry}
              onChange={e => setFromCountry(e.target.value)}
            />
            <a href="#">Use your profile info</a>
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
            <div>
              {selectedClient.city} {selectedClient.province}{" "}
              {selectedClient.zip}
            </div>
            <div>selectedClient.country</div>
          </RecipientContainer>
        </SenderRecipientContainer>

        <ItemsListContainer>
          {itemsList.map((item, i) => (
            <Item
              item={item}
              i={i}
              handleItemChange={handleItemChange}
              deleteItem={deleteItem}
            />
          ))}
          <AccentButton type="button" onClick={addNewItem}>
            Add New Item
          </AccentButton>
        </ItemsListContainer>

        <SumContainer>
          <h5>Subtotal</h5>
          {itemsSum}

          <h4>Total</h4>
          {itemsSum}
        </SumContainer>

        <NotesInput
          value={notesInput}
          placeholder="Notes"
          onChange={e => setNotesInput(e.target.value)}
        ></NotesInput>

        <AccentButton onClick={newInvoiceSubmit}>Submit Draft</AccentButton>
      </form>
    </Container>
  );
}

export default InvoiceCreator;
