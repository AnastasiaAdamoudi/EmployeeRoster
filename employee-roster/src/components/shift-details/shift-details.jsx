import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

function ShiftDetails({
  label,
  shiftIndex,
  shiftData,
  onShiftDataChange,
  mainShift = false,
}) {
  ShiftDetails.propTypes = {
    label: PropTypes.string.isRequired,
    shiftIndex: PropTypes.number.isRequired,
    shiftData: PropTypes.array.isRequired,
    onShiftDataChange: PropTypes.func.isRequired,
    mainShift: PropTypes.bool,
  };

  const shiftPrefix = mainShift ? "mainShift" : "bankShift";

  const handleChange = (field, value) => {
    const updatedShiftData = [...shiftData];
    updatedShiftData[shiftIndex][shiftPrefix + field] = value;
    onShiftDataChange(updatedShiftData);
  };

  return (
    <div>
      <Form.Group controlId={`${shiftPrefix}StartTime${shiftIndex}`}>
        <Form.Label>{label} Start Time</Form.Label>
        <Form.Control
          type="time"
          onChange={(event) => handleChange("StartTime", event.target.value)}
        />
      </Form.Group>

      <Form.Group controlId={`${shiftPrefix}EndTime${shiftIndex}`}>
        <Form.Label>{label} End Time</Form.Label>
        <Form.Control
          type="time"
          onChange={(event) => handleChange("EndTime", event.target.value)}
        />
      </Form.Group>

      <Form.Group controlId={`${shiftPrefix}Employees${shiftIndex}`}>
        <Form.Label>Number of employees needed for {label}</Form.Label>
        <Form.Control
          type="number"
          placeholder={`Enter the number of employees needed for ${label}`}
          onChange={(event) =>
            handleChange("Employees", parseInt(event.target.value, 10))
          }
        />
      </Form.Group>
    </div>
  );
}

export default ShiftDetails;
