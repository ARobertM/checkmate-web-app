import React from "react";
import Modal from "react-bootstrap/Modal";
import ModalFooter from "react-bootstrap/esm/ModalFooter";
import { CSVLink } from "react-csv";

const AttendanceListModal = ({ show, onClose, attendacelist,eventName }) => {
  const csvData = [
    ["FirstName", "LastName", "Email", "Date", "Hour"],
    ...attendacelist.map(
      ({ UserFirstName, UserLastName, UserEmail, AttendanceList }) => [
        UserFirstName,
        UserLastName,
        UserEmail,
        new Date(AttendanceList.AttendanceListCreateDate).toLocaleDateString(),
        new Date(AttendanceList.AttendanceListCreateDate).toLocaleTimeString(),
      ]
    ),
  ];

  return (
    <div>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <div className="text-center">Attendance List</div>
        </Modal.Header>
        <Modal.Body className="text-center">
          {attendacelist.length == 0 && <div>No data</div>}
          <div className="mt-3">
            {attendacelist.map((user) => {
              return (
                <div key={user.UserId} className="card mb-2 event-card">
                  <div className="card-body p-2">
                    <div className="row align-items-center">
                      <div className="col-5 font-weight-bold">
                        {user.UserLastName + " " + user.UserFirstName}
                      </div>
                      <div className="col-4 mb-2">
                        {new Date(
                          user.AttendanceList.AttendanceListCreateDate
                        ).toDateString()}
                      </div>
                      <div className="col-3 mb-2">
                        {new Date(
                          user.AttendanceList.AttendanceListCreateDate
                        ).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Modal.Body>
        <ModalFooter>
          {attendacelist.length > 0 && (
            <div className="mb-2">
              <CSVLink
                className="btn btn-primary"
                filename={"Attendace_Event.csv"}
                data={csvData}
              >
                Export to CSV
              </CSVLink>
            </div>
          )}
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default AttendanceListModal;
