import React, { useState } from "react";

import {
  PageButton,
  MaskOverlay,
  ModalContainer,
  ModalContents,
  ModalTitle,
  ModalHr
} from "../utils/globalStyledComponents";
import Loading from "../Components/Loading";

function InformationPopup(props) {
  return (
    <>
      <MaskOverlay
        onClick={() => (props.isLoading ? null : props.toggleInformationModal(false))}
        isModalOpened={props.informationModalOpened}
      />
      <ModalContainer
        style={{
          height: "180px",
          marginTop: "-90px",
          display: "flex",
          justifyContent: "center",
          fontSize: "20px",
          alignItems: "center",
          flexDirection: "column"
        }}
        isModalOpened={props.informationModalOpened}
      >
        <ModalContents>{props.informationModalContents}</ModalContents>
        {props.isLoading ? (
          <Loading />
        ) : (
          <PageButton onClick={() => props.toggleInformationModal(false)}>Ok</PageButton>
        )}
      </ModalContainer>
    </>
  );
}

export default InformationPopup;
