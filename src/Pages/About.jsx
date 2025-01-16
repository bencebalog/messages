import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className='about'>
        <p><b>Messages v1.0.0</b></p>
        <p>
          temus gmail oldal
        </p>
        <ul>
          <li> <Link to="/login">Login</Link>:  bejelentkezés</li>    
          <li> <Link to="/users">Users</Link>:  felhasználók megtekintése</li>
          <li> <Link to="/">Messages</Link>:  üzenetek</li>
        </ul>
    </div>
  )
}
