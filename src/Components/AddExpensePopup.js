import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import firebase from "firebase/app";
import InformationPopup from "./InformationPopup";
import { addExpenseToFirestore } from "../_actions";
import {
  PageButton,
  MaskOverlay,
  ModalContainer,
  ModalContents,
  ModalTitle,
  ModalHr
} from "../utils/globalStyledComponents";

function AddExpensePopup(props) {
  const dispatch = useDispatch();
  const [nameInput, setNameInput] = useState("");
  const [expenseDate, setExpenseDate] = useState(new Date());
  const [amountInput, setAmountInput] = useState("");
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState({ imgUrl: "" });

  const [informationModalOpened, toggleInformationModal] = useState(false);
  const [informationModalContents, setInformationModalContents] = useState("");

  console.log("imageAsFile", imageAsFile, "imageAsUrl", imageAsUrl);

  const addExpenseModalContents = () => {
    const newExpenseSubmit = e => {
      // the "frontend" must build the Object that is sent to redux/firebase
      e.preventDefault();
      if (nameInput === "") {
        setInformationModalContents("Some fields are missing");
        toggleInformationModal(true);
        return;
      }

      let newExpenseId = Date.now() * 10000 + Math.round(Math.random() * 9999);
      dispatch(
        addExpenseToFirestore({
          name: nameInput,
          id: newExpenseId,
          date: firebase.firestore.Timestamp.fromDate(expenseDate),
          amount: amountInput,
          image: imageAsFile
        })
      );
      props.toggleModal(false);
      setNameInput("");
    };

    return (
      <ModalContents active={props.isModalOpened}>
        <ModalTitle>New Expense</ModalTitle>

        <form>
          <input
            type="text"
            placeholder="Name"
            value={nameInput}
            onChange={e => setNameInput(e.target.value)}
          />
          <input
            type="number"
            placeholder="300.0"
            value={amountInput}
            onChange={e => setAmountInput(e.target.value)}
          />
          <div />
          <DatePicker
            selected={expenseDate}
            onChange={date => setExpenseDate(date)}
            disabledKeyboardNavigation
          />
          <div />

          <input type="file" onChange={e => setImageAsFile(e.target.files[0])} />

          <div className="modal-buttons">
            {" "}
            <PageButton style={{ width: "110px" }} onClick={newExpenseSubmit}>
              Create Expense
            </PageButton>
            <PageButton onClick={() => props.toggleModal(false)}>Cancel</PageButton>
          </div>
        </form>
      </ModalContents>
    );
  };

  return (
    <>
      <MaskOverlay onClick={() => props.toggleModal(false)} isModalOpened={props.isModalOpened} />
      <ModalContainer
        isModalOpened={props.isModalOpened}
        style={{ height: "270px", marginTop: "-135px" }}
      >
        {addExpenseModalContents()}
      </ModalContainer>
      <InformationPopup
        informationModalOpened={informationModalOpened}
        toggleInformationModal={toggleInformationModal}
        informationModalContents={informationModalContents}
      />
    </>
  );
}

export default AddExpensePopup;
