import React, { useState, useEffect } from "react";

import { FaTrashAlt } from "react-icons/fa";

function Item(props) {
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
        <input
            type="number"
            id={props.i}
            name="hours"
            placeholder="Hours"
            onChange={props.handleItemChange}
            value={props.item.hours}
        />
        <input
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