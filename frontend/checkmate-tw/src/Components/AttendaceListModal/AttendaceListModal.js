import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ModalFooter from "react-bootstrap/esm/ModalFooter";
import axios from "axios";

const AttendanceListModal = ({ show, onClose, attendacelist }) => {
  const handleExportData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9000/api/export-scans",
        {
          responseType: "blob", // Important pentru a primi fișierul
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Scans.csv");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Eroare la exportul datelor:", error);
    }
  };
  return (
    <div>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <div className="text-center">Attendance List</div>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="mt-3">
            {attendacelist.map((user) => {
              let hour = new Date(
                user.AttendanceList.AttendanceListCreateDate
              ).getHours();
              let minutes = new Date(
                user.AttendanceList.AttendanceListCreateDate
              ).getMinutes();
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
                      <div className="col-3 mb-2">{hour + ":" + minutes}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Modal.Body>
        <ModalFooter>
          <div className="mb-2">
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => handleExportData()}
            >
              Export
            </button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default AttendanceListModal;
