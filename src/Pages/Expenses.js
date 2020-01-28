import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import AddExpensePopup from "../Components/AddExpensePopup";
import { Container, Table, Th, THead, PageButton, Tr, Td } from "../utils/globalStyledComponents";

function Expenses() {
  const listOfExpenses = useSelector(state => state.expenses.expensesList);
  const listOfClients = useSelector(state => state.clients.clientsList);
  const [isModalOpened, toggleModal] = useState(false);
  const [isClientCardOpened, toggleClientCard] = useState(false);

  //TODO:Open a card showing the expense when a expense is clicked
  // const [selectedExpense, setSelectedClient] = useState(listOfExpenses[0]);
  // console.log("listOfExpenses", listOfExpenses);

  // const clientSelected = client => {
  //   toggleClientCard(true);
  //   setSelectedClient(client);
  // };

  const expensesList = () => {
    let tableContents = listOfExpenses.map((expense, i) => {
      let date = new Date(expense.date.seconds * 1000);

      return (
        <Tr key={i}>
          <td width="1%">
            {/* <ExpandableInvisibleButton onClick={() => expense.expenseSelected(expense.client)}></ExpandableInvisibleButton> */}
          </td>
          <Td label="Name">{expense.name}</Td>
          <Td label="Date">{moment(date).format("MMM Do YYYY")}</Td>
          <Td label="Amount">${expense.amount}</Td>

          <td width="1%" />
        </Tr>
      );
    });
    return (
      <Table>
        <THead>
          <tr>
            <Th width="1%" scope="col"></Th>
            <Th scope="col">Name</Th>
            <Th scope="col">Date</Th>
            <Th scope="col">Amount</Th>

            <Th width="1%" scope="col"></Th>
          </tr>
        </THead>
        <tbody>{tableContents}</tbody>
      </Table>
    );
  };
  // const clientCardModalContents = () => {
  //   return (
  //     <ModalContents active={isClientCardOpened}>
  //       <FormInputContainer>
  //         <div />
  //         <FiX style={styles.fiX} />
  //       </FormInputContainer>
  //       <div>name: {selectedClient.name}</div>
  //       <div>email: {selectedClient.email}</div>
  //       <div>company: {selectedClient.companyName}</div>
  //       <div>street: {selectedClient.street}</div>
  //       <div>city: {selectedClient.city}</div>
  //       <div>province: {selectedClient.province}</div>
  //       <div>zip: {selectedClient.zip}</div>
  //     </ModalContents>
  //   );
  // };

  return (
    <Container>
      <h2>Expenses</h2>
      <div>Upload any expenses that you need to declare when doing your taxes.</div>
      <PageButton
        style={{ width: "125px", float: "right", margin: "10px 0" }}
        onClick={() => toggleModal(true)}
      >
        Add New Expense
      </PageButton>

      {expensesList()}
      <AddExpensePopup isModalOpened={isModalOpened} toggleModal={toggleModal} />
    </Container>
  );
}
export default Expenses;
