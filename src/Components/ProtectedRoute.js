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
          //store.dispatch(pickCurrentPage());
          //create an algoritmh to get a string out of props.path
          // /invoice/15748833053749420
          console.log("path", props.location.pathname.split("/")[1]);
          console.log("protectedRoute: ", isVerifying, isAuthenticated);
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
