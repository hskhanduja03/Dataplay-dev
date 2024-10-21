"use client";
import Image from "next/image";
import { useState } from "react";
import { Card } from "../ui/Card";
import Button from "../ui/Button";
import { FaLinkedin } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "../../utilities/constants";
import TestimonialModel from "../models/TestimonialModel";
import MentorModel from "../models/MentorModel";

export const MentorCard = ({ profile_pic, user, Designation, bio, linkedin, education }) => {
  const props = {
    profile_pic,
    user,
    Designation,
    bio,
    linkedin,
    education,
  };
  // const img = `${profile}`
  const [open, setOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const handleTestimonialSelect = (data) => {
    setSelectedTestimonial(data);
    setOpen(true);
  };
  const router = useRouter();
  console.log();
  return (
    <>
      <div className="mentor_card">
        <div className="mentor_card-grid">
          { <div className="mentor_profile">
            {  <Image className="mentor_image" alt="mentor-img" src={profile_pic} width={7} height={100}  /> }
          </div> }
          <div className="mentor_detail">
            <Card  className="mentor-info">
              <h3>{user.first_name + " " +user.last_name}</h3>
              <p>{Designation}</p>
              <p>{education}</p>
            </Card>
            <p className="mentor_bio desktop-only">
            {bio.slice(0, 100)}
                {bio.length > 100 && (
                  <span
                    className="review-read-more"
                    onClick={() => handleTestimonialSelect(props)}
                  >
                    ...Read More
                  </span>
                )}
            </p>
            <Button variant="rounded_sq_red" onClick={() => router.replace(linkedin)}>
              <FaLinkedin />
              <span>View Profile</span>
            </Button>
          </div>
        </div>
      </div>
      
    <MentorModel 
    open={open}
    onHide={() => setOpen(false)}
    mentor={selectedTestimonial}/>
    </>
    
  );
};
