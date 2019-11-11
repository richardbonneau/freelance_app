import React from 'react';
import styled from 'styled-components';
const Container = styled.div`
width:25%;

`
const Button = styled.a`
    color:green;
    display:block;
    font-size:25px;
`

function SideBar() {
  return (
    <Container>
    <Button href="#">DashBoard</Button>
    <Button href="#">Calendar</Button>
    <Button href="#">Clients</Button>
    <Button href="#">Invoices</Button>
    <Button href="#">Contracts</Button>
    <Button href="#">Tax Report Documents</Button>

    </Container>
  );
}

export default SideBar;
