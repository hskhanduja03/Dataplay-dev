import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/Card";
import { UnderlineHeader } from "../ui/UnderlineHeader";
import Button from "../ui/Button";
import Logo from "../Logo/logo";
import { HeaderCard } from "../common/HeaderCard/header-card";
import { WELCOME } from "../../utilities/constants";

const DataScienceSec = () => {
  return (
    <div className="custom-container">
      <div className="welcome-grid">
        <HeaderCard {...WELCOME} />
        <div>
      
            <div className="video-responsive">
              <iframe
                width="853"
                height="480"
                src={`https://www.youtube.com/embed/fIJi1QNeUtU?si=-sTVBoiuCRgIgJXn`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
              />
            
            </div>
          
        </div>
      </div>
    </div>
  );
};

export default DataScienceSec;
