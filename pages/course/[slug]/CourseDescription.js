import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoginModel, setLastVisitedUrl } from "../../../store/redux/genaralSlice";
import FilePreviewModel from "../../../components/models/PreviewModel";
import LoginModel from "../../../components/models/LoginModel";
import getTestimonial from "../../../lib/getTestimonial";
import { Accordion } from "react-bootstrap";
import { IoLockOpen } from "react-icons/io5";
import axios from "axios";
import { useRouter } from 'next/router';
import Button from "../../../components/ui/Button";

const extensionToType = {
  pdf: "pdf",
  doc: "office",
  docx: "office",
  pptx: "office",
  jpg: "image",
  jpeg: "image",
  png: "image",
  mp4: "video",
  webm: "video",
  avi: "video",
  wmv: "video",
  mkv: "video",
};
function preventRightClick(e) {
  e.preventDefault();
  // Removed the alert from here
}

// Function to Restrict Use of webiste if DevTools are open
function detectDevTools2(redirectUrl) {
  const threshold = 100; 
  
  function checkDevTools() {
    const start = performance.now();
    
    // debugger;
    
    const end = performance.now();
    if (end - start > threshold) {
      window.location.href = redirectUrl; 
    }
  }
  
  setInterval(checkDevTools, 1000); // Check every second
}
function restrictConsole() {
  const warningMessage = 'This function is not allowed on this page.';
  let isDevToolsOpen = false;

  function preventDevTools() {
    if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function() {};
    }
  }

  function disableConsole() {
    const originalConsole = { ...console };
    Object.keys(originalConsole).forEach(key => {
      console[key] = () => originalConsole.warn(warningMessage);
    });
  }

  

  function detectDevTools() {
    const threshold = 160;
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    
    if ((widthThreshold || heightThreshold) && !isDevToolsOpen) {
      isDevToolsOpen = true;
    } else if (!(widthThreshold || heightThreshold) && isDevToolsOpen) {
      isDevToolsOpen = false;
    }
  }

  preventDevTools();
  disableConsole();
  document.addEventListener('contextmenu', preventRightClick);
  setInterval(detectDevTools, 1000);
}

function preventTextSelection() {
  document.body.style.userSelect = 'none';
  document.body.style.webkitUserSelect = 'none';
  document.body.style.msUserSelect = 'none';
  document.body.style.mozUserSelect = 'none';
}

