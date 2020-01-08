import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
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
  label {
    min-width: 98px;
    padding: 8px;
    text-align: center;
  }
`;

function AddTaskPopup(props) {
  const dispatch = useDispatch();
  const listOfProjects = useSelector(state => state.projects.projectsList);
  const [selectedProjectId, setSelectedProjectId] = useState(Number(listOfProjects[0].id));
  const [workType, setWorkType] = useState("");
  const [selectedHours, setSelectedHours] = useState("");
  const [selectedMinutes, setSelectedMinutes] = useState("");

  const addTaskModalContents = () => {
    console.log("props.selectedDay", props.selectedDay);
    const newTaskSubmit = e => {
      // the "frontend" must build the Object that is sent to redux/firebase
      e.preventDefault();

      dispatch(
        addTaskToFirestore({
          date: props.selectedDay,
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
        <ModalHr />
        <form>
          <LabelInputContainer>
            <label>Task: </label>
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
      <MaskOverlay isModalOpened={props.isModalOpened} />
      <ModalContainer
        isModalOpened={props.isModalOpened}
        style={{ height: "260px", marginTop: "-130px" }}
      >
        {addTaskModalContents()}
      </ModalContainer>
    </>
  );
}

export default AddTaskPopup;
