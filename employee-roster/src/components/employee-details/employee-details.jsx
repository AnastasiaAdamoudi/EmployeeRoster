import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

function EmployeeDetails({
  index,
  name,
  totalHours,
  days,
  onEmployeeDataChange,
}) {
  EmployeeDetails.propTypes = {
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    totalHours: PropTypes.number.isRequired,
    days: PropTypes.shape({
      monday: PropTypes.bool.isRequired,
      tuesday: PropTypes.bool.isRequired,
      wednesday: PropTypes.bool.isRequired,
      thursday: PropTypes.bool.isRequired,
      friday: PropTypes.bool.isRequired,
      saturday: PropTypes.bool.isRequired,
      sunday: PropTypes.bool.isRequired,
    }).isRequired,
    onEmployeeDataChange: PropTypes.func.isRequired,
  };

  const handleChange = (field, value) => {
    onEmployeeDataChange(index, field, value);
  };

  return (
    <div>
      <Form.Group controlId={`formBasicEmployeeName${index}`}>
        <Form.Label>Employee {index + 1} Name</Form.Label>
        <Form.Control
          type="text"
          placeholder={`Enter name for Employee ${index + 1}`}
          value={name}
          onChange={(event) => handleChange("name", event.target.value)}
        />
      </Form.Group>
      <Form.Group controlId={`formBasicEmployeeHours${index}`}>
        <Form.Label>
          Number of working hours per week for Employee {index + 1}
        </Form.Label>
        <Form.Control
          type="number"
          placeholder={`Enter the number of hours Employee ${
            index + 1
          } is working this week`}
          value={totalHours}
          onChange={(event) =>
            handleChange("totalHours", parseInt(event.target.value, 10))
          }
          max={70}
        />
      </Form.Group>
      <Form.Group controlId={`formBasicEmployeeDays${index}`}>
        <Form.Label>Days of the week for Employee {index + 1}</Form.Label>
        <Form.Check
          type="checkbox"
          label="Monday"
          checked={days.monday}
          onChange={(event) =>
            handleChange("days", {
              ...days,
              monday: event.target.checked,
            })
          }
        />
        <Form.Check
          type="checkbox"
          label="Tuesday"
          checked={days.tuesday}
          onChange={(event) =>
            handleChange("days", {
              ...days,
              tuesday: event.target.checked,
            })
          }
        />
        <Form.Check
          type="checkbox"
          label="Wednesday"
          checked={days.wednesday}
          onChange={(event) =>
            handleChange("days", {
              ...days,
              wednesday: event.target.checked,
            })
          }
        />
        <Form.Check
          type="checkbox"
          label="Thursday"
          checked={days.thursday}
          onChange={(event) =>
            handleChange("days", {
              ...days,
              thursday: event.target.checked,
            })
          }
        />
        <Form.Check
          type="checkbox"
          label="Friday"
          checked={days.friday}
          onChange={(event) =>
            handleChange("days", {
              ...days,
              friday: event.target.checked,
            })
          }
        />
        <Form.Check
          type="checkbox"
          label="Saturday"
          checked={days.saturday}
          onChange={(event) =>
            handleChange("days", {
              ...days,
              saturday: event.target.checked,
            })
          }
        />
        <Form.Check
          type="checkbox"
          label="Sunday"
          checked={days.sunday}
          onChange={(event) =>
            handleChange("days", {
              ...days,
              sunday: event.target.checked,
            })
          }
        />
      </Form.Group>
    </div>
  );
}

export default EmployeeDetails;
