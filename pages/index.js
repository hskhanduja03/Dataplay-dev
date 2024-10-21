"use client";
import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import getTestimonial from "../lib/getTestimonial";
import DealHeader from "./home/DealHeader";
import HomeBanner from "./home/HomeBanner";
import Services from "./home/Services";
import DataplayCources from "../components/DataplayCources";
import Mentors from "./home/Mentors";
import getCourses from "../lib/getCourses";
import getMentor from "../lib/getInstructors";
import OurStudentsSpeak from "../components/testimonial/OurStudentsSpeak";
import DataScience from "./home/DataScience";
import Interview from "./home/Interview";
import { useDispatch, useSelector } from "react-redux";
import LoginModel from "../components/models/LoginModel";
import { setLoginModel } from "../store/redux/genaralSlice";

const MockinterviewBooktest = ({ testimonials, courses, mentors }) => {
  const [open1, setopen1] = useState(false);
  const interviewRef = useRef(null);

  const dispatch = useDispatch();
  const toggleLoginModal = useSelector((state) => state.loginStatemodal);
  const { user, accessToken } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    // Check if the modal has already been shown
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (!hasVisited) {
      const token = accessToken;
      // If no access token and not visited before, show the login modal
      if (!token) {
        const timer = setTimeout(() => {
          setopen1(true);
          // Using flag in session storage
          sessionStorage.setItem('hasVisited', 'true');
        }, 5000);

        // Clear session on component unmounts
        return () => clearTimeout(timer);
      }
    }
  }, [accessToken]);

  useEffect(() => {
    if (router.asPath.includes('#interview-section')) {
      if (interviewRef.current) {
        interviewRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [router.asPath]);

  return (
    <>
      <DealHeader />
      <div className="home-page-header">
        <Header />
      </div>
      <HomeBanner />
      <Services />
      <DataScience />
      {courses ? <DataplayCources courses={courses} /> : null}
      <div ref={interviewRef}>
        <Interview />
      </div>
      <Mentors mentors={mentors} />
      <div className="home_testimonial">
        {<OurStudentsSpeak testimonials={testimonials} />}
      </div>
      <Footer />
      <LoginModel onHide={() => setopen1(false)} open={open1} />
    </>
  );
};

export default MockinterviewBooktest;

export async function getServerSideProps() {
  try {
    const testimonialData = getTestimonial();
    const courseData = getCourses();
    const mentorData = getMentor();
    const [testimonials, courses, mentors] = await Promise.all([
      testimonialData,
      courseData,
      mentorData,
    ]);
    return {
      props: { testimonials: testimonials, courses: courses, mentors: mentors },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { testimonials: [], courses: [], mentors: [] },
    };
  }
}
