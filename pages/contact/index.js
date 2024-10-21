import DealHeader from "../home/DealHeader";
import Header from "../../components/Header";
import Image from "next/image";
import Footer from "../../components/Footer";
import React, { useRef, useState } from 'react';

const index = () => {
  const [showToast, setShowToast] = useState(false);
  const formRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Show custom toast
    setShowToast(true);

    // Clear form fields
    if (formRef.current) {
      formRef.current.reset();
    }

    // Hide toast after 3 seconds
    setTimeout(() => setShowToast(false), 3000);
  };
  return (
    <div>
      <DealHeader />
      <div className="home-page-header">
        <Header />
      </div>
      <div className="pt-5 pb-4"></div>
      <div className="about-us justify-content-center px-5 d-flex flex-column mb-5">
        <h1 className="mx-5 ps-4 purple text-lg-start text-center fw-semibold mt-4">
          Contact Us
        </h1>
        <p className="mx-5 ps-4 purple text-lg-start text-center fw-semibold ">
          Home {" >  "}
          <span className="pink">Contact Us</span>
        </p>
      </div>
      <div className="container">
        <div className="d-lg-flex flex-row ">
          <div className="col-xl-4 col-lg-5 col-12 pe-lg-5">
            <div
              className="bg-lightpurple bg-outer rounded-4"
              style={{ minHeight: 108 }}
            >
              <div
                className="bg-inner p-3 rounded-4 bg-whitepurple"
                style={{ minHeight: 108 }}
              >
                <div className="d-flex align-items-center">
                  <Image
                    src="/address.svg"
                    width={57}
                    height={57}
                    alt="services-icon"
                  />
                  <div className="ms-3">
                    <h5 className="purple mb-1 fw-bold">Address</h5>
                    <p className="mb-0">
                      <small>
                        E2/202 Chitrakoot, Near Mall of Jaipur, Jaipur, Rajasthan, 302021
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="bg-pink bg-outer rounded-4 my-5"
              style={{ minHeight: 108 }}
            >
              <div
                className="bg-inner p-3 rounded-4 bg-whitepink d-flex align-items-center "
                style={{ minHeight: 108 }}
              >
                <div className="d-flex align-items-center">
                  <Image
                    src="/email.svg"
                    width={57}
                    height={57}
                    alt="services-icon"
                  />
                  <div className="ms-3">
                    <h5 className="purple mb-1 fw-bold">Email Address</h5>
                    <p className="mb-0">
                      <small>hr@dataplay.co.in</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="bg-lightpurple bg-outer rounded-4"
              style={{ minHeight: 108 }}
            >
              <div
                className="bg-inner p-3 rounded-4 bg-whitepurple"
                style={{ minHeight: 108 }}
              >
                <div className="d-flex align-items-center">
                  <Image
                    src="/call.svg"
                    width={57}
                    height={57}
                    alt="services-icon"
                  />
                  <div className="ms-3">
                    <h5 className="purple mb-1 fw-bold">Contact Number</h5>
                    <p className="mb-0">
                      <small>
                        +91 7427 0716 31 
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      
    </div>
        <div className="my-5 py-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m24!1m12!1m3!1d3557.3561668434275!2d75.72492400000001!3d26.902106799999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m9!3e0!4m3!3m2!1d26.8992512!2d75.726848!4m3!3m2!1d26.9050892!2d75.7337115!5e0!3m2!1sen!2sin!4v1692607391409!5m2!1sen!2sin"
          width="100%"
          height="500"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default index;
