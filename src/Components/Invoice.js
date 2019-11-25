import React from 'react';
import { Tr, Td, ExpandableInvisibleButton } from "../utils/globalStyledComponents";

function Invoice(props) {
  let client = props.clients.find(cl=>props.invoice.clientId === cl.id);
  return (
    <Tr>
        <td width="1%">
          <ExpandableInvisibleButton onClick={() => alert("clicked")}></ExpandableInvisibleButton>
        </td>
        <Td label="Title">{props.invoice.title}</Td>
        <Td label="#">{props.invoice.invoiceNumber}</Td>
        <Td label="Project">projects[invoice.projectId]</Td>
        <Td label="Client">{client.name}</Td>
        <Td label="Due Date">invoice.dueDate</Td>
      </Tr>

  );
};

export default Invoice;
