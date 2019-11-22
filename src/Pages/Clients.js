import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components';
import { backend } from '../utils/static.js'
import { useSelector, useDispatch } from "react-redux";
import { db, firestore } from '../utils/fire.js';
import Client from '../Components/Client';
import { addClientToFirestore } from "../_actions";
import { Container, Table, Th, THead } from "../utils/globalStyledComponents";

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

  const clientsList = () => {
    let tableContents = listOfClients.map((client,i) => {
      return <Client key={i} client={client} />
    })
    return (<Table>
        <THead>
          <tr>
            <Th width="1%" scope="col"></Th>
            <Th scope="col">Full Name</Th>
            <Th scope="col">
              Email
            </Th>
            <Th scope="col">Company Name</Th>
            <Th width="1%" scope="col"></Th>
          </tr>
        </THead>
        <tbody>{tableContents}</tbody>
      </Table>)
  }

  return (
    <Container>
      <h2>Clients</h2>
      <form onSubmit={newClientSubmit}>
        <input type="text" onChange={onNewClientChange} value={newClientInput} />
        <input type="submit" />
      </form>

      

      {clientsList()}

    </Container>

  );
}

export default Clients;
