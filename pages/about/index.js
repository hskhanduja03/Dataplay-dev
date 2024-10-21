"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Footer from "../../components/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DealHeader from "../home/DealHeader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { OurTeamSec } from "../../components/our-team";
import { PageWrapper } from "../../components/common/PageWrapper/PageWrapper";
import { ABOUT_CONTENT, GALLERY } from "../../utilities/constants";
import { SectionHeader } from "../../components/common/HeaderCard/section-header";
import { ImageCard } from "../../components/common/image-card";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FaCross, FaWindowClose } from "react-icons/fa";

const AboutUs = () => {
  const [gallery, setGallery] = useState([]);
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get(
          "https://api.dataplay.co.in/gallery/workshop_gallery/"
        );
        setGallery(response.data);
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      }
    };

    fetchGallery();
  }, []);
  const CustomArrow = ({ direction, onClick }) => {
    const [arrowMargin, setArrowMargin] = useState("-30px");

    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 700) {
          setArrowMargin("-10px");
        } else {
          setArrowMargin("-30px");
        }
      };

      // Set initial value
      handleResize();
      // Add event listener
      window.addEventListener("resize", handleResize);

      // Cleanup event listener on component unmount
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
      <div
        onClick={onClick}
        className={`custom-arrow custom-arrow-${direction}`}
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 2,
          cursor: "pointer",
          [direction]: arrowMargin, // Use dynamic margin
          background: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
          borderRadius: "50%", // Circular shape
          padding: "10px 12px", // Padding for click area
        }}
      >
        {direction === "left" ? (
          <MdKeyboardArrowLeft className="text-white" />
        ) : (
          <MdKeyboardArrowRight className="text-white" />
        )}
      </div>
    );
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
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

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedText, setSelectedText] = useState(null);

  const openModal = (image, text) => {
    setSelectedImage(image);
    setSelectedText(text);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };
  return (
    <>
      <PageWrapper title={"About Us"}>
        <div className="about-sec">
          <div className="about-content custom-container">
            <div className="row">
              <div className="col-md-8 ps-5 p-5">
                <h1>Your Compass On The Data Science Journey.</h1>
                {ABOUT_CONTENT.map((item, idx) => (
                  <p key={idx}>{item}</p>
                ))}
              </div>

              <div className="col-md-4 ">
                <div className="image-wrapper">
                  <Image
                    alt="Founders"
                    src="/logo_about.jpg"
                    width={500}
                    height={400}
                    layout="responsive"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="apply"></div>
        </div>

        <div className="apply d-lg-flex justify-content-end py-5 mt-5 position-relative ">
          <div className="col-lg-4 ps-5 ms-5 d-lg-flex d-none justify-content-lg-center justify-content-start">
            <Image
              alt="hey"
              src="/apply.png"
              className="img-fluid position-absolute "
              style={{ bottom: 4 }}
              width={400}
              height={400}
            />
          </div>
          <div className="col-lg-8 col-12 ms-xl-0 ms-lg-5 ps-5">
            <h1 className="text-white fw-bolder display-5">Who can apply?</h1>
            <h3 className="text-white my-1">
              Absolutely{" "}
              <span className="ms-2 me-2 position-relative text-white">
                <span
                  className="pe-3"
                  style={{ zIndex: 10, position: "relative" }}
                >
                  EVERYONE!
                </span>
                <Image
                  src="/everyone-vector.svg"
                  alt="Logo"
                  className="position-absolute img-fluid "
                  style={{ left: "-8px", top: "-5px" }}
                  width={180}
                  height={70}
                />
              </span>{" "}
              All Backgrounds, All Levels.
            </h3>
            <p className="mt-3 text-white small">
              Whether you're a high school goer, college explorer, or industry
              expert, DataPlay is your <br /> learning playground!
            </p>
            <div className="bg-outer rounded-pill bg-purple mt-4 pt w-fit cursor-pointer">
              <div
                className="bg-inner rounded-pill py-1"
                style={{ backgroundColor: "#FF4C3D" }}
              >
                <a
                  className="m-0 px-4 text-white fw-medium py-2 h6"
                  href="/contact"
                >
                  <small>Contact Us</small>
                </a>
              </div>
            </div>
          </div>
          <div className="d-lg-none d-flex justify-content-lg-center justify-content-center">
            <Image
              src="/apply.png"
              className="img-fluid"
              style={{ marginBottom: "-12px" }}
              width={400}
              height={400}
              alt="hey"
            />
          </div>
        </div>
        <section className="container my-5">
          <SectionHeader
            underlineHeader={`OUR GALLERY`}
            title={`Our Gallery`}
            subtitle={"Visualizing knowledge through our gallery."}
          />
          <Slider {...settings} className="pt-3">
            {gallery?.map((val, index) => {
              const isFocused =
                index === currentSlide + 1 ||
                (index === 0 && currentSlide === gallery.length - 1);
              const topImage = gallery[index];
              // Determine the image for the bottom row with an offset of 3
              const bottomImage = gallery[(index + 3) % gallery.length];

              return (
                <>
                  <div
                    key={index}
                    className={`p-3 slider-item ${
                      isFocused ? "focused" : "non-focused"
                    }`}
                    onClick={() =>
                      openModal(topImage.image, topImage.event_name)
                    }
                  >
                    <div className="rounded-5 bg-outer">
                      <div className="p-3">
                        <div
                          className="our-img-card position-relative d-flex align-items-center justify-content-center 
                        w-full sm:w-64 md:w-80 lg:w-96"
                          style={{
                            height: "200px",
                            backgroundColor: "#000",
                            overflow: "hidden",
                            borderRadius: "15px",
                          }}
                        >
                          <Image
                            src={topImage.image || "/default-image.png"}
                            alt={topImage.event_name || "Gallery image"}
                            width={400}
                            height={300}
                            style={{
                              objectFit: "contain", // Ensures the image is contained within the box
                              maxWidth: "100%",
                              maxHeight: "100%",
                              display: "block",
                            }}
                          />
                        </div>

                        <div className="courses-content ms-1">
                          <h6
                            className="purple fw-bold my-2 mt-4"
                            style={{ fontSize: 18 }}
                          >
                            {topImage.event_name}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    key={index}
                    className={`p-3 slider-item ${
                      isFocused ? "focused" : "non-focused"
                    }`}
                    onClick={() =>
                      openModal(bottomImage.image, bottomImage.event_name)
                    }
                  >
                    <div className="rounded-5 bg-outer">
                      <div className="p-3">
                        <div
                          className="our-img-card position-relative d-flex align-items-center justify-content-center 
                        w-full sm:w-64 md:w-80 lg:w-96"
                          style={{
                            height: "200px",
                            backgroundColor: "#000",
                            overflow: "hidden",
                            borderRadius: "15px",
                          }}
                        >
                          <Image
                            src={bottomImage.image || "/default-image.png"}
                            alt={bottomImage.event_name || "Gallery image"}
                            width={400}
                            height={300}
                            style={{
                              objectFit: "contain", // Ensures the image is contained within the box
                              maxWidth: "100%",
                              maxHeight: "100%",
                              display: "block",
                            }}
                          />
                        </div>

                        <div className="courses-content ms-1">
                          <h6
                            className="purple fw-bold my-2 mt-4"
                            style={{ fontSize: 18 }}
                          >
                            {bottomImage.event_name}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </Slider>

          {isModalOpen && (
            <>
              <div
                className="modal-overlay"
                onClick={closeModal}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1000,
                }}
              >
                <div
                  className="modal-content p-3"
                  style={{
                    position: "relative", // Set relative positioning for child elements
                    width: "90%", // Set width to 90% for responsiveness
                    maxWidth: "600px", // Maximum width
                    height: "90%", // Set height to 90% for responsiveness
                    maxHeight: "600px", // Maximum height
                    backgroundColor: "#000",
                    borderRadius: "10px",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
                >
                  <p className="text-white text-md" style={{zIndex:'1000'}}>{selectedText}</p>
                  {/* Close Button */}
                  <div
                    className="absolute"
                    style={{
                      position: "absolute",
                      top: "10px", // Adjust as needed
                      right: "10px", // Adjust as needed
                      cursor: "pointer",
                      zIndex: 1001, // Make sure it's above modal content
                    }}
                    onClick={closeModal}
                  >
                    <FaWindowClose className="text-white" size={24} />{" "}
                    {/* Adjust size as needed */}
                  </div>

                  {/* Image Display */}
                  <Image
                    src={selectedImage || "/default-image.png"}
                    alt="Enlarged gallery image"
                    width={600}
                    height={600}
                    style={{
                      objectFit: "contain",
                      maxWidth: "100%",
                      maxHeight: "100%",
                    }}
                  />
                </div>
              </div>
            </>
          )}

          {/* Earlier gallery module*/}
          {/*<div className="gallery">
            <div className="gallery-item">
              {gallery.map((item, idx) => {
                return idx < 2 ? (
                  <ImageCard
                    src={item.image}
                    width={300}
                    height={400}
                    alt="gallery pics"
                    date={item.event_name}
                    key={idx}
                  />
                ) : null;
              })}
            </div>
            <div className="gallery-item">
              {gallery.map((item, idx) => {
                return idx >= 2 && idx < 5 ? (
                  <ImageCard
                    src={item.image}
                    width={300}
                    height={400}
                    key={idx}
                    alt="gallery pics"
                    date={item.event_name}
                  />
                ) : null;
              })}
            </div>
            <div className="gallery-item">
              {gallery.map((item, idx) => {
                return idx >= 5 ? (
                  <ImageCard
                    src={item.image}
                    width={300}
                    key={idx}
                    height={400}
                    alt="gallery pics"
                    date={item.event_name}
                  />
                ) : null;
              })}
            </div>
          </div> */}
          {/* <div className="d-flex flex-column align-items-center">
            <div className="bg-lightpurple px-3 py-1 fw-semibold mt-5 text-white rounded-pill w-fit">
            OUR GALLERY
            </div>
            <h2 className="fw-bolder h1 mt-2 ">Our Gallery</h2>
            <p className="fw-medium mb-4">
              Visualizing knowledge through our gallery.
            </p>
          </div>
          <div className="d-xl-flex d-none flex-wrap cursor-pointer ">
            {gallery?.map((val, index) => {
              return (
                <div
                  key={index}
                  className="col-xl-3 col-lg-4 col-md-6 col-12 p-3"
                  data-aos="fade-up"
                >
                  <div
                    className="rounded-5 bg-outer"
                    style={{
                      backgroundColor: `${
                        index == 0
                          ? "#8073E5"
                          : index % 2 == 0
                          ? "#1D164F"
                          : index % 3 == 1
                          ? "#FF4C3D"
                          : "#005F81"
                      }`,
                    }}
                  >
                    <div
                      className="bg-inner bg-white rounded-5 p-3"
                      style={{
                        border: `${
                          index == 0
                            ? "1px solid #8073E5"
                            : index % 2 == 0
                            ? "1px solid #1D164F"
                            : index % 3 == 1
                            ? "1px solid #FF4C3D"
                            : "1px solid #005F81"
                        }`,
                      }}
                    >
                      <div className="our-img-card position-relative ">
                        <div
                          className="position-absolute d-flex justify-content-between align-items-center w-100 ps-1"
                          style={{ bottom: "-10px" }}
                        >
                          <div
                            className="bg-outer rounded-pill"
                            style={{
                              backgroundColor:
                                index % 2 == 0 ? "#CD9607" : "#1C1A4A",
                            }}
                          >
                            <div
                              className="bg-inner rounded-pill py-1 text-white px-3 fw-medium"
                              style={{
                                backgroundColor:
                                  index % 2 == 0 ? "#FFC224" : "#8073E5",
                              }}
                            >
                              25-June-2024
                            </div>
                          </div>
                        </div>
                        <Image
                          src="/blog1.png"
                          width={100}
                          height={190}
                          alt="our-couese"
                          className="w-100"
                        />
                      </div>
                      <div className="courses-content ms-1">
                        <h6
                          className="purple fw-bold my-2 mt-4"
                          style={{ fontSize: 18 }}
                        >
                          Data Science And Analytics Foundation Course
                        </h6>
                        <div className="d-flex justify-content-between align-items-center text-black-50 ">
                          <div className="fw-medium">
                            <FaLocationDot className="me-1 mb-1" />
                            <small>Rothak, India</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div> */}
        </section>
        <OurTeamSec />
      </PageWrapper>
    </>
  );
};

export default AboutUs;
