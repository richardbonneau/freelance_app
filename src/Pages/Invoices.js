import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { addInvoiceToFirestore } from "../_actions";
import { db, firestore } from "../utils/fire.js";
import Invoice from "../Components/Invoice";
import { FiX } from "react-icons/fi";
import { Container, Table, Th, THead, MaskOverlay, ModalContainer, ModalContents, ModalTitle, ModalHr, FormInputContainer } from "../utils/globalStyledComponents";

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
  const [isModalOpened, toggleModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(clients[0].id)

  const listOfInvoices = () => {
    // return invoices.map(invoice=>(
    //   <li>title: {invoice.title} #: {invoice.invoiceNumber} project: projects[invoice.projectId] client: clients[invoices.clientId]</li>
    // ))
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
          clientId: selectedClient,
          columns: [{ name: "Tcing", description: "cyril", hours: 5, rate: 40 }]
        })
      );
    };

    return (
      <ModalContents active={isModalOpened}>
        <FormInputContainer><div /><FiX style={styles.fiX} onClick={() => toggleModal(false)} /></FormInputContainer>
        <ModalTitle>Create a New Invoice</ModalTitle>
        <ModalHr />
        <form onSubmit={newInvoiceSubmit}>
          <FormInputContainer>
            <select value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)}>
              {clients.map(client => (<option value={client.id}>{client.name}</option>))}
            </select>
          </FormInputContainer>
          <FormInputContainer>
            <label>Invoice Title</label>
            <input
              type="text"
              value={titleInput}
              onChange={e => setTitleInput(e.target.value)}
            />
          </FormInputContainer>
          <FormInputContainer>
            <label>Invoice #</label>
            <input
              type="text"
              value={invoiceNumberInput}
              onChange={e => setInvoiceNumberInput(e.target.value)}
            />
          </FormInputContainer>
          <FormInputContainer>
            <input type="submit" />
          </FormInputContainer>
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
