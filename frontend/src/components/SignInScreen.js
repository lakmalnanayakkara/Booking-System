import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { toast } from "react-toastify";
import axios from "axios";

export default function SignInScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectIntUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectIntUrl ? redirectIntUrl : "/";
  const [username, setUsername] = useState({ value: "", isTouched: false });
  const [password, setPassword] = useState({ value: "", isTouched: false });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/sign-in", {
        username: username.value,
        password: password.value,
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/Home");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const validateField = (field, value) => {
    let errorMessage = "";
    if (
      value?.isTouched &&
      (value?.value === undefined || value?.value === "")
    ) {
      errorMessage = `${field} is required`;
    } else if (
      field === "Password" &&
      value?.isTouched === true &&
      value?.value !== "" &&
      value?.value?.length <= 8
    ) {
      errorMessage = "Password should be greater than 8 characters";
    }
    return errorMessage;
  };

  const disableSubmit = () => {
    if (
      username.value === "" ||
      password.value === "" ||
      password.value.length <= 8
    ) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return (
    <div className="d-flex flex-row align-items-center justify-content-center mt-md-5 mx-md-0 mx-3">
      <Row className="d-flex flex-row flex-wrap-reverse col-md-10 align-items-center justify-content-center w-100">
        <Col className="d-flex flex-column col-md-6 col-12 align-items-center">
          <Card className="d-flex flex-column align-items-center border-0 w-100">
            <Card.Title>
              <h1>SIGN IN</h1>
            </Card.Title>
            <Card.Body className="w-100">
              <Form onSubmit={submitHandler}>
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={username.value}
                    onChange={(e) =>
                      setUsername({ value: e.target.value, isTouched: true })
                    }
                    onBlur={() =>
                      setUsername({ value: username.value, isTouched: true })
                    }
                  ></Form.Control>
                  <small className="text-danger">
                    {validateField("Username", username)}
                  </small>
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    value={password.value}
                    onChange={(e) =>
                      setPassword({ value: e.target.value, isTouched: true })
                    }
                    onBlur={() =>
                      setPassword({ value: password.value, isTouched: true })
                    }
                  ></Form.Control>
                  <small className="text-danger">
                    {validateField("Password", password)}
                  </small>
                </Form.Group>
                <Button
                  type="submit"
                  variant="primary"
                  className="mt-3"
                  disabled={disableSubmit()}
                >
                  Sign In
                </Button>
                <div className="mb-3 mt-2">
                  New Customer?{" "}
                  <Link
                    to={`/signup?redirect=${redirect}`}
                    className="text-decoration-none"
                  >
                    Create Your Account
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col className="d-flex col-md-4 col-12">
          <img src="main-image.jpg" alt="..." className="w-100" />
        </Col>
      </Row>
    </div>
  );
}
