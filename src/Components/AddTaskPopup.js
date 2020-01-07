import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import firebase from "firebase/app";
import { addProjectToFirestore } from "../_actions";
import {
  PageButton,
  MaskOverlay,
  ModalContainer,
  ModalContents,
  ModalTitle,
  ModalHr
} from "../utils/globalStyledComponents";

function AddTaskPopup(props) {
  const dispatch = useDispatch();
  const listOfProjects = useSelector(state => state.projects.projectsList);
  const [nameInput, setNameInput] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState(
    Number(listOfProjects[0].id)
  );
  const [projectStartDate, setProjectStartDate] = useState(new Date());
  const [projectEndDate, setProjectEndDate] = useState(new Date());

  const addProjectModalContents = () => {
    const newProjectSubmit = e => {
      // the "frontend" must build the Object that is sent to redux/firebase
      e.preventDefault();
      let newProjectId = Date.now() * 10000 + Math.round(Math.random() * 9999);
      dispatch(
        addProjectToFirestore({
          name: nameInput,
          id: newProjectId,
          clientId: selectedClientId,
          projectDebutDate: firebase.firestore.Timestamp.fromDate(
            projectStartDate
          ),
          projectEndDate: firebase.firestore.Timestamp.fromDate(projectEndDate)
        })
      );
      props.toggleModal(false);
      setNameInput("");
    };

    return (
      <ModalContents active={props.isModalOpened}>
        <ModalTitle>New Project</ModalTitle>
        <ModalHr />
        <form>
          <label>Project: </label>
          <select
            value={selectedClientId}
            onChange={e => setSelectedClientId(Number(e.target.value))}
          >
            {listOfProjects.map((client, i) => (
              <option key={i} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
          <div />

          <div className="modal-buttons">
            {" "}
            <PageButton onClick={newProjectSubmit}>Create Project</PageButton>
            <PageButton onClick={() => props.toggleModal(false)}>
              Cancel
            </PageButton>
          </div>
        </form>
      </ModalContents>
    );
  };

  return (
    <>
      <MaskOverlay isModalOpened={props.isModalOpened} />
      <ModalContainer
        isModalOpened={props.isModalOpened}
        style={{ height: "330px", marginTop: "-150px" }}
      >
        {addProjectModalContents()}
      </ModalContainer>
    </>
  );
}

export default AddTaskPopup;
