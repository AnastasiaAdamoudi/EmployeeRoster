import { useState } from "react";
import { Form, Button } from "react-bootstrap";

function MyForm() {
  const [bankShiftsExistence, setBankShiftsExistence] = useState(false);
  const [shiftData, setShiftData] = useState(
    Array(7).fill({
      mainShifts: 0,
      bankShifts: 0,
      shifts: Array(1).fill({
        mainShiftStartTime: "",
        mainShiftEndTime: "",
        mainShiftEmployees: 0, // Number of employees needed for main shift
        bankShiftStartTime: "",
        bankShiftEndTime: "",
        bankShiftEmployees: 0, // Number of employees needed for bank shift
      }),
      totalEmployeesMain: 0, // Total number of employees needed for main shifts
      totalEmployeesBank: 0, // Total number of employees needed for bank shifts
    })
  );

  const [employeesNumber, setEmployeesNumber] = useState(1);
  const [employeeData, setEmployeeData] = useState(
    Array(employeesNumber).fill({
      name: "",
      totalHours: 0,
      days: {},
    })
  );

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
    <Form onSubmit={handleSubmit}>
      {/* MAIN SHIFTS */}

      {Array.from({ length: 7 }).map((_, index) => (
        <div key={index}>
          <Form.Group controlId={`formBasicMainShifts${index}`}>
            <Form.Label>Number of main shifts for day {index + 1}</Form.Label>
            <Form.Control
              type="number"
              placeholder={`Enter the number of main shifts for day ${
                index + 1
              }`}
              onChange={(event) =>
                handleShiftDataChange(
                  index,
                  "mainShifts",
                  parseInt(event.target.value, 10)
                )
              }
            />
          </Form.Group>
          {Array.from({ length: shiftData[index].mainShifts }).map(
            (_, shiftIndex) => (
              <div key={shiftIndex}>
                <Form.Group
                  controlId={`formBasicMainShiftStartTime${index}-${shiftIndex}`}
                >
                  <Form.Label>
                    Main Shift {shiftIndex + 1} Start Time
                  </Form.Label>
                  <Form.Control
                    type="time"
                    onChange={(event) =>
                      handleShiftDataChange(index, "shifts", [
                        ...shiftData[index].shifts.slice(0, shiftIndex),
                        {
                          ...shiftData[index].shifts[shiftIndex],
                          mainShiftStartTime: event.target.value,
                        },
                        ...shiftData[index].shifts.slice(shiftIndex + 1),
                      ])
                    }
                  />
                </Form.Group>
                <Form.Group
                  controlId={`formBasicMainShiftEndTime${index}-${shiftIndex}`}
                >
                  <Form.Label>Main Shift {shiftIndex + 1} End Time</Form.Label>
                  <Form.Control
                    type="time"
                    onChange={(event) =>
                      handleShiftDataChange(index, "shifts", [
                        ...shiftData[index].shifts.slice(0, shiftIndex),
                        {
                          ...shiftData[index].shifts[shiftIndex],
                          mainShiftEndTime: event.target.value,
                        },
                        ...shiftData[index].shifts.slice(shiftIndex + 1),
                      ])
                    }
                  />
                </Form.Group>
                <Form.Group
                  controlId={`formBasicMainShiftEmployees${index}-${shiftIndex}`}
                >
                  <Form.Label>
                    Number of employees needed for Main Shift {shiftIndex + 1}
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder={`Enter the number of employees needed for Main Shift ${
                      shiftIndex + 1
                    }`}
                    onChange={(event) =>
                      handleShiftDataChange(index, "shifts", [
                        ...shiftData[index].shifts.slice(0, shiftIndex),
                        {
                          ...shiftData[index].shifts[shiftIndex],
                          mainShiftEmployees: parseInt(event.target.value, 10),
                        },
                        ...shiftData[index].shifts.slice(shiftIndex + 1),
                      ])
                    }
                  />
                </Form.Group>
              </div>
            )
          )}
        </div>
      ))}

      {/* BANK SHIFTS */}

      <Form.Group controlId="formBasicBankShiftsExistence">
        <Form.Check
          type="checkbox"
          label="Bank shifts exist"
          onChange={handleBankShiftsExistenceChange}
        />
      </Form.Group>

      {/* BANK SHIFTS */}
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
                  placeholder={`Enter the number of bank shifts for day ${
                    dayIndex + 1
                  }`}
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
                (_, shiftIndex) => (
                  <div key={shiftIndex}>
                    <Form.Group
                      controlId={`formBasicBankShiftStartTime${dayIndex}-${shiftIndex}`}
                    >
                      <Form.Label>
                        Bank Shift {shiftIndex + 1} Start Time
                      </Form.Label>
                      <Form.Control
                        type="time"
                        onChange={(event) =>
                          handleShiftDataChange(dayIndex, "shifts", [
                            ...shiftData[dayIndex].shifts.slice(0, shiftIndex),
                            {
                              ...shiftData[dayIndex].shifts[shiftIndex],
                              bankShiftStartTime: event.target.value,
                            },
                            ...shiftData[dayIndex].shifts.slice(shiftIndex + 1),
                          ])
                        }
                      />
                    </Form.Group>
                    <Form.Group
                      controlId={`formBasicBankShiftEndTime${dayIndex}-${shiftIndex}`}
                    >
                      <Form.Label>
                        Bank Shift {shiftIndex + 1} End Time
                      </Form.Label>
                      <Form.Control
                        type="time"
                        onChange={(event) =>
                          handleShiftDataChange(dayIndex, "shifts", [
                            ...shiftData[dayIndex].shifts.slice(0, shiftIndex),
                            {
                              ...shiftData[dayIndex].shifts[shiftIndex],
                              bankShiftEndTime: event.target.value,
                            },
                            ...shiftData[dayIndex].shifts.slice(shiftIndex + 1),
                          ])
                        }
                      />
                    </Form.Group>
                    <Form.Group
                      controlId={`formBasicBankShiftEmployees${dayIndex}-${shiftIndex}`}
                    >
                      <Form.Label>
                        Number of employees needed for Bank Shift{" "}
                        {shiftIndex + 1}
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder={`Enter the number of employees needed for Bank Shift ${
                          shiftIndex + 1
                        }`}
                        onChange={(event) =>
                          handleShiftDataChange(dayIndex, "shifts", [
                            ...shiftData[dayIndex].shifts.slice(0, shiftIndex),
                            {
                              ...shiftData[dayIndex].shifts[shiftIndex],
                              bankShiftEmployees: parseInt(
                                event.target.value,
                                10
                              ),
                            },
                            ...shiftData[dayIndex].shifts.slice(shiftIndex + 1),
                          ])
                        }
                      />
                    </Form.Group>
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      )}

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
                handleEmployeeDataChange(index, "name", event.target.value)
              }
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
              onChange={(event) =>
                handleEmployeeDataChange(
                  index,
                  "totalHours",
                  parseInt(event.target.value, 10)
                )
              }
            />
          </Form.Group>
          <Form.Group controlId={`formBasicEmployeeDays${index}`}>
            <Form.Label>Days of the week for Employee {index + 1}</Form.Label>
            <Form.Check
              type="checkbox"
              label="Monday"
              onChange={(event) =>
                handleEmployeeDataChange(index, "days", {
                  ...employeeData[index].days,
                  monday: event.target.checked,
                })
              }
            />
            <Form.Check
              type="checkbox"
              label="Tuesday"
              onChange={(event) =>
                handleEmployeeDataChange(index, "days", {
                  ...employeeData[index].days,
                  tuesday: event.target.checked,
                })
              }
            />
            <Form.Check
              type="checkbox"
              label="Wednesday"
              onChange={(event) =>
                handleEmployeeDataChange(index, "days", {
                  ...employeeData[index].days,
                  wednesday: event.target.checked,
                })
              }
            />
            <Form.Check
              type="checkbox"
              label="Thursday"
              onChange={(event) =>
                handleEmployeeDataChange(index, "days", {
                  ...employeeData[index].days,
                  thursday: event.target.checked,
                })
              }
            />
            <Form.Check
              type="checkbox"
              label="Friday"
              onChange={(event) =>
                handleEmployeeDataChange(index, "days", {
                  ...employeeData[index].days,
                  friday: event.target.checked,
                })
              }
            />
            <Form.Check
              type="checkbox"
              label="Saturday"
              onChange={(event) =>
                handleEmployeeDataChange(index, "days", {
                  ...employeeData[index].days,
                  saturday: event.target.checked,
                })
              }
            />
            <Form.Check
              type="checkbox"
              label="Sunday"
              onChange={(event) =>
                handleEmployeeDataChange(index, "days", {
                  ...employeeData[index].days,
                  sunday: event.target.checked,
                })
              }
            />
          </Form.Group>
        </div>
      ))}

      <Form.Group controlId="formBasicCheckbox">
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
}

export default MyForm;
