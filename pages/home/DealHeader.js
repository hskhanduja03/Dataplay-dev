import Image from "next/image";
import { useState } from "react";
import BookNow from "../../components/models/BookNow";
import Router, { useRouter } from "next/router";
import {
  FaDiscord
} from "react-icons/fa";

const DealHeader = () => {
  const router= useRouter();
  const [open, setopen] = useState(false);
  return (
    <div className="offer-header-bar">
      <div className="container">
        <a href="https://discord.com/invite/WJUGhCw3KB">
        <h4 className="m-0">
        Join our Discord channel soon 
        <FaDiscord
              className="discord-logo-header"
              size={18}
            />  

          {/* <span className="purple fw-bold cursor-pointer" onClick={()=>setopen(true)}> Book Here</span> */}
        </h4>
        </a>
        
        
      </div>
      <BookNow open={open} onHide={setopen} />
    </div>
  );
};

export default DealHeader;
