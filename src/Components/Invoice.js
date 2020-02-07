import React from "react";
import { useHistory } from "react-router-dom";
import { Tr, Td, ExpandableInvisibleButton } from "../utils/globalStyledComponents";
import moment from "moment";

function Invoice(props) {
  console.log("yes", moment("111111").format("MMM Do YYYY"));
  const history = useHistory();
  let client = props.clients.find(cl => props.invoice.clientId === cl.id);
  let invoiceDueDate = new Date(props.invoice.dueDate.seconds * 1000);
  return (
    <Tr>
      <td width="1%">
        <ExpandableInvisibleButton
          onClick={() => history.push(`/invoice/${props.invoice.id}`)}
        ></ExpandableInvisibleButton>
      </td>
      <Td label="Subject">{props.invoice.title}</Td>
      <Td label="#">{props.invoice.invoiceNumber}</Td>
      <Td label="Project">projects[invoice.projectId]</Td>
      <Td label="Client">{client.name}</Td>
      <Td label="Due Date">{moment(invoiceDueDate).format("MMM Do YYYY")}</Td>
      <td width="1%"></td>
    </Tr>
  );
}

export default Invoice;
