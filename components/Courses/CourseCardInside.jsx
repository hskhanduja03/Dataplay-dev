"use client";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/Card";
import { Badge } from "../ui/Badge";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Accordion, Modal } from "react-bootstrap";
import { DISCORD_LINK } from "../../utilities/constants";

export const CourseCardInside = ({
  id,
  image,
  tag = `DATA SCIENCE`,
  title,
  description,
  url,
  list,
}) => {
  const router = useRouter();
  function handleconnect(){
    console.log("switching");
    router.push('/contact')
  }

  function discordconnect(){
    router.push(DISCORD_LINK)
  }

  function closeBuyCousrseHandler() {
    setBuyCourse(false);
  }
  const [buyCourse, setBuyCourse] = useState(false);
  return (
    <>
        <Card>
      <CardHeader>
        <div className="course_card_header">
          <Image src={image} alt={title} width={300} height={200} />
          <Badge variant="gray" shape="pill">
            {tag}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="course_card_content">
          <h4>{ title}</h4>
          
          {/* <ul>
            {list.map((item, idx) => (
              <li key={idx}>{item.bullet}</li>
            ))}
          </ul> */}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => setBuyCourse(true)}
          variant="left_right_gradient"
        >
          Enroll in Live Sessions
        </Button>
      </CardFooter>
        </Card>
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
    
    
    
  );
};
