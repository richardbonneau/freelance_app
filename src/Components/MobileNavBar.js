import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { toggleHamburgerMenu } from "../_actions";

const Container = styled.div`
  @media (min-width: 1024px) {
    display: none;
  }
  background:purple;
  padding: 2px 10px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${props=>props.theme.black};
  svg{
      color:white;
  }
`;
const MainLogo = styled.img`
  height: 25px;
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
  return (
    <Container>
      <FaBars
        style={styles.hamburgerMenu}
        onClick={() => dispatch(toggleHamburgerMenu())}
      />
      <MainLogo src="/images/reduxlogo.png" />
      <div />
    </Container>
  );
}

export default MobileNavBar;
