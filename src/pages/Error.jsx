/* eslint-disable no-unused-vars */
import React from "react";
import { useRouteError } from "react-router-dom";
import errorImage from "../assets/error.jpg";
export default function Error() {
  return (
    <div style={styles.container}>
      <img style={styles.error} src={errorImage} />
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "2rem",
  },
  error : {
    height: "100vh",
    objectFit: 'cover',
    width : "100vw"
  }
};
