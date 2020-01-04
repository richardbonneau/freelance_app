import React from 'react';
import { useHistory } from "react-router-dom";
import { Tr, Td, ExpandableInvisibleButton } from "../utils/globalStyledComponents";
import moment from "moment";

function Invoice(props) {
  const history = useHistory();
  let client = props.clients.find(cl => props.invoice.clientId === cl.id);
  let invoiceDueDate = new Date(props.invoice.dueDate.seconds * 1000);
  return (
    <Tr>
      <td width="1%">
        <ExpandableInvisibleButton onClick={() => history.push(`/invoice/${props.invoice.id}`)}></ExpandableInvisibleButton>
      </td>
      <Td label="Title">{props.invoice.title}</Td>
      <Td label="#">{props.invoice.invoiceNumber}</Td>
      <Td label="Project">projects[invoice.projectId]</Td>
      <Td label="Client">{client.name}</Td>
      <Td label="Due Date">{moment(invoiceDueDate).format("MMM Do YYYY")}</Td>
    </Tr>

  );
};

export default Invoice;
