import { SectionHeader } from "../common/HeaderCard/section-header";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect, useRef} from "react";
import MentorModel from "../../components/models/MentorModel";
import MentorsDescription from "../../pages/home/MentorsDescription";
import { FaArrowRight, FaLinkedinIn } from "react-icons/fa";
import Image from "next/image";
import { MENTORS } from "../../utilities/constants";
import { MentorCard } from "./mentor-card";

export const MentorSec = ({ mentors }) => {
  const sliderRef = useRef(null);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    autoplay: true,
    slidesToScroll: 1,
    arrows: false,
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
  const [open, setOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(false);

  const handleMentorSelect = (data) => {
    setSelectedMentor(data);
    setOpen(true);
  };
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0);
    }
  }, [mentors]);

  return (
    <div className="custom-container">
      <SectionHeader
        underlineHeader={`Mentors`}
        title={`Our Mentors`}
        subtitle={`Guiding minds towards brilliance and success.`}
      />

      <div className="mentor-sec">
          {mentors && mentors.length > 0 ? (
            <div style={{ width: '100%', height: '300px' }}>
            <Slider ref={sliderRef} {...settings} className="mentor-slider">
              {mentors.map((item, idx) => (
                <MentorCard key={idx} {...item} />
              ))}
            </Slider>
            </div>
          ) : (
            <p>Loading mentors...</p>
          )}
      </div>
    </div>
  );
};
