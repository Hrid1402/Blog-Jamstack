import React from 'react'
import {Link} from 'react-router-dom'

function NotFound() {
  return (
    <>
      <h1>404</h1>
      <h1>Oops! Looks like you’re lost at sea 🌊</h1>
      <h2>The page you’re looking for doesn’t exist.</h2>
      <Link to={"/"}><h2>🏠 Go back home</h2></Link>
    </>
  )
}

export default NotFound