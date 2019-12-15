import React from "react";
import { Route, Redirect } from "react-router-dom";
import styled from "styled-components";
import Loading from "./Loading";
import { pickCurrentPage } from "../_actions";
import store from "../store";

const PageStructure = styled.div`
  @media (min-width: 1024px) {
    display: flex;
  }
`;
const ComponentContainer = styled.div`
  margin-left:20px;
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
          store.dispatch(pickCurrentPage(props.location.pathname));
          return isVerifying ? (
            <Loading />
          ) : isAuthenticated ? (
            <div>
              <ComponentContainer>
                <Component {...props} />
              </ComponentContainer>
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
