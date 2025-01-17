import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import { useHistory, Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import AddClientPopup from "../Components/AddClientPopup";
import InformationPopup from "../Components/InformationPopup";
import "react-datepicker/dist/react-datepicker.css";
import { addInvoiceToFirestore, addItemToStore } from "../_actions";
import {
  Container,
  PageButton,
  Anchor,
  MaskOverlay,
  ModalContainer,
  ModalContents
} from "../utils/globalStyledComponents";
import Item from "../Components/Item";
import Loading from "../Components/Loading";
import {
  TitleContainer,
  InvoiceContainer,
  NotesInput,
  DatePickContainer,
  SenderRecipientContainer,
  SenderContainer,
  RecipientContainer,
  ItemsListContainer,
  TotalContainer
} from "../utils/invoiceStyling";

function InvoiceCreator() {
  const dispatch = useDispatch();
  const history = useHistory();
  const issuerUid = useSelector(state => state.auth.user.uid);
  const isSendingReq = useSelector(state => state.invoices.isSendingReq);
  const clients = useSelector(state => state.clients.clientsList);
  const itemsList = useSelector(state => state.invoices.currentItemsList);
  const userInfo = useSelector(state => state.user.userInfo);
  const [selectedClientId, setSelectedClientId] = useState(Number(clients[0].id));
  const [titleInput, setTitleInput] = useState("");
  const [invoiceNumberInput, setInvoiceNumberInput] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [notesInput, setNotesInput] = useState("");
  const selectedClient = clients.find(c => c.id === selectedClientId);
  const [itemsSubtotal, setItemsSubtotal] = useState(0);
  const [itemsTotal, setItemsTotal] = useState(0);
  const [isModalOpened, setModal] = useState(false);
  const [informationModalOpened, toggleInformationModal] = useState(false);
  const [informationModalContents, setInformationModalContents] = useState("");

  useEffect(() => {
    //Display new total sum everytime the list of item updates
    let newTotal = 0;
    itemsList.forEach(item => (newTotal = newTotal + item.hours * item.rate));
    setItemsSubtotal(newTotal);
    setItemsTotal(newTotal);
  }, [itemsList]);

  const newInvoiceSubmit = e => {
    //     name(pin):""
    // email(pin):""
    // companyName(pin):""
    // addressOne(pin):""
    // addressTwo(pin):"-"
    // city(pin):""
    // province(pin):""
    // zip(pin):""
    console.log(
      "itemsList.length <= 0",
      itemsList.find(item => item.name === "")
    );
    e.preventDefault();
    if (titleInput === "" || invoiceNumberInput === "" || itemsSubtotal <= 0) {
      console.log("trigger1");
      setInformationModalContents("Some fields are missing");
      toggleInformationModal(true);
      return;
    } else if (itemsList.find(item => item.name === "")) {
      console.log("trigger2");
      setInformationModalContents("Empty Item Name");
      toggleInformationModal(true);
      return;
    } else if (
      userInfo.name === "" ||
      userInfo.email === "" ||
      userInfo.addressOne === "" ||
      userInfo.city === "" ||
      userInfo.province === "" ||
      userInfo.zip === ""
    ) {
      console.log("trigger3");
      setInformationModalContents("Enter your contact details before submitting an Invoice");
      toggleInformationModal(true);
      return;
    }
    let newInvoiceId = Date.now() * 10000 + Math.round(Math.random() * 99999);
    console.log("userinfo", userInfo);

    dispatch(
      addInvoiceToFirestore(
        {
          invoiceIssuerUid: issuerUid,
          id: newInvoiceId,
          title: titleInput,
          invoiceNumber: invoiceNumberInput,
          invoiceDate: firebase.firestore.Timestamp.fromDate(invoiceDate),
          dueDate: firebase.firestore.Timestamp.fromDate(dueDate),
          clientId: selectedClientId,
          userInfo,
          items: itemsList,
          notes: notesInput,
          isPublic: false
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
        <h1 style={{ marginBottom: "35px" }}>INVOICE</h1>
        <TitleContainer>
          <input
            type="text"
            className="title"
            placeholder="Subject"
            value={titleInput}
            onChange={e => setTitleInput(e.target.value)}
          />
          <div className="invoice-number-container">
            {" "}
            <div className="hashtag">#</div>
            <input
              type="text"
              className="invoice-number"
              placeholder="Invoice Number"
              value={invoiceNumberInput}
              maxLength={7}
              onChange={e => setInvoiceNumberInput(e.target.value)}
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
              <div>{userInfo.city}, {userInfo.province}</div>
              <div></div>
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
              <div>{selectedClient.companyName}</div>
              <div>{selectedClient.addressOne}</div>
              <div>{selectedClient.addressTwo}</div>
              <div>{selectedClient.country}</div>
              <div>{selectedClient.city}, {selectedClient.province}</div>
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
            <FaPlus />
            Add New Item
          </PageButton>
        </ItemsListContainer>

        <TotalContainer>
          <div className="total">
            {" "}
            <h5>Subtotal</h5>
            <div>{"$" + itemsSubtotal.toFixed(2)}</div>
          </div>

          <div className="total">
            <h4>Total</h4>
            <div>{"$" + itemsTotal.toFixed(2)}</div>
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
      <InformationPopup
        informationModalOpened={informationModalOpened}
        toggleInformationModal={toggleInformationModal}
        informationModalContents={informationModalContents}
      />
    </Container>
  );
}

export default InvoiceCreator;
