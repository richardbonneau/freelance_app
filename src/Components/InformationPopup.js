import React, { useState } from "react";

import {
  PageButton,
  MaskOverlay,
  ModalContainer,
  ModalContents,
  ModalTitle,
  ModalHr
} from "../utils/globalStyledComponents";

function InformationPopup(props) {
  return (
    <>
      <MaskOverlay
        onClick={() => props.toggleInformationModal(false)}
        isModalOpened={props.informationModalOpened}
      />
      <ModalContainer
        style={{
          height: "150px",
          marginTop: "-75px",
          display: "flex",
          justifyContent: "center",
          fontSize: "20px",
          alignItems: "center",
          flexDirection: "column"
        }}
        isModalOpened={props.informationModalOpened}
      >
        <ModalContents>{props.informationModalContents}</ModalContents>
        <PageButton onClick={() => props.toggleInformationModal(false)}>Ok</PageButton>
      </ModalContainer>
    </>
  );
}

export default InformationPopup;
