import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function MyForm() {
  const [numEmployees, setNumEmployees] = useState(1);
  const [employeeData, setEmployeeData] = useState(Array(numEmployees).fill({ name: '', shifts: 0, days: {} }));

  const handleNumEmployeesChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setNumEmployees(value);
  };

  const handleEmployeeDataChange = (index, field, value) => {
    const updatedEmployeeData = [...employeeData];
    updatedEmployeeData[index] = {
      ...updatedEmployeeData[index],
      [field]: value,
    };
    setEmployeeData(updatedEmployeeData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(employeeData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTotalHours">
        <Form.Label>Hours per week for each employee</Form.Label>
        <Form.Control type="text" placeholder="Enter the total hours" />
      </Form.Group>

      <Form.Group controlId="formBasicShiftHours">
        <Form.Label>Number of hours for each shift</Form.Label>
        <Form.Control type="password" placeholder="Enter the shift hours" />
      </Form.Group>

      <Form.Group controlId="formBasicEmployeeNumber">
        <Form.Label>Number of employees</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter number of employees"
          value={numEmployees}
          onChange={handleNumEmployeesChange}
        />
      </Form.Group>

{Array.from({ length: numEmployees }).map((_, index) => (
  <div key={index}>
    <Form.Group controlId={`formBasicEmployeeName${index}`}>
      <Form.Label>Employee {index + 1} Name</Form.Label>
      <Form.Control
        type="text"
        placeholder={`Enter name for Employee ${index + 1}`}
        onChange={(event) =>
          handleEmployeeDataChange(index, 'name', event.target.value)
        }
      />
    </Form.Group>
    
    <Form.Group controlId={`formBasicEmployeeShifts${index}`}>
      <Form.Label>Number of shifts per week for Employee {index + 1}</Form.Label>
      <Form.Control
        type="number"
        placeholder={`Enter number of shifts for Employee ${index + 1}`}
        onChange={(event) =>
          handleEmployeeDataChange(index, 'shifts', parseInt(event.target.value, 10))
        }
      />
    </Form.Group>
    
    <Form.Group controlId={`formBasicEmployeeDays${index}`}>
      <Form.Label>Days of the week for Employee {index + 1}</Form.Label>
      <Form.Check
        type="checkbox"
        label="Monday"
        onChange={(event) =>
          handleEmployeeDataChange(index, 'days', { ...employeeData[index].days, monday: event.target.checked })
        }
      />
      <Form.Check
        type="checkbox"
        label="Tuesday"
        onChange={(event) =>
          handleEmployeeDataChange(index, 'days', { ...employeeData[index].days, tuesday: event.target.checked })
        }
      />
        <Form.Check
            type="checkbox"
            label="Wednesday"
            onChange={(event) =>
            handleEmployeeDataChange(index, 'days', { ...employeeData[index].days, wednesday: event.target.checked })
            }
        />
        <Form.Check
            type="checkbox"
            label="Thursday"
            onChange={(event) =>
            handleEmployeeDataChange(index, 'days', { ...employeeData[index].days, thursday: event.target.checked })
            }
        />
        <Form.Check
            type="checkbox"
            label="Friday"
            onChange={(event) =>
            handleEmployeeDataChange(index, 'days', { ...employeeData[index].days, friday: event.target.checked })
            }
        />
        <Form.Check
            type="checkbox"
            label="Saturday"
            onChange={(event) =>
            handleEmployeeDataChange(index, 'days', { ...employeeData[index].days, saturday: event.target.checked })
            }      
        />
        <Form.Check
            type="checkbox"
            label="Sunday"
            onChange={(event) =>
            handleEmployeeDataChange(index, 'days', { ...employeeData[index].days, sunday: event.target.checked })
            }
        />
    </Form.Group>
  </div>
))}


      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default MyForm;
