import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import styled from "styled-components";
import { Container } from "../utils/globalStyledComponents";

const GeneralStatsContainer = styled.div``;
const SubHeader = styled.h4`
  margin: 15px 0 5px 0;
`;
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
const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  label {
    margin-right: 5px;
  }
`;

function Dashboard() {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("beginning-year");
  const listOfTasks = useSelector(state => state.tasks.tasksList);
  const listOfInvoices = useSelector(state => state.invoices.invoicesList);

  const [tasksTotalHours, setTasksTotalHours] = useState(0);
  const [invoicesTotalHours, setInvoicesTotalHours] = useState(0);
  const [invoicesTotalIncome, setInvoicesTotalIncome] = useState(0);
  const [calculatedHourlyIncome, setCalculatedHourlyIncome] = useState(0);
  const [useInvoicesData, setUseInvoicesData] = useState(false);

  function hoursIncomeCalculator(debutDate) {
    let tasksHours = 0;
    let invoiceHours = 0;
    let invoiceIncome = 0;
    listOfInvoices.forEach(invoice => {
      let invoiceDate = moment(new Date(invoice.dueDate.seconds * 1000)).valueOf();
      if (invoiceDate >= debutDate)
        invoice.items.forEach(item => {
          invoiceHours += Number(item.hours);
          invoiceIncome += Number(item.rate);
          console.log("invoiceHours", invoiceHours, "invoiceIncome", invoiceIncome);
        });
    });

    listOfTasks.forEach(task => {
      console.log("task", task);
      tasksHours += Number(task.timeWorked.hours);
      if (task.timeWorked.minutes === "15") tasksHours += 0.25;
      else if (task.timeWorked.minutes === "30") tasksHours += 0.5;
      else if (task.timeWorked.minutes === "45") tasksHours += 0.75;
    });
    setTasksTotalHours(tasksHours);
    setInvoicesTotalHours(invoiceHours);
    setInvoicesTotalIncome(invoiceIncome);
  }
  useEffect(() => {
    console.log(
      `moment()
    .subtract(1, "months")`,
      moment()
        .subtract(1, "months")
        .format("MMDDYY")
    );
    let debutDate = 0;
    if (selectedTimeFrame === "beginning-year")
      debutDate = moment()
        .startOf("year")
        .valueOf();
    else if (selectedTimeFrame === "last-7-days")
      debutDate = moment()
        .subtract(7, "days")
        .valueOf();
    else if (selectedTimeFrame === "last-30-days")
      debutDate = moment()
        .subtract(30, "days")
        .valueOf();
    hoursIncomeCalculator(debutDate);
  }, [selectedTimeFrame]);

  function tableContents() {
    return allTimeTableContents();
    if (selectedTimeFrame === "all-time") return allTimeTableContents();
    else return <div>error</div>;
  }

  function allTimeTableContents() {
    // setCalculatedHourlyIncome(invoiceHours / invoiceIncome);
    let hoursToDisplay = invoicesTotalHours.toFixed(2);
    if (!useInvoicesData) hoursToDisplay = tasksTotalHours.toFixed(2);
    let hourlyIncome = hoursToDisplay / invoicesTotalIncome;
    console.log(`typeof hourlyIncome !== "number"`, hourlyIncome);
    if (hourlyIncome === Infinity || isNaN(hourlyIncome)) hourlyIncome = 0;
    return (
      <TR>
        {/* <td width="1%"> */}
        {/* <ExpandableInvisibleButton
            onClick={() => props.clientSelected(props.client)}
          ></ExpandableInvisibleButton> */}
        {/* </td> */}
        <TD label="Total Time Worked">{hoursToDisplay}h</TD>
        <TD label="Total Income">${invoicesTotalIncome.toFixed(2)}</TD>
        <TD label="Total Income / hour">${hourlyIncome.toFixed(2)}</TD>
      </TR>
    );
  }

  return (
    <Container>
      <h2>Income Tracker</h2>
      Tables and graphs that shows you how much money you've made and with whom. What has been the
      most profitable?
      <SubHeader>General Stats</SubHeader>
      <CheckboxContainer>
        <label>Use only Invoices Data</label>
        <input
          type="checkbox"
          checked={useInvoicesData}
          onClick={() => setUseInvoicesData(!useInvoicesData)}
        />
      </CheckboxContainer>
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
