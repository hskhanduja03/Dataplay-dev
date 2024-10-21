import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaLinkedinIn,
  FaPhoneAlt,
  FaTwitterSquare,
  FaYoutube,
  FaGoogle,
} from "react-icons/fa";
import React,{useState} from "react";
import { RiInstagramFill } from "react-icons/ri";
import { IoMdMail } from "react-icons/io";
import BookNow from "../components/models/BookNow";

const Footer = () => {
  const router = useRouter();
  const [open, setopen] = useState(false);

  const handleScrollToInterview = (e) => {
    e.preventDefault();
    router.push('/#interview-section');
  };

  return (
    <>
      <footer className="footer-section">
        <div className="container px-sm-0 px-4">
          <div className="row">
            <div className="col-lg-5 col-md-12">
              <div className="footer-logo-section">
                <div className="footer-logo">
                  <Link href="/">
                    <Image
                      src="/Brand-Logo.svg"
                      alt="footer-logo"
                      width={230}
                      height={50}
                    />
                  </Link>
                  <p>
                    At DATAPLAY, we are not just educators; we are navigators
                    guiding you to your best self, where satisfaction and
                    success intertwine seamlessly.
                  </p>
                </div>
              </div>
            </div>
            <div className="d-sm-flex col-lg-5 mt-lg-0 mt-4">
              <div className="col-sm-6 footer-margin" style={{ marginLeft: "-60px" }}>
                <div className="footer-menus">
                  <h3>Information</h3>
                  <ul className="m-0 p-0">
                    <li>
                      <Link className="footer-link" href="/">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link className="footer-link" href="about">
                        About Us
                      </Link>
                    </li>
                    {/* <li>
                    <Link href="/google/login/" className="footer-link">
                      googleAuthRedirect
                    </Link>
                  </li> */}
                    <li>
                      <Link className="footer-link" href="/">
                        Testimonials
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="footer-menus">
                  <h3>Our Services</h3>
                  <ul className="m-0 p-0">
                    <li>
                      <Link className="footer-link" href="interviewprep">
                        Interview Prep
                      </Link>
                    </li>
                    <li>
                      <Link className="footer-link" href="course">
                        Courses
                      </Link>
                    </li>
                    <li>
                      <Link href="blogs" className="footer-link">
                        Blogs
                      </Link>
                    </li>
                    
                  </ul>
                </div>
              </div>
            </div>
            <div
              className="col-lg-2 col-6 d-flex justify-content-lg-end  mt-lg-0 mt-4 footer-margin"
              style={{ marginLeft: "-30px" }}
            >
              <div className="footer-menus">
                <h3>Contact</h3>
                <div className="footer-contact">
                  <Link className="footer-link" href="mailto:Email@gmail.com">
                    <IoMdMail size={18} color="#8073E5" className="me-1" />
                    hr@dataplay.co.in
                  </Link>
                  <Link
                    className="footer-link footer-phone"
                    href="tel:(000) 012-345"
                  >
                    <FaPhoneAlt size={16} color="#8073E5" className="me-1" style={{transform:"translate(180)"}} />
                    +91 7427071631
                  </Link>
                  <div className="follow-social d-flex align-items-center mt-3">
                    <h6 className="fw-semibold">Follow Us:</h6>
                    <ul className="d-flex m-0 p-0 align-items-center">
                      <a href="https://www.linkedin.com/company/data-play/">
                      <FaLinkedin style={{marginBottom: '0.25rem'}} size={19} color="#8073E5"/>
                      </a>
                      <a href="https://www.instagram.com/dataplayacademy/">
                      <RiInstagramFill style={{marginLeft: '0.25rem', marginBottom: '0.15rem'}} size={19} color="#8073E5" />
                      </a>
                      <a href="https://www.youtube.com/@DataPlay-dataplay">
                        <FaYoutube style={{marginLeft: '0.25rem', marginBottom: '0.15rem'}} size={19} color="#8073E5"/>
                      </a>
                      <a href="https://g.co/kgs/iLU4VKb">
                        <FaGoogle style={{marginLeft: '0.25rem', marginBottom: '0.25rem'}} size={19} color="#8073E5"/>
                      </a>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid white", marginTop: 100 }}></div>
        <div className="container d-sm-flex text-sm-start text-center justify-content-between text-white py-3">
          <p style={{ fontSize: 14 }} className="mb-0">
            © 2024 dataplay.com. All rights reserved.
          </p>
          <p style={{ fontSize: 14 }} className="mb-0">
            Term of Use <span className="mx-3">|</span> Privacy Policy
          </p>
        </div>
      </footer>
      <BookNow open={open} onHide={setopen} />
    </>
  );
};

export default Footer;
