import "./App.css";
import SignInScreen from "./components/SignInScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpScreen from "./components/SignUpScreen";
import HomeScreen from "./components/HomeScreen";
import AppointmentBookingScreen from "./components/AppointmentBookingScreen";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-row align-items-center w-100">
        <ToastContainer position="top-center" limit={1} />
        <Routes>
          <Route path="/" element={<HomeScreen />}></Route>
          <Route path="/signin" element={<SignInScreen />} />
          <Route path="/signup" element={<SignUpScreen />} />
          <Route
            path="/appointment"
            element={<AppointmentBookingScreen />}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
