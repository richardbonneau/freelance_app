import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components';
import { backend } from '../utils/static.js'
import { useSelector, useDispatch } from "react-redux";
import { db, firestore } from '../utils/fire.js';

const Container = styled.div`
    padding-left: 25px;
`
function Clients() {
  const user = useSelector(state => state.auth.user);

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

  const getFromFirestore = () => {
    db.collection("users").doc(user.uid).get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
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

  return (
    <Container>
      <h2>Clients</h2>
      <button onClick={pushToFirestore}>push to firestore</button>
      <button onClick={updateArray}>updateArray</button>
      <button onClick={getFromFirestore}>get from firestore</button>

    </Container>

  );
}

export default Clients;
