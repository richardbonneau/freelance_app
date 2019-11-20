import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { backend } from '../utils/static.js'
import { useSelector, useDispatch } from "react-redux";
import { db, firestore } from '../utils/fire.js';


const Container = styled.div`
    padding-left: 25px;
`
function Invoices() {
  // const clientOptions = () => {
  //   return <option value="lime">Lime</option>
  // }
  return (<Container>
    <h2>Invoices</h2>
    <form>
    <label>Invoice For</label>
      {/* <select>
        {clientOptions()}
      </select> */}
    </form>
    

    </Container>)

  
}

export default Invoices;
