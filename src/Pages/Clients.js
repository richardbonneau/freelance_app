import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components';
import { backend } from '../utils/static.js'
import { useSelector, useDispatch } from "react-redux";
import { db, firestore } from '../utils/fire.js';
import Client from '../Components/Client';
import { addClientToFirestore } from "../_actions";

const Container = styled.div`
    padding-left: 25px;
`;

function Clients() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const listOfClients = useSelector(state => {

    console.log('state',state)
    return state.clients.clients;
  });
  const [newClientInput, setNewClientInput] = useState("");
  // const [listOfClients, setListOfClients] = useState([]);


  const onNewClientChange = (e) => {
    setNewClientInput(e.target.value);
  }
  const newClientSubmit = (e) => {
    // the "frontend" must build the Object that is sent to redux/firebase
    e.preventDefault();
    let newClientId = Date.now() * 10000 + Math.round(Math.random()*9999);
    dispatch(addClientToFirestore({name:newClientInput, id: newClientId}));
    setNewClientInput("");
  }

  const pushToFirestore = () => {
    db.collection("users").doc(user.uid).set({
      clients: []
    })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }

  const lifyClients = () => {
    console.log("listOfClients", listOfClients)
    return listOfClients.map((client,i) => {
      console.log("client", client)
      return <Client key={i} name={client.name} />
    })
  }
  return (
    <Container>
      <h2>Clients</h2>
      <form onSubmit={newClientSubmit}>
        <input type="text" onChange={onNewClientChange} value={newClientInput} />
        <input type="submit" />
      </form>

      {lifyClients()}

    </Container>

  );
}

export default Clients;
