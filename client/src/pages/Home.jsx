import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export const Home = () =>{
    const [users,setUsers] = useState([]);
    const getAllUsersData = async()=>{
        try {
            const response = await fetch("http://localhost:3000/api/auth/",{
                method : "GET",
            })
            const data = await response.json()
            console.log(`users ${data}`)
            setUsers(data)
        } catch (error) {
            console.log("error message:" ,error)
        }
    }


    //handling delete user operation:
    const deleteUser = async(id)=>{
        try {
            const response = await fetch(`http://localhost:3000/api/auth/delete/${id}`,{
               method : "DELETE",
            })
            const data = await response.json()
            console.log(`users after delete ${data}`)

            if(response.ok){
                getAllUsersData()
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getAllUsersData();
    },[])

    
    return<>
    <section className="admin-users-section">
        <div className="container">
            <h1>Users Data</h1>
        </div>

        <div className="container users">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                {users.map((curUser,index)=>{
                   return <tr key={index}>
                    <td>{curUser.username}</td>
                    <td>{curUser.email}</td>
                    <td>{curUser.phone}</td>
                    <td>
                        <Link to={`/update/${curUser._id}`}> Edit </Link>

                    </td>
                    <td>
                        <button onClick={()=>deleteUser(curUser._id)}>
                            Delete
                        </button>
                    </td>
                   </tr>
                })}

                </tbody>
            </table>


        
        </div>
    </section>
   </>
}

