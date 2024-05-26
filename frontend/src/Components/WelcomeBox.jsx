import React from 'react'
import './WelcomeBox.css'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

function WelcomeBox() {
    return (
        <div className='welcome-box'>
            <p className='welcome-title'>WELCOME TO LIBRARY</p>
            <p className='welcome-message'>Feed Your Brain<br />
                <span className='welcome-submessage'>Grab A Book To Read</span></p>
            <Link to={'/signin'}><button className='wel-btn' >Sign In</button></Link>
        </div>
    )
}

export default WelcomeBox
