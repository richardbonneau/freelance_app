import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Item from "../Components/Item";
import { Container, Anchor } from "../utils/globalStyledComponents";
import { TitleContainer, InvoiceContainer, NotesInput, DatePickContainer, SenderRecipientContainer, SenderContainer, RecipientContainer, ItemsListContainer, TotalContainer, ItemContainer } from "../utils/invoiceStyling";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function InvoiceDetails(props) {
  const userInfo = useSelector(state => state.user.userInfo);
  let { id } = useParams();
  const details = useSelector(state =>
    state.invoices.invoicesList.find(invoice => invoice.id === Number(id))
  );
  const client = useSelector(state =>
    state.clients.clientsList.find(client => client.id === details.clientId)
  );

  console.log("details", details);
  const invoiceDate = new Date(details.invoiceDate.seconds * 1000);
  const dueDate = new Date(details.dueDate.seconds * 1000);


  return (
    <Container>
      <Anchor onClick={() => props.history.goBack()}>Back</Anchor>
      <InvoiceContainer>
        <TitleContainer>
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
        <div className="first-row">
          <SenderRecipientContainer>
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

            <ItemContainer>
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
                  <div className="amount">{"$" + item.hours * item.rate}</div>
                </div>
              </div>

            </ItemContainer>
          ))}

        </ItemsListContainer>

        <TotalContainer>
          <div>
            {" "}
            <h5>Subtotal</h5>
            {/* <div className="total">{"$" + itemsSubtotal}</div> */}
          </div>

          <div>
            <h4>Total</h4>
            {/* <div className="total">{"$" + itemsTotal}</div> */}
          </div>
        </TotalContainer>

        <NotesInput
          value={details.notes}
          placeholder="Notes"
          readOnly
        // onChange={e => setNotesInput(e.target.value)}
        ></NotesInput>


      </InvoiceContainer>
    </Container>
  )

}

export default InvoiceDetails;
