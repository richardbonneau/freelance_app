import React from "react";
import { Link } from "react-router-dom";
import { FaIndent, FaUserAlt, FaMoneyCheckAlt, FaBars } from "react-icons/fa";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { firebaseLogout, toggleHamburgerMenu } from "../_actions";

const NavContainer = styled.nav`
  @media (min-width: 1024px) {
    left: 0px !important;
  }
  left:${({ hamburgerMenuOpened }) => (hamburgerMenuOpened ? "0px" : "-188px")};
  background:${({ hamburgerMenuOpened }) => (hamburgerMenuOpened ? props => props.theme.primary : "white")};
  z-index: 100;
  transition: all 300ms ease-out 10ms;
  min-width: 220px;
  display: block;
  height: 100vh;
  position: fixed;
  @media (min-width:1024px) {
    background:${props => props.theme.primary};
  }
`;
const SidebarHeader = styled.div`
  z-index: 100;
  display: flex;
  justify-content: space-between;
  border-bottom: ${({ hamburgerMenuOpened }) => (hamburgerMenuOpened ? "1px solid black" : "none")};
  padding: 5px 8px;
  margin-bottom: 20px;
  color: ${({ hamburgerMenuOpened }) => (hamburgerMenuOpened ? "white" : "black")};
  align-items: center;
  svg{
    height: 20px;
    cursor: pointer;
  }
  img{
    height:20px;
  }
  @media (min-width:1024px) {
    border-bottom:1px solid black;
    color:white;
    svg{
    visibility:hidden;
  }
  }
`
const Mask = styled.div`
  position:fixed;
  top:0;
  right:0;
  width:100vw;
  height:100vh;
  background:#00000080;
  z-index:50;
  display: ${({ hamburgerMenuOpened }) => (hamburgerMenuOpened ? "block" : "none")};
  @media (min-width:1024px) {
    display:none;
  }
`
const LinkContainer = styled.div`
  color: green;
  display: block;
  font-size: 25px;
  margin-bottom: 12px;
  svg {
    margin-left: 20px;
    vertical-align: -4px;
  }
  a {
    color: ${({ isCurrentPage }) => (isCurrentPage ? "white" : "#a9a9a9")};
  }
  svg {
    color: ${({ isCurrentPage }) => (isCurrentPage ? "white" : "#a9a9a9")};
  }
  div {
    display: inline-block;
    margin-left: 15px;
  }
  &:hover {
    a {
      color: white;
    }
    svg {
      color: white;
    }
  }
`;

function SideBar() {
  const dispatch = useDispatch();
  const hamburgerMenuOpened = useSelector(
    state => state.navigation.hamburgerMenuOpened
  );
  const currentPage = useSelector(state => state.navigation.currentPage);
  const logoutUser = e => {
    e.preventDefault();
    dispatch(firebaseLogout());
  };
  const closeHamburgerMenu = () => {
    dispatch(toggleHamburgerMenu());
  };

  return (
    <>
      <NavContainer
        hamburgerMenuOpened={hamburgerMenuOpened}
      >
        <SidebarHeader
          hamburgerMenuOpened={hamburgerMenuOpened}
          onClick={() => dispatch(toggleHamburgerMenu())}
        >
          {" "}
          <img src="/images/reduxlogo.png" />
          Freelancify
        <FaBars
            
          />
        </SidebarHeader>

        <div />
        <LinkContainer
          isCurrentPage={currentPage === "/dashboard"}
          onClick={closeHamburgerMenu}
        >
          <Link to="/dashboard">
            <FaIndent />
            <div>DashBoard</div>
          </Link>
        </LinkContainer>
        <LinkContainer
          isCurrentPage={currentPage === "/clients"}
          onClick={closeHamburgerMenu}
        >
          <Link to="/clients">
            <FaUserAlt />
            <div>Clients</div>
          </Link>
        </LinkContainer>
        <LinkContainer
          isCurrentPage={currentPage === "/invoices"}
          onClick={closeHamburgerMenu}
        >
          <Link to="/invoices">
            <FaMoneyCheckAlt />
            <div>Invoices</div>
          </Link>
        </LinkContainer>
        {/* <LinkContainer><Link to="/">Calendar</Link></LinkContainer> */}
        {/* <LinkContainer><Link to="/">Contracts</Link></LinkContainer> */}
        {/* <LinkContainer><Link to="/">Tax Report Documents</Link></LinkContainer> */}
        {/* <LinkContainer><Link to="/">Become a Member</Link></LinkContainer> */}
        <button onClick={logoutUser}>Sign out</button>
      </NavContainer>

      <Mask hamburgerMenuOpened={hamburgerMenuOpened} />
    </>
  );
}

export default SideBar;
