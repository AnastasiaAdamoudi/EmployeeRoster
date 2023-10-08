import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import ShiftDetails from "../shift-details/shift-details";
import EmployeeDetails from "../employee-details/employee-details";

function MyForm() {
  const [bankShiftsExistence, setBankShiftsExistence] = useState(false);
  const [shiftData, setShiftData] = useState(
    Array.from({ length: 7 }, () => ({
      mainShifts: 0,
      bankShifts: 0,
      shifts: [],
    }))
  );
  const [employeesNumber, setEmployeesNumber] = useState(0);
  const initialEmployeeData = Array.from({ length: employeesNumber }, () => ({
    name: "",
    totalHours: 0,
    days: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    },
  }));
  const [employeeData, setEmployeeData] = useState(initialEmployeeData);

  useEffect(() => {
    setEmployeeData(initialEmployeeData);
  }, [employeesNumber]);  

  const handleBankShiftsExistenceChange = (event) => {
    const value = event.target.checked;
    setBankShiftsExistence(value);
  };

  const handleShiftDataChange = (index, field, value) => {
    const updatedShiftData = [...shiftData];
    updatedShiftData[index] = {
      ...updatedShiftData[index],
      [field]: value,
    };
    setShiftData(updatedShiftData);
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
    <div>
    <Form onSubmit={handleSubmit}>

      {Array.from({ length: 7 }).map((_, index) => (
        <div key={index}>
          <Form.Group controlId={`formBasicMainShifts${index}`}>
            <Form.Label>Number of main shifts for day {index + 1}</Form.Label>
            <Form.Control
              type="number"
              placeholder={`Enter the number of main shifts for day ${index + 1}`}
              onChange={(event) =>
                handleShiftDataChange(
                  index,
                  "mainShifts",
                  parseInt(event.target.value, 10)
                )
              }
            />
          </Form.Group>
          {shiftData[index] && (
            <div>
          {Array.from({ length: shiftData[index].mainShifts }).map(
            (__, shiftIndex) => (
              <div key={shiftIndex}>
              <ShiftDetails
                key={shiftIndex}
                label={`Main Shift ${shiftIndex + 1}`}
                shiftIndex={shiftIndex}
                shiftData={shiftData}
                onShiftDataChange={(updatedShiftData) =>
                  handleShiftDataChange(index, "shifts", updatedShiftData)
                }
                mainShift={true}
              />
              </div>
            )
          )}
          </div>
          )}
        </div>
      ))}

      <Form.Group controlId="formBasicBankShiftsExistence">
        <Form.Check
          type="checkbox"
          label="Bank shifts"
          onChange={handleBankShiftsExistenceChange}
        />
      </Form.Group>

      {bankShiftsExistence && (
        <div>
          {Array.from({ length: 7 }).map((_, dayIndex) => (
            <div key={dayIndex}>
              <Form.Group controlId={`formBasicBankShifts${dayIndex}`}>
                <Form.Label>
                  Number of bank shifts for day {dayIndex + 1}
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder={`Enter the number of bank shifts for day ${dayIndex + 1}`}
                  onChange={(event) =>
                    handleShiftDataChange(
                      dayIndex,
                      "bankShifts",
                      parseInt(event.target.value, 10)
                    )
                  }
                />
              </Form.Group>
              {Array.from({ length: shiftData[dayIndex].bankShifts }).map(
                (__, shiftIndex) => (
                  <ShiftDetails
                    key={shiftIndex}
                    label={`Bank Shift ${shiftIndex + 1}`}
                    shiftIndex={shiftIndex}
                    shiftData={shiftData}
                    onChange={(updatedShiftData) =>
                      handleShiftDataChange(dayIndex, "shifts", updatedShiftData)
                    }
                  />
                )
              )}
            </div>
          ))}
        </div>
      )}

      <Form.Group controlId="formBasicEmployeesNumber">
        <Form.Label>Number of weekly employees</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter the number of this week's working employees"
          value={employeesNumber}
          onChange={handleEmployeesNumberChange}
        />
      </Form.Group>

      {employeesNumber > 0 && (
        <div>
      {Array.from({ length: employeesNumber }).map((_, index) => (
        <div key={index}>
        {employeeData[index] && (
        <EmployeeDetails
          key={index}
          index={index}
          name={employeeData[index].name}
          totalHours={employeeData[index].totalHours}
          days={employeeData[index].days}
          onEmployeeDataChange={(field, value) =>
          handleEmployeeDataChange(index, field, value)}
        />
        )}
        </div>
      ))}
        </div>
      )}

      <Form.Group controlId="formBasicCheckbox">
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form.Group>
    </Form>
    </div>
  );
}

export default MyForm;
