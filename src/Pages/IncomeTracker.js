import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Container } from "../utils/globalStyledComponents";

const GeneralStatsContainer = styled.div``;
const TimeFrameContainer = styled.div`
  display: flex;
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
const TimeFrame = styled.div`
  padding: 4px 6px;
  min-width: 60px;
  text-align: center;
  border: 1px solid #ddd;
  cursor: pointer;
  background: ${({ timeFrame }) => (timeFrame ? props => props.theme.blue : "white")};
  color: ${({ timeFrame }) => (timeFrame ? "white" : "black")};
  border-color: ${({ timeFrame }) => (timeFrame ? props => props.theme.blue : "#ddd")};
  font-weight: ${({ timeFrame }) => (timeFrame ? 600 : "normal")};
  font-size: 17px;
  &&:hover {
    background: ${({ timeFrame }) =>
      timeFrame ? props => props.theme.blue : props => props.theme.accent};
    color: white;
    border-color: ${({ timeFrame }) => (timeFrame ? "#ddd" : props => props.theme.accent)};
  }
`;
const TR = styled.tr`
  border-radius: 3px;
  box-shadow: 0px 0px 0px 1px rgb(221, 221, 221);
`;

function Dashboard() {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("beginning-year");
  const listOfTasks = useSelector(state => state.tasks.tasksList);
  const listOfInvoices = useSelector(state => state.invoices.invoicesList);

  const [invoicesTotalHours, setInvoicesTotalHours] = useState(0);
  const [invoicesTotalIncome, setInvoicesTotalIncome] = useState(0);
  const [calculatedHourlyIncome, setCalculatedHourlyIncome] = useState(0);

  function hoursIncomeCalculator(debutDate) {
    let invoiceHours = 0;
    let invoiceIncome = 0;
    listOfInvoices.forEach(invoice => {
      invoice.items.forEach(item => {
        invoiceHours += Number(item.hours);
        invoiceIncome += Number(item.rate);
      });
    });
    setInvoicesTotalHours(invoiceHours);
    setInvoicesTotalIncome(invoiceIncome);
    setCalculatedHourlyIncome(invoiceHours / invoiceIncome);
  }
  useEffect(() => {
    hoursIncomeCalculator();
  }, [selectedTimeFrame]);

  function tableContents() {
    if (selectedTimeFrame === "all-time") allTimeTableContents();
    else return <div>error</div>;
  }

  function allTimeTableContents() {
    return (
      <TR>
        {/* <td width="1%"> */}
        {/* <ExpandableInvisibleButton
            onClick={() => props.clientSelected(props.client)}
          ></ExpandableInvisibleButton> */}
        {/* </td> */}
        <TD label="Total Time Worked">{invoicesTotalHours.toFixed(2)}h</TD>
        <TD label="Total Income">${invoicesTotalIncome.toFixed(2)}</TD>
        <TD label="Total Income / hour">${calculatedHourlyIncome.toFixed(2)}</TD>
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
        <TimeFrameContainer>
          <TimeFrame
            timeFrame={"all-time" === selectedTimeFrame}
            onClick={() => setSelectedTimeFrame("all-time")}
          >
            All Time
          </TimeFrame>
          <TimeFrame
            timeFrame={"beginning-year" === selectedTimeFrame}
            onClick={() => setSelectedTimeFrame("beginning-year")}
          >
            Since Jan 1st
          </TimeFrame>
          <TimeFrame
            timeFrame={"last-30-days" === selectedTimeFrame}
            onClick={() => setSelectedTimeFrame("last-30-days")}
          >
            Last 30 days
          </TimeFrame>
          <TimeFrame
            timeFrame={"last-7-days" === selectedTimeFrame}
            onClick={() => setSelectedTimeFrame("last-7-days")}
          >
            Last 7 days
          </TimeFrame>
        </TimeFrameContainer>
        <table>
          <tbody>{tableContents()}</tbody>
        </table>
      </GeneralStatsContainer>
    </Container>
  );
}

export default Dashboard;
