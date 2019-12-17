import React from "react";
import styled from "styled-components";
import { AccentButton } from "../utils/globalStyledComponents";
import { FaTrashAlt } from "react-icons/fa";

function Item(props) {
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

    .sum {
      bottom: 0;
      right: 0;
      position: absolute;
    }
  `;
  const NumberInput = styled.input`
    width: 50px;
  `;
  let itemSum = props.item.hours * props.item.rate;

  return (
    <ItemContainer>
      <input
        type="text"
        className="title-description"
        id={props.i}
        name="name"
        placeholder="Name or Description"
        onChange={props.handleItemChange}
        value={props.item.name}
      />
      <div className="number-inputs-container">
        <div className="number-inputs-container-first-child">
          <h4>Hours</h4>
          <NumberInput
            type="text"
            id={props.i}
            name="hours"
            placeholder="Hours"
            onChange={props.handleItemChange}
            value={props.item.hours}
          />
        </div>
        <div>
          <h4>Rate</h4>
          <NumberInput
            type="text"
            id={props.i}
            name="rate"
            placeholder="Rate"
            onChange={props.handleItemChange}
            value={props.item.rate}
          />
        </div>
        <div className="sum">{itemSum}</div>
      </div>
      <div>
        <AccentButton onClick={() => props.deleteItem(props.i)}>
          <FaTrashAlt />
          Delete
        </AccentButton>
      </div>
    </ItemContainer>
  );
}
export default Item;
