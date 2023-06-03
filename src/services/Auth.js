import { getUserData } from "./Storage"

export const isAuthenticated=()=>{
    return getUserData()!=null?true:false;
}