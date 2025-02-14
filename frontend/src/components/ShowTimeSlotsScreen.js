import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Badge, Button, Card, Form } from "react-bootstrap";
import LoadingBox from "../utils/LoadingBox";
import MessageBox from "../utils/MessageBox";
import { Store } from "../Store";

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

export default function ShowTimeSlotsScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [appointment, setAppointmentDate] = useState({
    value: "",
    isTouched: false,
  });

  const [{ loading, error, appointments }, dispatch] = useReducer(reducer, {
    appointments: [],
    loading: true,
    error: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch({ type: "FETCH_REQUEST" });
    try {
      const { data } = await axios.get(
        `/api/v1/appointment/get-time-slots?date=${appointment.value}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.data.jwtToken}`,
          },
        }
      );

      dispatch({ type: "FETCH_SUCCESS", payload: data.data });
    } catch (error) {
      dispatch({ type: "FETCH_FAIL", payload: error.message });
    }
  };

  return (
    <>
      <Form onSubmit={submitHandler} className="d-flex flex-row mt-3">
        <Form.Group>
          <Form.Control
            type="date"
            required
            value={appointment.value ?? ""}
            onChange={(e) =>
              setAppointmentDate({ value: e.target.value, isTouched: true })
            }
            onBlur={(e) =>
              setAppointmentDate({
                value: appointment.value,
                isTouched: true,
              })
            }
          ></Form.Control>
          <small className="text-danger"></small>
        </Form.Group>
        <Button type="submit" className="ms-2">
          Get Time Slots
        </Button>
      </Form>
      <div className="mt-3">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <h1 className="mt-3">
              Already Booked Time Slots on {appointment.value}
            </h1>
            <div className="d-flex flex-wrap mt-4">
              {appointments.length === 0 ? (
                <MessageBox variant="success">{`You can choose any time slot on this day`}</MessageBox>
              ) : (
                <div className="d-flex flex-column">
                  <div className="d-flex flex-row">
                    {appointments.map((appointment, index) => (
                      <Card key={index} className="ms-2">
                        <Card.Body>
                          <Card.Text>From:{appointment.startingTime}</Card.Text>
                          <Card.Text>To:{appointment.endingTime}</Card.Text>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                  <Badge bg="danger" className="mt-3">
                    You can book any time slots except these and also don't
                    overlap these time slots.
                  </Badge>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
