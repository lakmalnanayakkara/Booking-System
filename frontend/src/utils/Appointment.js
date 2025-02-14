import axios from "axios";
import { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Store } from "../Store";

export default function Appointment(props) {
  const navigate = useNavigate();
  const { appointment } = props;
  const { state } = useContext(Store);
  const { userInfo } = state;

  const cancelHandler = async () => {
    try {
      console.log("delete");

      const { data } = await axios.delete(
        `/api/v1/appointment/delete-an-appointment?id=${appointment.appointmentId}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.data.jwtToken}`,
          },
        }
      );
      toast.success(`${data.data.appointmentTitle} canceled successfully`);
      navigate(0);
    } catch (error) {
      toast.success(`Canceled successfully`);
      navigate(0);
    }
  };
  const updateHandler = () => {
    navigate(`/update-the-appointment/${appointment.appointmentId}`);
  };

  return (
    <Card>
      <Card.Body>
        <Link
          to={`/update-the-appointment/${appointment.appointmentId}`}
          className="text-decoration-none"
        >
          <Card.Title className="text-decoration-none">
            {appointment.appointmentTitle}
          </Card.Title>
        </Link>
        <Card.Text>
          <strong>Appointment Date:</strong> {appointment.appointmentDate}
        </Card.Text>
        <Card.Text>
          <strong>Start at:</strong> {appointment.startingTime}
        </Card.Text>
        <Card.Text>
          <strong>End at:</strong> {appointment.endingTime}
        </Card.Text>
        <Card.Text>
          <strong>Meeting Type:</strong> {appointment.meetingType}
        </Card.Text>
        <Button
          variant="success"
          className="me-2"
          onClick={() => {
            updateHandler();
          }}
        >
          Update
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            cancelHandler();
          }}
        >
          Cancel
        </Button>
      </Card.Body>
    </Card>
  );
}
