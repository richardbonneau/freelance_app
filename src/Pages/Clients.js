import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { backend } from "../utils/static.js";
import { useSelector, useDispatch } from "react-redux";
import Client from "../Components/Client";
import { addClientToFirestore } from "../_actions";
import { FiX } from "react-icons/fi";
import {
  Container,
  Table,
  Th,
  THead,
  MaskOverlay,
  ModalContents,
  ModalTitle,
  ModalHr,
  FormInputContainer
} from "../utils/globalStyledComponents";

const ModalContainer = styled.div`
  position: fixed;
  z-index: 160;
  width: 330px;
  height: 500px;
  background: #bdc3c7;
  left: 50%;
  top: 50%;
  margin-top: -250px;
  margin-left: -165px;
  transition: 0.5s ease-out;
  visibility: ${({ isModalOpened }) => (isModalOpened ? "visible" : "hidden")};
  transform: ${({ isModalOpened }) =>
    isModalOpened ? "translateY(0)" : "translateY(45px)"};
  opacity: ${({ isModalOpened }) => (isModalOpened ? "1" : "0")};
`;

const styles = {
  fiX: {
    cursor: "pointer",
    height: "25px",
    width: "25px"
  }
};

function Clients() {
  const dispatch = useDispatch();
  const listOfClients = useSelector(state => state.clients.clientsList);
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [companyInput, setCompanyInput] = useState("");
  const [streetInput, setStreetInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [provinceInput, setProvinceInput] = useState("");
  const [zipInput, setZipInput] = useState("");
  const [isModalOpened, toggleModal] = useState(false);
  const [isClientCardOpened, toggleClientCard] = useState(false);
  const [selectedClient, setSelectedClient] = useState(listOfClients[0]);

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

  const addClientModalContents = () => {
    const newClientSubmit = e => {
      console.log("nameInput", nameInput);
      // the "frontend" must build the Object that is sent to redux/firebase
      e.preventDefault();
      let newClientId = Date.now() * 10000 + Math.round(Math.random() * 9999);
      dispatch(
        addClientToFirestore({
          name: nameInput,
          id: newClientId,
          email: emailInput,
          companyName: companyInput,
          street: streetInput,
          city: cityInput,
          province: provinceInput,
          zip: zipInput
        })
      );
      toggleModal(false);
      setNameInput("");
      setEmailInput("");
      setCompanyInput("");
    };

    return (
      <ModalContents active={isModalOpened}>
        <ModalTitle>Create a New Client</ModalTitle>
        <ModalHr />
        <form onSubmit={newClientSubmit}>
          <h4>Identification</h4>
          <input
            type="text"
            placeholder="Name"
            value={nameInput}
            onChange={e => setNameInput(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            value={emailInput}
            onChange={e => setEmailInput(e.target.value)}
          />{" "}
          <input
            type="text"
            placeholder="Company"
            value={companyInput}
            onChange={e => setCompanyInput(e.target.value)}
          />
          <h4>Residency (required for Invoicing)</h4>{" "}
          <input
            type="text"
            placeholder="Street"
            value={streetInput}
            onChange={e => setStreetInput(e.target.value)}
          />{" "}
          <input
            type="text"
            placeholder="City"
            value={cityInput}
            onChange={e => setCityInput(e.target.value)}
          />{" "}
          <input
            type="text"
            placeholder="State or Province"
            value={provinceInput}
            onChange={e => setProvinceInput(e.target.value)}
          />{" "}
          <input
            type="text"
            placeholder="ZIP or Postal Code"
            value={zipInput}
            onChange={e => setZipInput(e.target.value)}
          />
          <input type="submit" />
          <button onClick={() => toggleModal(false)}>Cancel</button>
        </form>
      </ModalContents>
    );
  };

  const clientCardModalContents = () => {
    console.log("selectedClient", selectedClient);
    return (
      <ModalContents active={isClientCardOpened}>
        <FormInputContainer>
          <div />
          <FiX style={styles.fiX} />
        </FormInputContainer>
        <div>name: {selectedClient.name}</div>
        <div>email: {selectedClient.email}</div>
        <div>company: {selectedClient.companyName}</div>
        <div>street: {selectedClient.street}</div>
        <div>city: {selectedClient.city}</div>
        <div>province: {selectedClient.province}</div>
        <div>zip: {selectedClient.zip}</div>
      </ModalContents>
    );
  };

  return (
    <Container>
      <button onClick={() => toggleModal(true)}>Add New Client</button>
      <h2>Clients</h2>
      {clientsList()}

      <MaskOverlay isModalOpened={isModalOpened || isClientCardOpened} />
      <ModalContainer isModalOpened={isModalOpened}>
        {addClientModalContents()}
      </ModalContainer>
      <ModalContainer isModalOpened={isClientCardOpened}>
        {clientCardModalContents()}
      </ModalContainer>
    </Container>
  );
}

export default Clients;
