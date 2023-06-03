import './LoginPage.css'
import { useState } from 'react';
import { LoginApi } from '../services/Api';
import {storeUserData} from '../services/Storage';
import { isAuthenticated } from '../services/Auth';
import {Link, Navigate} from 'react-router-dom';
export default function LoginPage(){

    //inital State Fields False
   const initialStateErrors={
        email:{required:false},
        password:{required:false},
        custom_error:null
   }

    const [errors,setErrors]=useState(initialStateErrors)

   //Inital State Loading Fields False
   const [loading,setLoading]=useState(false);

   //HandleSubmit Loading Problem
   const handleSubmit=(event)=>{
    console.log(inputs);
    event.preventDefault();
    let errors=initialStateErrors;
    let hasError=false;
   
    if(inputs.email==''){
      errors.email.required=true;
      hasError=true;
   }
   if(inputs.password==''){
      errors.password.required=true;
      hasError=true;
   }
   
   if(!hasError)
   {
      setLoading(true)

      //Sending Login api request
      LoginApi(inputs).then((response)=>{
          storeUserData(response.data.idToken);
      }).catch((err)=>{
          console.log(err);
      }).finally(()=>{
          setLoading(false)
      })

   }

   setErrors({...errors});
   }

    /*Input Fields Empty*/
    const [inputs,setInputs]=useState({
        email:'',
        password:''
    })

   //HandleInput Value

   const handleInput=(event)=>{
    setInputs({...inputs,[event.target.name]:event.target.value})
 }

   if(isAuthenticated()){

   //Redirect to the Dashboard Page
   return <Navigate to="/dashboard" />
 }
 
    return( 
        <section className="login-block">
        <div className="container">
            <div className="row ">
                <div className="col login-sec">
                    <h2 className="text-center">Login Now</h2>
                    <form onSubmit={handleSubmit} className="login-form" action="">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
                        <input   className="form-control" type="email" onChange={handleInput}  name="email"  id="" placeholder="email"  />
                        { errors.email.required?
                        (<span className="text-danger" >
                            Email is required.
                        </span>):null
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                        <input  className="form-control" type="password" onChange={handleInput}  name="password" placeholder="password" id="" />
                        { errors.password.required?
                        (<span className="text-danger" >
                            Password is required.
                        </span>):null
                        }
                    </div>
                    <div className="form-group">
                        {loading ?
                        (<div  className="text-center">
                            <div className="spinner-border text-primary " role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>):null
                        }
                        <span className="text-danger" >
                        { errors.custom_error?
                        (<p>{errors.custom_error}</p>)
                        :null
                        }
                        </span>
                        <input  type="submit" className="btn btn-login float-right" disabled={loading}  value="Login" />
                    </div>
                    <div className="clearfix"></div>
                    <div className="form-group">
                    Create new account ? Please <Link to="/register">Register</Link>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
    )
}
