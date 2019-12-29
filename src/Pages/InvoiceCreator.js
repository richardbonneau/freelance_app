import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import AddClientPopup from "../Components/AddClientPopup";
import "react-datepicker/dist/react-datepicker.css";
import { addInvoiceToFirestore, addItemToStore } from "../_actions";
import { Container, PageButton, Anchor } from "../utils/globalStyledComponents";
import Item from "../Components/Item";
import Loading from "../Components/Loading";

const TitleContainer = styled.div`
  display: block;
  .title {
    font-size: 18px;
    font-weight: 600;
    margin-right: 10px;
  }
  .invoice-number-container {
    display: flex;
  }
  .invoice-number {
    width: 90px !important;
    margin-left: 0 !important;
  }
  @media (min-width: 768px) {
    display: flex;
  }
`;
const InvoiceContainer = styled.form`
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  border: 1px solid #dee1e2;
  padding: 20px;
  margin-top: 20px;
  .submit-btn {
    margin-top: 15px;
    /* background: ${props => props.theme.blue}; */
    color: white;
  }
  .submit-btn:hover {
    /* background: ${props => props.theme.blueHover}; */
  }

  .first-row {
    justify-content: space-between;
    display: flex;
    align-items: baseline;

    flex-direction: column;
  }
  .subcontainer h4 {
    text-align: left;
    width: 100%;
    margin: 8px 0;
  }
  .subcontainer {
    display: flex;
    justify-content: space-between;
  }
  .subcontainer input {
    width: 78px;
    margin-left: 10px;
  }
  @media (min-width: 768px) {
    .first-row {
      flex-direction: row;
    }
    .subcontainer h4 {
      text-align: right;
    }
  }
`;
const NotesInput = styled.textarea`
  height: 80px;
  width: 100%;
  resize: none;
  outline: none;
  margin-top: 10px;
  border-color: #0000001f;
`;
const DatePickContainer = styled.div`
  margin-top: 20px;
  justify-content: space-between;
  display: flex;
  .invoice-number {
    width: 40px;
  }

  @media (min-width: 768px) {
  }
`;
const SenderRecipientContainer = styled.div`
  display: flex;
  margin-top: 20px;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;
const BlockInput = styled.input`
  display: block;
`;
const SenderContainer = styled.div`
  margin-bottom: 10px;
  @media (min-width: 768px) {
    margin-right: 40px;
  }
`;
const RecipientContainer = styled.div``;

const ItemsListContainer = styled.div`
  margin-top: 20px;
  a {
    padding: 0;
    width: 100%;
    margin: 5px 0;
  }
  .items-header {
    width: 100%;
    height: 26px;
    background: #191919;
    
    display: none;
    justify-content: space-between;
  }
  .items-header > h4{
    margin-left: 10px;
  }
  .items-header  h4 {
    color: white;
  }
  .header-hours-rate-amount {
    display: flex;
    width: 305px;
  }
  .header-hours-rate-amount > h4 {
    margin-right: 30px;
  }
  .add-item-btn {
    background: #e8e8e8;
    color: ${props=>props.theme.black};
  }
  .add-item-btn:hover {
    background: #c3c3c3;
    color: ${props=>props.theme.black};
  }
  @media (min-width: 768px) {
    .items-header {
      display: flex;
    }
  }
`;
const TotalContainer = styled.div`
  margin: 20px 0;
  .subcontainer {
    display: flex;
    justify-content: space-between;
    margin: 8px 0;
  }
  .total {
    text-align: right;
  }
