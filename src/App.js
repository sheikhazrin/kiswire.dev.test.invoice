import React, { useContext, createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link,
  NavLink,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom';

import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Row,
  Col,
  Button,
  Offcanvas,
  Form,
  FormControl,
} from 'react-bootstrap';

import { signIn } from './Components/Auth';
// ***** Auth Module
import AuthRoute from './Components/AuthRoute';
import AuthProfile from './Components/AuthProfile';
// ***** Page Module
import NotFound from './Components/NotFound';
import Dashboard from './Components/Dashboard';
// ***** Login Module
import LoginForm from './Components/LoginForm';
import LogoutButton from './Components/LogoutButton';
// ***** Customer Module
import CustomerList from './Components/Customer/List';
import CustomerCreate from './Components/Customer/Create';
import CustomerEdit from './Components/Customer/Edit';
// ***** State Module
import MailingState from './Components/State/List';
import StateEdit from './Components/State/Edit';
import StateCreate from './Components/State/Create';
// ***** District Module
import MailingDistrict from './Components/District/List';
import DistrictCreate from './Components/District/Create';
import DistrictEdit from './Components/District/Edit';
// ***** Invoice Module
import InvoiceList from './Components/Invoice/List';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // ***** setting variable
  const [user, setUser] = useState(null);
  const authenticated = user != null;
  const login = ({ email, password }) => setUser(signIn({ email, password }));
  const logout = () => setUser(null);

  // ***** return
  return (
    <Router>
      {/* -------- HEADER ----------- */}
      <header>
        <Navbar bg="light" variant="light">
          <Container>
            <Link to="/" className="navbar-brand">
              KISWIRE <small>dev.test</small>
            </Link>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <NavLink
                to="/customer/list"
                exact
                className="nav-link"
                activeClassName="disabled"
                activeStyle={{
                  fontWeight: 'bold',
                }}
              >
                Customer
              </NavLink>
              <NavLink
                to="/state/list"
                exact
                className="nav-link"
                activeClassName="disabled"
                activeStyle={{
                  fontWeight: 'bold',
                }}
              >
                State
              </NavLink>
              <NavLink
                to="/district/list"
                exact
                className="nav-link"
                activeClassName="disabled"
                activeStyle={{
                  fontWeight: 'bold',
                }}
              >
                District
              </NavLink>
              <NavLink
                to="/invoice/list"
                exact
                className="nav-link"
                activeClassName="disabled"
                activeStyle={{
                  fontWeight: 'bold',
                }}
              >
                Invoice
              </NavLink>

              {/*             
              <Link to="/invoice" className="nav-link">
                Invoice
              </Link> */}

              {authenticated ? (
                <LogoutButton logout={logout} />
              ) : (
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      {/* -------- MAIN ----------- */}
      <main className="py-3 container">
        <Switch>
          {/* -------- ROUTE ----------- */}
          <Route exact path="/" component={Dashboard} />
          <Route path="/dashboard" component={Dashboard} />
          <Route
            path="/login"
            render={(props) => (
              <LoginForm
                authenticated={authenticated}
                login={login}
                {...props}
              />
            )}
          />
          {/* -------- AUTH ROUTE ----------- */}
          <AuthRoute
            authenticated={authenticated}
            path="/profile"
            render={(props) => <AuthProfile user={user} {...props} />}
          />
          {/* -------- AUTH ROUTER CUSTOMER ----------- */}
          <AuthRoute
            authenticated={authenticated}
            path="/customer/list"
            component={CustomerList}
          />
          <AuthRoute
            authenticated={authenticated}
            path="/customercreate"
            component={CustomerCreate}
          />
          <AuthRoute
            authenticated={authenticated}
            path="/customer/:slug"
            component={CustomerEdit}
          />
          {/* -------- AUTH STATE  ----------- */}
          <AuthRoute
            authenticated={authenticated}
            path="/state/list"
            component={MailingState}
          />
          <AuthRoute
            authenticated={authenticated}
            path="/state/:slug"
            component={StateEdit}
          />
          <AuthRoute
            authenticated={authenticated}
            path="/statecreate"
            component={StateCreate}
          />
          {/* -------- AUTH DISTRICT  ----------- */}
          <AuthRoute
            authenticated={authenticated}
            path="/district/list"
            component={MailingDistrict}
          />
          <AuthRoute
            authenticated={authenticated}
            path="/districtcreate"
            component={DistrictCreate}
          />
          <AuthRoute
            authenticated={authenticated}
            path="/district/:slug"
            component={DistrictEdit}
          />
          {/* -------- AUTH INVOICE  ----------- */}
          <AuthRoute
            authenticated={authenticated}
            path="/invoice/list"
            component={InvoiceList}
          />

          <Route component={NotFound} />
        </Switch>
      </main>
      {/* <footer>ddd</footer> */}
    </Router>
  );
}

export default App;
