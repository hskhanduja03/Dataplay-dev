import React, { useState, useEffect } from 'react';
import Image from "next/image";
import axios from 'axios';
import { SectionHeader } from "../common/HeaderCard/section-header";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/Card";
import IndustrialModel from '../models/IndustrialModel';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const IndustryLeaderSec = () => {
  const [industryLeaders, setIndustryLeaders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchIndustryLeaders = async () => {
      try {
        setIsLoading(true);
        // Replace 'YOUR_API_ENDPOINT' with the actual endpoint
        const response = await axios.get('https://api.dataplay.co.in/gallery/course_feedback/');
        setIndustryLeaders(response.data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch industry leaders');
        setIsLoading(false);
      }
    };

    fetchIndustryLeaders();
  }, []);

  const handleTestimonialSelect = (data) => {
    setSelectedTestimonial(data);
    setOpen(true);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    autoplay: false,
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="custom-container my-5">
      <SectionHeader
        underlineHeader={`INDUSTRY LEADERS`}
        title={`Backed by Industry leaders`}
        subtitle={"Top professionals recommend our courses to all aspirants"}
      />
      <div className="industry_leader">
        <Slider {...settings} className="mentor-slider">
          {industryLeaders.map((item, idx) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="leader-avatar">
                  <Image
                    src={item.photo}
                    alt={item.name}
                    height={100}
                    width={100}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div style={{ marginTop: '1rem' }}>
                  <h4 className="leader-name">{item.name}</h4>
                  <div className="leader-info" style={{ marginTop: '1rem' }}>
                    <p className="leader-designation">{item.designation}</p>
                    <Image
                      quality={70}
                      src={item.company_logo}
                      alt={item.name}
                      height={10}
                      width={20}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="leader-comment" style={{ marginTop: '2rem' }}>
                  {item.content.slice(0, 100)}
                  {item.content.length > 100 && (
                    <span
                      className="review-read-more"
                      onClick={() => handleTestimonialSelect(item)}
                    >
                      ...Read More
                    </span>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </Slider>
      </div>
      <IndustrialModel
        open={open}
        onHide={() => setOpen(false)}
        testimonial={selectedTestimonial}
      />
    </section>
  );
};