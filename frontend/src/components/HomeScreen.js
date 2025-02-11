import React, { useContext, useEffect, useState } from "react";
import NavBarScreen from "./NavBarScreen";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function HomeScreen() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    if (userInfo == null) {
      navigate("/signin");
    }
  }, [navigate, userInfo]);

  // Mock available time slots for demonstration
  const mockSlots = {
    "2025-02-12": ["10:00 AM", "11:00 AM", "2:00 PM"],
    "2025-02-13": ["9:00 AM", "1:00 PM", "3:00 PM"],
  };

  useEffect(() => {
    // Format selected date to YYYY-MM-DD
    const formattedDate = selectedDate.toISOString().split("T")[0];
    setAvailableSlots(mockSlots[formattedDate] || []);
  }, [selectedDate]);

  return (
    <div className="d-flex w-100">
      <NavBarScreen />
      {/* Side Menu */}
      <div
        className="side-menu p-3 border"
        style={{ width: "300px", background: "#f8f9fa" }}
      >
        <h5>Select a Date</h5>
        <Calendar onChange={setSelectedDate} value={selectedDate} />
        <h6 className="mt-3">
          Available Slots on {selectedDate.toDateString()}:
        </h6>
        <ul className="list-group">
          {availableSlots.length > 0 ? (
            availableSlots.map((slot, index) => (
              <li key={index} className="list-group-item">
                {slot}
              </li>
            ))
          ) : (
            <li className="list-group-item text-danger">No Slots Available</li>
          )}
        </ul>
      </div>
    </div>
  );
}
