"use client";
import { useRouter } from "next/navigation";
import Button from "../../ui/Button";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/Card";
import { UnderlineHeader } from "../../ui/UnderlineHeader";
import BookNow from "../../models/BookNow";
import { useState } from "react";

export const HeaderCardTwo = ({ header, subheader, paras, cta }) => {
  const router = useRouter();
  const [open, setopen] = useState(false);
  return (
    <>
        <div>
      <Card variant="ghost">
        <CardHeader>
          <UnderlineHeader header={header} />
          <h3>{subheader} <span className="purple fw-bold cursor-pointer"> @Free</span></h3>
        </CardHeader>
        <CardContent>
          {paras.map((item, idx) => (
            <p key={idx}>{item.para}</p>
          ))}
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSdydjjWl_fAmlS9wu1BCvIJp5iQkfkL0rKZ54wqlncmXqUjSA/viewform', '_blank', 'noopener,noreferrer')}
            variant="rounded_sq_violet"
          >
            {cta.title}
          </Button>
        </CardFooter>
      </Card>
    </div>
    <BookNow open={open} onHide={setopen} />

    </>
    
  );
};
