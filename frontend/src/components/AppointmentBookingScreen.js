import React, { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import NavBarScreen from "./NavBarScreen";
import axios from "axios";
import { Store } from "../Store";

export default function AppointmentBookingScreen() {
  const [title, setTopic] = useState({
    value: "",
    isTouched: false,
  });
  const [name, setName] = useState({
    value: "",
    isTouched: false,
  });
  const [email, setEmail] = useState({
    value: "",
    isTouched: false,
  });
  const [contact, setContact] = useState({
    value: "",
    isTouched: false,
  });
  const [appointment, setAppointmentDate] = useState({
    value: "",
    isTouched: false,
  });
  const [start, setStart] = useState({
    value: "",
    isTouched: false,
  });
  const [end, setEnd] = useState({
    value: "",
    isTouched: false,
  });
  const [type, setType] = useState({
    value: "",
    isTouched: false,
  });

  const { state } = useContext(Store);
  const { userInfo } = state;

  const validateField = (field, value) => {
    let errorMessage = "";
    if (
      value?.isTouched &&
      (value?.value === undefined || value?.value === "")
    ) {
      errorMessage = `${field} is required`;
    } else if (
      field === "Email" &&
      value?.value !== "" &&
      !/\S+@\S+\.\S+/.test(value?.value)
    ) {
      errorMessage = "Invalid email format";
    } else if (
      field === "Contact Number" &&
      value?.value !== "" &&
      !/^\d{10}$/.test(value?.value)
    ) {
      errorMessage = "Contact number must be 10 digits";
    }
    return errorMessage;
  };

  const disableSubmit = () => {
    if (
      (title.value === "" || name.value === "",
      email.value === "" ||
        contact.value === "" ||
        appointment.value === "" ||
        start.value === "" ||
        end.value === "" ||
        type.value === "")
    ) {
      return true;
    } else if (
      !/\S+@\S+\.\S+/.test(email?.value) ||
      !/^\d{10}$/.test(contact?.value)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(
      "/api/v1/appointment/book-an-appointment",
      {
        appointmentTitle: title.value,
        userName: name.value,
        email: email.value,
        contactNumber: contact.value,
        appointmentDate: appointment.value,
        startingTime: start.value,
        endingTime: end.value,
        meetingType: type.value,
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo.data.jwtToken}`,
        },
      }
    );
    console.log(data);
  };
  return (
    <div className="d-flex flex-column text-align-center justify-content-center w-100">
      <NavBarScreen />
      <Container className="d-flex flex-column col-md-6 text-align-center justify-content-center">
        <h1 className="mt-3">Send Your Appointment Details</h1>
        <Form className="w-100" onSubmit={submitHandler}>
          <Form.Group className="mt-3">
            <Form.Label>
              Topic<sup>*</sup>
            </Form.Label>
            <Form.Control
              type="text"
              required
              value={title.value ?? ""}
              onChange={(e) =>
                setTopic({ value: e.target.value, isTouched: true })
              }
              onBlur={() => setTopic({ value: title.value, isTouched: true })}
            ></Form.Control>
            <small className="text-danger">
              {validateField("Topic", title)}
            </small>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>
              Name<sup>*</sup>
            </Form.Label>
            <Form.Control
              type="text"
              required
              value={name.value ?? ""}
              onChange={(e) =>
                setName({ value: e.target.value, isTouched: true })
              }
              onBlur={() => setName({ value: name.value, isTouched: true })}
            ></Form.Control>
            <small className="text-danger">{validateField("Name", name)}</small>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>
              E-mail<sup>*</sup>
            </Form.Label>
            <Form.Control
              type="email"
              required
              value={email.value ?? ""}
              onChange={(e) =>
                setEmail({ value: e.target.value, isTouched: true })
              }
              onBlur={(e) => setEmail({ value: email.value, isTouched: true })}
            ></Form.Control>
            <small className="text-danger">
              {validateField("Email", email)}
            </small>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>
              Contact number<sup>*</sup>
            </Form.Label>
            <Form.Control
              type="text"
              required
              value={contact.value ?? ""}
              onChange={(e) =>
                setContact({ value: e.target.value, isTouched: true })
              }
              onBlur={(e) =>
                setContact({ value: contact.value, isTouched: true })
              }
            ></Form.Control>
            <small className="text-danger">
              {validateField("Contact Number", contact)}
            </small>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>
              Appointment Date<sup>*</sup>
            </Form.Label>
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
            <small className="text-danger">
              {validateField("Date", appointment)}
            </small>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>
              Starting At<sup>*</sup>
            </Form.Label>
            <Form.Control
              type="time"
              required
              value={start.value ?? ""}
              onChange={(e) =>
                setStart({ value: e.target.value, isTouched: true })
              }
              onBlur={(e) => setStart({ value: start.value, isTouched: true })}
            ></Form.Control>
            <small className="text-danger">
              {validateField("Start Time", start)}
            </small>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>
              End At<sup>*</sup>
            </Form.Label>
            <Form.Control
              type="time"
              required
              value={end.value ?? ""}
              onChange={(e) =>
                setEnd({ value: e.target.value, isTouched: true })
              }
              onBlur={(e) => setEnd({ value: end.value, isTouched: true })}
            ></Form.Control>
            <small className="text-danger">
              {validateField("End Time", end)}
            </small>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>
              Meeting Type<sup>*</sup>
            </Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={type.value ?? ""}
              onChange={(e) =>
                setType({ value: e.target.value, isTouched: true })
              }
              onBlur={(e) => setType({ value: type.value, isTouched: true })}
            >
              <option>Select a Role</option>
              <option value="online">Online</option>
              <option value="physical">Physical</option>
            </Form.Select>
            <small className="text-danger">{validateField("Type", type)}</small>
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            className="my-4"
            disabled={disableSubmit()}
          >
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}
