import React from "react";
import styled from "styled-components";
import { Container, PageButton } from "../utils/globalStyledComponents";

function Dashboard() {
  return (
    <Container>
      <h2>Expenses</h2>
      Upload any expenses that you need to declare when doing your taxes.
      {/* <PageButton>New Invoice</PageButton>
            <PageButton>New Client</PageButton>
            <PageButton>New Project</PageButton>
            <PageButton>Start Time Track</PageButton> */}
    </Container>
  );
}

export default Dashboard;
