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
const hours = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const minutes = ["00", "15", "30", "45"];

function AddTaskPopup(props) {
  const dispatch = useDispatch();
  const listOfProjects = useSelector(state => state.projects.projectsList);
  const [selectedProjectId, setSelectedProjectId] = useState(Number(listOfProjects[0].id));
  const [workType, setWorkType] = useState("");
  const [selectedHours, setSelectedHours] = useState("");
  const [selectedMinutes, setSelectedMinutes] = useState("");

  const addProjectModalContents = () => {
    const newProjectSubmit = e => {
      // the "frontend" must build the Object that is sent to redux/firebase
      e.preventDefault();
      let newProjectId = Date.now() * 10000 + Math.round(Math.random() * 9999);
      // dispatch(
      //   addProjectToFirestore({
      //     name: nameInput,
      //     id: newProjectId,
      //     clientId: selectedClientId,
      //     projectDebutDate: firebase.firestore.Timestamp.fromDate(
      //       projectStartDate
      //     ),
      //     projectEndDate: firebase.firestore.Timestamp.fromDate(projectEndDate)
      //   })
      // );
      props.toggleModal(false);
    };

    return (
      <ModalContents active={props.isModalOpened}>
        <ModalTitle>New Project</ModalTitle>
        <ModalHr />
        <form>
          <label>Project: </label>
          <select
            value={selectedProjectId}
            onChange={e => setSelectedProjectId(Number(e.target.value))}
          >
            {listOfProjects.map((client, i) => (
              <option key={i} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Work Type"
            value={workType}
            onChange={e => setWorkType(e.target.value)}
          />

          <select value={selectedHours} onChange={e => setSelectedHours(e.target.value)}>
            {hours.map((hour, i) => (
              <option key={i} value={hour}>
                {hour}
              </option>
            ))}
          </select>
          <select value={selectedMinutes} onChange={e => setSelectedMinutes(e.target.value)}>
            {minutes.map((hour, i) => (
              <option key={i} value={hour}>
                {hour}
              </option>
            ))}
          </select>

          <div />

          <div className="modal-buttons">
            {" "}
            <PageButton onClick={newProjectSubmit}>Create Project</PageButton>
            <PageButton onClick={() => props.toggleModal(false)}>Cancel</PageButton>
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
        style={{ height: "260px", marginTop: "-130px" }}
      >
        {addProjectModalContents()}
      </ModalContainer>
    </>
  );
}

export default AddTaskPopup;
