import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';


const initialInputs = {
  username: "",
  password: ""
}

const Login = (props) => {
  const [ inputs, setInputs ] = useState(initialInputs)

  const handleChange = event => {
    setInputs({ ...inputs, [event.target.name]: event.target.value })
  }

  const handleLogin = event => {
    console.log(inputs)
    event.preventDefault();
    axiosWithAuth()
      .post('/login', inputs)
      .then(response => {
        console.log('HandleLogin Post: ', response)
        sessionStorage.setItem('token', response.data.payload)
        props.history.push('/protectedBubblePage')
      })
      .catch(error => console.log(error.response))
      setInputs(initialInputs)
  }
  
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <div className='login-container'>
                <form onSubmit={handleLogin}>
                <input 
                name='username'
                placeholder='Enter Username'
                onChange={handleChange}
                value={inputs.username}
                />
                <input 
                name='password'
                type='password'
                placeholder='Enter Password'
                onChange={handleChange}
                value={inputs.password}
                />
                <button>Login</button>
            </form>
        </div>
    </>
  );
};

export default Login;



 // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route