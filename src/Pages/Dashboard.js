import React from "react";
import styled from "styled-components";
import { Container, PageButton } from "../utils/globalStyledComponents";

function Dashboard() {
  return (
    <Container>
      <h2>Dashboard</h2>
      Buttons that redirects you to different parts of the site
      {/* <PageButton>New Invoice</PageButton>
            <PageButton>New Client</PageButton>
            <PageButton>New Project</PageButton>
            <PageButton>Start Time Track</PageButton> */}
    </Container>
  );
}

export default Dashboard;
