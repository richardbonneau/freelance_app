import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addInvoiceToFirestore, addItemToStore } from "../_actions";
import { Container, PageButton } from "../utils/globalStyledComponents";
import Item from "../Components/Item";
import Loading from "../Components/Loading";

const TitleContainer = styled.div`
  .title {
    font-size: 18px;
    font-weight: 600;
    margin-right: 10px;
  }
  .invoice-number {
    width: 25px;
  }
`;
const InvoiceContainer = styled.form`
box-shadow: 0 2px 8px rgba(0,0,0,.2);
border: 1px solid #dee1e2;
padding:20px;
margin-top:20px;
`
const NotesInput = styled.textarea`
  height: 80px;
  width: 100%;
  resize: none;
  outline: none;
  margin-top: 10px;
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

  @media(min-width:768px){
    flex-direction: row;
  }
`;
const BlockInput = styled.input`
  display: block;
`;
const SenderContainer = styled.div`
  margin-bottom: 10px;
  @media(min-width:768px){
    margin-right: 40px;
  }
`;
const RecipientContainer = styled.div``;

const ItemsListContainer = styled.div`
  margin-top: 20px;
  a{
    padding:0;
    width:100%;
    
  }
  .items-header{
    width: 100%;
    height: 26px;
    background: black;
    color:white;
    display:flex;
    justify-content:space-between;
  }
  .items-header > h4{
    margin-left: 5px;
  }
  .header-hours-rate-amount{
    display:flex;
    width:200px;
  }
  .header-hours-rate-amount > h4 {
    margin-right: 30px;
}
  
`;
const TotalContainer = styled.div`
.total{
  text-align:right;
}
  margin-top: 20px;
`;
function InvoiceCreator() {
  const dispatch = useDispatch();
  const history = useHistory();
  const isSendingReq = useSelector(state => state.invoices.isSendingReq);
  const clients = useSelector(state => state.clients.clientsList);
  const itemsList = useSelector(state => state.invoices.currentItemsList);
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
  const [itemsSubtotal, setItemsSubtotal] = useState(0);
  const [itemsTotal, setItemsTotal] = useState(0);

  useEffect(() => {
    //Display new total sum everytime the list of item updates
    let newTotal = 0;
    itemsList.forEach(item => newTotal = newTotal + (item.hours * item.rate));
    setItemsSubtotal(newTotal);
    setItemsTotal(newTotal);
  }, [itemsList])

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
      <InvoiceContainer>
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
            <a className="edit-info" href="#">Edit your contact details</a>
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
        
        <ItemsListContainer>
          <div className="items-header">
                <h4>
                  Items
                </h4>
                <div className="header-hours-rate-amount">
                <h4>
                  Hours
                </h4>
                <h4>
                  Rate
                </h4>
                <h4>
                  Amount
                </h4>
                </div>
            
          </div>
          {itemsList.map((item, i) => (
            <Item
              item={item}
              i={i}
              key={item.id}
            />
          ))}
          <PageButton type="button" onClick={() => dispatch(addItemToStore())}>
            Add New Item
          </PageButton>
        </ItemsListContainer>

        <TotalContainer>
          <h5>Subtotal</h5>
          <div className="total">{itemsSubtotal}</div>

          <h4>Total</h4>
          <div className="total">{itemsTotal}</div>
        </TotalContainer>

        <NotesInput
          value={notesInput}
          placeholder="Notes"
          onChange={e => setNotesInput(e.target.value)}
        ></NotesInput>

        <PageButton onClick={newInvoiceSubmit}>Submit Draft</PageButton>
      </InvoiceContainer>
    </Container>
  );
}

export default InvoiceCreator;
