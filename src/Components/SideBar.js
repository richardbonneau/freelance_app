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
  background: purple;
  z-index: 100;
  transition: all 300ms ease-out 10ms;
  min-width: 220px;
  padding: 30px 0 30px 0;
  display: block;
  border-right: 1px solid black;
  height: 100vh;
  position: fixed;
`;
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
const MainLogo = styled.img`
  @media (min-width: 1024px) {
    height: 100px;
    margin-bottom: 30px;
    margin-left: 45px;
    display: block;
  }
  display: none;
`;
const styles = {
  hamburgerMenu: {
    height: "30px",
    width: "30px",
    cursor: "pointer"
  }
};
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
    <NavContainer
      style={hamburgerMenuOpened ? { left: "0px" } : { left: "-225px" }}
    >
      <div>
        {" "}
        <FaBars
          style={styles.hamburgerMenu}
          onClick={() => dispatch(toggleHamburgerMenu())}
        />
      </div>

      <div />
      <MainLogo src="/images/reduxlogo.png" />
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
  );
}

export default SideBar;
