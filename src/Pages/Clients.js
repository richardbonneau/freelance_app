import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components';
import { backend } from '../utils/static.js'
import { useSelector, useDispatch } from "react-redux";
import { db, firestore } from '../utils/fire.js';
import Client from '../Components/Client';

const Container = styled.div`
    padding-left: 25px;
`
function Clients() {
  const user = useSelector(state => state.auth.user);
  const [listOfClients, setListOfClients] = useState([]);

  db.collection("users").doc(user.uid).get().then(function (doc) {
    if (doc.exists && listOfClients.length !== doc.data().clients.length ) {
      setListOfClients(doc.data().clients);
      console.log("Document data:", doc.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch(function (error) {
    console.log("Error getting document:", error);
  });

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


    

  const updateArray = () => {
    db.collection("users").doc(user.uid).update({
      clients: firestore.FieldValue.arrayUnion("new client")
    }).then(function (doc) {
      console.log(doc)
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  }

  const lifyClients = ()=> {
    console.log("listOfClients",listOfClients)
    return listOfClients.map(client => {
      console.log("client",client)
        return <Client name={client} />
        })
  }
  return (
    <Container>
      <h2>Clients</h2>
      <button onClick={pushToFirestore}>push to firestore</button>
      <button onClick={updateArray}>updateArray</button>


  {lifyClients()}

    </Container>

  );
}

export default Clients;
