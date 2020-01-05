import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Client from "../Components/Client";
import { addClientToFirestore } from "../_actions";
import AddClientPopup from "../Components/AddClientPopup";
import { } from "../utils/globalStyledComponents";
import moment from "moment";
import {
  Container,
  Table,
  Th,
  THead,
  PageButton,
  MaskOverlay,
  ModalContainer,
  ModalContents,
  ModalTitle,
  ModalHr,
  FormInputContainer,
  Anchor,
  Tr, Td, ExpandableInvisibleButton
} from "../utils/globalStyledComponents";



function Projects() {
  const listOfProjects = useSelector(state => state.projects.projectsList);
  const [isModalOpened, toggleModal] = useState(false);
  const [isClientCardOpened, toggleClientCard] = useState(false);
  const [selectedClient, setSelectedClient] = useState(listOfProjects[0]);
  console.log("listOfProjects", listOfProjects)
  const clientSelected = client => {
    toggleClientCard(true);
    setSelectedClient(client);
  };




  const clientsList = () => {
    let tableContents = listOfProjects.map((project, i) => {
      let projectDebutDate = new Date(project.projectDebutDate.seconds * 1000);
      let projectEndDate = new Date(project.projectEndDate.seconds * 1000);
      // return <Client key={i} client={client} clientSelected={clientSelected} />;
      return (
        <Tr key={i}>
          <td width="1%">
            {/* <ExpandableInvisibleButton onClick={() => project.projectSelected(project.client)}></ExpandableInvisibleButton> */}
          </td>
          <Td label="Project Name">{project.name}</Td>
          <Td label="Client">{project.clientId}</Td>
          <Td label="Debut Date">{moment(projectDebutDate).format("MMM Do YYYY")}</Td>
          <Td label="End Date">{moment(projectEndDate).format("MMM Do YYYY")}</Td>

        </Tr>
      )
    });
    return (
      <Table>
        <THead>
          <tr>
            <Th width="1%" scope="col"></Th>
            <Th scope="col">Project Name</Th>
            <Th scope="col">Client</Th>
            <Th scope="col">Debut Date</Th>
            <Th scope="col">End Date</Th>
            <Th width="1%" scope="col"></Th>
          </tr>
        </THead>
        <tbody>{tableContents}</tbody>
      </Table>
    );
  };


  // const clientCardModalContents = () => {
  //   return (
  //     <ModalContents active={isClientCardOpened}>
  //       <FormInputContainer>
  //         <div />
  //         <FiX style={styles.fiX} />
  //       </FormInputContainer>
  //       <div>name: {selectedClient.name}</div>
  //       <div>email: {selectedClient.email}</div>
  //       <div>company: {selectedClient.companyName}</div>
  //       <div>street: {selectedClient.street}</div>
  //       <div>city: {selectedClient.city}</div>
  //       <div>province: {selectedClient.province}</div>
  //       <div>zip: {selectedClient.zip}</div>
  //     </ModalContents>
  //   );
  // };

  return (
    <Container>
      <h2>Projects</h2>
      <PageButton style={{ width: "125px", float: 'right', marginBottom: '10px' }} onClick={() => toggleModal(true)}>Add New Project</PageButton>

      {clientsList()}
      <AddClientPopup isModalOpened={isModalOpened} toggleModal={toggleModal} />

    </Container>
  );
}

export default Projects;
