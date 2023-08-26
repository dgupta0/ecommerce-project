import react, { useContext, useState, } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { Button, TextField, Card, Typography } from '@mui/material';
import { useSnackbar } from 'notistack'
import path from "../config";
import LoginContext from "../context/LoginContext";




export default function Register() {
    const { setIsLogged } = useContext(LoginContext)
    const { enqueueSnackbar } = useSnackbar()
    const data = {
        username: "",
        password: "",
        confirmPassword: ""
    }
    const [user, setUser] = useState(data);

    function handleInput(e: react.ChangeEvent<HTMLInputElement>) {
        setUser(prevUser => ({ ...prevUser, [e.target.name]: e.target.value }))
    }
    async function handleRegister() {
        try {
            const res = await axios.post(`${path}/signup`, user);
            if (res.status === 201) {
                localStorage.setItem("userToken", res.data.token);
                enqueueSnackbar("Admin registered successfully!")
                setUser(data)
                setIsLogged(true)
            } else {
                enqueueSnackbar("something went wrong!")
            }
        } catch (error) {
            console.log(error)
        }

    }

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
            <TextField
                label="Confirm Password"
                variant="outlined"
                type="password"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleInput}
                placeholder="confirm password"
            />

            <Button variant="contained" onClick={handleRegister}>Register Now</Button>
            <Typography textAlign="center"
                variant="body1" component="h2">
                Already a user? <Button variant="text"><Link to="/login">Login here</Link></Button>
            </Typography>

        </Card>
    )

};