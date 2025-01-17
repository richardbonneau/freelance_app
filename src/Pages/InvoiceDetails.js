import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../utils/fire.js";
import { changeInvoicePrivacy } from "../_actions";
import { useSelector, useDispatch } from "react-redux";
import { Container, Anchor, PageButton } from "../utils/globalStyledComponents";
import InformationPopup from "../Components/InformationPopup";
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
  const [didMount, setDidMount] = useState(false);
  const isSendingReq = useSelector(state => state.invoices.isSendingReq);
  const currentUserUid = useSelector(state => state.auth.user.uid);
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
  const [informationModalOpened, toggleInformationModal] = useState(false);
  const [informationModalContents, setInformationModalContents] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  let shareUrl = () => {
    if (details.isPublic) {
      let contents = (
        <div>
          <div>You can share your Invoice using this URL</div>
          <input
            type="text"
            onClick={e => e.target.select()}
            value={`https://freelancify.io/public-invoice/${details.id}`}
          />
        </div>
      );
      if (!informationModalOpened) toggleInformationModal(true);
      setInformationModalContents(contents);
    } else {
      if (!informationModalOpened) toggleInformationModal(true);
      setInformationModalContents(`You need to change this invoice status to Public first`);
    }
  };
  useEffect(() => setDidMount(true), []);
  useEffect(() => {
    console.log("invoiceDetails", invoiceDetails);
    setDetails(invoiceDetails);
  }, [invoiceDetails]);

  useEffect(() => {
    console.log("is sending req");
    setIsLoading(isSendingReq);
    if (didMount && !isSendingReq && details) {
      shareUrl();
    }
  }, [isSendingReq]);

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
  console.log("props", props);
  if (details !== undefined && client !== undefined) {
    const invoiceDate = new Date(details.invoiceDate.seconds * 1000);
    const dueDate = new Date(details.dueDate.seconds * 1000);

    let itemsSubtotal = 0;
    let itemsTotal = 0;
    details.items.forEach(item => (itemsSubtotal = itemsSubtotal + item.hours * item.rate));
    itemsTotal = itemsSubtotal;

    const privateView = () => {
      return (
        <div style={{ display: "flex", justifyContent: "space-evenly",marginTop:"25px" }}>
          {" "}
          <PageButton style={{ height: "20px" }} onClick={() => props.history.push("/invoices")}>
            Back
          </PageButton>
          <PageButton style={{ height: "20px", width: "190px" }} onClick={shareUrl}>
            Get Shareable URL
          </PageButton>
          {details.isPublic ? (
            <PageButton
              style={{ height: "20px" }}
              onClick={() => {
                setInformationModalContents("Changing Invoice status to Private");
                setIsLoading(true);
                toggleInformationModal(true);
                dispatch(changeInvoicePrivacy(details, false));
              }}
            >
              Make Private
            </PageButton>
          ) : (
            <PageButton
              onClick={() => {
                setInformationModalContents("Changing Invoice status to Public");
                toggleInformationModal(true);
                dispatch(changeInvoicePrivacy(details, true));
              }}
            >
              Make Public
            </PageButton>
          )}
        </div>
      );
    };
    const publicView = () => {};
    console.log("props.isAuthenticated", props);
    return (
      <Container>
        {props.history.location.pathname.includes("public-invoice") ? publicView() : privateView()}
        <InvoiceContainer style={{ width: "759px" }}>
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
              <SenderContainer style={{ marginRight: "40px" }}>
                <h4>From</h4>
                <div>{details.userInfo.name}</div>
                <div>{details.userInfo.companyName}</div>
                <div>{details.userInfo.addressOne}</div>
                <div>{details.userInfo.addressTwo}</div>
                <div>{details.userInfo.country}</div>
                <div>{details.userInfo.city}, {details.userInfo.province}</div>
                <div>{details.userInfo.zip}</div>
              </SenderContainer>

              <RecipientContainer>
                <h4>To</h4>
                <div>{client.name}</div>
                <div>{client.companyName}</div>
                <div>{client.addressOne}</div>
                <div>{client.addressTwo}</div>
                <div>{client.country}</div>
                <div>{client.city}, {client.province}</div>
                
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
            <div className="header-hours-rate-amount">
              <h4>Hours</h4>
              <h4>Rate</h4>
              <h4>Amount</h4>
            </div>
          </div>
            {/* <div className="items-header" style={{display:'block'}}>
              <h4>Items</h4>
              <div className="header-hours-rate-amount" style={{ width: "240px", display:"block" }}>
                <h4>Hours</h4>
                <h4>Rate</h4>
                <h4>Amount</h4>
              </div>
            </div> */}
            {details.items.map((item, i) => (
              <ItemContainer key={i} style={{display:'flex'}}>
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
        <InformationPopup
          informationModalOpened={informationModalOpened}
          toggleInformationModal={toggleInformationModal}
          informationModalContents={informationModalContents}
          isLoading={isLoading}
        />
      </Container>
    );
  } else return <Loading />;
}

export default InvoiceDetails;
