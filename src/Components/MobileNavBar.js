import React from "react";
import { FaBars } from "react-icons/fa";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { toggleHamburgerMenu } from "../_actions";

const Container = styled.div`
  @media (min-width: 1024px) {
    display: none;
  }
  height: 45px;
  transition: all 300ms ease-out 10ms;
  z-index: 100;
  position: fixed;
  width: 100%;
  transform: ${({ hamburgerMenuOpened }) =>
    hamburgerMenuOpened ? "translate(240px, 0);" : "translate(0, 0)"};
  background: ${({ hamburgerMenuOpened }) =>
    hamburgerMenuOpened ? props => props.theme.blue : props => props.theme.primary};
  color: white;
  padding: 2px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.black};
  svg {
    color: white;
  }
`;
const styles = {
  hamburgerMenu: {
    height: "30px",
    width: "30px",
    cursor: "pointer"
  }
};

function MobileNavBar() {
  const dispatch = useDispatch();
  const hamburgerMenuOpened = useSelector(state => state.navigation.hamburgerMenuOpened);
  return (
    <Container hamburgerMenuOpened={hamburgerMenuOpened}>
      <FaBars style={styles.hamburgerMenu} onClick={() => dispatch(toggleHamburgerMenu())} />
      <h4>Freelancify</h4>
      <div />
    </Container>
  );
}

export default MobileNavBar;
