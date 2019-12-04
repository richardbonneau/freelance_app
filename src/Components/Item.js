import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa";

function Item(props) {
    const NumberInput = styled.input`
    ::-webkit-inner-spin-button{
        -webkit-appearance: none;
        margin: 0;
        -moz-appearance:textfield;
    }
    `
    let itemSum = props.item.hours * props.item.rate;

    return (<div>
        <input
            type="text"
            id={props.i}
            name="name"
            placeholder="Name or Description"
            onChange={props.handleItemChange}
            value={props.item.name}
        />
        <NumberInput
            type="number"
            id={props.i}
            name="hours"
            placeholder="Hours"
            onChange={props.handleItemChange}
            value={props.item.hours}
        />
        <NumberInput
            type="number"
            id={props.i}
            name="rate"
            placeholder="Rate"
            onChange={props.handleItemChange}
            value={props.item.rate}
        />
        <span>{itemSum}</span>
        <FaTrashAlt onClick={() => props.deleteItem(props.i)} />
    </div>)
}
export default Item;