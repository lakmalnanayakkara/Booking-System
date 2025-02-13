import Spinner from "react-bootstrap/Spinner";
export default function LoadingBox() {
  return (
    <div>
      <Spinner animation="border" rold="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
