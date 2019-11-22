import styled from "styled-components";

export const Container = styled.div`
      padding: 0 25px;
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
    max-width: 1000px;
  }
`;
export const Tr = styled.tr`
  border-radius: 3px;
  box-shadow: 0px 0px 0px 1px rgb(221, 221, 221);
  transition: box-shadow 150ms;
  &:hover{
    box-shadow: 0 0 5px 2px rgb(221,221,221);
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
  text-align: center;

  @media (max-width: 768px) {
    text-align: right;
    display: block;
    &::before {
      content: attr(label);
      float: left;
    }
  }
`;
export const ExpandableInvisibleButton = styled.div`
height: 215px;
@media(min-width:768px){
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