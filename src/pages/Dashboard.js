import { useEffect, useState } from "react"
import { UserDetailsApi } from "../services/Api"
export default function DashboardPage(){

    const [user,setUser]=useState({
        name:"",
        email:"",
        localId:""
    })

    useEffect(()=>{
        UserDetailsApi().then((response)=>{
            setUser({
                name:response.data.users[0].displayName,
                email:response.data.users[0].email,
                localId:response.data.users[0].localId,
            })
            
        })
    },[])
    return(
        <main role="main" className="container mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="text-center mt-5">
                            <h5>Dashboard page</h5>
                            { user.name && user.email && user.localId ?
                                (<div>
                                    <p className="text-bold " >Hi <span className="text-success font-weight-bold">{user.name}</span></p>
                                    <p className="text-bold " >your Firebase ID is <span className="text-success font-weight-bold">{user.localId}</span> </p>
                                    <p className="text-bold " >Your Email is <span className="text-success font-weight-bold">{user.email}</span> </p>
                                </div>)
                                :<p>Loading...</p>
                            }
                        </div>
                    </div>
                </div>
               
            </div>
        </main>
    )
}