import React, { useState } from 'react';
import logi from "../assets/styles/login.module.css";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === 'demo' && password === 'password') {
      console.log('Login successful');
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div className="error">{error}</div>}
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
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