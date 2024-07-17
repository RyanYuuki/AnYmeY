import React from "react";
import "../Styling/Footer.css";
import Logo from "../../assets/WebIcon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="logo-container">
          <h1 className="logo">
            An<span>Y</span>meY
          </h1>
          <p>
            All media that you see on the website is not hosted by AnymeX, they
            are all hosted on third party sources AnymeY is merely using those.
          </p>
        </div>
        <div className="social-media">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faX} />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a
            href="https://www.discord.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faDiscord} />
          </a>
        </div>
      </div>
      <div className="footer-info">
        <p>© 2024 AnymeY | Made With Love ❤️</p>
        <div className="footer-container">
          <p>I mean it's not the best, but it's something </p>{" "}
          <span>- Ryan Yuuki</span>
        </div>
      </div>
    </div>
  );
};
