import React from "react";
import { Tr, Td, ExpandableInvisibleButton } from "../utils/globalStyledComponents";

function Client(props) {
  return (
    <Tr>
      <td width="1%">
        <ExpandableInvisibleButton
          onClick={() => props.clientSelected(props.client)}
        ></ExpandableInvisibleButton>
      </td>
      <Td label="Full Name">{props.client.name}</Td>
      <Td label="Email">{props.client.email}</Td>
      <Td label="Company">{props.client.companyName}</Td>
      <td width="1%" />
    </Tr>
  );
}

export default Client;
