import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa";
import { PageButton } from "../utils/globalStyledComponents";
import { newEntry } from "../utils/static";
import { useDispatch } from "react-redux";
import { deleteItemFromStore, modifyItemFromStore } from "../_actions";
import { ItemContainer } from "../utils/invoiceStyling";

function Item(props) {
  const dispatch = useDispatch();
  const [itemInputs, setItemInputs] = useState(props.item);
  const handleItemChange = e =>
    e.target.value.length < 6 || e.target.name === "name"
      ? setItemInputs({ ...itemInputs, [e.target.name]: e.target.value })
      : false;

  let itemAmount = itemInputs.hours * itemInputs.rate;

  useEffect(() => {
    dispatch(modifyItemFromStore(props.i, itemInputs));
  }, [itemInputs]);

  return (
    <ItemContainer>
      <input
        type="text"
        className="title-description"
        name="name"
        maxLength={38}
        placeholder="Title and description"
        onChange={handleItemChange}
        value={itemInputs.name}
      />
      <div className="number-inputs-container">
        <div className="hours-rate-container">
          <div className="number-inputs-container-first-child">
            <h4>Hours</h4>
            <input
              type="number"
              className="number-input"
              name="hours"
              placeholder="#"
              onChange={handleItemChange}
              value={itemInputs.hours}
            />
          </div>
          <div>
            <h4>Rate</h4>
            <input
              type="number"
              className="number-input"
              name="rate"
              placeholder="#"
              onChange={handleItemChange}
              value={itemInputs.rate}
            />
          </div>
        </div>
        <div className="amount-container">
          <h4>Amount</h4>
          <div className="amount">{"$" + itemAmount.toFixed(2)}</div>
        </div>
      </div>
      <div onClick={e => dispatch(deleteItemFromStore(props.i))} className="delete-btn">
        <FaTrashAlt className="trashcan" />
      </div>
    </ItemContainer>
  );
}
export default Item;
