import react, { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { Button, TextField, Card, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import path from "../config";
import LoginContext from "../context/LoginContext";




export default function Register() {
    const { setIsLogged } = useContext(LoginContext)
    const { enqueueSnackbar } = useSnackbar()
    const data = {
        username: "",
        password: ""
    }
    const [user, setUser] = useState(data);

    function handleInput(e: react.ChangeEvent<HTMLInputElement>) {
        setUser(prevUser => ({ ...prevUser, [e.target.name]: e.target.value }))
    }
    async function handleRegister() {
        try {
            const res = await axios.post(`${path}/login`, user);
            console.log(res.status)
            if (res.status === 201) {
                localStorage.setItem("userToken", res.data.token);
                enqueueSnackbar("admin loggedin successfully!")
                setUser(data)
                setIsLogged(true)
            } else {
                enqueueSnackbar("something went wrong!")
            }
        } catch (error) {
            console.log(error)
        }

    }
    console.log(user)
    return (
        <Card component="form" className="form register-form">
            <TextField
                label="Username"
                variant="outlined"
                type="text"
                name="username"
                value={user.username}
                onChange={handleInput}
                placeholder="username"
            />
            <TextField
                label="Password"
                variant="outlined"
                type="password"
                name="password"
                value={user.password}
                onChange={handleInput}
                placeholder="passoword"
            />

            <Button variant="contained" onClick={handleRegister}>Login Now</Button>
            <Typography textAlign="center"
                variant="body1" component="h2">
                Not a user? <Button variant="text"><Link to="/register">Register here</Link></Button>
            </Typography>

        </Card>
    )

};