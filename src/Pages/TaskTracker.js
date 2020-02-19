import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import moment from "moment";
import AddTaskPopup from "../Components/AddTaskPopup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container, PageButton, Tr, Td, Th, Table, THead } from "../utils/globalStyledComponents";
import { FaCalendarAlt } from "react-icons/fa";

const Header = styled.div`
  display: flex;
  align-items: center;
  h4 {
    margin-right: 25px;
  }
`;
const CalendarContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const WeekdaysContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
const Weekday = styled.div`
  padding: 4px 6px;
  min-width: 60px;
  text-align: center;
  border: 1px solid #ddd;
  cursor: pointer;
  background: ${({ currentDay }) => (currentDay ? props => props.theme.blue : "white")};
  color: ${({ currentDay }) => (currentDay ? "white" : "black")};
  border-color: ${({ currentDay }) => (currentDay ? props => props.theme.blue : "#ddd")};
  font-weight: ${({ currentDay }) => (currentDay ? 600 : "normal")};
  font-size: 17px;
  &&:hover {
    background: ${({ currentDay }) =>
      currentDay ? props => props.theme.blue : props => props.theme.accent};
    color: white;
    border-color: ${({ currentDay }) => (currentDay ? "#ddd" : props => props.theme.accent)};
  }
`;
const TasksContainer = styled.div``;
const WeekSelector = styled.div`
  position: relative;
  width: 220px;
  height: 35px;
  margin: 10px 0;
  a {
    position: absolute;
    height: 100%;
    width: 100%;
    padding: 0;
    /* z-index: 1000; */
  }

  input {
    height: 100%;
    margin: 0 !important;
    border-bottom: none !important;
    color: #ffffff00;
    background: #ffffff00;
  }
`;

function TaskTracker() {
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  let momentSelectedWeek = moment(selectedWeek).startOf("week");
  const [selectedDay, setSelectedDay] = useState(moment(momentSelectedWeek));
  const [isModalOpened, toggleModal] = useState(false);
  const listOfTasks = useSelector(state =>
    state.tasks.tasksList.filter(task => {
      let taskDateParsed = new Date(task.date.seconds * 1000);
      return moment(taskDateParsed).format("MMDDYY") === moment(selectedDay).format("MMDDYY");
    })
  );
  const week = {
    sunday: moment(momentSelectedWeek),
    monday: moment(momentSelectedWeek).add(1, "days"),
    tuesday: moment(momentSelectedWeek).add(2, "days"),
    wednesday: moment(momentSelectedWeek).add(3, "days"),
    thursday: moment(momentSelectedWeek).add(4, "days"),
    friday: moment(momentSelectedWeek).add(5, "days"),
    saturday: moment(momentSelectedWeek).add(6, "days")
  };

  useEffect(() => {
    setSelectedDay(moment(momentSelectedWeek));
  }, [selectedWeek]);

  // console.log("selectedDay", selectedDay);
  console.log("selectedWeek", selectedWeek);
  console.log("momentSelectedWeek", selectedDay);

  function tasksList() {
    if (listOfTasks.length === 0)
      return (
        <tr>
          <td></td>
          <td></td>
          <td style={{ textAlign: "center" }}> Nothing to show here</td>
        </tr>
      );
    return listOfTasks.map((task, i) => (
      <Tr key={i}>
        <td width="1%">
          {/* <ExpandableInvisibleButton onClick={() => project.projectSelected(project.client)}></ExpandableInvisibleButton> */}
        </td>
        <Td label="Project">{task.projectId}</Td>
        <Td label="Type of work">{task.workType}</Td>
        <Td label="Time Spent">{`${task.timeWorked.hours}:${task.timeWorked.minutes}`}</Td>
      </Tr>
    ));
  }

  return (
    <Container>
      <h2>Task Tracker</h2>
      <div>Keep track of how much time you spend on specific tasks.</div>
      <CalendarContainer>
        <Header>
          <h4>Week of {momentSelectedWeek.startOf("week").format("MMM Do YYYY")}</h4>
          <WeekSelector>
            <PageButton>
              <FaCalendarAlt />
              Click here to select a week
            </PageButton>
            <DatePicker
              className="tasktracker-datepicker"
              selected={selectedWeek}
              onChange={date => setSelectedWeek(date)}
              disabledKeyboardNavigation
              withPortal
              highlightDates={[new Date()]}
            />
          </WeekSelector>
        </Header>
        <WeekdaysContainer>
          {Object.keys(week).map((day, i) => (
            <Weekday
              key={i}
              currentDay={week[day].format("MMDDYY") === selectedDay.format("MMDDYY")}
              onClick={() => setSelectedDay(week[day])}
            >
              {week[day].format("ddd D")}
            </Weekday>
          ))}
        </WeekdaysContainer>
        <TasksContainer>
          <Table>
            <THead>
              <tr>
                <Th width="1%" scope="col"></Th>
                <Th scope="col">Project</Th>
                <Th scope="col">Type of Work</Th>
                <Th scope="col">Time Spent</Th>
                <Th width="1%" scope="col"></Th>
              </tr>
            </THead>
            <tbody>{tasksList()}</tbody>
          </Table>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <PageButton style={{ height: "30px", width: "65%" }} onClick={() => toggleModal(true)}>
              Add New Task
            </PageButton>
          </div>
        </TasksContainer>
      </CalendarContainer>
      <AddTaskPopup
        selectedDay={moment(selectedDay).toDate()}
        isModalOpened={isModalOpened}
        toggleModal={toggleModal}
      />
    </Container>
  );
}

export default TaskTracker;
