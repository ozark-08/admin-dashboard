import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../store/auth"


const URL = "http://localhost:3000/api/auth/login"

export const Login = () =>{
    const[user , setUser] = useState({
        email:"",
        password:""
    })

    const navigate = useNavigate();
    const {storeTokenInLS}  = useAuth()

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
    const handleSubmit = async(e)=>{
        e.preventDefault(); //to prevent refreshing the page when form is accessed first time
        // alert(user)
        console.log(user)
        try {
            const response = await fetch(URL,{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"},
                body: JSON.stringify(user)
            })
            console.log("login",response)
            if(response.ok){
                const res_data = await response.json()
                console.log("res from server", res_data)
                //getting token to local storage
                // localStorage.setItem("token",res_data.token)
                storeTokenInLS(res_data.token);
                alert("Login Successful")
                setUser({email:"",password:""})
                navigate("/")
            }
            else{
                alert("Invalid Credential")
                console.log('Invalid Credential')
            }
        } catch (error) {
            console.log(error)
        }
        
    }


    return <>
    <section>
        <main>
            <div className="section-registration">
                <div className="container grid grid-two-cols">
                    <div className="registration-image">
                        <img 
                        src="/images/login.png" 
                        alt="login image" 
                        width="500"
                        height="500"
                        />
                    </div>
                    {/* tackling registration form */}
                    <div className="registration-form">
                        <h1 className="main-heading mb-3">Login Form</h1>
                        <br />

                        <form onSubmit={handleSubmit}>
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
                            <br />
                            <button type="submit" className="btn btn-submit">Login</button>
                        </form>
                    </div>

                </div>
            </div>
        </main>
    </section>
    </>
}