`;
function InvoiceCreator() {
  const dispatch = useDispatch();
  const history = useHistory();
  const isSendingReq = useSelector(state => state.invoices.isSendingReq);
  const clients = useSelector(state => state.clients.clientsList);
  const itemsList = useSelector(state => state.invoices.currentItemsList);
  const userInfo = useSelector(state => state.user.userInfo);
  const [selectedClientId, setSelectedClientId] = useState(
    Number(clients[0].id)
  );
  const [titleInput, setTitleInput] = useState("");
  const [invoiceNumberInput, setInvoiceNumberInput] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [notesInput, setNotesInput] = useState("");
  const [fromName, setFromName] = useState("");
  const [fromAddressOne, setFromAddressOne] = useState("");
  const [fromAddressTwo, setFromAddressTwo] = useState("");
  const [fromCity, setFromCity] = useState("");
  const [fromCountry, setFromCountry] = useState("");
  const selectedClient = clients.find(c => c.id === selectedClientId);
  const [itemsSubtotal, setItemsSubtotal] = useState(0);
  const [itemsTotal, setItemsTotal] = useState(0);
  const [isModalOpened, setModal] = useState(false);
  console.log("isModalOpened", isModalOpened);
  useEffect(() => {
    //Display new total sum everytime the list of item updates
    let newTotal = 0;
    itemsList.forEach(item => (newTotal = newTotal + item.hours * item.rate));
    setItemsSubtotal(newTotal);
    setItemsTotal(newTotal);
  }, [itemsList]);

  const newInvoiceSubmit = e => {
    e.preventDefault();
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
          fromAddressOne,
          fromAddressTwo,
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
          <div className="subcontainer ">
            {" "}
            <input
              type="text"
              className="invoice-number"
              placeholder="Invoice Number"
              value={invoiceNumberInput}
              maxLength={7}
              onChange={e =>
                e.target.value.startsWith("#")
                  ? setInvoiceNumberInput(e.target.value)
                  : setInvoiceNumberInput("#" + e.target.value)
              }
            />
          </div>
        </TitleContainer>
        <div className="first-row">
          <SenderRecipientContainer>
            <SenderContainer>
              <h4>From</h4>
              <div>{userInfo.name}</div>
              <div>{userInfo.addressOne}</div>
              <div>{userInfo.addressTwo}</div>
              <div>{userInfo.country}</div>
              <div>{userInfo.province}</div>
              <div>{userInfo.city}</div>
              <div>{userInfo.zip}</div>

              <Link className="edit-info" to="/editInfo">
                Edit your contact details
              </Link>
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
              <div>{selectedClient.addressOne}</div>
              <div>{selectedClient.addressTwo}</div>
              <div>{selectedClient.country}</div>
              <div>{selectedClient.city}</div>
              <div> {selectedClient.province}</div>
              <div>{selectedClient.zip}</div>

              <Anchor href="#" onClick={() => setModal(true)}>
                Add New Client
              </Anchor>
            </RecipientContainer>
          </SenderRecipientContainer>
          <DatePickContainer>
            <div>
              <div className="subcontainer">
                <h4>Invoice Date</h4>
                <DatePicker
                  selected={invoiceDate}
                  onChange={date => setInvoiceDate(date)}
                  withPortal
                  disabledKeyboardNavigation
                />
              </div>
              <div className="subcontainer">
                <h4>Due Date</h4>
                <DatePicker
                  selected={dueDate}
                  onChange={date => setDueDate(date)}
                  withPortal
                  disabledKeyboardNavigation
                />
              </div>
            </div>
          </DatePickContainer>
        </div>

        <ItemsListContainer>
          <div className="items-header">
            <h4>Items</h4>
            <div className="header-hours-rate-amount">
              <h4>Hours</h4>
              <h4>Rate</h4>
              <h4>Amount</h4>
            </div>
          </div>
          {itemsList.map((item, i) => (
            <Item item={item} i={i} key={item.id} />
          ))}
          <PageButton
            className="add-item-btn"
            type="button"
            onClick={() => dispatch(addItemToStore())}
          >
            Add New Item
          </PageButton>
        </ItemsListContainer>

        <TotalContainer>
          <div>
            {" "}
            <h5>Subtotal</h5>
            <div className="total">{"$" + itemsSubtotal}</div>
          </div>

          <div>
            <h4>Total</h4>
            <div className="total">{"$" + itemsTotal}</div>
          </div>
        </TotalContainer>

        <NotesInput
          value={notesInput}
          placeholder="Notes"
          onChange={e => setNotesInput(e.target.value)}
        ></NotesInput>

        <PageButton className="submit-btn" onClick={newInvoiceSubmit}>
          Submit Draft
        </PageButton>
      </InvoiceContainer>
      <AddClientPopup isModalOpened={isModalOpened} toggleModal={setModal} />
    </Container>
  );
}

export default InvoiceCreator;
