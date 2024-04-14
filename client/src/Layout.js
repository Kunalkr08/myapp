import React from 'react'
import { Link } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
    </div>
  )
}
