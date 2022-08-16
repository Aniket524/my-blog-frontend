import React from 'react'
import axios from 'axios'
import loginimage from '../../assets/images/loginimage.png'
import signupimage from '../../assets/images/signupimage.jpg'
import {Box , TextField, Button, Typography} from '@mui/material'
import './login.css'
import { useState } from 'react'
// import instance from '../../axios'

// const signupIinitialValue = {
//     name:'',
//     userName:'',
//     password:''
// }
// const API_BASE = "http://localhost:3001"

const Login = () => {
    const [loggedinname,setLoggedinName] = useState('')
    const [loggedin,setLoggedin] = useState(false);
    const [account,setAccount]=useState('login');
    // const [signup,setSignup]=useState(signupIinitialValue);
    const [name,setName] = useState('');
    const [username,setUserName] = useState('');
    const [password,setPassword] = useState('');

    // const onInputChange = (e) => {
    //     setSignup({...signup,[e.target.name] : e.target.value});
    //     console.log(signup);
    // }

    const signupUser = async() => {
        if(name && username && password)
        {
            const userSign = await axios.post("/user/signup",{
                name:name,
                userName:username,
                password:password
            })

            alert(userSign.data.message)
            // console.log(userSign.data)
            if(userSign.data.message==="Signup Successfully")
            {
                setLoggedinName(userSign.data.name)
                setLoggedin(true);

            }

        }
        else{
            alert("please enter the values")
        }
    }

    const LoginUser = async() => {
        const userLogin = await axios.post("/user/login",{userName:username,password:password})
        // console.log(userLogin.data.user.name);
        alert(userLogin.data.message);
        if(userLogin.data.message==="logged in")
        {
            setLoggedinName(userLogin.data.user.name);
            setLoggedin(true);
        }
        if(userLogin.data.message==="user not found")
        {
            alert("User not found");
        }
    }

  return (
    loggedin ?
    <>
    <h1>welcome {loggedinname}</h1>
    <Button variant='contained' onClick={()=>setLoggedin(false)}>Logout</Button>

    </>
    :
    <>
    {account === 'login' ?
    <div>
        <Box className='box'>
            <img className='login-logo' src={loginimage} alt="loginpage" />
            <Box className='wrapper'>
                <TextField variant='standard' onChange={(e)=>setUserName(e.target.value)} label='Enter Username'/><br />
                <TextField variant='standard' onChange={(e)=>setPassword(e.target.value)} label='Enter Password'/>
                <Button className='loginbutton' variant='contained' onClick={()=>LoginUser()}>Login</Button>
                <Typography>OR</Typography>
                <Button className='loginbutton signup' variant='text' onClick={()=>setAccount('signup')}>sign up</Button>
            </Box>
        </Box>
    </div>

    :

    <Box className='box block-div'>
        <img className='login-logo' src={signupimage} alt="loginpage" />
        <Box className='wrapper'>
            <TextField className='text'variant='standard' onChange={(e)=>setName(e.target.value)} name="name" label='Enter Name'/>
            <TextField className='text' variant='standard' onChange={(e)=>setUserName(e.target.value)} name="userName" label='Enter Username'/>
            <TextField className='text' variant='standard' onChange={(e)=>setPassword(e.target.value)} name="password" label='Enter Password'/>
            <Button className='loginbutton signup' variant='contained' onClick={()=>signupUser()}>sign up</Button>
            <Typography>OR</Typography>
            <Button className='loginbutton' variant='text' onClick={()=>setAccount('login')}>Already Have An Account</Button>
        </Box>
    </Box>
  }
    </>
  )
}

export default Login