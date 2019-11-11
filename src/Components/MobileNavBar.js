import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {FaBars} from 'react-icons/fa'
import styled from 'styled-components';

const Container = styled.div`
@media (min-width:1024px) {
    display:none;
}
    border-bottom:1px solid black;
`

const styles={
    hamburgerMenu:{
        height:'30px',
        width:'30px',
        cursor:'pointer'
    }
}
function MobileNavBar() {
    function hamburgerMenuClick(){

    }
  return (
      <Container>
          <FaBars style={styles.hamburgerMenu} onClick={hamburgerMenuClick} />
      </Container>
      
  );
}

export default MobileNavBar;
