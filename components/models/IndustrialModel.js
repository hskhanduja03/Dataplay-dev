import Modal from "react-bootstrap/Modal";
import React from "react";
import Image from "next/image";

export default function IndustrialModel({ testimonial, open, onHide }) {
  const myLoader = ({ src }) => {
    0.0;
    return `${process.env.NEXT_PUBLIC_APIBASEURL}${src}`;
  };

  const handleClose = () => onHide(false);

  return (
    <Modal className="student-modal" centered show={open}>
      <Modal.Body>
        {testimonial && (
          <div className="our-students-card">
            <button className="modal-close-btn" onClick={handleClose}></button>
            <div className="our-student-img">
              <Image
                
                // unoptimized
                alt="student-img"
                src={testimonial.photo}
                width={168}
                height={168}
              />
            </div>
            <div className="our-student-comment">
              <p>{testimonial.content}</p>
              <a
                href={testimonial.linkdin}
                className="d-flex align-items-center justify-content-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                {testimonial.name} <span></span>
              </a>
              <h6>“ Our career track achievers “</h6>
              <div className="leader-info" style={{ marginTop: '1rem' }}>
                  <p className="leader-designation">{testimonial.designation}</p>
                  <Image
                    quality={70}
                    src={testimonial.company_logo}
                    alt={testimonial.name}
                    height={10}
                    width={20}
                  />
                </div>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}
