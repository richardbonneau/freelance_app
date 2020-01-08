import React from "react";
import styled from "styled-components";
import { Container, PageButton } from "../utils/globalStyledComponents";

function Dashboard() {
  return (
    <Container>
      <h2>Income Tracker</h2>
      Graphs that shows you how much money you've made and with whom. What has been the most
      profitable?
      {/* <PageButton>New Invoice</PageButton>
            <PageButton>New Client</PageButton>
            <PageButton>New Project</PageButton>
            <PageButton>Start Time Track</PageButton> */}
    </Container>
  );
}

export default Dashboard;
