import React from 'react';
import styled from 'styled-components';
import { Tr, Td,ExpandableInvisibleButton } from "../utils/globalStyledComponents";


const Container = styled.div`
    border: 2px solid black;
    margin: 3px 0;
`
function Client(props) {
  return (
    <Tr>
    <td width="1%">
      <ExpandableInvisibleButton onClick={() => alert("clicked")}></ExpandableInvisibleButton>
    </td>
    <Td label="Full Name">{props.client.name}</Td>
    <Td label="Email">props.client.email</Td>
    <Td label="Company">props.client.company</Td>

  </Tr>

  );
}

export default Client;
