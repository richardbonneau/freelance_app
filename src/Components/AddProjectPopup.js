import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import firebase from "firebase/app";
import ErrorPopup from "./ErrorPopup";
import { addProjectToFirestore } from "../_actions";
import {
  PageButton,
  MaskOverlay,
  ModalContainer,
  ModalContents,
  ModalTitle,
  ModalHr
} from "../utils/globalStyledComponents";
const ProjectForm = styled.form`
  display: flex;
  flex-direction: column;
`;
function AddProjectPopup(props) {
  const dispatch = useDispatch();
  const listOfClients = useSelector(state => state.clients.clientsList);
  const [nameInput, setNameInput] = useState("");
  const [selectedClientId, setSelectedClientId] = useState(0);
  const [projectStartDate, setProjectStartDate] = useState(new Date());
  const [projectEndDate, setProjectEndDate] = useState(new Date());

  const [errorModalOpened, toggleErrorModal] = useState(false);
  const [errorModalContents, setErrorModalContents] = useState("");

  const addProjectModalContents = () => {
    const newProjectSubmit = e => {
      // the "frontend" must build the Object that is sent to redux/firebase
      e.preventDefault();
      if (nameInput === "") {
        setErrorModalContents("Some fields are missing");
        toggleErrorModal(true);

        return;
      }
      let newProjectId = Date.now() * 10000 + Math.round(Math.random() * 9999);
      dispatch(
        addProjectToFirestore({
          name: nameInput,
          id: newProjectId,
          clientId: selectedClientId,
          projectDebutDate: firebase.firestore.Timestamp.fromDate(projectStartDate),
          projectEndDate: firebase.firestore.Timestamp.fromDate(projectEndDate)
        })
      );
      props.toggleModal(false);
      setNameInput("");
    };

    return (
      <ModalContents active={props.isModalOpened}>
        <ModalTitle>New Project</ModalTitle>

        <ProjectForm>
          <input
            type="text"
            placeholder="Name"
            value={nameInput}
            onChange={e => setNameInput(e.target.value)}
          />
          <label>Client </label>
          <select
            value={selectedClientId}
            onChange={e => setSelectedClientId(Number(e.target.value))}
          >
            <option value={0}>None</option>
            {listOfClients.map((client, i) => (
              <option key={i} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
          <div />
          <label style={{ marginTop: "5px" }}>Start Date </label>
          <DatePicker
            selected={projectStartDate}
            onChange={date => setProjectStartDate(date)}
            disabledKeyboardNavigation
          />
          <div />
          <label>End Date </label>
          <DatePicker
            selected={projectEndDate}
            onChange={date => setProjectEndDate(date)}
            disabledKeyboardNavigation
          />
          <div className="modal-buttons">
            {" "}
            <PageButton onClick={newProjectSubmit}>Create Project</PageButton>
            <PageButton onClick={() => props.toggleModal(false)}>Cancel</PageButton>
          </div>
        </ProjectForm>
      </ModalContents>
    );
  };

  return (
    <>
      <MaskOverlay onClick={() => props.toggleModal(false)} isModalOpened={props.isModalOpened} />
      <ModalContainer
        isModalOpened={props.isModalOpened}
        style={{ height: "330px", marginTop: "-150px" }}
      >
        {addProjectModalContents()}
      </ModalContainer>
      <ErrorPopup
        errorModalOpened={errorModalOpened}
        toggleErrorModal={toggleErrorModal}
        errorModalContents={errorModalContents}
      />
    </>
  );
}

export default AddProjectPopup;
