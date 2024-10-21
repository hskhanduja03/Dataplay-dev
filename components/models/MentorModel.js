import Modal from "react-bootstrap/Modal";
import React from "react";
import Image from "next/image";
import Button from "../ui/Button";

export default function MentorModel({ mentor, open, onHide }) {
  const myLoader = ({ src }) => {
    return `${process.env.NEXT_PUBLIC_APIBASEURL}${src}`;
  };
  const handleClose = () => onHide(false);

  return (
    <Modal className="mentor-modal" centered show={open}>
      <Modal.Body>
        {mentor && (
          <div className="our-menter-card">
            <div className="card-inner d-flex">
              <div className="menter-img">
                <Image
                  src={mentor.profile_pic}
                  alt={mentor.name}
                  width={218}
                  height={240}
                />
              </div>
              <div className="menter-info" style={{marginTop:'2rem'}}>
                <div className="menter-info-inner">
                  <h3>{mentor.user.first_name + " " +mentor.user.last_name}</h3>
                  <p>{mentor.Designation}</p>
                  <p className="modal-para">{mentor.bio} </p>
                </div>
                {/* <a
                  className="our-menter-btn"
                  href={mentor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Profile
                </a> */}
                <Button href={mentor.linkedin}>
                View Profile
                </Button>
              </div>
            </div>
            <button className="modal-close-btn" onClick={handleClose}></button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}
