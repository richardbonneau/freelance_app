import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { openNewInvoicePage } from "../_actions";
import Invoice from "../Components/Invoice";
import Loading from "../Components/Loading";

import {
  Container,
  Table,
  Th,
  THead,
  PageButton
} from "../utils/globalStyledComponents";


function Invoices(props) {
  const dispatch = useDispatch();
  const invoices = useSelector(state => state.invoices.invoicesList);
  const clients = useSelector(state => state.clients.clientsList);
  const isSendingReq = useSelector(state => state.invoices.isSendingReq);

  function createNewInvoice() {
    console.log("here")
    dispatch(openNewInvoicePage());
    props.history.push("/invoiceCreator");
  }

  const listOfInvoices = () => {
    let tableContents = invoices.map((invoice, i) => (
      <Invoice invoice={invoice} clients={clients} key={i} />
    ));
    return (
      <Table>
        <THead>
          <tr>
            <Th width="1%" scope="col"></Th>
            <Th scope="col">Title</Th>
            <Th width="5%" scope="col">
              #
            </Th>
            <Th scope="col">Project</Th>
            <Th scope="col">Client</Th>
            <Th width="20%" scope="col">
              Due Date
            </Th>
            <Th width="1%" scope="col"></Th>
          </tr>
        </THead>
        <tbody>{tableContents}</tbody>
      </Table>
    );
  };

  if (isSendingReq) return <Loading />
  return (
    <Container>
      <h2>Invoices</h2>
      <PageButton onClick={createNewInvoice} style={{ width: "160px", float: 'right', marginBottom: '10px' }} >Create New Invoice</PageButton>
      {listOfInvoices()}
    </Container>
  );
}

export default Invoices;
