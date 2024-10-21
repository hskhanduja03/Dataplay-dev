import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  DISCORD_LINK,
  DISCORD_LINK_MESSAGE,
} from "../../utilities/constants";

const SocialBadge = () => {
  return (
    <div className="social-badge">
      
      <div className="social-icon">
        <Link href="https://wa.me/917427071631" target="_blank">
          <Image src="/assets/icons/whatsapp-logo.png" height={55} width={55} alt="wtsp-logo"/>
        </Link>
      </div>
    </div>
  );
};

export default SocialBadge;