const ContentDescription = ({ course, token, idx }) => {
  if (!course || !course.id) {
    return null; // or return a loading state or placeholder
  }
  const { user, accessToken } = useSelector((state) => state.auth);
  const router = useRouter();
  const contentRef = useRef(null);
  const [showButton, setShowButton] = useState(false);
  const [filePath, setFilePath] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [open, setOpen] = useState(false);
  const [courseCtn, setCourseCtn] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  // const [fetchedCourse, setFetchedCourse] = useState(null);
  const [activeSection, setActiveSection] = useState('files');

  const dispatch = useDispatch();

  function getFileType(fileName) {
    const filetp = getFileTypeFromFileName(fileName);
    setFileType(filetp);
    setFilePath(fileName);
    if (filetp && accessToken) {
      setOpen(true);
    } else {
      localStorage.setItem(
        "url_content",
        JSON.stringify({
          path: `https://api.dataplay.co.in${fileName}`,
          type: filetp,
        })
      );
      dispatch(setLoginModel(true));
    }
  }

  useEffect(() => {
   const cleanupFunction = restrictConsole();
     

    const handleKeyDown = (e) => {
      // Prevent F12 key
      if (e.keyCode === 123) {
        e.preventDefault();
        return false;
      }
      
      // Prevent Ctrl+Shift+I (Chrome, Firefox, Safari)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
        return false;
      }
      
      // Prevent Ctrl+Shift+J (Chrome)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        e.preventDefault();
        return false;
      }
      
      // Prevent Ctrl+Shift+C (Chrome)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
        e.preventDefault();
        return false;
      }

      // Prevent Ctrl+U (View Source)
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    const style = document.createElement('style');
    style.textContent = `
      * {
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
        user-drag: none;
      }
    `;
    document.head.appendChild(style);
    
    if (!course || !course.id) {
      console.error("Course or course ID is not available");
      return null;
    }

    /* Directly Passed Course Details as props from index page*/
    // const fetchCourseContent = async () => {
    //   try {
    //     const response = await axios.get(`https://api.dataplay.co.in/course/retrive_course_content/${course.id}`);
    //     setFetchedCourse(response.data);
    //     console.log("Fetched course content:  ", response.data);
        
    //   } catch (error) {
    //     console.error("Error fetching course content:", error);
    //   }
    // };

    // if (course && course.id) {
    //   fetchCourseContent();
    // }

    const cr_content = JSON.parse(localStorage.getItem("url_content"));
    if (accessToken === "0") {
      setLoginOpen(true);
    }
    if (cr_content && accessToken) {
      setFileType(cr_content.type);
      setFilePath(cr_content.path);
      localStorage.removeItem("url_content");
      setOpen(true);
    }

    const contentElement = contentRef.current;
    if (contentElement && contentElement.scrollHeight > contentElement.clientHeight) {
      setShowButton(true);
    }

    return () => {
      
      if (typeof cleanupFunction === 'function') {
        cleanupFunction();
      }
      
    };
  }, [course.id, accessToken]);

  function onHide() {
    setOpen(false);
  }

  function getFileTypeFromFileName(fileName) {
    const lastDotIndex = fileName.lastIndexOf(".");
    if (lastDotIndex !== -1) {
      const fileType = fileName.substring(lastDotIndex + 1);
      return extensionToType[fileType];
    } else {
      return "No file type found";
    }
  }

  function courseCtnHandle() {
    setCourseCtn(!courseCtn);
  }

  async function handleFileClick(fileUrl) {
    if (!accessToken || accessToken === "0") {
      
      const currentUrl = router.asPath;
      dispatch(setLastVisitedUrl(currentUrl));
      localStorage.setItem('lastVisitedUrl', currentUrl);
      setLoginOpen(true);
    } else {
      try {
        const currentUrl = router.asPath;
        dispatch(setLastVisitedUrl(currentUrl));
        localStorage.setItem('lastVisitedUrl', currentUrl);
        const filetp = getFileTypeFromFileName(fileUrl);
        if (filetp) {
          setFileType(filetp);
          setFilePath(fileUrl);
          setOpen(true);
        } else {
          console.log("File type not supported for inline view");
        }
      } catch (error) {
        console.error("Error handling file click:", error);
      }
    }
  }

  /* Check If dev tools are open on component mount */
  detectDevTools2('/');
  return (
    <>
      <LoginModel
        testimonials={[]}
        open={loginOpen}
        onHide={() => {
          setLoginOpen(false);
        }}
      />
      <FilePreviewModel
        open={open}
        onHide={onHide}
        file={filePath}
        type={fileType}
      />

      <div className="course-box">
        <Accordion.Item eventKey={`${idx}`}>
          <Accordion.Header>
            <div className="d-flex justify-content-start align-items-center gap-2">
              <IoLockOpen />
              <h3>{course?.title || "Course Title"}</h3>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <h4
              ref={contentRef}
              className={`course_description${courseCtn ? " d-block" : ""}`}
            >
              {course?.description || "Course Description"}
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
                {course?.files && course.files.length > 0 ? (
                  course.files.map((file, index) => (
                    <button
                      key={index}
                      type="button"
                      className="pdf-btn"
                      onClick={() => handleFileClick(file.files)}
                    >
                      {file.files.split("/").reverse()[0]}
                    </button>
                  ))
                ) : (
                  <p>No files available</p>
                )}
                </div>
              </div>
            )}

            {activeSection === 'videos' && (
              <div className="videos-section mt-3">
                <h5>Videos</h5>
                <div className="file-wrapper">
                {course?.video_link && course.video_link.length > 0 ? (
                  course.video_link.map((video, index) => (
                    <div className="vid-btn-container">
                        <img 
                          src={video.photo} 
                          width="150" 
                          height="90"
                          alt={video.title || "Video thumbnail"}
                          className="vid-thumbnail"
                        />
                        <button
                          key={index}
                          type="button"
                          className="vid-btn"
                          onClick={() => {
                            if (!accessToken || accessToken === "0") {
                              setLoginOpen(true);
                              dispatch(setLastVisitedUrl(router.asPath))
                            } else {
                              window.location.href = video.link; 
                            }
                          }}
                        >
                          {/* <Button
                            onClick={() => {
                              if (!accessToken || accessToken === "0") {
                                setLoginOpen(true);
                                dispatch(setLastVisitedUrl(router.asPath))
                              } else {
                                window.location.href = video.link; 
                              }
                            }}
                            variant="left_right_gradient"
                          >
                            Watch Here
                          </Button> */}
                        </button>
                      </div>
                  ))
                ) : (
                  <p>No videos available</p>
                )}
                </div>
              </div>
            )}
          </Accordion.Body>
        </Accordion.Item>
      </div>
    </>
  );
};

export default ContentDescription;

export async function getServerSideProps() {
  return {
    props: {}, // Will be passed to the page component as props
  }
}
