import React from 'react';
import {Link} from 'react-router-dom';
import {FaIndent,FaUserAlt} from 'react-icons/fa';
import styled from 'styled-components';

const NavContainer = styled.nav`
padding:30px 0 30px 0;
min-width:220px;
border-right:1px;
border-right-color:black;
border-right-style:solid;
height:100vh;
position:fixed;
`
const Nav = styled.div`

`

const LinkContainer = styled.div`
    color:green;
    display:block;
    font-size:25px;
    margin-bottom: 12px;
`
const MainLogo = styled.img`
  height:100px;
  margin-bottom:30px;
  margin-left:45px;
`
const styles = {
  icons:{
    marginLeft:'20px'
  },
  text:{
    display: 'inline-block',
    marginLeft:'15px'
  }
}
function SideBar() {
  return (
    <NavContainer>
      
 
      <MainLogo src="/images/reduxlogo.png" />
      <LinkContainer><Link  to="/"><FaIndent style={styles.icons} /><div style={styles.text}>DashBoard</div></Link></LinkContainer>
      {/* <LinkContainer><Link to="/">Calendar</Link></LinkContainer> */}
      <LinkContainer><Link  to="/clients"><FaUserAlt style={styles.icons} /><div style={styles.text}>Clients</div></Link></LinkContainer>
      {/* <LinkContainer><Link to="/">Invoices</Link></LinkContainer> */}
      {/* <LinkContainer><Link to="/">Contracts</Link></LinkContainer> */}
      {/* <LinkContainer><Link to="/">Tax Report Documents</Link></LinkContainer> */}
  
     
    </NavContainer>
  );
}

export default SideBar;
