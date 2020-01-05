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
  flex-grow:100;
  display: flex;
    justify-content: center;
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
            <ComponentContainer>
              <Component {...props} />
            </ComponentContainer>
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
