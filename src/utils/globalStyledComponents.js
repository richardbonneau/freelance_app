import styled from "styled-components";

// Tables
export const Container = styled.div`
  padding: 65px 20px 20px 20px;
  width: 100%;
  max-width: 800px;
  min-height: 100vh;
  background: #f6f7f9;
  * {
    color: ${props => props.theme.black};
  }
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="text"],
  input[type="number"] {
    border: none;
    border-bottom: 1px solid #8c8c8c;
    margin: 8px 0;
    width: 100%;
  }
  input:focus {
    border-bottom-color: ${props => props.theme.blue};
  }
  input:focus,
  select:focus,
  textarea:focus,
  button:focus {
    outline: none;
  }
  @media (min-width: 1024px) {
    padding: 25px;
  }
`;
export const Table = styled.table`
  table-layout: fixed;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 20px;

  @media (min-width: 1024px) {
    margin: 0;
    padding: 0;
    table-layout: fixed;
    max-width: 900px;
  }
`;
export const Tr = styled.tr`
  height: 50px;
  background: white;
  border-radius: 3px;
  box-shadow: 0px 0.6px 0px 1px rgb(221, 221, 221);
  transition: box-shadow 150ms;
  &:hover {
    box-shadow: 0px 0.6px 0px 2px rgb(221, 221, 221);
  }
`;
export const THead = styled.thead`
  @media (max-width: 768px) {
    display: none;
  }
`;
export const Th = styled.th`
  cursor: default;
`;
export const Td = styled.td`
  padding: 0.625em;
  color: black;
  text-align: center;

  @media (max-width: 768px) {
    text-align: right;
    display: block;
    &::before {
      content: attr(label);
      float: left;
      font-weight: 600;
    }
  }
`;
export const ExpandableInvisibleButton = styled.div`
  height: 215px;
  @media (min-width: 768px) {
    height: 35px;
  }
  height: 215px;
  max-width: 1000px;
  cursor: pointer;
  position: relative;

  ${Tr}:hover & {
    width: 95vw;
  }
`;
export const Anchor = styled.a`
  color: ${props => props.theme.blue};
  cursor: pointer;
  text-decoration: underline;
  &&:hover {
    color: ${props => props.theme.blueHover};
  }
  &&:visited {
    color: ${props => props.theme.blue};
  }
  &&:active {
    color: ${props => props.theme.blue};
  }
`;

// Modal
export const MaskOverlay = styled.div`
  position: fixed;
  z-index: 150;
  width: 100%;
  height: 100%;
  background: ${({ isModalOpened }) => (isModalOpened ? "#676767ad" : "#67676700")};
  top: 0;
  left: 0;
  visibility: ${({ isModalOpened }) => (isModalOpened ? "visible" : "hidden")};
  transition: 0.5s ease-out;
`;
export const ModalContainer = styled.div`
  position: fixed;
  z-index: 160;
  width: 330px;
  height: 500px;
  background: #fff;
  left: 50%;
  top: 50%;
  margin-top: -250px;
  margin-left: -165px;
  transition: 0.5s ease-out;
  visibility: ${({ isModalOpened }) => (isModalOpened ? "visible" : "hidden")};
  transform: ${({ isModalOpened }) => (isModalOpened ? "translateY(0)" : "translateY(45px)")};
  opacity: ${({ isModalOpened }) => (isModalOpened ? "1" : "0")};
  @media (min-width: 1024px) {
    margin-left: -55px;
  }
  .modal-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }
`;
export const ModalContents = styled.div`
  padding: 20px;
`;
export const ModalTitle = styled.h3`
  margin-bottom: 15px;
  text-align: center;
`;
export const ModalHr = styled.hr`
  margin: 15px 0;
`;
export const FormInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;
export const PageButton = styled.a`
  border-radius: 5px;
  color: white;
  background: ${props => props.theme.blue};
  padding: 4px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  transition: 300ms ease-in-out;
  cursor: pointer;
  svg {
    margin-right: 5px;
  }
  path {
    color: white;
  }
  &&:hover {
    background: ${props => props.theme.blueHover};
  }
`;
export const ComponentContainer = styled.div`
  flex-grow: 100;
  background: #f6f7f9;
  display: flex;
  justify-content: center;
  @media (min-width: 1024px) {
    margin-left: 220px;
  }
`;
