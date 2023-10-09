import { useState, useEffect } from "react";
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

  const dayNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

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

  const handleEmployeeNameChange = (index, value) => {
    const updatedEmployeeData = [...employeeData];
    updatedEmployeeData[index] = {
      ...updatedEmployeeData[index],
      name: value,
    };
    setEmployeeData(updatedEmployeeData);
  };

  const handleEmployeeTotalHoursChange = (index, value) => {
    const updatedEmployeeData = [...employeeData];
    updatedEmployeeData[index] = {
      ...updatedEmployeeData[index],
      totalHours: value,
    };
    setEmployeeData(updatedEmployeeData);
  };

  const handleEmployeeDaysChange = (index, days) => {
    const updatedEmployeeData = [...employeeData];
    updatedEmployeeData[index] = {
      ...updatedEmployeeData[index],
      days: days,
    };
    setEmployeeData(updatedEmployeeData);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedShiftData = calculateShiftDurations(shiftData); // Step 1: Calculate the duration of each main shift and bank shift
    const employeeAssignments = distributeEmployeesToMainShifts(updatedShiftData, employeeData); // Step 2: Distribute employees to main shifts
    const updatedEmployeeData = offerBankShiftsIfNeeded(employeeAssignments, employeeData); // Step 3: Offer additional bank shifts to employees if needed
    const shiftAvailability = checkShiftAvailability(updatedShiftData, updatedEmployeeData); // Step 4: Check if there are enough employees for each shift
    if (shiftAvailability.some((availability) => !availability)) {
      alert("There are not enough employees for some shifts!"); // Step 5: Display an alert if there are any issues
    } else {
      console.log("Shift data:", updatedShiftData);
      console.log("Employee data:", updatedEmployeeData);
    }
  };
  
  // Function to calculate the duration of each shift
  const calculateShiftDurations = (shiftData) => {
    const updatedShiftData = [...shiftData];
    for (let i = 0; i < updatedShiftData.length; i++) {
      const shift = updatedShiftData[i];
      shift.shifts.forEach((s) => {
        const startTime = new Date(`1970-01-01T${s.StartTime}`);
        const endTime = new Date(`1970-01-01T${s.EndTime}`);
        const duration = (endTime - startTime) / (60 * 1000);
        s.duration = duration;
      });
    }
    return updatedShiftData;
  };
  
  // Function to distribute employees to main shifts
  const distributeEmployeesToMainShifts = (shiftData, employeeData) => {
    const employeeAssignments = [];
    for (let i = 0; i < shiftData.length; i++) {
      const shift = shiftData[i];
      const mainShifts = shift.shifts;
      const employees = employeeData.filter((e) => e.days[dayNames[i].toLowerCase()]);
      const employeeAssignmentsForDay = [];
      for (let j = 0; j < mainShifts.length; j++) {
        const shift = mainShifts[j];
        const employeesForShift = employees.filter((e) => e.totalHours >= shift.duration);
        employeeAssignmentsForDay.push(employeesForShift);
      }
      employeeAssignments.push(employeeAssignmentsForDay);
    }
    return employeeAssignments;
  };
  
  // Function to offer additional bank shifts to employees if needed
  const offerBankShiftsIfNeeded = (employeeAssignments, employeeData) => {
    const updatedEmployeeData = [...employeeData];
    for (let i = 0; i < employeeAssignments.length; i++) {
      const assignmentsForDay = employeeAssignments[i];
      const employeesForDay = updatedEmployeeData.filter((e) => e.days[dayNames[i].toLowerCase()]);
      for (let j = 0; j < assignmentsForDay.length; j++) {
        const assignmentsForShift = assignmentsForDay[j];
        const employeesForShift = employeesForDay.filter((e) => assignmentsForShift.includes(e));
        const totalHoursForShift = assignmentsForShift.reduce((total, e) => total + e.totalHours, 0);
        const totalHoursForEmployees = employeesForShift.reduce((total, e) => total + e.totalHours, 0);
        if (totalHoursForShift > totalHoursForEmployees) {
          const bankShifts = totalHoursForShift - totalHoursForEmployees;
          const bankShiftsPerEmployee = Math.ceil(bankShifts / employeesForShift.length);
          employeesForShift.forEach((e) => {
            e.totalHours += bankShiftsPerEmployee;
          });
        }
      }
    }
    return employeeAssignments;
  };
  
  // Function to check if there are enough employees for each main shift and bank shift
  const checkShiftAvailability = (shiftData, employeeDatal, employeeAssignments) => {

      

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index}>
            <Form.Group controlId={`formBasicMainShifts${index}`}>
              <Form.Label>
                Number of main shifts for {dayNames[index]}
              </Form.Label>
              <Form.Control
                type="number"
                placeholder={`Enter the number of main shifts for day ${dayNames[index]}`}
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
                          handleShiftDataChange(
                            index,
                            "shifts",
                            updatedShiftData
                          )
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
                    Number of bank shifts for day {dayNames[dayIndex]}
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder={`Enter the number of bank shifts for day ${dayNames[dayIndex]}`}
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
                        handleShiftDataChange(
                          dayIndex,
                          "shifts",
                          updatedShiftData
                        )
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
                    {...employeeData[index]}
                    dayNames={dayNames}
                    onEmployeeNameChange={(value) =>
                      handleEmployeeNameChange(index, value)
                    }
                    onEmployeeTotalHoursChange={(value) =>
                      handleEmployeeTotalHoursChange(index, value)
                    }
                    onEmployeeDaysChange={(days) =>
                      handleEmployeeDaysChange(index, days)
                    }
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
