import React, { useRef, useState, useEffect } from "react";
import { Accordion, Modal } from "react-bootstrap";
import Image from "next/image";
import { IoLockClosed } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setLoginModel, setLastVisitedUrl } from "../../../store/redux/genaralSlice";
import FilePreviewModel from "../../../components/models/PreviewModel";
import LoginModel from "../../../components/models/LoginModel";
import getTestimonial from "../../../lib/getTestimonial";
import { IoLockOpen } from "react-icons/io5";
import axios from "axios";
import { useRouter } from "next/router";
import {
  DISCORD_LINK,
  DISCORD_LINK_MESSAGE,
} from "../../../utilities/constants";


const CourseDescriptionLocked = ({ course, maincourse, idx }) => {
  if (!course ) {
    return null; // or return a loading state or placeholder
  }
  const dispatch = useDispatch();
  const { user, accessToken } = useSelector((state) => state.auth);
  const router = useRouter();
  const contentRef = useRef(null);
  const [showButton, setShowButton] = useState(false);
  const [buyCourse, setBuyCourse] = useState(false);
  const [courseCtn, setCourseCtn] = useState(false);
  const [fetchedCourse, setFetchedCourse] = useState(null);
  const [activeSection, setActiveSection] = useState('files');

  const myLoader = ({ src }) => {
    return `${src}`;
  };
  function handleconnect(){
    console.log("switching");
    router.push('/contact')
  }

  function discordconnect(){
    router.push(DISCORD_LINK)
  }
  useEffect(() => {
    setFetchedCourse(course);
    if (!course) {
      console.error("Course or course ID is not available");
      return null;
    }
    console.log("course is coming as", course);
    const fetchCourseContent = async () => {
      try {
        const response = await axios.get(`https://api.dataplay.co.in/course/retrive_course_content/${course.id}`);
        setFetchedCourse(response.data);
        console.log("Fetched course content:", response.data);
      } catch (error) {
        console.error("Error fetching course content:", error);
      }
    };

    fetchCourseContent();

    const cr_content = JSON.parse(localStorage.getItem("url_content"));
    if (accessToken?.length === "0") {
      setLoginOpen(true);
    }
    if (cr_content && accessToken) {
      setFileType(cr_content.type);
      setFilePath(cr_content.path);
      localStorage.removeItem("url_content");
      setOpen(true);
    }

    // const contentElement = contentRef.current;
    // if (contentElement) {
    //   if (contentElement.scrollHeight > contentElement.clientHeight) {
    //     setShowButton(true);
    //   }
    // }

    const contentElement = contentRef.current;
    if (contentElement) {
      if (contentElement.scrollHeight > contentElement.clientHeight) {
        setShowButton(true);
      }
    }
  }, [course.id, accessToken]);

  function handleFileClick() {
    setBuyCourse(true);
    dispatch(setLastVisitedUrl(router.asPath));
  }

  function closeBuyCousrseHandler() {
    setBuyCourse(false);
  }

  function courseCtnHandle(e) {
    e.stopPropagation();
    setCourseCtn(!courseCtn);
  }

  return (
    <>
      {course && (
        <>
          <div className="lock-data course-box-locked" >
          <div className="course-box course-box-locked-inner">
          <Accordion.Item eventKey={`${idx}`} className="locked-accordion-item">
            <Accordion.Header className="locked-accordion-header">
              <div className="d-flex items-center gap-2">
                <IoLockClosed />
                <h3>{fetchedCourse?.title }</h3>
              </div>
            </Accordion.Header>
            <Accordion.Body className="locked-accordion-body">
              <h4
                ref={contentRef}
                className={`course_description${courseCtn ? " d-block" : ""}`}
              >
                {fetchedCourse?.description}
              </h4>
              {showButton && (
                <a
                  className="course-de-btn"
                  href="javascript:void(0)"
                  onClick={courseCtnHandle}
                >
                  {courseCtn ? "Show Less" : "Show More"}
                </a>
              )}

            <div className="my-3 flex gap-4">
              <button
                type="button"
                className={`toggle-button-file ${activeSection === 'files' ? 'active' : ''}`}
                onClick={() => setActiveSection('files')}
              >
                Files
              </button>
              <button
                type="button"
                className={`toggle-button-vid ${activeSection === 'videos' ? 'active' : ''}`}
                onClick={() => setActiveSection('videos')}
              >
                Videos
              </button>
            </div>

              
                
              
              {activeSection === 'files' && (
              <div className="files-section">
                <h5>Files</h5>
                <div className="file-wrapper">
                <button
                        
                        type="button"
                        className="pdf-btn"
                        onClick={() => handleFileClick()}
                      >
                        {fetchedCourse?.title }
                      </button>
                </div>
              </div>
              )}
              

              
                
              {activeSection === 'videos' && (
                <div className="videos-section mt-3">
                  <h5>Videos</h5>
                  <div className="file-wrapper">
                  <button
                        
                        type="button"
                        className="pdf-btn"
                        onClick={() => handleFileClick()}
                      >
                        {fetchedCourse?.title }
                      </button>
                  </div>
                </div>
              )}
              
            </Accordion.Body>
          </Accordion.Item>
      </div>
          </div>
          <Modal className="buy-course-modal" centered show={buyCourse}>
            <Modal.Body className="buy-course-modal-body">
              <div className="buy-course-modal-inner">
                <div className="video-ar-box">
                  {/* <Image
                    loader={myLoader}
                    // unoptimized
                    src={`${maincourse?.image}`}
                    width={336}
                    height={269}
                    alt="our-coues"
                  /> */}
                  
                </div>
                <h3>Contact DataPlay Team for unlocking this content</h3>

                <button
                  type="button"
                  className="btn-cutom btn-con-cus"
                  style={{ border: "2px solid #FF7468" }}
                  onClick={handleconnect}
                >
                  Contact Us{" "}
                  
                </button>
                <button
                  type="button"
                  className="btn-cutom btn-con-cus"
                  style={{ border: "2px solid #FF7468" }}
                  onClick={discordconnect}
                >
                  Join Us on Discord{" "}
                  
                </button>
                {/* <button
                  type="button"
                  className="btn-cutom btn-enroll"
                  style={{ border: "2px solid #FF7468" }}
                >
                  Mentor Guided Course: &nbsp;{" "}
                  <span>₹ 79{maincourse?.course_price_discounted}</span>
                  { <sup>
                    <del>{maincourse?.course_price}</del>
                  </sup> }
                </button> */}
                <button
                  className="modal-close-btn"
                  onClick={closeBuyCousrseHandler}
                ></button>
              </div>
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
};

export default CourseDescriptionLocked;

export async function getServerSideProps() {
  return {
    props: {}, // Will be passed to the page component as props
  }
}
