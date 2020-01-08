import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import moment from "moment";
import AddTaskPopup from "../Components/AddTaskPopup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container, PageButton } from "../utils/globalStyledComponents";

const Header = styled.div`
  display: flex;
`;
const CalendarContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const WeekdaysContainer = styled.div`
  display: flex;
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

function TimeTracking() {
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  let momentSelectedWeek = moment(selectedWeek).startOf("week");
  const [selectedDay, setSelectedDay] = useState(moment(momentSelectedWeek).format("MMDDYY"));
  const [isModalOpened, toggleModal] = useState(false);
  const listOfTasks = useSelector(state =>
    state.tasks.tasksList.filter(task => {
      console.log("task.date === selectedDay", task.date, selectedDay);
      return task.date === selectedDay;
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
    setSelectedDay(moment(momentSelectedWeek).format("MMDDYY"));
  }, [selectedWeek]);

  // console.log("selectedDay", selectedDay);
  console.log("selectedWeek", selectedWeek);
  console.log("momentSelectedWeek", selectedDay);

  function tasksList() {
    console.log("listOfTasks", listOfTasks);
    return listOfTasks.map((task, i) => <div key={i}>{task.workType}</div>);
  }
  return (
    <Container>
      <h2>Time Tracking</h2>
      <CalendarContainer>
        <Header>
          <h4>Week of {momentSelectedWeek.startOf("week").format("MMM Do YYYY")}</h4>

          <DatePicker
            selected={selectedWeek}
            onChange={date => setSelectedWeek(date)}
            disabledKeyboardNavigation
            withPortal
            highlightDates={[new Date()]}
          />
        </Header>
        <WeekdaysContainer>
          <Weekday
            currentDay={week.sunday.format("MMDDYY") === selectedDay}
            onClick={() => setSelectedDay(week.sunday.format("MMDDYY"))}
          >
            {week.sunday.format("ddd D")}
          </Weekday>
          <Weekday
            currentDay={week.monday.format("MMDDYY") === selectedDay}
            onClick={() => setSelectedDay(week.monday.format("MMDDYY"))}
          >
            {week.monday.format("ddd D")}
          </Weekday>
          <Weekday
            currentDay={week.tuesday.format("MMDDYY") === selectedDay}
            onClick={() => setSelectedDay(week.tuesday.format("MMDDYY"))}
          >
            {week.tuesday.format("ddd D")}
          </Weekday>
          <Weekday
            currentDay={week.wednesday.format("MMDDYY") === selectedDay}
            onClick={() => setSelectedDay(week.wednesday.format("MMDDYY"))}
          >
            {week.wednesday.format("ddd D")}
          </Weekday>
          <Weekday
            currentDay={week.thursday.format("MMDDYY") === selectedDay}
            onClick={() => setSelectedDay(week.thursday.format("MMDDYY"))}
          >
            {week.thursday.format("ddd D")}
          </Weekday>
          <Weekday
            currentDay={week.friday.format("MMDDYY") === selectedDay}
            onClick={() => setSelectedDay(week.friday.format("MMDDYY"))}
          >
            {week.friday.format("ddd D")}
          </Weekday>
          <Weekday
            currentDay={week.saturday.format("MMDDYY") === selectedDay}
            onClick={() => setSelectedDay(week.saturday.format("MMDDYY"))}
          >
            {week.saturday.format("ddd D")}
          </Weekday>
        </WeekdaysContainer>
        <TasksContainer>
          {tasksList()}
          <PageButton onClick={() => toggleModal(true)}>Open Modal</PageButton>
        </TasksContainer>
      </CalendarContainer>
      <AddTaskPopup
        selectedDay={selectedDay}
        isModalOpened={isModalOpened}
        toggleModal={toggleModal}
      />
    </Container>
  );
}

export default TimeTracking;
