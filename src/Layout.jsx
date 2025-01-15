import { Button, ButtonGroup, Chip } from '@mui/material';
import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function Layout({user, logout, admin}) {
  const { pathname } = useLocation();
  return (
    <>
      <div className='menu'>
        <div> 
          <ButtonGroup variant="contained" aria-label="Basic button group">
            <Link to="/"><Button variant={pathname == "/" ? "outlined" : "contained"}>Messages</Button></Link>
            <Link to="/users"><Button variant={pathname == "/users" ? "outlined" : "contained"}>Users</Button></Link>
            <Link to="/about"><Button variant={pathname == "/about" ? "outlined" : "contained"}>About</Button></Link>
          </ButtonGroup>
          {admin ? 
          <Link to="/admin"><Button className='admin' variant={pathname=='/admin' ? "outlined" : "contained"}>Admin</Button></Link> : ""}
        </div>
        {user ?
          <div className='email'>
            <Chip label={user.email} variant="outlined" />
            <Button variant="contained" onClick={logout}>Logout</Button>
          </div>
          : <Link to="/login"><Button variant={pathname == "/login" ? "outlined" : "contained"}>Login</Button></Link>
        }
      </div>
      <div className='page'>
        <Outlet />
      </div>
    </>
  )
}
