/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useRouteError } from "react-router-dom";
import errorImage from "../assets/404.png";
export default function Error() {
  return (
    <div style={styles.container}>
      <img style={styles.error} src={errorImage} />
      <button style={styles.button} ><a href="/home">Go To HomePage</a></button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  error : {
    objectFit: 'cover',
    width: 'fit-content',
    height: '600px',
  },
  button : {
    padding: '10px 20px',
    backgroundColor: 'deeppink',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    marginLeft: '30px',
  }
};
