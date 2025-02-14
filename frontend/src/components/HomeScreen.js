import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import axios from "axios";
import LoadingBox from "../utils/LoadingBox";
import MessageBox from "../utils/MessageBox";
import { Col, Form, Row } from "react-bootstrap";
import Appointment from "../utils/Appointment";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, appointments: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function HomeScreen() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, appointments }, dispatch] = useReducer(reducer, {
    appointments: [],
    loading: true,
    error: "",
  });
  useEffect(() => {
    if (userInfo == null) {
      navigate("/signin");
    } else {
      const fetchData = async () => {
        dispatch({ type: "FETCH_REQUEST" });
        try {
          if (userInfo.data.role === "user") {
            const { data } = await axios.get(
              `/api/v1/appointment/get-user-appointments?username=${userInfo.data.username}&page=${page}`,
              {
                headers: {
                  Authorization: `Bearer ${userInfo.data.jwtToken}`,
                },
              }
            );
            dispatch({
              type: "FETCH_SUCCESS",
              payload: data.data.appointments,
            });
          } else {
            dispatch({ type: "FETCH_REQUEST" });
            const { data } = await axios.get(
              `/api/v1/appointment/get-all-appointments?page=${page}`,
              {
                headers: {
                  Authorization: `Bearer ${userInfo.data.jwtToken}`,
                },
              }
            );

            dispatch({
              type: "FETCH_SUCCESS",
              payload: data.data.appointments,
            });
          }
        } catch (error) {
          dispatch({ type: "FETCH_FAIL", payload: "No Any Appointments" });
        }
      };
      fetchData();
    }
  }, [navigate, userInfo, page]);
  return (
    <div>
      <h1>My Appointments</h1>
      <Form className="d-flex flex-row m-2 justify-content-end">
        <Form.Group>
          <Form.Control
            type="number"
            required
            value={page}
            onChange={(e) => setPage(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {/* <Button type="submit" variant="primary" className="ms-2">
          Get Page
        </Button> */}
      </Form>
      <div className="d-flex flex-wrap">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row className="w-100 mt-4">
            {appointments.map((appointment) => (
              <Col
                key={appointment.appointmentId}
                sm={6}
                md={4}
                lg={3}
                className="mb-3"
              >
                <Appointment appointment={appointment} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
