import React from "react";
import { Route, Redirect } from "react-router-dom";
import MobileNavBar from "./MobileNavBar";
import SideBar from "./SideBar";
import styled from "styled-components";
import Loading from "./Loading"
const PageStructure = styled.div`
  @media (min-width: 1024px) {
    display: flex;
  }
`;
const RoutesContainer = styled.div`
  @media (min-width: 1024px) {
    margin-left: 220px;
  }
`;

export default function ProtectedRoute({
  component: Component,
  isAuthenticated,
  isVerifying,
  ...rest
}) {
  return (
    <PageStructure>

      <Route
        {...rest}
        render={props => {
          return isVerifying ? (
            <Loading />
          ) : isAuthenticated ? (
            <div>
          <MobileNavBar />
          <SideBar />
          <Component {...props} />
          </div>
            
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          );
        }}
      />
    </PageStructure>
  );
}
