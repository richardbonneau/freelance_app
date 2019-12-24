import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IoIosCloseCircle } from "react-icons/io";
import { PageButton } from "../utils/globalStyledComponents";
import { newEntry } from "../utils/static";
import { useDispatch } from "react-redux";
import { deleteItemFromStore, modifyItemFromStore } from "../_actions";

const ItemContainer = styled.div`
  box-shadow: 0px 0px 0px 1px rgb(221, 221, 221);
  padding: 14px;
  margin-bottom: 10px;
  border-radius: 15px;

  a {
    background: ${props => props.theme.red};
    padding: 0;
    width: 100%;
    height: 25px;
    color: white;
  }
  svg{
    margin: 0;
  }
  .title-description {
    width: 100%;
  }
  .number-inputs-container {
    display: flex;
    position: relative;
    margin: 10px 0;
    justify-content: space-between;
  }
  .number-inputs-container-first-child {
    margin-right: 20px;
  }
  .number-input {
    width: 50px;
  }
  .amount {
    margin: 0px 25px;
    text-align: right;
  }
  .hours-rate-container {
    display: flex;
  }
  @media (min-width: 768px) {
    display: flex;
    box-shadow: none;
    padding: 14px 4px;
    a {
      height: 100%;
    }
    .number-inputs-container {
      margin: 0;
    }
    .title-description {
      margin-right: 20px;
    }
  }
`;

function Item(props) {
  const dispatch = useDispatch();
  const [itemInputs, setItemInputs] = useState(props.item);
  const handleItemChange = e =>
    setItemInputs({ ...itemInputs, [e.target.name]: e.target.value });
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
        placeholder="Title and description"
        onChange={handleItemChange}
        value={itemInputs.name}
      />
      <div className="number-inputs-container">
        <div className="hours-rate-container">
          <div className="number-inputs-container-first-child">
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
          <div className="amount">{itemAmount}</div>
        </div>
      </div>
      <div>
        <IoIosCloseCircle
          onClick={e => dispatch(deleteItemFromStore(props.i))}
        />
      </div>
    </ItemContainer>
  );
}
export default Item;
