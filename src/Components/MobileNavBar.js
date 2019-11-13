import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {FaBars} from 'react-icons/fa'
import styled from 'styled-components';
import {useSelector,useDispatch} from 'react-redux'

const Container = styled.div`
@media (min-width:1024px) {
    display:none;
}
    display:flex;
    border-bottom:1px solid black;
`
const MainLogo = styled.img`
    height: 25px;
`

const styles={
    hamburgerMenu:{
        height:'30px',
        width:'30px',
        cursor:'pointer'
    }
}
function MobileNavBar() {
    const hamburgerMenuOpened = useSelector(state => state.hamburgerMenuOpened)
    const dispatch = useDispatch();

    function hamburgerMenuClick(){
        dispatch({type:"toggleHamburgerMenu", payload: !hamburgerMenuOpened})
    }

  return (
      <Container>
          <FaBars style={styles.hamburgerMenu} onClick={hamburgerMenuClick} />
          <MainLogo src="/images/reduxlogo.png" />
      </Container>
      
  );
}

export default MobileNavBar;
