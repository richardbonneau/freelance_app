import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Client from "../Components/Client";
import { addClientToFirestore } from "../_actions";
import AddClientPopup from "../Components/AddClientPopup";
import { FiX } from "react-icons/fi";
import { Container, Table, Th, THead, PageButton } from "../utils/globalStyledComponents";

function Clients() {
  const listOfClients = useSelector(state => state.clients.clientsList);
  const [isModalOpened, toggleModal] = useState(false);
  const [isClientCardOpened, toggleClientCard] = useState(false);
  const [selectedClient, setSelectedClient] = useState(listOfClients[0]);
  console.log("listOfClients", listOfClients);
  const clientSelected = client => {
    toggleClientCard(true);
    setSelectedClient(client);
  };

  const clientsList = () => {
    let tableContents = listOfClients.map((client, i) => {
      return <Client key={i} client={client} clientSelected={clientSelected} />;
    });
    return (
      <Table>
        <THead>
          <tr>
            <Th width="1%" scope="col"></Th>
            <Th scope="col">Full Name</Th>
            <Th scope="col">Email</Th>
            <Th scope="col">Company Name</Th>
            <Th width="1%" scope="col"></Th>
          </tr>
        </THead>
        <tbody>{tableContents}</tbody>
      </Table>
    );
  };

  // const clientCardModalContents = () => {
  //   return (
  //     <ModalContents active={isClientCardOpened}>
  //       <FormInputContainer>
  //         <div />
  //         <FiX style={styles.fiX} />
  //       </FormInputContainer>
  //       <div>name: {selectedClient.name}</div>
  //       <div>email: {selectedClient.email}</div>
  //       <div>company: {selectedClient.companyName}</div>
  //       <div>street: {selectedClient.street}</div>
  //       <div>city: {selectedClient.city}</div>
  //       <div>province: {selectedClient.province}</div>
  //       <div>zip: {selectedClient.zip}</div>
  //     </ModalContents>
  //   );
  // };

  return (
    <Container>
      <h2>Clients</h2>
      <div>Keep a list of your clients that you can then select when creating an invoice.</div>
      <PageButton
        style={{ width: "125px", float: "right", margin: "10px 0" }}
        onClick={() => toggleModal(true)}
      >
        Add New Client
      </PageButton>

      {clientsList()}
      <AddClientPopup isModalOpened={isModalOpened} toggleModal={toggleModal} />
    </Container>
  );
}

export default Clients;
