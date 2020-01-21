import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Container, PageButton } from "../utils/globalStyledComponents";

function Dashboard() {
  const history = useHistory();
  function quickLink(url) {
    history.push(url);
  }
  return (
    <Container>
      <h2>Dashboard</h2>
      <div style={{ marginBottom: "15px" }}>
        Welcome to your Dashboard. Here's a list of quick actions.
      </div>
      <PageButton onClick={() => quickLink("/invoiceCreator")}>New Invoice</PageButton>
    </Container>
  );
}

export default Dashboard;
