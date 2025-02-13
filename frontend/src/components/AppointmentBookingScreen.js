import React, { useContext, useEffect, useReducer, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import { Store } from "../Store";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingBox from "../utils/LoadingBox";
import MessageBox from "../utils/MessageBox";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, appointmentToUpdate: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function AppointmentBookingScreen() {
  const params = useParams();
  const { id } = params;
  const [{ loading, error, appointmentToUpdate }, dispatch] = useReducer(
    reducer,
    {
      appointmentToUpdate: {},
      loading: true,
      error: "",
    }
  );
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

  const clearForm = () => {
    setTopic({
      value: "",
      isTouched: false,
    });
    setName({
      value: "",
      isTouched: false,
    });
    setEmail({
      value: "",
      isTouched: false,
    });
    setStart({
      value: "",
      isTouched: false,
    });
    setEnd({
      value: "",
      isTouched: false,
    });
    setContact({
      value: "",
      isTouched: false,
    });
    setType({
      value: "",
      isTouched: false,
    });
    setAppointmentDate({
      value: "",
      isTouched: false,
    });
  };

  const updateData = async () => {
    try {
      const { data } = await axios.put(
        `/api/v1/appointment/update-an-appointment?id=${id}`,
        {
          appointmentTitle: title.value,
          name: name.value,
          email: email.value,
          contactNumber: contact.value,
          appointmentDate: appointment.value,
          startingTime: start.value,
          endingTime: end.value,
          meetingType: type.value,
          username: userInfo?.data?.username,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.data.jwtToken}`,
          },
        }
      );
      toast.success(`${data.data.appointmentTitle} updated successfully`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const submitData = async () => {
    try {
      const { data } = await axios.post(
        "/api/v1/appointment/book-an-appointment",
        {
          appointmentTitle: title.value,
          name: name.value,
          email: email.value,
          contactNumber: contact.value,
          appointmentDate: appointment.value,
          startingTime: start.value,
          endingTime: end.value,
          meetingType: type.value,
          username: userInfo?.data?.username,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.data.jwtToken}`,
          },
        }
      );
      toast.success(`${data.data.appointmentTitle} booked successfully`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    id ? updateData() : submitData();
    clearForm();
  };

  useEffect(() => {
    const updateForm = async () => {
      setTopic({ value: appointmentToUpdate.appointmentTitle });
      setAppointmentDate({ value: appointmentToUpdate.appointmentDate });
      setContact({ value: appointmentToUpdate.contactNumber });
      setEmail({ value: appointmentToUpdate.email });
      setStart({ value: appointmentToUpdate.startingTime });
      setEnd({ value: appointmentToUpdate.endingTime });
      setName({ value: appointmentToUpdate.name });
      setType({ value: appointmentToUpdate.meetingType });
    };
    dispatch({ type: "FETCH_REQUEST" });
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/v1/appointment/get-an-appointment?id=${id}`,
          {
            headers: {
              Authorization: `Bearer ${userInfo.data.jwtToken}`,
            },
          }
        );
        await updateForm();
        dispatch({ type: "FETCH_SUCCESS", payload: data.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error.message });
      }
    };

    if (id) {
      fetchData();
    }
  }, [
    id,
    userInfo,
    appointmentToUpdate.appointmentTitle,
    appointmentToUpdate.contactNumber,
    appointmentToUpdate.email,
    appointmentToUpdate.endingTime,
    appointmentToUpdate.meetingType,
    appointmentToUpdate.name,
    appointmentToUpdate.startingTime,
    appointmentToUpdate.appointmentDate,
  ]);

  return (
    <Container className="small-container">
      {id ? (
        <h1>Update Your Appointment Details</h1>
      ) : (
        <h1>Send Your Appointment Details</h1>
      )}
      {id ? (
        loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
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
              <small className="text-danger">
                {validateField("Name", name)}
              </small>
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
                onBlur={(e) =>
                  setEmail({ value: email.value, isTouched: true })
                }
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
                onBlur={(e) =>
                  setStart({ value: start.value, isTouched: true })
                }
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
              <small className="text-danger">
                {validateField("Type", type)}
              </small>
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="my-4"
              disabled={disableSubmit()}
            >
              {id ? "Update" : "Submit"}
            </Button>
          </Form>
        )
      ) : (
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
            {id ? "Update" : "Submit"}
          </Button>
        </Form>
      )}
    </Container>
  );
}
