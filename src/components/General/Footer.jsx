import React from "react";
import "../Styling/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faFacebook,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="logo-container">
          <h1 className="logo">
            An<span>Y</span>meY
          </h1>
          <p>
            Anime and Manga streaming platform, featuring a wide variety of
            shows and movies.
          </p>
          <div className="social-media">
            <a
              href="https://www.twitter.com/RyanYuuki2"
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
            <a
              href="https://www.github.com/RyanYuuki/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
        </div>
        <div className="footer-common">
          <div className="Product">
            <h4>Product</h4>
            <a href="">Features</a>
            <a href="">Support</a>
            <a href="">Changelog</a>
          </div>
          <div className="Pages">
            <h4>Pages</h4>
            <a href="/" className="footer-nav-link">
              Home
            </a>
            <a href="/anime" className="footer-nav-link">
              Anime
            </a>
            <a href="/manga" className="footer-nav-link">
              Manga
            </a>
          </div>
          <div className="Help">
            <h4>Help</h4>
            <a href="">Terms and Services</a>
            <a href="/about" className="footer-nav-link">
              About
            </a>
            <a href="/contact" className="footer-nav-link">
              Contact
            </a>
          </div>
        </div>
      </div>
      <div className="footer-info">
        <p>© 2024 AnymeY | Made With Love ❤️</p>
        <div className="footer-container">
          <p>I mean it's not the best, but it's something </p>{" "}
          <span>- Ryan Yuuki</span>
        </div>
      </div>
    </footer>
  );
};
