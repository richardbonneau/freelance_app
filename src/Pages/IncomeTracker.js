import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Container } from "../utils/globalStyledComponents";

const GeneralStatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const TD = styled.td`
  text-align: right;
  display: block;
  min-width: 240px;
  &::before {
    content: attr(label);
    float: left;
  }
`;
const TR = styled.tr`
  border-radius: 3px;
  box-shadow: 0px 0px 0px 1px rgb(221, 221, 221);
`;

function Dashboard() {
  const listOfTasks = useSelector(state => state.tasks.tasksList);
  const listOfInvoices = useSelector(state => state.invoices.invoicesList);

  let invoicesTotalHours = 0;
  let invoicesTotalIncome = 0;

  listOfInvoices.forEach(invoice => {
    invoice.items.forEach(item => {
      invoicesTotalHours += Number(item.hours);
      invoicesTotalIncome += Number(item.rate);
    });
  });

  let calculatedHourlyIncome = invoicesTotalIncome / invoicesTotalHours;

  console.log("invoicesTotalHours", invoicesTotalHours);
  function tableContents() {
    return (
      <TR>
        {/* <td width="1%"> */}
        {/* <ExpandableInvisibleButton
            onClick={() => props.clientSelected(props.client)}
          ></ExpandableInvisibleButton> */}
        {/* </td> */}
        <TD label="Time Worked">{invoicesTotalHours.toFixed(2)}h</TD>
        <TD label="Income">${invoicesTotalIncome.toFixed(2)}</TD>
        <TD label="Income / hour">${calculatedHourlyIncome.toFixed(2)}</TD>
      </TR>
    );
  }
  return (
    <Container>
      <h2>Income Tracker</h2>
      Tables and graphs that shows you how much money you've made and with whom. What has been the
      most profitable?
      <h4>General Stats</h4>
      <GeneralStatsContainer>
        <table>
          <tbody>{tableContents()}</tbody>
        </table>
      </GeneralStatsContainer>
    </Container>
  );
}

export default Dashboard;
