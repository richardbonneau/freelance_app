import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import firebase from "firebase/app";
import ErrorPopup from "./ErrorPopup";
import { addTaskToFirestore } from "../_actions";
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

const LabelInputContainer = styled.div`
  display: flex;
  align-items: center;
  label {
    min-width: 98px;
    padding: 8px;
    text-align: center;
  }
  select {
    height: 30px;
  }
`;

function AddTaskPopup(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const listOfProjects = useSelector(state => state.projects.projectsList);
  const [selectedProjectId, setSelectedProjectId] = useState(0);
  const [workType, setWorkType] = useState("");
  const [selectedHours, setSelectedHours] = useState(hours[0]);
  const [selectedMinutes, setSelectedMinutes] = useState(minutes[0]);

  const [errorModalOpened, toggleErrorModal] = useState(false);
  const [errorModalContents, setErrorModalContents] = useState("");

  const addTaskModalContents = () => {
    const newTaskSubmit = e => {
      // the "frontend" must build the Object that is sent to redux/firebase
      e.preventDefault();
      if (workType === "") {
        setErrorModalContents("Some fields are missing");
        toggleErrorModal(true);
        return;
      }
      dispatch(
        addTaskToFirestore({
          date: firebase.firestore.Timestamp.fromDate(props.selectedDay),
          projectId: selectedProjectId,
          workType,
          timeWorked: { hours: selectedHours, minutes: selectedMinutes }
        })
      );
      props.toggleModal(false);
    };

    return (
      <ModalContents active={props.isModalOpened}>
        <ModalTitle>New Task</ModalTitle>

        <form>
          <LabelInputContainer>
            <label>Project: </label>
            <select
              value={selectedProjectId}
              onChange={e => setSelectedProjectId(Number(e.target.value))}
            >
              <option value={0}>None</option>
              {listOfProjects.map((client, i) => (
                <option key={i} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
            <a
              href="#"
              onClick={() => {
                props.toggleModal(false);
                if (props.toggleProjectPopup) setTimeout(() => props.toggleProjectPopup(true), 250);
                else history.push("/projects");
              }}
              style={{ marginLeft: "14px" }}
            >
              Add
            </a>
          </LabelInputContainer>

          <div />
          <LabelInputContainer>
            {" "}
            <label>Type of Work: </label>
            <input
              type="text"
              placeholder='ex: "Programming"'
              maxLength={20}
              value={workType}
              onChange={e => setWorkType(e.target.value)}
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <label>Time Spent: </label>
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
          </LabelInputContainer>

          <div />

          <div className="modal-buttons">
            {" "}
            <PageButton onClick={newTaskSubmit}>Create Task</PageButton>
            <PageButton onClick={() => props.toggleModal(false)}>Cancel</PageButton>
          </div>
        </form>
      </ModalContents>
    );
  };

  return (
    <>
      <MaskOverlay onClick={() => props.toggleModal(false)} isModalOpened={props.isModalOpened} />
      <ModalContainer
        isModalOpened={props.isModalOpened}
        style={{ height: "260px", marginTop: "-130px" }}
      >
        {addTaskModalContents()}
      </ModalContainer>
      <ErrorPopup
        errorModalOpened={errorModalOpened}
        toggleErrorModal={toggleErrorModal}
        errorModalContents={errorModalContents}
      />
    </>
  );
}

export default AddTaskPopup;
