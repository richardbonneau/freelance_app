import React, { useState } from "react";
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
  font-size: 17px;
  &&:hover {
    background: ${props => props.theme.blue};
    color: white;
    border-color: ${props => props.theme.blue};
  }
`;
const TasksContainer = styled.div``;
function TimeTracking() {
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  let momentSelectedWeek = moment(selectedWeek).startOf("week");
  // const [selectedDay, setSelectedDay] = useState(moment(momentSelectedWeek).startOf("day"));
  const [isModalOpened, toggleModal] = useState(false);
  // console.log("selectedDay", selectedDay);
  console.log("selectedWeek", selectedWeek);
  console.log("momentSelectedWeek", momentSelectedWeek);
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
          <Weekday>{moment(momentSelectedWeek).format("ddd D")}</Weekday>
          <Weekday>
            {moment(momentSelectedWeek)
              .add(1, "days")
              .format("ddd D")}
          </Weekday>
          <Weekday>
            {moment(momentSelectedWeek)
              .add(2, "days")
              .format("ddd D")}
          </Weekday>
          <Weekday>
            {moment(momentSelectedWeek)
              .add(3, "days")
              .format("ddd D")}
          </Weekday>
          <Weekday>
            {moment(momentSelectedWeek)
              .add(4, "days")
              .format("ddd D")}
          </Weekday>
          <Weekday>
            {moment(momentSelectedWeek)
              .add(5, "days")
              .format("ddd D")}
          </Weekday>
          <Weekday>
            {moment(momentSelectedWeek)
              .add(6, "days")
              .format("ddd D")}
          </Weekday>
        </WeekdaysContainer>
        <TasksContainer>
          <PageButton onClick={() => toggleModal(true)}>Open Modal</PageButton>
        </TasksContainer>
      </CalendarContainer>
      <AddTaskPopup isModalOpened={isModalOpened} toggleModal={toggleModal} />
    </Container>
  );
}

export default TimeTracking;
