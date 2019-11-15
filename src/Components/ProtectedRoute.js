import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({
    component:Component,
    isAuthenticated,
    isVerifying,
    ...rest
}){
    console.log("isAuthenticated",isAuthenticated,"isVerifying",isVerifying)
    return <Route
    {...rest}
    render={props=>{
        return isVerifying ? (<div />)
        : isAuthenticated ? (<Component {...props} />)
            : <Redirect to={{
                pathname:"/",
                state: { from: props.location }
            }} />

    }} />
}