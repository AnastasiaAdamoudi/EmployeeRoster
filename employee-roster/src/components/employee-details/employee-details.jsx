import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

function EmployeeDetails({
  index,
  name,
  totalHours,
  days,
  dayNames,
  onEmployeeNameChange,
  onEmployeeTotalHoursChange,
  onEmployeeDaysChange,
}) {
  EmployeeDetails.propTypes = {
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    totalHours: PropTypes.number.isRequired,
    dayNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    days: PropTypes.shape({
      monday: PropTypes.bool.isRequired,
      tuesday: PropTypes.bool.isRequired,
      wednesday: PropTypes.bool.isRequired,
      thursday: PropTypes.bool.isRequired,
      friday: PropTypes.bool.isRequired,
      saturday: PropTypes.bool.isRequired,
      sunday: PropTypes.bool.isRequired,
    }).isRequired,
    onEmployeeNameChange: PropTypes.func.isRequired,
    onEmployeeTotalHoursChange: PropTypes.func.isRequired,
    onEmployeeDaysChange: PropTypes.func.isRequired,
  };

  const handleChange = (field, value) => {
    switch (field) {
      case "name":
        onEmployeeNameChange(index, value);
        break;
      case "totalHours":
        onEmployeeTotalHoursChange(index, value);
        break;
      case "days":
        onEmployeeDaysChange(index, value);
        break;
      default:
        break;
    }
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
        {dayNames.map((dayName, dayIndex) => (
          <Form.Check
            key={dayIndex}
            type="checkbox"
            label={dayName}
            checked={days[dayName.toLowerCase()]}
            onChange={(event) =>
              handleChange("days", {
                ...days,
                [dayName.toLowerCase()]: event.target.checked,
              })
            }
          />
        ))}
      </Form.Group>
    </div>
  );
}

export default EmployeeDetails;
