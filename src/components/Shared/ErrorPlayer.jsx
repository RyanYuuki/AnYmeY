import React from 'react'
import ErrorImage from '../../assets/error.gif';
import './ErrorPlayer.css'
function ErrorPlayer() {
  return (
    <div className='error-player' >
        <img src={ErrorImage} alt="" />
        <h1>Looks like this episode got lost in the anime universe.</h1>
    </div>
  )
}

export default ErrorPlayer