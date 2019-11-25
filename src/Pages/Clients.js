import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import styled from "styled-components";
import { backend } from "../utils/static.js";
import { useSelector, useDispatch } from "react-redux";
import Client from "../Components/Client";
import { addClientToFirestore } from "../_actions";
import { FiX } from "react-icons/fi";
import { Container, Table, Th, THead, MaskOverlay, ModalContainer, ModalContents, ModalTitle, ModalHr, FormInputContainer } from "../utils/globalStyledComponents";

const styles = {
  fiX: {
    cursor: 'pointer',
    height: '25px',
    width: '25px'
  }
}

function Clients() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const listOfClients = useSelector(state => state.clients.clients);
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [companyInput, setCompanyInput] = useState("");
  const [isModalOpened, toggleModal] = useState(false);

  const clientsList = () => {
    let tableContents = listOfClients.map((client, i) => {
      return <Client key={i} client={client} />;
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

  const modalContents = () => {
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
          companyName: companyInput
        })
      );
      toggleModal(false);
      setNameInput("");
      setEmailInput("");
      setCompanyInput("");

    };

    return (
      <ModalContents active={isModalOpened}>
        <FormInputContainer><div /><FiX style={styles.fiX} onClick={() => toggleModal(false)} /></FormInputContainer>
        <ModalTitle>Create a New Client</ModalTitle>
        <ModalHr />
        <form onSubmit={newClientSubmit}>
          <FormInputContainer>
            <label>Full Name</label>
            <input
              type="text"
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
            />
          </FormInputContainer>
          <FormInputContainer>
            <label>Email</label>
            <input
              type="text"
              value={emailInput}
              onChange={e => setEmailInput(e.target.value)}
            />
          </FormInputContainer>
          <FormInputContainer>
            {" "}
            <label>Company</label>
            <input
              type="text"
              value={companyInput}
              onChange={e => setCompanyInput(e.target.value)}
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
      <button onClick={() => toggleModal(true)}>Add New Client</button>
      <h2>Clients</h2>
      {clientsList()}

      <MaskOverlay isModalOpened={isModalOpened} />
      <ModalContainer isModalOpened={isModalOpened}>{modalContents()}</ModalContainer>


    </Container>
  );
}

export default Clients;
