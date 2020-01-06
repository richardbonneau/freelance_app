import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import styled from "styled-components";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container } from "../utils/globalStyledComponents";

const Header = styled.div`
  display:flex;
`

function TimeTracking() {
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  console.log();
  return (
    <Container>
      <h2>Time Tracking</h2>
      <Header>
        <h4>Week of {moment(selectedWeek).startOf('day').format("MMM Do YYYY")}</h4>

        <DatePicker
          selected={selectedWeek}
          onChange={date => setSelectedWeek(date)}
          disabledKeyboardNavigation
          withPortal
        />

      </Header>

      <div></div>
    </Container>
  );
}

export default TimeTracking;
