import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { PageButton } from "../utils/globalStyledComponents";
import { FaTrashAlt } from "react-icons/fa";
import { newEntry } from "../utils/static"

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

function Item(props) {
  const [itemInputs, setItemInputs] = useState({ ...newEntry });
  const handleItemChange = (e) => setItemInputs({ ...itemInputs, [e.target.name]: e.target.value })
  let itemSum = itemInputs.hours * itemInputs.rate;

  useEffect(()=>{
    setItemInputs(props.item);
  }, []);
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
        <div className="sum">{itemSum}</div>
      </div>
      <div>
        <PageButton onClick={(e) => props.deleteItem(props.i)}>
          <FaTrashAlt />
          Delete
        </PageButton>
      </div>
    </ItemContainer>
  );
}
export default Item;
