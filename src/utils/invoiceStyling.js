import styled from "styled-components";

export const TitleContainer = styled.div`
  display: block;
  .hashtag {
    display: flex;
    align-items: center;
    width: 20px;
  }
  .title {
    font-size: 18px;
    font-weight: 600;
    margin-right: 10px;
  }
  .invoice-number-container {
    display: flex;
  }
  .invoice-number {
    width: 90px !important;
    margin-left: 0 !important;
  }
  @media (min-width: 768px) {
    display: flex;
  }
`;
export const InvoiceContainer = styled.form`
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  border: 1px solid #dee1e2;
  padding: 20px;
  margin-top: 20px;
  .submit-btn {
    margin-top: 15px;
    /* background: ${props => props.theme.blue}; */
    color: white;
  }
  .submit-btn:hover {
    /* background: ${props => props.theme.blueHover}; */
  }

  .first-row {
    justify-content: space-between;
    display: flex;
    align-items: baseline;

    flex-direction: column;
  }
  .subcontainer h4 {
    text-align: left;
    width: 100%;
    margin: 8px 0;
  }
  .subcontainer {
    display: flex;
    justify-content: space-between;
  }
  .subcontainer input {
    width: 78px;
    margin-left: 10px;
  }
  .invoice-number-container{
    display:flex;
  }
  @media (min-width: 768px) {
    .first-row {
      flex-direction: row;
    }
    .subcontainer h4 {
      text-align: right;
      
    }
  }
`;
export const NotesInput = styled.textarea`
  height: 80px;
  width: 100%;
  resize: none;
  outline: none;
  margin-top: 10px;
  border-color: #0000001f;
`;
export const DatePickContainer = styled.div`
  margin-top: 20px;
  justify-content: space-between;
  display: flex;
  .invoice-number {
    width: 40px;
  }

  @media (min-width: 768px) {
  }
`;
export const SenderRecipientContainer = styled.div`
  display: flex;
  margin-top: 20px;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const SenderContainer = styled.div`
  margin-bottom: 10px;
  @media (min-width: 768px) {
    margin-right: 40px;
  }
`;
export const RecipientContainer = styled.div``;

export const ItemsListContainer = styled.div`
  margin-top: 20px;
  a {
    padding: 0;
    width: 100%;
    margin: 5px 0;
  }
  .items-header {
    width: 100%;
    height: 26px;
    background: ${props => props.theme.black};
    
    display: none;
    justify-content: space-between;
  }
  .items-header > h4{
    margin-left: 10px;
  }
  .items-header  h4 {
    color: white;
  }
  .header-hours-rate-amount {
    display: flex;
    width: 248px;
  }
  .header-hours-rate-amount > h4 {
    margin-right: 30px;
  }
  .add-item-btn {
    background:${props => props.theme.blue};
  }
  .add-item-btn:hover {
    background:${props => props.theme.blueHover};
  }
  @media (min-width: 768px) {
    .items-header {
      display: flex;
    }
  }
`;
export const TotalContainer = styled.div`
  margin: 20px 0;
  .subcontainer {
    display: flex;
    justify-content: space-between;
    margin: 8px 0;
  }
  .total {
    text-align: right;
  }
`;

export const ItemContainer = styled.div`
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
  height: 15px;
  width: 15px;
}
.delete-btn{
  cursor:pointer;
  font-size: 12px;
  padding:5px;
  color: ${props => props.theme.black};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 300ms;
}
.delete-btn:hover .trashcan{
  color: ${props => props.theme.red};
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
  text-align: right;
  word-break: break-all;
}
.hours-rate-container {
  display: flex;
}
.amount-container{
  min-width: 90px;
}
.amount-container h4{
  text-align: right;
}
@media (min-width: 768px) {
  display: flex;
  box-shadow: none;
  padding:10px;
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
    margin: 5px 10px;
    text-align: left;
  }
  h4{
    display:none;
  }
}
`;