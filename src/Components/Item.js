import React,{useRef} from "react";
import styled from "styled-components";
import { PageButton } from "../utils/globalStyledComponents";
import { FaTrashAlt } from "react-icons/fa";

function Item(props) {
  const titleRef = useRef(null)
  const hoursRef = useRef(null)
  const rateRef = useRef(null)
  const ItemContainer = styled.div`
    box-shadow: 0px 0px 0px 1px rgb(221, 221, 221);
    padding: 14px;
    margin-bottom: 10px;
    a {
      background: #f50909;
      padding:0;
      width:100%;
    }

    .title-description {
      width: 100%;
    }
    .number-inputs-container {
      display: flex;
      position: relative;
      margin: 10px 0;
    }
    .number-inputs-container-first-child {
      margin-right: 20px;
    }
    .number-input{
      width:50px;
    }

    .sum {
      bottom: 0;
      right: 0;
      position: absolute;
    }
  `;

  let itemSum = props.item.hours * props.item.rate;

  return (
    <ItemContainer>
      <input
        type="text"
        ref={titleRef}
        className="title-description"
        name="name"
        placeholder="Name or Description"
        onChange={(e)=>props.handleItemChange(e,props.i,titleRef)}
        value={props.item.name}
      />
      <div className="number-inputs-container">
        <div className="number-inputs-container-first-child">
          <h4>Hours</h4>
          <input
            type="number"
            ref={hoursRef}
            className="number-input"
            name="hours"
            placeholder="Hours"
            onChange={(e)=>props.handleItemChange(e,props.i,hoursRef)}
            value={props.item.hours}
          />
        </div>
        <div>
          <h4>Rate</h4>
          <input
            type="number"
            ref={rateRef}
            className="number-input"
            name="rate"
            placeholder="Rate"
            onChange={(e)=>props.handleItemChange(e,props.i,rateRef)}
            value={props.item.rate}
          />
        </div>
        <div className="sum">{itemSum}</div>
      </div>
      <div>
        <PageButton onClick={(e) => props.deleteItem(e,props.i)}>
          <FaTrashAlt />
          Delete
        </PageButton>
      </div>
    </ItemContainer>
  );
}
export default Item;
