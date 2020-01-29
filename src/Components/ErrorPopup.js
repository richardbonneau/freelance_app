
import React, { useState } from "react";

import {
    PageButton,
    MaskOverlay,
    ModalContainer,
    ModalContents,
    ModalTitle,
    ModalHr
} from "../utils/globalStyledComponents";

function ErrorPopup(props) {

    return (
        <>
            <MaskOverlay onClick={() => props.toggleErrorModal(false)} isModalOpened={props.errorModalOpened} />
            <ModalContainer
                style={{
                    height: "150px",
                    marginTop: "-75px",
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "20px",
                    alignItems: "center",
                    flexDirection: "column",
                    border: "red solid 1px"
                }}
                isModalOpened={props.errorModalOpened}
            >
                <ModalContents>{props.errorModalContents}</ModalContents>
                <PageButton onClick={() => props.toggleErrorModal(false)}>Ok</PageButton>
            </ModalContainer>
        </>
    );
}

export default ErrorPopup;

