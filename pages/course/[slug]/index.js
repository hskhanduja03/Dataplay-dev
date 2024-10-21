import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Image from "next/image";
import getTestimonial from "../../../lib/getTestimonial";
import Footer from "../../../components/Footer";
import getCourses from "../../../lib/getCourses";
import { getCoursContent } from "../../../lib/client/clientApis";
import { FcGoogle } from "react-icons/fc";
import dynamic from "next/dynamic";
import Link from "next/link";
import OurStudentsSpeak from "../../../components/testimonial/OurStudentsSpeak";
import DealHeader from "../../home/DealHeader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import courseResponse from "../../../lib/courseResponse";
import { CourseCard } from "../../../components/Courses/CourseCard";
import { CourseCardInside } from "../../../components/Courses/CourseCardInside";
import { FaCheck } from "react-icons/fa6";
import { COURSE_INCLUDE } from "../../../utilities/constants";
import { Accordion } from "react-bootstrap";
import axios from "axios";
import Loader from "../../../components/Loader";
import useDocumentTitle from "../../../Hooks/UseDocumentTitle";

/*Make SSR true for CourseDescription Component */
const ContentDescription = dynamic(() => import("./CourseDescription"), {
  ssr: true,
});

const ContentDescriptionLocked = dynamic(
  () => import("./CourseDescriptionLocked"),
  { ssr: false }
);
const CourseDetailPage = ({ testimonials, slug, fetchedCourse }) => {
  const [maincourse, setMaincourse] = useState(null);

  const [showMore, setShowMore] = useState("");
  const [token, setToken] = useState("");
  const myLoader = ({ src }) => {
    return `${src}`;
  };

  useDocumentTitle(maincourse ? `Dataplay | ${maincourse?.title}` : "");

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    autoplay: true,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // console.log(`maincourse`, maincourse);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setToken(accessToken);
    }

    const fetchCourseContent = async () => {
      if (slug) {
        try {
          const courseData = await getCourseContent(slug);
          setMaincourse(courseData);
        } catch (error) {
          console.error("Error fetching course content:", error);
        }
      }
    };

    fetchCourseContent();
  }, [slug]);

  function viewCourseHandler() {
    setViewCourse(true);
  }
  const showMoreData = (length) => {
    setShowMore(!showMore);
  };
  if (!maincourse) {
    return <Loader />;
  }
  const courseLearnig = maincourse?.learn?.replace("\r", "").split("\n");
  const courseRequireMent = maincourse?.requirements
    ?.replace("\r", "")
    .split("\n");
  return (
    <>
      <DealHeader />
      <div className="home-page-header">
        <Header />
      </div>
      <div className="pt-5 pb-4"></div>
      <div className="course-detail-banner justify-content-center px-5 d-flex flex-column ">
        <div className="course-detail custom-container">
          <p className="">
            Home {" >  "}
            <span className="pink">{maincourse?.title}</span>
          </p>
          <h1 className="">{maincourse?.title}</h1>
          <p>{maincourse?.description}</p>
          {/* <p>
            Instructor:{" "}
            {maincourse?.instructors.map((item, idx) => (
              <span key={idx}>
                <b>{item} </b>
              </span>
            ))}
          </p> */}
        </div>
        <div className="course-detail-card">
          <CourseCardInside {...maincourse} />
        </div>
      </div>
      <div className="course-wrapper">
        <div className="custom-container mt-3">
          <div className="course-info-container">
            <div className="course-details">
              <div className="learn-section">
                <h4>What you will learn:</h4>

                <span className="course-detail-learn">
                  <FaCheck size={25} />
                  <p>{maincourse?.learn}</p>
                </span>
              </div>
              <div className="requirements-section">
                <h4>Requirements:</h4>
                <div className="course-detail-req">
                  <ul>
                    <li>{maincourse?.requirements}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="custom-container mt-3">
        <h4>This course includes:</h4>
        <div className="course-detail-includes">
          {COURSE_INCLUDE.map((item, idx) => (
            <span key={idx} className="course-detail-learn">
              <Image src={item.img} alt={item.title} height={30} width={30} />
              <p>{item.title}</p>
            </span>
          ))}
        </div>
      </div>

      {
        <section className="course-detail-page-content">
          <div className="container">
            <div className="d-lg-flex">
              <div className="col-lg-6">
                {maincourse.contents.length ? (
                  <div
                    className="what-learn-card course-content anchor"
                    id="course_content"
                  >
                    <div className="d-flex align-items-center justify-content-between course-header">
                      <h3>Course Content</h3>
                      <h4 className="lectures-count">
                        {maincourse.contents.length} Lectures
                        <span>{maincourse.course_duration} Hours</span>
                      </h4>
                    </div>

                    <div className="course-list">
                      <Accordion
                        className="border border-0"
                        defaultActiveKey="1"
                      >
                        {fetchedCourse && fetchedCourse.length > 0 && (
                          <>
                            {maincourse.is_purched ? (
                              // If course is purchased, render all contents using ContentDescription
                              fetchedCourse.map((course_test, index) => (
                                <ContentDescription
                                  token={token}
                                  course={course_test}
                                  key={index}
                                  idx={index}
                                />
                              ))
                            ) : (
                              // If course is not purchased, render based on is_free
                              <>
                                {/* Free content */}
                                {fetchedCourse
                                  .filter(
                                    (course_test) =>
                                      course_test &&
                                      course_test.id &&
                                      course_test.is_free
                                  )
                                  .map((course_test, index) => (
                                    <ContentDescription
                                      token={token}
                                      course={course_test}
                                      key={index}
                                      idx={index}
                                    />
                                  ))}
                              </>
                            )}
                          </>
                        )}
                      </Accordion>
                    </div>
                    {maincourse.contents.length > 1 && (
                      <div className="show-more-learn">
                        <button
                          className={`show-btn${showMore ? " show-less" : ""}`}
                          onClick={() =>
                            showMoreData(maincourse.contents.length)
                          }
                        >
                          {showMore ? "Show less" : "Show more"}
                        </button>
                        {showMore ? (
                          <Accordion
                            className="border border-0   mt-3"
                            defaultActiveKey="0"
                          >
                            <>
                              {/* Locked content with show more/less functionality */}
                              {showMore
                                ? fetchedCourse
                                    .filter(
                                      (course_test) =>
                                        course_test && !course_test.is_free
                                    )
                                    .map((course_test, index) => (
                                      <ContentDescriptionLocked
                                        course={course_test}
                                        maincourse={maincourse}
                                        key={index}
                                        idx={index}
                                      />
                                    ))
                                : fetchedCourse
                                    .filter(
                                      (course_test) =>
                                        course_test && !course_test.is_free
                                    )
                                    .slice(0, 2)
                                    .map((course_test, index) => (
                                      <ContentDescriptionLocked
                                        course={course_test}
                                        maincourse={maincourse}
                                        key={index}
                                        idx={index}
                                      />
                                    ))}
                            </>
                          </Accordion>
                        ) : (
                          ""
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  !maincourse.contents?.length && (
                    <section className="coming-soon-page">
                      <div className="container">
                        <h3>
                          <span className="light-coming">Coming</span>{" "}
                          <span>Soon</span> !
                        </h3>
                      </div>
                    </section>
                  )
                )}
              </div>
            </div>
          </div>
        </section>
      }

      {testimonials && <OurStudentsSpeak testimonials={testimonials} />}
      <Footer />
    </>
  );
};

export default CourseDetailPage;

const getCourseContent = async (slug) => {
  try {
    const response = await axios.get(
      `https://api.dataplay.co.in/course/retrive_course_with_contents/${slug}/`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export async function getServerSideProps({ params }) {
  const testimonialData = await getTestimonial();

  /*Use SSR for content's files */
  let fetchedCourse = [];

  try {
    const response = await axios.get(
      `https://api.dataplay.co.in/course/retrive_course_with_contents/${params.slug}`
    );
    const contentsArray = response.data.contents;

    const fetchedCourseDetails = await Promise.all(
      contentsArray.map(async (content) => {
        const data = await axios.get(
          `https://api.dataplay.co.in/course/retrive_course_content/${content.id}`
        );
        return data.data;
      })
    );

    fetchedCourse = fetchedCourseDetails;
  } catch (error) {
    console.error("Error fetching course content:", error);
  }
  return {
    props: {
      testimonials: testimonialData,
      slug: params.slug,
      fetchedCourse,
    },
  };
}
