import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import { auth } from '../../firebase'
import '../../utilities/stylesheets/Navbar.css'
import Hotflix from '../../utilities/pictures/Hotflix.png'


const Navbar = ({setSignIn}) => {
    const loggedInUser = useSelector(selectUser);
    const [show, setShow] = useState(false);

    const handleScroll = () => {
        if(window.scrollY > 100){
            setShow(true);
        } else{
            setShow(false);
        }
    }

    //To set the form on 'SignIn' on Navbar
    const handleSign = () => {
        setSignIn(true); 
    }

    const handleLogout = () => {
        auth.signOut();
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            setShow({});
          };
    }, [])

    return (
        <div className={`navbar ${show && 'navbar-black'}`}>
            <div className="navbar-content">
                
                <img className="navbar-img" src={Hotflix} alt="Netflix"/>
                <div className="navbar-buttons">
                    {loggedInUser && <button className="navbar-lang" onClick={handleLogout}><i class="fa fa-search" aria-hidden="true">Search</i></button>}
                    <button className="navbar-sign">  Subscribe </button>
                    {!loggedInUser && <button className="navbar-sign" onClick={handleSign}>Sign In</button>}
                    {loggedInUser && <button className="navbar-sign" onClick={handleLogout}>Logout</button>}
                </div>
            </div>   
        </div>
    )
}

export default Navbar
