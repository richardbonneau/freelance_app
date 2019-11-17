import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
    border: 2px solid black;
`
function Client(props) {
    console.log("props",props)
  return (
    <Container>
        {props.name}
    </Container>

  );
}

export default Client;
