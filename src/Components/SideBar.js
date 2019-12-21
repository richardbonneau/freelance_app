import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaIndent, FaUserAlt, FaMoneyCheckAlt, FaBars } from "react-icons/fa";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { firebaseLogout, toggleHamburgerMenu } from "../_actions";

const NavContainer = styled.nav`
  @media (min-width: 1024px) {
    left: 0px !important;
  }
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  left: ${({ hamburgerMenuOpened }) =>
    hamburgerMenuOpened ? "0px" : "-188px"};
  background: ${({ hamburgerMenuOpened }) =>
    hamburgerMenuOpened ? props => props.theme.primary : "white"};
  z-index: 100;
  transition: all 300ms ease-out 10ms;
  min-width: 220px;
  height: 100vh;
  position: fixed;
  @media (min-width: 1024px) {
    background: ${props => props.theme.primary};
  }
`;
const SidebarHeader = styled.div`
  z-index: 100;
  display: flex;
  justify-content: space-between;
  border-bottom: ${({ hamburgerMenuOpened }) =>
    hamburgerMenuOpened ? "1px solid #4c4c4c" : "none"};
  padding: 5px 8px;
  margin-bottom: 20px;
  color: ${({ hamburgerMenuOpened }) =>
    hamburgerMenuOpened ? "white" : "black"};
  align-items: center;
  svg {
    height: 20px;
    cursor: pointer;
  }
  img {
    height: 20px;
  }
  @media (min-width: 1024px) {
    border-bottom: 1px solid #4c4c4c;
    color: white;
    svg {
      visibility: hidden;
    }
  }
`;
const UserAvatarContainer = styled.div`
  margin: 20px;
  cursor: pointer;
  position: relative;
  .avatar-and-username {
    display: flex;
    align-items: center;
  }
  .avatar {
    margin-right: 10px;
    background: url("/images/default-user-icon.jpg");
    height: 60px;
    width: 60px;
    background-size: contain;
    background-repeat: no-repeat;
    border-radius: 50px;
  }
  .popup {
    visibility: ${({ avatarPopupToggle }) =>
      avatarPopupToggle ? "visible" : "hidden"};
    opacity: ${({ avatarPopupToggle }) => (avatarPopupToggle ? "1" : "0")};
    top:-36px;
    left: ${({ avatarPopupToggle }) => (avatarPopupToggle ? "0px" : "-80px")};
    background: ${props => props.theme.accent};
    transition: all 300ms ease-out 10ms;
    position: absolute;
    width: 100%;
    text-align: center;
  }
`;
const Mask = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background: #00000080;
  z-index: 50;
  display: ${({ hamburgerMenuOpened }) =>
    hamburgerMenuOpened ? "block" : "none"};
  @media (min-width: 1024px) {
    display: none;
  }
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
    color: ${({ isCurrentPage }) => (isCurrentPage ? props => props.theme.accent : props => props.theme.notWhite)};
  }
  svg {
    color: ${({ isCurrentPage }) => (isCurrentPage ? props => props.theme.accent : props => props.theme.notWhite)};
  }
  div {
    display: inline-block;
    margin-left: 15px;
  }
  &:hover {
    a {
      color: ${props => props.theme.accent};
    }
    svg {
      color: ${props => props.theme.accent};
    }
  }
`;

function SideBar() {
  const dispatch = useDispatch();
  const hamburgerMenuOpened = useSelector(
    state => state.navigation.hamburgerMenuOpened
  );
  const [avatarPopupToggle, setAvatarPopupToggle] = useState(false);
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
      <NavContainer hamburgerMenuOpened={hamburgerMenuOpened}>
        <div>
          <SidebarHeader
            hamburgerMenuOpened={hamburgerMenuOpened}
            onClick={() => dispatch(toggleHamburgerMenu())}
          >
            {" "}
            <img src="/images/logo.png" />
            Freelancify
            <FaBars />
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
        </div>
        <UserAvatarContainer
          avatarPopupToggle={avatarPopupToggle}
          onClick={() => setAvatarPopupToggle(!avatarPopupToggle)}
        >
          <div className="avatar-and-username">
            {" "}
            <div className="avatar" />
            <div className="username">USERNAME</div>
          </div>
          <div className="popup">
            <div onClick={logoutUser}>Sign out</div>
          </div>
        </UserAvatarContainer>
      </NavContainer>

      <Mask hamburgerMenuOpened={hamburgerMenuOpened} />
    </>
  );
}

export default SideBar;
