import { NavLink } from "react-router-dom"

export const Error = ()=>{
    return(
        <>
        <section id="error-page">
            <div className=" content">
                <h2 className="header">404</h2>
                <h4>Sorry! Page not found</h4>
                <p>
                    Oops! It seems like the page you're trying to acess doesn't exist.
                    if you belive there's an issue, feel free to report it, and we'll
                    look into it.
                </p>
                <div className="btns">
                    <NavLink to="/">return home</NavLink>
                    <NavLink to ="/register">report problem</NavLink>
                </div>
            </div>
        </section>
        </>
    )
}