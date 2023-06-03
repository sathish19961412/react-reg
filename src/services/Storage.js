//Store IdToken in Register Data
export const storeUserData =(data)=>{
    localStorage.setItem('idToken',data)
}

//Get IdToken in Register Data

export const getUserData=()=>{
    return localStorage.getItem('idToken');
}
