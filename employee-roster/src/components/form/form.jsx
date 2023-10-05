import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function MyForm() {
  const [mainShiftHours, setMainShiftHours] = useState([]);
  const [bankAftHours, setBankAftHours] = useState([]);
  const [bankEveHours, setBankEveHours] = useState([]);
  const [shiftData, setShiftData] = useState(Array(7).fill({ employeesMain: 0, employeesBankaAft: 0, employeesBankEve: 0, }));
  const [employeesNumber, setEmployeesNumber] = useState(1);
  const [employeeData, setEmployeeData] = useState(Array(employeesNumber).fill({ name: '', totalHours: 0, days: {} }));

  const handleMainShiftHoursChange = (event) => {
    const value = parseInt(event.target.value, 13);
    setMainShiftHours(value);
  };

  const handleBankAftHoursChange = (event) => {
    const value = parseInt(event.target.value, 6);
    setBankAftHours(value);
  };

  const handleBankEveHoursChange = (event) => {
    const value = parseInt(event.target.value, 6);
    setBankEveHours(value);
  };

  const handleEmployeesNumberChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setEmployeesNumber(value);
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

    {/* SHIFTS */}

      <Form.Group controlId="formBasicMainShiftHours">
        <Form.Label>Hours for daily main shift</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter the number of hours for the daily main shift"
          value={mainShiftHours}
          onChange={handleMainShiftHoursChange}
          />
      </Form.Group>

      <Form.Group controlId="formBasicBankAftHours">
        <Form.Label>Hours for afternoon bank shift</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter the number of hours for the daily afternoon bank shift"
          value={bankAftHours}
          onChange={handleBankAftHoursChange}
          />
      </Form.Group>

      <Form.Group controlId="formBasicBankEveHours">
        <Form.Label>Hours for evening bank shift</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter the number of hours for the daily evening bank shift"
          value={bankEveHours}
          onChange={handleBankEveHoursChange}
          />
      </Form.Group>

      <Form.Group controlId="formBasicMainEmployees">
        <Form.Label>Number of employees for each main shift</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter the shift hours"
          value=""
          />
      </Form.Group>

     {Array.from({ length: 7 }).map((_, index) => (
        <div key={index}>
          <Form.Group controlId={`formBasicDay${index+1}MainHours`}>
            <Form.Label>Number of employees for Day {index + 1}</Form.Label>
            <Form.Control
              type="number"
              placeholder={`Enter the number of employees needed for the main shift of Day ${index + 1}`}
              onChange={(event) =>
                handleShiftDataChange(index, 'EmployeesMain', parseInt(event.target.value, 10))
              }
            />
          </Form.Group>
        </div>
))}


{/* EMPLOYEES */}

      <Form.Group controlId="formBasicEmployeesNumber">
        <Form.Label>Number of weekly employees</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter the number of this week's working employees"
          value={employeesNumber}
          onChange={handleEmployeesNumberChange}
        />
      </Form.Group>

{Array.from({ length: employeesNumber }).map((_, index) => (
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
    
    <Form.Group controlId={`formBasicEmployeeHours${index}`}>
      <Form.Label>Number of working hours per week for Employee {index + 1}</Form.Label>
      <Form.Control
        type="number"
        placeholder={`Enter the number of hours Employee ${index + 1} is working this week`}
        onChange={(event) =>
          handleEmployeeDataChange(index, 'totalHours', parseInt(event.target.value, 10))
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
