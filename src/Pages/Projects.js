import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import AddProjectPopup from "../Components/AddProjectPopup";
import moment from "moment";
import { Container, Table, Th, THead, PageButton, Tr, Td } from "../utils/globalStyledComponents";

function Projects() {
  const listOfProjects = useSelector(state => state.projects.projectsList);
  const listOfClients = useSelector(state => state.clients.clientsList);
  const [isModalOpened, toggleModal] = useState(false);
  const [isClientCardOpened, toggleClientCard] = useState(false);

  //TODO:Open a card showing the project when a project is clicked
  // const [selectedProject, setSelectedClient] = useState(listOfProjects[0]);
  // console.log("listOfProjects", listOfProjects);

  // const clientSelected = client => {
  //   toggleClientCard(true);
  //   setSelectedClient(client);
  // };

  const projectsList = () => {
    let tableContents = listOfProjects.map((project, i) => {
      let projectDebutDate = new Date(project.projectDebutDate.seconds * 1000);
      let projectEndDate = new Date(project.projectEndDate.seconds * 1000);
      let client = listOfClients.find(client => client.id === project.clientId);
      // return <Client key={i} client={client} clientSelected={clientSelected} />;
      return (
        <Tr key={i}>
          <td width="1%">
            {/* <ExpandableInvisibleButton onClick={() => project.projectSelected(project.client)}></ExpandableInvisibleButton> */}
          </td>
          <Td label="Project Name">{project.name}</Td>
          <Td label="Client">{client === undefined ? "-" : client.name}</Td>
          <Td label="Debut Date">{moment(projectDebutDate).format("MMM Do YYYY")}</Td>
          <Td label="End Date">{moment(projectEndDate).format("MMM Do YYYY")}</Td>
          <td width="1%" />
        </Tr>
      );
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
      <div>Keep track of your ongoing Projects</div>
      <PageButton
        style={{ width: "125px", float: "right", margin: "10px 0" }}
        onClick={() => toggleModal(true)}
      >
        Add New Project
      </PageButton>

      {projectsList()}
      <AddProjectPopup isModalOpened={isModalOpened} toggleModal={toggleModal} />
    </Container>
  );
}

export default Projects;
