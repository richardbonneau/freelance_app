import React, { useState } from "react";

import {
  PageButton,
  MaskOverlay,
  ModalContainer,
  ModalContents,
  ModalTitle,
  ModalHr
} from "../utils/globalStyledComponents";

function SuccessPopup(props) {
  return (
    <>
      <MaskOverlay
        onClick={() => props.toggleSuccessModal(false)}
        isModalOpened={props.successModalOpened}
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
        isModalOpened={props.successModalOpened}
      >
        <ModalContents>{props.successModalContents}</ModalContents>
        <PageButton onClick={() => props.toggleSuccessModal(false)}>Ok</PageButton>
      </ModalContainer>
    </>
  );
}

export default SuccessPopup;
