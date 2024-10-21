"use client";
import Image from "next/image";
import Link from "next/link"; // Import Link component
import { Card, CardContent, CardFooter, CardHeader } from "../ui/Card";
import { Badge } from "../ui/Badge";
import Button from "../ui/Button";

export const CourseCard = ({
  id,
  image,
  tag = `DATA SCIENCE`,
  title,
  description,
  url,
  list,
}) => {
  return (
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
          <h4>{title}</h4>
          {/* <ul>
            {list.map((item, idx) => (
              <li key={idx}>{item.bullet}</li>
            ))}
          </ul> */}
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/course/${id}`} passHref>
          <Button variant="left_right_gradient">
            View Course
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
