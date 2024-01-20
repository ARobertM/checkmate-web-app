import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

const AttendanceListModal = ({show,onClose,attendacelist}) => {

  return (
    <div>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton >
            <div className="text-center">Attendance List</div>
            </Modal.Header>
        <Modal.Body className="text-center">
        <div className="mt-3">
            {attendacelist.map((user)=>{ 
                let hour=new Date(user.AttendanceList.AttendanceListCreateDate).getHours()
                let minutes=new Date(user.AttendanceList.AttendanceListCreateDate).getMinutes()
                return(
                 <div key={user.UserId} className="card mb-2 event-card">
                    <div className="card-body p-2">
                    <div className="row align-items-center">
                    <div className="col-5 font-weight-bold">
                    {user.UserLastName+" "+user.UserFirstName}
                  </div>
                  <div className="col-4 mb-2">
                    {new Date(user.AttendanceList.AttendanceListCreateDate).toDateString()}
                  </div>
                  <div className="col-3 mb-2">
                    {hour+":"+minutes}
                  </div>
                    </div>
                    </div>
                 </div>
                
            )})}
            </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default AttendanceListModal
