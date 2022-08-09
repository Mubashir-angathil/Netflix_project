import React from 'react'
import './navBar.css'

function NavBar() {
  return (
    <div className='navbar'>
      <img className='netflix_logo' src='netflix_logo.svg' alt="Netflix logo" />    
      <img className='avatar' src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png" alt="Avatar"/>    
      <div className='options'>
          <h1 className='option'>home</h1>
          <h1 className='option'>TvShows</h1>
          <h1 className='option'>Movies</h1>
      </div>
    </div>
  )
}

export default NavBar;