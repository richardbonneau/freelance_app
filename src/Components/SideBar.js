import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaIndent,
  FaUserAlt,
  FaMoneyBillAlt,
  FaPencilRuler,
  FaFileInvoiceDollar
} from "react-icons/fa";

import { IoIosTime } from "react-icons/io";
import { GoGraph } from "react-icons/go";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { firebaseLogout, toggleHamburgerMenu } from "../_actions";

const NavContainer = styled.nav`
  @media (min-width: 1024px) {
    left: 0px !important;
  }
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  left: ${({ hamburgerMenuOpened }) => (hamburgerMenuOpened ? "0px" : "-220px")};
  background: ${props => props.theme.primary};
  z-index: 100;
  transition: all 300ms ease-out 10ms;
  min-width: 220px;
  height: 100%;
  position: fixed;
  @media (min-width: 1024px) {
    background: ${props => props.theme.primary};
  }
`;
const SidebarHeader = styled.div`
  z-index: 100;

  height: 40px;
  justify-content: space-between;
  padding: 5px 8px;
  height: 40px;
  color: ${({ hamburgerMenuOpened }) =>
    hamburgerMenuOpened ? "white" : props => props.theme.black};
  align-items: center;
  display: none;
  svg {
    height: 25px;
    width: 25px;
    cursor: pointer;
  }
  img {
    height: 20px;
  }
  .sidebar-title {
  }
  @media (min-width: 1024px) {
    color: white;
    display: flex;
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
  .avatar-and-username:hover {
    color: ${props => props.theme.accent};
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
    visibility: ${({ avatarPopupToggle }) => (avatarPopupToggle ? "visible" : "hidden")};
    opacity: ${({ avatarPopupToggle }) => (avatarPopupToggle ? "1" : "0")};
    top: -52px;
    left: ${({ avatarPopupToggle }) => (avatarPopupToggle ? "0px" : "-80px")};
    background: ${props => props.theme.blue};
    transition: all 300ms ease-out 10ms;
    position: absolute;
    width: 100%;
    text-align: center;
  }
  .popup > div:hover {
    /* background: ${props => props.theme.black}; */
    color: ${props => props.theme.accent};
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
  display: ${({ hamburgerMenuOpened }) => (hamburgerMenuOpened ? "block" : "none")};
  @media (min-width: 1024px) {
    display: none;
  }
`;
const LinkContainer = styled.div`
  display: block;
  font-size: 20px;
  margin-bottom: 12px;
  background: ${({ changeBackgroundColor }) =>
    changeBackgroundColor ? props => props.theme.sidebarSelected : null};
  svg {
    margin-left: 20px;
    vertical-align: -4px;
  }
  a {
    color: ${({ isCurrentPage }) =>
      isCurrentPage ? props => props.theme.accent : props => props.theme.notWhite};
  }
  svg {
    color: ${({ isCurrentPage }) =>
      isCurrentPage ? props => props.theme.accent : props => props.theme.notWhite};
  }
  div {
    display: inline-block;
    margin-left: 15px;
    width: 75%;
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

const pages = [
  { name: "DashBoard", link: "/dashboard", icon: FaIndent },
  { name: "Invoices", link: "/invoices", icon: FaFileInvoiceDollar },
  { name: "Projects", link: "/projects", icon: FaPencilRuler },
  { name: "Clients", link: "/clients", icon: FaUserAlt },
  { name: "Expenses", link: "/expenses", icon: FaMoneyBillAlt },
  { name: "Income Tracker", link: "/income-tracker", icon: GoGraph },
  { name: "Time Tracker", link: "/time-tracker", icon: IoIosTime }
];
function SideBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const hamburgerMenuOpened = useSelector(state => state.navigation.hamburgerMenuOpened);
  const [avatarPopupToggle, setAvatarPopupToggle] = useState(false);
  const currentPage = useSelector(state => state.navigation.currentPage);
  const logoutUser = e => {
    e.preventDefault();
    dispatch(firebaseLogout());
  };
  const editInfo = e => {
    e.preventDefault();
    history.push(`/editInfo`);
  };
  const closeHamburgerMenu = page => {
    history.push(page);
    dispatch(toggleHamburgerMenu());
  };
  const username = useSelector(state => state.auth.user.email);

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
            <div />
          </SidebarHeader>

          <div style={{ marginTop: "20px" }} />
          {pages.map(page => {
            let Icon = page.icon;
            return (
              <LinkContainer
                changeBackgroundColor={currentPage === page.link && hamburgerMenuOpened}
                onClick={() => closeHamburgerMenu(page.link)}
              >
                <a href="#">
                  <Icon />
                  <div>{page.name}</div>
                </a>
              </LinkContainer>
            );
          })}
        </div>
        <UserAvatarContainer
          avatarPopupToggle={avatarPopupToggle}
          onClick={() => setAvatarPopupToggle(!avatarPopupToggle)}
        >
          <div className="avatar-and-username">
            {" "}
            <div className="avatar" />
            <div className="username">{username}</div>
          </div>
          <div className="popup">
            <div onClick={editInfo}>Edit Info</div>
            <div onClick={logoutUser}>Sign out</div>
          </div>
        </UserAvatarContainer>
      </NavContainer>

      <Mask
        onClick={() => dispatch(toggleHamburgerMenu())}
        hamburgerMenuOpened={hamburgerMenuOpened}
      />
    </>
  );
}

export default SideBar;
