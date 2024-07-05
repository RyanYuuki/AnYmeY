import React from 'react'
import { useRouteError } from 'react-router-dom'

export default function Error() {
    const error = useRouteError();
  return (
    <div style={{ height: '100%', width: '100%', backgroundImage: 'url(../assets/error.jpg)', backgroundSize: 'cover' }} >
        <h1>Error: {error?.message || 'Something went wrong'}</h1>
        <p>Please go back to the home page and try again.</p>
    </div>
  )
}
