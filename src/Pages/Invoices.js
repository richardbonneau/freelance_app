import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Invoice from "../Components/Invoice";
import Loading from "../Components/Loading";

import {
  Container,
  Table,
  Th,
  THead,
} from "../utils/globalStyledComponents";


function Invoices(props) {
  const invoices = useSelector(state => state.invoices.invoicesList);
  const clients = useSelector(state => state.clients.clientsList);
  const isSendingReq = useSelector(state=>state.invoices.isSendingReq);


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


console.log("isSendingReq",isSendingReq)
  if(isSendingReq) return <Loading />
  return (
    <Container>
      <h2>Invoices</h2>
      <Link to="/invoiceCreator">Create New Invoice</Link>
      {listOfInvoices()}
    </Container>
  );
}

export default Invoices;
