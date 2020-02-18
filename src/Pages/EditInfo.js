import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Container, PageButton } from "../utils/globalStyledComponents";
import { editUserInfoInFirestore } from "../_actions";
import InformationPopup from "../Components/InformationPopup";

function EditInfo(props) {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user.userInfo);
  const [nameInput, setNameInput] = useState(userInfo.name);
  const [emailInput, setEmailInput] = useState(userInfo.email);
  const [companyInput, setCompanyInput] = useState(userInfo.companyName);
  const [addressOneInput, setAddressOneInput] = useState(userInfo.addressOne);
  const [addressTwoInput, setAddressTwoInput] = useState(userInfo.addressTwo);
  const [cityInput, setCityInput] = useState(userInfo.city);
  const [provinceInput, setProvinceInput] = useState(userInfo.province);
  const [zipInput, setZipInput] = useState(userInfo.zip);

  const [informationModalOpened, toggleInformationModal] = useState("");
  const [informationModalContents, setInformationModalContents] = useState("");

  const sendNewUserInfoToFirestore = e => {
    // the "frontend" must build the Object that is sent to redux/firebase
    e.preventDefault();
    if (
      nameInput === userInfo.name &&
      emailInput === userInfo.email &&
      companyInput === userInfo.companyName &&
      addressOneInput === userInfo.addressOne &&
      addressTwoInput === userInfo.addressTwo &&
      cityInput === userInfo.city &&
      provinceInput === userInfo.province &&
      zipInput === userInfo.zip
    ) {
      setInformationModalContents("No changes were made");
      toggleInformationModal(true);
      return;
    }
    if (
      nameInput === "" ||
      emailInput === "" ||
      addressOneInput === "" ||
      cityInput === "" ||
      provinceInput === "" ||
      zipInput === ""
    ) {
      setInformationModalContents("Some fields are missing");
      toggleInformationModal(true);
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

    setInformationModalContents("Credentials saved");
    toggleInformationModal(true);
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
      <InformationPopup
        toggleInformationModal={toggleInformationModal}
        informationModalOpened={informationModalOpened}
        informationModalContents={informationModalContents}
      />
    </Container>
  );
}
export default EditInfo;
