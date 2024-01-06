import { NavLink  } from "react-router-dom"; /*navlink is used 
to remove the loading of a page on the website. we need to remove the <a to=""/> and put <Navlink to =""/>
*/
import { RiLoginCircleFill } from "react-icons/ri";
import { GiArchiveRegister } from "react-icons/gi";
import { RiAdminFill } from "react-icons/ri";
import "./Navbar.css"
// import { useAuth } from "../store/auth";

export const Navbar = () =>{
    // const {isLoggedIn} = useAuth()
    
    return(
        <>
        <header>
            <div className="container">
                <div className="logo-brand">
                    <NavLink to="/">DASHBOARD</NavLink>
                </div>

                <nav>
                    <ul>
                        <li><NavLink to="/"><RiAdminFill />ADMIN</NavLink></li>
                        {/* <li><NavLink to="/logout">Logout</NavLink></li> */}
                        {/* <li><NavLink to="/update">Update</NavLink></li> */}
                        <li><NavLink to="/register"> <GiArchiveRegister />Sign up</NavLink></li>
                        <li><NavLink to="/login"> <RiLoginCircleFill />Login</NavLink></li>



                        {/* {isLoggedIn ? (<li>
                            <NavLink to="/logout">Logout</NavLink>
                        </li>) : (
                        <>
                        <li>
                            <NavLink to="/register">Sign up</NavLink>
                        </li>
                        <li>
                            <NavLink to="/login">Login</NavLink>
                        </li>
                        </>)} */}
                        
                    </ul>
                </nav>
            </div>
        </header>
        </>
    )
}