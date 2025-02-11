import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Store } from "../Store";

export default function SignUpScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectIntUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectIntUrl ? redirectIntUrl : "/";
  const [username, setUsername] = useState({ value: "", isTouched: false });
  const [password, setPassword] = useState({ value: "", isTouched: false });
  const [role, setRole] = useState({ value: "", isTouched: false });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    isTouched: false,
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

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
      password.value.length <= 8 ||
      confirmPassword.value === "" ||
      role.value === ""
    ) {
      return true;
    } else {
      return false;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password.value !== confirmPassword.value) {
      toast.error("Password doesn't match");
      return;
    }

    try {
      const { data } = await axios.post("/api/v1/user/sign-up", {
        username: username.value,
        password: password.value,
        role: role.value,
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div className="d-flex flex-row align-items-center justify-content-center mt-md-5 mx-md-0 mx-3">
      <Row className="d-flex flex-row flex-wrap-reverse col-md-10 w-100 justify-content-center">
        <Col className="d-flex flex-column col-md-6 col-12">
          <Card className="d-flex flex-column align-items-center border-0 w-100">
            <Card.Title>
              <h1>SIGN UP</h1>
            </Card.Title>
            <Card.Body className="w-100">
              <Form onSubmit={submitHandler}>
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username.value ?? ""}
                    required
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
                    value={password.value ?? ""}
                    required
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
                <Form.Group className="mt-2">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    onChange={(e) =>
                      setConfirmPassword({
                        value: e.target.value,
                        isTouched: true,
                      })
                    }
                    onBlur={() =>
                      setConfirmPassword({
                        value: confirmPassword.value,
                        isTouched: true,
                      })
                    }
                  ></Form.Control>
                  <small className="text-danger">
                    {validateField("Confirm Password", confirmPassword)}
                  </small>
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) =>
                      setRole({ value: e.target.value, isTouched: true })
                    }
                    onBlur={() =>
                      setRole({ value: role.value, isTouched: true })
                    }
                  >
                    <option>Select a Role</option>
                    <option value="admin">admin</option>
                    <option value="user">user</option>
                  </Form.Select>
                  <small className="text-danger">
                    {validateField("Role", role)}
                  </small>
                </Form.Group>
                <Button
                  type="submit"
                  variant="primary"
                  className="mt-3"
                  disabled={disableSubmit()}
                >
                  Sign Up
                </Button>
                <div className="mb-3 mt-2">
                  Already have an account?{" "}
                  <Link
                    to={`/signin?redirect=${redirect}`}
                    className="text-decoration-none"
                  >
                    Sign In
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
