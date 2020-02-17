import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Container, PageButton } from "../utils/globalStyledComponents";
import { editUserInfoInFirestore } from "../_actions";
import SuccessPopup from "../Components/SuccessPopup";

function EditInfo(props) {
  const dispatch = useDispatch();
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [companyInput, setCompanyInput] = useState("");
  const [addressOneInput, setAddressOneInput] = useState("");
  const [addressTwoInput, setAddressTwoInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [provinceInput, setProvinceInput] = useState("");
  const [zipInput, setZipInput] = useState("");

  const [successModalOpened, toggleSuccessModal] = useState("");
  const [successModalContents, setSuccessModalContents] = useState("");

  const sendNewUserInfoToFirestore = e => {
    // the "frontend" must build the Object that is sent to redux/firebase
    e.preventDefault();

    if (
      nameInput === "" ||
      emailInput === "" ||
      addressOneInput === "" ||
      cityInput === "" ||
      provinceInput === "" ||
      zipInput === ""
    ) {
      setSuccessModalContents("Some fields are missing");
      toggleSuccessModal(true);
      return;
    }
    dispatch(
      editUserInfoInFirestore({
        name: nameInput,
        email: emailInput,
        companyName: companyInput,
        addressOne: addressOneInput,
        addressTwo: addressTwoInput,
        city: cityInput,
        province: provinceInput,
        zip: zipInput
      })
    );
    setNameInput("");
    setEmailInput("");
    setCompanyInput("");
    setAddressOneInput("");
    setAddressTwoInput("");
    setCityInput("");
    setProvinceInput("");
    setZipInput("");
    setSuccessModalContents("Credentials saved");
    toggleSuccessModal(true);
  };
  return (
    <Container>
      <h2>Edit Info</h2>
      <form>
        <h4>Identification</h4>
        <input
          type="text"
          placeholder="Name"
          value={nameInput}
          onChange={e => setNameInput(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={emailInput}
          onChange={e => setEmailInput(e.target.value)}
        />{" "}
        <input
          type="text"
          placeholder="Company"
          value={companyInput}
          onChange={e => setCompanyInput(e.target.value)}
        />
        <h4>Residency (required for Invoicing)</h4>{" "}
        <input
          type="text"
          placeholder="Address Line 1"
          value={addressOneInput}
          onChange={e => setAddressOneInput(e.target.value)}
        />{" "}
        <input
          type="text"
          placeholder="Address Line 2"
          value={addressTwoInput}
          onChange={e => setAddressTwoInput(e.target.value)}
        />{" "}
        <input
          type="text"
          placeholder="City"
          value={cityInput}
          onChange={e => setCityInput(e.target.value)}
        />{" "}
        <input
          type="text"
          placeholder="State or Province"
          value={provinceInput}
          onChange={e => setProvinceInput(e.target.value)}
        />{" "}
        <input
          type="text"
          placeholder="ZIP or Postal Code"
          value={zipInput}
          onChange={e => setZipInput(e.target.value)}
        />
        <div className="modal-buttons">
          {" "}
          <PageButton onClick={sendNewUserInfoToFirestore}>Save</PageButton>
        </div>
      </form>
      <SuccessPopup
        toggleSuccessModal={toggleSuccessModal}
        successModalOpened={successModalOpened}
        successModalContents={successModalContents}
      />
    </Container>
  );
}
export default EditInfo;
