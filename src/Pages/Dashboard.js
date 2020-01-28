import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Container, PageButton } from "../utils/globalStyledComponents";
import AddClientPopup from "../Components/AddClientPopup";
import AddExpensePopup from "../Components/AddExpensePopup";
import AddProjectPopup from "../Components/AddProjectPopup";
import AddTaskPopup from "../Components/AddTaskPopup";

const ButtonContainer = styled.div`
  a {
    margin-bottom: 10px;
    width: 100%;
  }
`;

function Dashboard() {
  const history = useHistory();
  function quickLink(url) {
    history.push(url);
  }
  const [clientPopupOpened, setClientPopupOpened] = useState(false);
  const [expensePopupOpened, setExpensePopupOpened] = useState(false);
  const [projectPopupOpened, setProjectPopupOpened] = useState(false);
  const [taskPopupOpened, setTaskPopupOpened] = useState(false);
  return (
    <Container>
      <h2>Dashboard</h2>
      <div style={{ marginBottom: "15px" }}>
        Welcome to your Dashboard. Here's a list of quick actions.
      </div>
      <ButtonContainer>
        <PageButton onClick={() => quickLink("/invoiceCreator")}>New Invoice</PageButton>
        <PageButton onClick={() => setClientPopupOpened(true)}>New Client</PageButton>
        <PageButton onClick={() => setExpensePopupOpened(true)}>New Expense</PageButton>
        <PageButton onClick={() => setProjectPopupOpened(true)}>New Project</PageButton>
        <PageButton onClick={() => setTaskPopupOpened(true)}>New Task</PageButton>
      </ButtonContainer>

      <AddClientPopup isModalOpened={clientPopupOpened} toggleModal={setClientPopupOpened} />
      <AddExpensePopup isModalOpened={expensePopupOpened} toggleModal={setExpensePopupOpened} />
      <AddProjectPopup isModalOpened={projectPopupOpened} toggleModal={setProjectPopupOpened} />
      <AddTaskPopup isModalOpened={taskPopupOpened} toggleModal={setTaskPopupOpened} />
    </Container>
  );
}

export default Dashboard;
