import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
const URL = "http://localhost:3000/api/auth/register"

export const Register = () =>{
    const[user , setUser] = useState({
        username:"",
        email:"",
        phone:"",
        password:"",
        gender : "",
        hearAboutUs:"",
        city:"",
        state:""
    })
    const navigate = useNavigate();
    const {storeTokenInLS} = useAuth()
     

    //handling input values
    const handleInput = (e) =>{
        console.log(e)
        let name = e.target.name
        let value = e.target.value

        setUser({
            ...user,
            [name]:value,
        })
    }

    //handling the form submission
    const handleSubmit = async (e)=>{
        e.preventDefault(); //to prevent refreshing the page when form is accessed first time
        // alert(user)
        console.log(user)
        try {
            const response = await fetch(URL,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(user) //user is storing data in form of object, so stringfy method converts the object into json format
        })
        console.log( "resgister",response)
        if(response.ok){
            const res_data = await response.json()
            console.log("res from server", res_data)
            //getting token to local storage
            // localStorage.setItem("token",res_data.token)
            storeTokenInLS(res_data.token);
            alert("Registered Successfully")
            setUser({username:"",
            email:"",
            phone:"",
            password:"",
            gender : "",
            hearAboutUs:"",
            city:"",
            state:""})

            navigate("/login")
        }
        } catch (error) {
            console.log("register",error)
        }
    }

    return <>
    <section>
        <main>
            <div className="section-registration">
                <div className="container grid grid-two-cols">
                    <div className="registration-image">
                        <img 
                        src="/images/register.png" 
                        alt="hand pressing register now" 
                        width="500"
                        height="345"
                        />
                    </div>
                    {/* tackling registration form */}
                    <div className="registration-form">
                        <h1 className="main-heading mb-3">Registration Form</h1>
                        <br />

                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username">username</label>
                                <input 
                                type="text" 
                                name="username" 
                                placeholder="username" 
                                id="username" 
                                required 
                                autoComplete="off"
                                value={user.username}
                                onChange={handleInput}
                                />
                            </div>


                            <div>
                                <label htmlFor="email">email</label>
                                <input 
                                type="email" 
                                name="email" 
                                placeholder="enter your email" 
                                id="email" 
                                required 
                                autoComplete="off"
                                value={user.email}
                                onChange={handleInput}
                                />
                            </div>

                            <div>
                                <label htmlFor="phone">phone</label>
                                <input 
                                type="number" 
                                name="phone" 
                                placeholder="phone" 
                                id="phone" 
                                required 
                                autoComplete="off"
                                value={user.phone}
                                onChange={handleInput}
                                />
                            </div>

                            <div>
                                <label htmlFor="password">password</label>
                                <input 
                                type="password" 
                                name="password" 
                                placeholder="password" 
                                id="password" 
                                required 
                                autoComplete="off"
                                value={user.password}
                                onChange={handleInput}
                                />
                            </div>

                            <div>
                                <label htmlFor="gender">gender</label>
                                <input 
                                type="text" 
                                name="gender" 
                                placeholder="gender" 
                                id="gender" 
                                required 
                                autoComplete="off"
                                value={user.gender}
                                onChange={handleInput}
                                />
                            </div>

                            <div>
                                <label htmlFor="hearAboutUs">How did you hear about us</label>
                                <input 
                                type="text" 
                                name="hearAboutUs" 
                                placeholder="hearAboutUs" 
                                id="hearAboutUs" 
                                required 
                                autoComplete="off"
                                value={user.hearAboutUs}
                                onChange={handleInput}
                                />
                            </div>


                            <div>
                                <label htmlFor="city">city</label>
                                <input 
                                type="text" 
                                name="city" 
                                placeholder="city" 
                                id="city" 
                                required 
                                autoComplete="off"
                                value={user.city}
                                onChange={handleInput}
                                
                                />
                            </div>

                            <div>
                                <label htmlFor="state">state</label>
                                <input 
                                type="text" 
                                name="state" 
                                placeholder="state" 
                                id="state" 
                                required 
                                autoComplete="off"
                                value={user.state}
                                onChange={handleInput}
                                />
                            </div>
                            <br />
                            <button type="submit" className="btn btn-submit">Register Now</button>
                        </form>
                    </div>

                </div>
            </div>
        </main>
    </section>
    </>
}
