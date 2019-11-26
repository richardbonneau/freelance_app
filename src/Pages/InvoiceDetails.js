import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import styled from "styled-components";
import { backend } from "../utils/static.js";
import { useSelector, useDispatch } from "react-redux";
import Client from "../Components/Client";
import { addClientToFirestore } from "../_actions";
import { FiX } from "react-icons/fi";
import { Container, Table, Th, THead, MaskOverlay, ModalContents, ModalTitle, ModalHr, FormInputContainer } from "../utils/globalStyledComponents";

function ClientInfo() {
  return (
    <Container>
   
    </Container>
  );
}

export default ClientInfo;
