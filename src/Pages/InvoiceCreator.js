import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import AddClientPopup from "../Components/AddClientPopup";
import "react-datepicker/dist/react-datepicker.css";
import { addInvoiceToFirestore, addItemToStore } from "../_actions";
import { Container, PageButton, Anchor } from "../utils/globalStyledComponents";
import Item from "../Components/Item";
import Loading from "../Components/Loading";
import { TitleContainer, InvoiceContainer, NotesInput, DatePickContainer, SenderRecipientContainer, SenderContainer, RecipientContainer, ItemsListContainer, TotalContainer } from "../utils/invoiceStyling";


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
          invoiceDate: firebase.firestore.Timestamp.fromDate(invoiceDate),
          dueDate: firebase.firestore.Timestamp.fromDate(dueDate),
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
