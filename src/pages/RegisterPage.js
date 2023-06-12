import {useState} from 'react';
import './RegisterPage.css';
import { RegisterApi } from '../services/Api';
import { storeUserData } from '../services/Storage';
import { isAuthenticated } from '../services/Auth';
import NavBar from '../components/Navbar';
import {Link, Navigate} from 'react-router-dom';

export default function RegisterPage(){

   //inital State Fields False
   const initialStateErrors={
        email:{required:false},
        password:{required:false},
        name:{required:false},
        custom_error:null
   }

    const [errors,setErrors]=useState(initialStateErrors)

    //Inital State Loading Fields False
    const [loading,setLoading]=useState(false);

    //HandleSubmit Loading Problem
    const handleSubmit=(event)=>{

      event.preventDefault();
      let errors=initialStateErrors;
      let hasError=false;
      if(inputs.name==''){
         errors.name.required=true;
         hasError=true;
      }
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

        //Sending Register api request
        RegisterApi(inputs).then((response)=>{
            storeUserData(response.data.idToken);
        }).catch((err)=>{
            if(err.response.data.error.message=="EMAIL_EXISTS"){
                 setErrors({...errors,custom_error:"Always this email has already register"})
            }else if(String(err.response.data.error.message).includes('WEAK_PASSWORD')){
                setErrors({...errors,custom_error:"Password should be at least 6 characters"})
            }
        }).finally(()=>{
            setLoading(false)
        })

     }
 
     setErrors({...errors});
    }

    /*Input Fields Empty*/
    const [inputs,setInputs]=useState({
        email:'',
        password:'',
        name:''
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
        <div>
            <NavBar/>
            <section className="register-block">
                <div className="container">
                    <div className="row ">
                        <div className="col-md-12 register-sec">
                            <h2 className="text-center">Register Now</h2>
                            <form onSubmit={handleSubmit} className="register-form" action="" >
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1" className="text-uppercase">Name</label>
                
                                <input type="text" className="form-control" name="name" onChange={handleInput} id=""  />
                                {errors.name.required?
                                (<span className="text-danger" >
                                    Name is required.
                                </span>):null
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
                
                                <input type="text"  className="form-control" name="email" onChange={handleInput} id=""  />
                                {errors.email.required?
                                (<span className="text-danger" >
                                    Email is required.
                                </span>):null
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                                <input  className="form-control" type="password"  name="password" onChange={handleInput} id="" />
                                {errors.password.required?
                                (<span className="text-danger" >
                                    Password is required.
                                </span>):null
                                }
                            </div>
                            <div className="form-group">
                
                                <span className="text-danger" >
                                    {errors.custom_error?
                                    (<p>{errors.custom_error}</p>)
                                    :null
                                    }
                                </span>
                                {loading?
                                (<div  className="text-center">
                                
                                    <div className="spinner-border text-primary " role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                
                                </div>):null
                                }          
                                <input type="submit" className="btn btn-login float-right"  value="Register" />
                            </div>
                            <div className="clearfix"></div>
                            <div className="form-group">
                            Already have account ? Please <Link to="/login">Login</Link>
                            </div>
                
                
                            </form>
                
                
                        </div>
                
                    </div>
                </div>
            </section>
        </div>
       
        
    )
}