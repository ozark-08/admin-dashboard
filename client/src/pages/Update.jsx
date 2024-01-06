import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Update = () =>{
    const[data,setData] = useState({
        username : "",
        email:"",
        phone:"",
    })
    const params = useParams();
    console.log("id of the user: ",params);

    const getSingleUserData = async()=>{
        try {
            const response = await fetch(`http://localhost:3000/api/auth/${params.id}`,{
                method : "GET",
            })
            const data = await response.json()
            console.log(`user ${data}`)
            setData(data)
        } catch (error) {
            console.log("error message:" ,error)
        }
    }

    useEffect(()=>{
        getSingleUserData();
    },[])

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setData({
            ...data,
            [name]:value,
        })
    };

    //update dynamically:
    const handleSubmit = async(e) =>{
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/api/auth/update/${params.id}`,{
               method : "PATCH",
               headers : {
                "Content-Type" : "application/json"
               },
               body : JSON.stringify(data)
            })
            console.log("updated data",response)
             if(response.ok){
                alert("updated successfuly")
            }
            else{
                alert("Not Updated")
            }
        } catch (error) {
            console.log(error)
        }

    }



    return(
        <section className="section-contact">
            <div className="contact-content container">
                <h1 className="main-heading">Update User Data</h1>
            </div>

            <div className="container grid grid-two-cols">
                <section className="section-form">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">username</label>
                            <input 
                            type="text"
                            name="username" 
                            id="username"
                            autoComplete="off"
                            value={data.username}
                            onChange={handleInput}
                            required
                            />
                        </div>

                        <div>
                            <label htmlFor="email">email</label>
                            <input 
                            type="email"
                            name="email" 
                            id="email"
                            autoComplete="off"
                            value={data.email}
                            onChange={handleInput}
                            required
                            />
                        </div>

                        <div>
                            <label htmlFor="phone">phone</label>
                            <input 
                            type="number"
                            name="phone" 
                            id="phone"
                            autoComplete="off"
                            value={data.phone}
                            onChange={handleInput}
                            required
                            />
                        </div>
                        <br />
                        <button type="submit" className="btn btn-submit">Update</button>

                        
                    </form>
                </section>
            </div>
        </section>
    )
}