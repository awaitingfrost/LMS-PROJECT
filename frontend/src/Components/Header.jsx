import { React, useState, useContext, Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import './Header.css'

import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@material-ui/icons/Clear';

import { AuthContext } from '../Context/AuthContext';

function Header() {

    const [menutoggle, setMenutoggle] = useState(false)
    const { user } = useContext(AuthContext);
    console.log(user, 'in context')
    const Toggle = () => {
        setMenutoggle(!menutoggle)
    }

    return (
        <div className="header">
            <div className="logo-nav">
                <Navigate to='/'>
                    <a href="#home">LIBRARY</a>
                </Navigate>
            </div>
            <div className='nav-right'>
                <ul className={menutoggle ? "nav-options active" : "nav-options"}>
                    <li className="option" >
                        {!user ?
                            <Navigate className='cursur-pointer' to='/signin'>
                                SignIn
                            </Navigate>
                            : <>
                            </>
                        }
                    </li>
                    {/* <li className='option'>
                        {
                            !user ?
                                <Navigate className='cursur-pointer' to="/books">
                                    Books
                                </Navigate>
                                : <></>
                        }
                    </li> */}
                </ul>
            </div>

            <div className="mobile-menu" onClick={() => { Toggle() }}>
                {menutoggle ? (
                    <ClearIcon className="menu-icon" style={{ fontSize: 40 }} />
                ) : (
                    <MenuIcon className="menu-icon" style={{ fontSize: 40 }} />
                )}
            </div>
        </div>
    )
}

export default Header
