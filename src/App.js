import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Clients from "./Pages/Clients";
import Projects from "./Pages/Projects";
import Login from "./Pages/Login";
import Invoices from "./Pages/Invoices";
import TimeTracker from "./Pages/TimeTracker";
import MobileNavBar from "./Components/MobileNavBar";
import SideBar from "./Components/SideBar";
import ProtectedRoute from "./Components/ProtectedRoute";
import InvoiceDetails from "./Pages/InvoiceDetails";
import EditInfo from "./Pages/EditInfo";
import InvoiceCreator from "./Pages/InvoiceCreator";
import IncomeTracker from "./Pages/IncomeTracker";
import Expenses from "./Pages/Expenses";
import {
  PageButton,
  MaskOverlay,
  ModalContainer,
  ModalContents
} from "./utils/globalStyledComponents";

function App() {
  const history = useHistory();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isVerifying = useSelector(state => state.auth.isVerifying);
  const userInfo = useSelector(state => state.user.userInfo);
  const [isModalOpened, toggleModal] = useState(false);

  useEffect(() => {
    console.log('userInfo.addressOne === ""', userInfo.addressOne === "", userInfo.addressOne);
    if (userInfo.addressOne === "") {
      console.log("its happeneing");
      toggleModal(true);
    }
  }, [userInfo]);
  console.log("userInfo.addressOnaaaaaaaaaaaaae", userInfo.addressOne);

  const renderNav = () => {
    return isVerifying ? null : (
      <>
        <MobileNavBar />
        <SideBar />
      </>
    );
  };
  return (
    <>
      <Switch>
        <Route exact={true} path="/" component={Login} />
        <Route path="/" render={renderNav} />
      </Switch>

      <ProtectedRoute
        exact
        path="/dashboard"
        component={Dashboard}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />

      <ProtectedRoute
        exact
        path="/clients"
        component={Clients}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />

      <ProtectedRoute
        exact
        path="/invoices"
        component={Invoices}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />

      <ProtectedRoute
        exact
        path="/projects"
        component={Projects}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />

      <ProtectedRoute
        exact
        path="/invoice/:id"
        component={InvoiceDetails}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />

      <ProtectedRoute
        exact
        path="/invoiceCreator"
        component={InvoiceCreator}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />

      <ProtectedRoute
        exact
        path="/editInfo"
        component={EditInfo}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />

      <ProtectedRoute
        exact
        path="/time-tracker"
        component={TimeTracker}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />

      <ProtectedRoute
        exact
        path="/income-tracker"
        component={IncomeTracker}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />

      <ProtectedRoute
        exact
        path="/expenses"
        component={Expenses}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />

      <MaskOverlay onClick={() => toggleModal(false)} isModalOpened={isModalOpened} />
      <ModalContainer
        isModalOpened={isModalOpened}
        style={{ height: "200px", marginTop: "-100px" }}
      >
        <ModalContents>
          <div>
            It seems like you haven't set your User Information yet. It is needed if you want to
            send an invoice.
          </div>
          <div>Would you like to do this now?</div>

          <div className="modal-buttons">
            <PageButton
              onClick={() => {
                history.push("/editinfo");
                toggleModal(false);
              }}
            >
              Yes
            </PageButton>
            <PageButton onClick={() => toggleModal(false)}>Later</PageButton>
          </div>
        </ModalContents>
      </ModalContainer>
    </>
  );
}

export default App;
