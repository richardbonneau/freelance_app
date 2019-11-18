import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
    border: 2px solid black;
    margin: 3px 0;
`
function Client(props) {
  return (
    <Container>
        {props.name}
    </Container>

  );
}

export default Client;
