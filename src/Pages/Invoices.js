import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { addInvoiceToFirestore } from "../_actions";
import Invoice from "../Components/Invoice";
import { FiX } from "react-icons/fi";
import DatePicker from "react-datepicker";
import 'react-datepicker/src/stylesheets/datepicker.scss'
import { Container, Table, Th, THead, MaskOverlay, ModalContents, ModalTitle, ModalHr, FormInputContainer } from "../utils/globalStyledComponents";

const ModalContainer = styled.div`
  position: fixed;
  z-index: 160;
  width: 300px;
  height: 600px;
  background: #bdc3c7;
  left: 50%;
  top: 50%;
  margin-left: -150px;
  margin-top: -300px;
  transition: 0.5s ease-out;
  visibility: ${({ isModalOpened }) => isModalOpened ? 'visible' : 'hidden'};
  transform: ${({ isModalOpened }) => isModalOpened ? 'translateY(0)' : 'translateY(45px)'};
  opacity: ${({ isModalOpened }) => isModalOpened ? '1' : '0'};
`;

const styles = {
  fiX: {
    cursor: 'pointer',
    height: '25px',
    width: '25px'
  }
}

function Invoices() {
  const dispatch = useDispatch();
  const invoices = useSelector(state => state.invoices.invoices);
  const clients = useSelector(state => state.clients.clients);
  const [titleInput, setTitleInput] = useState("");
  const [invoiceNumberInput, setInvoiceNumberInput] = useState("");
  const [invoiceDate,setInvoiceDate] = useState(new Date());
  const [dueDate,setDueDate] = useState(new Date());
  const [isModalOpened, toggleModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(clients[0].id)

  const listOfInvoices = () => {
    let tableContents = invoices.map((invoice, i) => (
      <Invoice invoice={invoice} clients={clients} key={i} />
    ));
    return (
      <Table>
        <THead>
          <tr>
            <Th width="1%" scope="col"></Th>
            <Th scope="col">Title</Th>
            <Th width="5%" scope="col">
              #
            </Th>
            <Th scope="col">Project</Th>
            <Th scope="col">Client</Th>
            <Th width="20%" scope="col">
              Due Date
            </Th>
            <Th width="1%" scope="col"></Th>
          </tr>
        </THead>
        <tbody>{tableContents}</tbody>
      </Table>
    );
  };

  const modalContents = () => {
    const newInvoiceSubmit = e => {
      e.preventDefault();
      dispatch(
        addInvoiceToFirestore({
          title: titleInput,
          invoiceNumber: invoiceNumberInput,
          projectId: 0,
          clientId: Number(selectedClient),
          columns: [{ name: "Tcing", description: "cyril", hours: 5, rate: 40 }]
        })
      );
      toggleModal(false);
      setInvoiceNumberInput("");
      setTitleInput("");
    };

    return (
      <ModalContents active={isModalOpened}>
        <ModalTitle>Create a New Invoice</ModalTitle>
        <ModalHr />
        <form onSubmit={newInvoiceSubmit}>
    
            <select value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)}>
              {clients.map((client,i) => (<option key={i} value={client.id}>{client.name}</option>))}
            </select>
       
       
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
      <FormInputContainer>
          <label>Invoice Date</label>
            <DatePicker selected={invoiceDate} onChange={(date)=>setInvoiceDate(date)} />
          </FormInputContainer>
          <FormInputContainer>
          <label>Due Date</label>
            <DatePicker selected={dueDate} onChange={(date)=>setDueDate(date)} />
          </FormInputContainer>
          <FormInputContainer>
            <input type="submit" />
          </FormInputContainer>
          <button onClick={() => toggleModal(false)}>Cancel</button>
        </form>
      </ModalContents>
    );
  };

  return (
    <Container>
      <h2>Invoices</h2>
      <button onClick={() => toggleModal(true)}>Create New Invoice</button>
      {listOfInvoices()}

      <MaskOverlay isModalOpened={isModalOpened} />
      <ModalContainer isModalOpened={isModalOpened}>{modalContents()}</ModalContainer>
    </Container>
  );
}

export default Invoices;
