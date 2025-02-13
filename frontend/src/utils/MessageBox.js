import Alert from "react-bootstrap/Alert";
export default function MessageBox(props) {
  return (
    <div className="w-100">
      <Alert variant={props.variant || "info"}>{props.children}</Alert>
    </div>
  );
}
