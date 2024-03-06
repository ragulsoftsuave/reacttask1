import { onAuthStateChanged,signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { Navigate, useHref } from 'react-router-dom';
import { useAuth } from "../Contexts/AuthContext";


export default function UserList() {
    const {userLoggedIn} =useAuth();
    const href =useHref();
    const [authUser, setAuthUser] = useState(null);
    useEffect(()=>{
        const listen =onAuthStateChanged(auth,(user)=>{
            if (user) {
                setAuthUser(user);
            }else{
                setAuthUser(null);
            }})
            return ()=>listen();
    },[]);

    const userSignOut =()=>{
        signOut(auth).then(()=>{
            console.log('signed out successfully');
        }).catch((err)=>{console.log(err);})
    }

    useEffect(() => {

    }
       ,[userLoggedIn]);
    
        

    return(<div className="notfound-wrap">
              {!userLoggedIn &&(<Navigate to={'/login'} replace={true} />)}

        <h1>UserList Page!</h1>
        {authUser?<><p>Signed in as {authUser.email} </p><button type="button" onClick={userSignOut}>sign out</button></>:<><p>Signed out</p></>}
    </div>)
}