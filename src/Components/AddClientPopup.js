import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { addClientToFirestore } from "../_actions";
import InformationPopup from "./InformationPopup";
import {
  PageButton,
  MaskOverlay,
  ModalContainer,
  ModalContents,
  ModalTitle,
  ModalHr
} from "../utils/globalStyledComponents";

function AddClientPopup(props) {
  const dispatch = useDispatch();
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [companyInput, setCompanyInput] = useState("");
  const [addressOneInput, setAddressOneInput] = useState("");
  const [addressTwoInput, setAddressTwoInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [provinceInput, setProvinceInput] = useState("");
  const [zipInput, setZipInput] = useState("");

  const [informationModalOpened, toggleInformationModal] = useState(false);
  const [informationModalContents, setInformationModalContents] = useState("");

  const addClientModalContents = () => {
    const newClientSubmit = e => {
      // the "frontend" must build the Object that is sent to redux/firebase
      e.preventDefault();
      if (
        nameInput === "" ||
        emailInput === "" ||
        companyInput === "" ||
        addressOneInput === "" ||
        addressTwoInput === "" ||
        cityInput === "" ||
        provinceInput === "" ||
        zipInput === ""
      ) {
        setInformationModalContents("Some fields are missing");
        toggleInformationModal(true);
        return;
      }
      let newClientId = Date.now() * 10000 + Math.round(Math.random() * 9999);
      dispatch(
        addClientToFirestore({
          name: nameInput,
          id: newClientId,
          email: emailInput,
          companyName: companyInput,
          addressOne: addressOneInput,
          addressTwo: addressTwoInput,
          city: cityInput,
          province: provinceInput,
          zip: zipInput
        })
      );
      props.toggleModal(false);
      setNameInput("");
      setEmailInput("");
      setCompanyInput("");
      setAddressOneInput("");
      setAddressTwoInput("");
      setCityInput("");
      setProvinceInput("");
      setZipInput("");
    };

    return (
      <ModalContents active={props.isModalOpened}>
        <ModalTitle>New Client</ModalTitle>

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
          <h4 style={{ marginTop: "20px" }}>Residency (required for Invoicing)</h4>{" "}
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
            <PageButton onClick={newClientSubmit}>Create Client</PageButton>
            <PageButton onClick={() => props.toggleModal(false)}>Cancel</PageButton>
          </div>
        </form>
      </ModalContents>
    );
  };

  return (
    <>
      <MaskOverlay onClick={() => props.toggleModal(false)} isModalOpened={props.isModalOpened} />
      <ModalContainer isModalOpened={props.isModalOpened}>
        {addClientModalContents()}
      </ModalContainer>
      <InformationPopup
        informationModalOpened={informationModalOpened}
        toggleInformationModal={toggleInformationModal}
        informationModalContents={informationModalContents}
      />
    </>
  );
}

export default AddClientPopup;
