import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { useContext, useState } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import { Store } from "./Store";
import SignInScreen from "./components/SignInScreen";
import HomeScreen from "./components/HomeScreen";
import { LinkContainer } from "react-router-bootstrap";
import SignUpScreen from "./components/SignUpScreen";
import AppointmentBookingScreen from "./components/AppointmentBookingScreen";
import ShowTimeSlotsScreen from "./components/ShowTimeSlotsScreen";

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    window.location.href = "/signin";
  };

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  return (
    <div
      className={
        sidebarIsOpen
          ? "d-flex flex-column site-container active-cont"
          : "d-flex flex-column site-container"
      }
    >
      <ToastContainer position="top-center" limit={1} />
      <header>
        {userInfo && (
          <Navbar bg="dark" variant="dark" expand="lg" className="fixed-top">
            <Container>
              <Button
                variant="dark"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars"></i>
              </Button>
              <LinkContainer to="/">
                <Navbar.Brand>Booking System</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto w-100 justify-content-end">
                  {userInfo ? (
                    <NavDropdown
                      title={userInfo.data.username}
                      id="basic-nav-dropdown"
                    >
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        )}
      </header>
      <div
        className={
          sidebarIsOpen
            ? "active-nav side-navbar d-flex justify-content-between flex-wrap flex-column mt-5"
            : "side-navbar d-flex justify-content-between flex-wrap flex-column mt-5"
        }
      >
        <Nav className="flex-column text-white w-100 mt-2 p-2">
          <Nav.Item>
            <strong>Menu</strong>
          </Nav.Item>
          <Nav.Item className="mt-3">
            <LinkContainer to="/">
              <p>
                Home
                <i className="fa-solid fa-house"></i>
              </p>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="/book-an-appointment">
              <p>Book an Appointment</p>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="/get-all-slots">
              <p>Available Time Slots</p>
            </LinkContainer>
          </Nav.Item>
        </Nav>
      </div>
      <main className="mt-5">
        <Container className="mt-3">
          <Routes>
            <Route path="/" element={<HomeScreen />}></Route>
            <Route path="/signin" element={<SignInScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
            <Route
              path="/book-an-appointment"
              element={<AppointmentBookingScreen />}
            />
            <Route
              path="/update-the-appointment/:id"
              element={<AppointmentBookingScreen />}
            ></Route>
            <Route
              path="/get-all-slots"
              element={<ShowTimeSlotsScreen />}
            ></Route>
          </Routes>
        </Container>
      </main>
      <footer>
        <div className="text-center">All Right reserved</div>
      </footer>
    </div>
  );
}
export default App;
