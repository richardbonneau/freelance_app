import React from 'react';
import { Link } from 'react-router-dom';
import { FaIndent, FaUserAlt, FaMoneyCheckAlt } from 'react-icons/fa';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux'
import { firebaseLogout } from '../_actions';

const NavContainer = styled.nav`
@media (min-width:1024px) {
  left:0px !important;
}
  transition: all 450ms ease-out 10ms;
  left:-220px;
  background: white;
  min-width:220px;
  padding:30px 0 30px 0;
  display:block;
  border-right:1px solid black;
  height:100vh;
  position:fixed;
`
const LinkContainer = styled.div`
  color:green;
  display:block;
  font-size:25px;
  margin-bottom: 12px;
`
const MainLogo = styled.img`
@media (min-width:1024px) {
  height:100px;
  margin-bottom:30px;
  margin-left:45px;
  display:block;
}
  display:none;
`
const styles = {
  icons: {
    color: 'purple',
    marginLeft: '20px'
  },
  text: {
    display: 'inline-block',
    marginLeft: '15px'
  }
};

function SideBar() {
  const dispatch = useDispatch();
  const hamburgerMenuOpened = useSelector(state => state.navigation.hamburgerMenuOpened)
  const logoutUser = (e)=>{
    e.preventDefault();
    dispatch(firebaseLogout());
  }

  return (
    <NavContainer style={hamburgerMenuOpened ? { left: '0px' } : { left: '-220px' }}>
      <MainLogo src="/images/reduxlogo.png" />
      <LinkContainer><Link to="/dashboard"><FaIndent style={styles.icons} /><div style={styles.text}>DashBoard</div></Link></LinkContainer>
      {/* <LinkContainer><Link to="/">Calendar</Link></LinkContainer> */}
      <LinkContainer><Link to="/clients"><FaUserAlt style={styles.icons} /><div style={styles.text}>Clients</div></Link></LinkContainer>
      <LinkContainer><Link to="/invoices"><FaMoneyCheckAlt style={styles.icons} /><div style={styles.text}>Invoices</div></Link></LinkContainer>
      {/* <LinkContainer><Link to="/">Contracts</Link></LinkContainer> */}
      {/* <LinkContainer><Link to="/">Tax Report Documents</Link></LinkContainer> */}
      <button onClick={logoutUser}>Sign out</button>


    </NavContainer>
  );
}

export default SideBar;
