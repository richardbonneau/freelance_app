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
  /* border-radius: 15px; */
  border: 1px solid #0000001f;
  border-top:none;

  a {
    background: ${props => props.theme.red};
    padding: 0;
    width: 100%;
    height: 25px;
    color: white;
  }
  svg{
    height: 25px;
    width: 25px;
    
  }
  .delete-btn{
    cursor:pointer;
    background: #eaeaea;
    color: ${props=>props.theme.red};
    display: flex;
    justify-content: center;
    align-items: center;
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
    margin: 35px 0 0 0;
    text-align: right;
  }
  .hours-rate-container {
    display: flex;
  }
  @media (min-width: 768px) {
    display: flex;
    box-shadow: none;
    padding: 25px 10px;
    a {
      height: 100%;
    }
    .number-inputs-container {
      margin: 0;
    }
    .title-description {
      margin-right: 20px;
    }
    .amount{
      margin: 5px 25px;
    }
    h4{
      display:none;
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
          <div className="amount">{"$"+itemAmount}</div>
        </div>
      </div>
      <div
      onClick={e => dispatch(deleteItemFromStore(props.i))}
      className="delete-btn"
      >
        Delete
        <IoIosCloseCircle
          
        />
      </div>
    </ItemContainer>
  );
}
export default Item;
