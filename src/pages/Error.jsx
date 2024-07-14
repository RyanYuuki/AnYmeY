/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useRouteError } from "react-router-dom";
import errorImage from "../assets/error.gif";
import './css/Error.css';
export default function Error() {
  return (
    <div className="error-body">
      <img src={errorImage} alt="" />
      <h1>Sorry, The content you are looking for is Unavailable.</h1>
      <h1>Please Try again Later</h1>
      <a href="/anime/home/"><button className="error-button" >Go To HomePage</button></a>
    </div>
  );
}
