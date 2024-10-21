import React from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import getCourses from "../../lib/getCourses";
import { PageWrapper } from "../../components/common/PageWrapper/PageWrapper";
import { CourseCard } from "../../components/Courses/CourseCard";
import { IndustryLeaderSec } from "../../components/industry-leader";
const Courses = ({ courses }) => {

  return (
    <PageWrapper title={`Courses`} subtitle={``}>
      <div className="custom-container">
        <div className="course_cards_page">
          {/* <Slider {...settings}> */}
          {courses ? (courses.map((item, idx) => {
            return <CourseCard key={idx} {...item} />;
          })) : (
            <div className="text-center align-items-center d-flex justify-content-center w-100">Updating Courses Soon...</div>
          )}
          {/* </Slider> */}
        </div>
      </div>
{/*       <IndustryLeaderSec/> */}
    </PageWrapper>
  );
};

export default Courses;

export async function getServerSideProps() {
  try {
    const coursesData = getCourses();
    const [courses] = await Promise.all([
      coursesData,
    ]);
    return { props: { courses } };
  } catch (error) {
    console.log(error);
    return {
      props: {
        courses: []
      }
    };
  }
}
