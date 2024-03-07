import React, { useState } from 'react';
import logi from "../assets/styles/login.module.css";
import { Link, Navigate } from 'react-router-dom';
// import {signInWithEmailAndPassword} from "firebase/auth";
// import {auth} from "../firebase/firebase";
import { doSignInWithEmailAndPassword } from '../firebase/auth';
import { useAuth, } from '../Contexts/AuthContext';
const Login = ({history}) => {
  const {userLoggedIn} =useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  console.log(useAuth);
  const handleSubmit = (e) => {
    e.preventDefault();
    // signInWithEmailAndPassword(auth,email,password)
    // .then( (userCredentials)=>{console.log(userCredentials);setError('')})
    // .catch(err=>{console.log(err);setError(err.code.split("/")[1])})
    doSignInWithEmailAndPassword(email,password,setError);
  };

  return (
    <div className={logi.loginCenterContainer}>
    <div className={logi.loginContainer}>
      {userLoggedIn &&(<Navigate to={'/'} replace={true} />)}
      <div className={logi.banner}>
        <img src="logi.png" alt="" />
      </div>
      <div className={logi.loginSide}>
      <div className={logi.loginFormContainer}>
      <form className={logi.loginForm} onSubmit={handleSubmit}>
        <h2 className={logi.h2}>Login</h2>
        <div>
          <label className={logi.label} htmlFor="email">Email</label>
          <input className={logi.input}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className={logi.label} htmlFor="password">Password</label>
          <input className={logi.input}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={logi.button} type="submit">Login</button>
        {<div className={logi?.error}>{error}</div>}

      </form>
      <div style={{display:"block",padding:"30px 0 0 0"}}>
        <Link className={logi.regiLink}  to="/register">register</Link>
      </div>
      </div>
      </div>
    </div>
    </div>
  );
};

export default Login;


// import React from 'react';
// import { useForm } from 'react-hook-form';
// import "../assets/styles/login.css"

// const Login = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();

//   const onSubmit = (data) => {
//     console.log(data);
//   };

//   return (
//     <div className="login-container">
//       <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
//         <h2>Login</h2>
//         <div>
//           <label htmlFor="username">Username</label>
//           <input {...register('username', { required: true })} id="username" />
//           {errors.username && <span className="error">Username is required</span>}
//         </div>
//         <div>
//           <label htmlFor="password">Password</label>
//           <input type="password" {...register('password', { required: true })} id="password" />
//           {errors.password && <span className="error">Password is required</span>}
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;


// export default function Login() {
//     return(<div className="notfound-wrap">
//         <h1>Login Page!</h1>
//         <form action="/" method="post">
//             <input type="text" name="login-user" id="login-username" placeholder="enter-username"/>
//             <input type="password" name="login-password" id="login-password" placeholder="enter-password"/>
//             <input type="submit" name="login-button" id="login-button" value="login"/>
//         </form>

//     </div>)
// }