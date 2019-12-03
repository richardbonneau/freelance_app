import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import { addInvoiceToFirestore } from "../_actions";
import { Container } from "../utils/globalStyledComponents";
import { newEntry } from "../utils/static";
import { FaTrashAlt } from "react-icons/fa";

const NotesInput = styled.textarea`
  height: 80px;
  width: 470px;
  resize:none;
  outline:none;
`;
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
  const [itemsList, setItemsList] = useState([Object.assign({},newEntry)]);
  const selectedClient = clients.find(c => c.id === selectedClientId);

  const handleItemChange = (e) => {
    let itemListCopy = itemsList.slice();
    itemListCopy[e.target.id][e.target.name] = e.target.value;
    setItemsList(itemListCopy);
  }
  const addNewItem = (e) =>{
    let newItem = Object.assign({},newEntry);
    setItemsList(itemsList.concat(newItem));
  }
  const deleteItem = (itemIndex) => {
    setItemsList(itemsList.filter((item,i)=>itemIndex!==i));
  }
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
          items: itemsList
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
        {itemsList.map((item,i)=>(<div>
          <input type="text" id={i} name="name" placeholder="Name or Description" onChange={handleItemChange} value={item.name} /> 
          <input type="number" id={i} name="hours" placeholder="Hours" onChange={handleItemChange} value={item.hours} /> 
          <input type="number" id={i} name="rate" placeholder="Rate" onChange={handleItemChange} value={item.rate} />
          <FaTrashAlt onClick={()=>deleteItem(i)} /> 
        </div>))}
        <button onClick={addNewItem}>Add New Item</button>
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
