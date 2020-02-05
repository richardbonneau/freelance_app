import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../utils/fire.js";
import { makeInvoicePublic } from "../_actions";
import { useSelector, useDispatch } from "react-redux";
import { Container, Anchor, PageButton } from "../utils/globalStyledComponents";
import {
  TitleContainer,
  InvoiceContainer,
  NotesInput,
  DatePickContainer,
  SenderRecipientContainer,
  SenderContainer,
  RecipientContainer,
  ItemsListContainer,
  TotalContainer,
  ItemContainer
} from "../utils/invoiceStyling";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loading from "../Components/Loading";

function InvoiceDetails(props) {
  const userInfo = useSelector(state => state.user.userInfo);
  const dispatch = useDispatch();
  let { id } = useParams();

  const invoiceDetails = useSelector(state =>
    state.invoices.invoicesList.find(invoice => invoice.id === Number(id))
  );
  const [details, setDetails] = useState(invoiceDetails);
  const invoiceClient = useSelector(state =>
    state.clients.clientsList.find(client => client.id === details.clientId)
  );

  const [client, setClient] = useState(invoiceClient);

  console.log("props", props.match.params.id);
  if (details === undefined) {
    db.collection("public-invoices")
      .doc(props.match.params.id)
      .get()
      .then(function(doc) {
        let index;

        if (doc.exists) {
          // dispatch(requestInitialInvoicesList(doc.data().invoices));
          console.log(doc.data().clientInfo);
          setDetails(doc.data());
          setClient(doc.data().clientInfo);
          console.log("This user exists in the database. Document data:", doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  }
  console.log("details", details);
  if (details !== undefined && client !== undefined) {
    const invoiceDate = new Date(details.invoiceDate.seconds * 1000);
    const dueDate = new Date(details.dueDate.seconds * 1000);

    let itemsSubtotal = 0;
    let itemsTotal = 0;
    details.items.forEach(item => (itemsSubtotal = itemsSubtotal + item.hours * item.rate));
    itemsTotal = itemsSubtotal;

    const makePublic = () => {
      dispatch(makeInvoicePublic(details));
    };

    return (
      <Container>
        <Anchor onClick={() => props.history.push("/invoices")}>Back</Anchor>
        <PageButton onClick={makePublic}>Make Public</PageButton>
        <InvoiceContainer style={{ width: "800px" }}>
          <h1 style={{ marginBottom: "35px" }}>INVOICE</h1>
          <TitleContainer style={{ display: "flex" }}>
            <input
              type="text"
              className="title"
              placeholder="Invoice Title"
              value={details.title}
              readOnly
              // onChange={e => setTitleInput(e.target.value)}
            />
            <div className="subcontainer ">
              {" "}
              <div className="hashtag">#</div>
              <input
                type="text"
                className="invoice-number"
                placeholder="Invoice Number"
                value={details.invoiceNumber}
                maxLength={7}
                readOnly
                // onChange={e =>
                //   e.target.value.startsWith("#")
                //     ? setInvoiceNumberInput(e.target.value)
                //     : setInvoiceNumberInput("#" + e.target.value)
                // }
              />
            </div>
          </TitleContainer>
          <div className="first-row" style={{ flexDirection: "row" }}>
            <SenderRecipientContainer style={{ flexDirection: "row" }}>
              <SenderContainer>
                <h4>From</h4>
                <div>{details.userInfo.name}</div>
                <div>{details.userInfo.addressOne}</div>
                <div>{details.userInfo.addressTwo}</div>
                <div>{details.userInfo.country}</div>
                <div>{details.userInfo.province}</div>
                <div>{details.userInfo.city}</div>
                <div>{details.userInfo.zip}</div>
              </SenderContainer>

              <RecipientContainer>
                <h4>To</h4>
                <div>{client.name}</div>
                <div>{client.addressOne}</div>
                <div>{client.addressTwo}</div>
                <div>{client.country}</div>
                <div>{client.city}</div>
                <div> {client.province}</div>
                <div>{client.zip}</div>
              </RecipientContainer>
            </SenderRecipientContainer>
            <DatePickContainer>
              <div>
                <div className="subcontainer">
                  <h4>Invoice Date</h4>
                  <DatePicker
                    selected={invoiceDate}
                    // onChange={date => setInvoiceDate(date)}
                    withPortal
                    disabledKeyboardNavigation
                    readOnly
                  />
                </div>
                <div className="subcontainer">
                  <h4>Due Date</h4>
                  <DatePicker
                    selected={dueDate}
                    // onChange={date => setDueDate(date)}
                    withPortal
                    disabledKeyboardNavigation
                    readOnly
                  />
                </div>
              </div>
            </DatePickContainer>
          </div>

          <ItemsListContainer>
            <div className="items-header">
              <h4>Items</h4>
              <div className="header-hours-rate-amount" style={{ width: "240px" }}>
                <h4>Hours</h4>
                <h4>Rate</h4>
                <h4>Amount</h4>
              </div>
            </div>
            {details.items.map((item, i) => (
              <ItemContainer key={i}>
                <input
                  type="text"
                  className="title-description"
                  name="name"
                  maxLength={38}
                  readOnly
                  placeholder="Title and description"
                  // onChange={handleItemChange}
                  value={item.name}
                />
                <div className="number-inputs-container">
                  <div className="hours-rate-container">
                    <div className="number-inputs-container-first-child">
                      <h4>Hours</h4>
                      <input
                        type="number"
                        className="number-input"
                        name="hours"
                        placeholder="#"
                        readOnly
                        // onChange={handleItemChange}
                        value={item.hours}
                      />
                    </div>
                    <div>
                      <h4>Rate</h4>
                      <input
                        type="number"
                        className="number-input"
                        name="rate"
                        placeholder="#"
                        readOnly
                        // onChange={handleItemChange}
                        value={item.rate}
                      />
                    </div>
                  </div>
                  <div className="amount-container">
                    <div className="amount">{"$" + (item.hours * item.rate).toFixed(2)}</div>
                  </div>
                </div>
              </ItemContainer>
            ))}
          </ItemsListContainer>

          <TotalContainer>
            <div className="total">
              {" "}
              <h5>Subtotal</h5>
              <div className="total">{"$" + itemsSubtotal}</div>
            </div>

            <div className="total">
              <h4>Total</h4>
              <div>{"$" + itemsTotal}</div>
            </div>
          </TotalContainer>

          {details.notes !== "" ? (
            <NotesInput
              value={details.notes}
              placeholder="Notes"
              readOnly
              // onChange={e => setNotesInput(e.target.value)}
            ></NotesInput>
          ) : (
            <></>
          )}
        </InvoiceContainer>
      </Container>
    );
  } else return <Loading />;
}

export default InvoiceDetails;
