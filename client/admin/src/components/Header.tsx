import { Typography, Button, Menu, MenuItem, Fade, Stack } from '@mui/material';
import * as React from 'react';
import menu from "../assets/list.png"
import { useContext, useState, useEffect } from 'react';
import LoginContext from '../context/LoginContext';
import axios from "axios"
import path from '../config';
import { enqueueSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';



export default function Header() {
    const navigate = useNavigate()
    const { isLoggedIn, setIsLogged } = useContext(LoginContext);
    const [username, setUsername] = useState("")
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const token: string | null = localStorage.getItem('token')

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        if (localStorage.getItem("token") !== null) {
            setIsLogged(true)
            const decodedToken: any = jwtDecode(token as string);
            console.log(decodedToken)
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                setIsLogged(false);
                localStorage.removeItem("token")

            }
        }
    }, [])

    React.useEffect(() => {
        async function getUsername() {
            const token = localStorage.getItem("token")
            if (token) {
                try {
                    console.log(token)
                    const res = await axios.get(`${path}/me`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    })
                    if (res.status === 201) {
                        setUsername(res.data)
                    } else {
                        enqueueSnackbar("User is Logged but can't get username from API")
                    }

                } catch (error) {
                    console.log(error)
                }
            }

        }
        getUsername()

    }, [isLoggedIn])

    function handleLogout() {
        setAnchorEl(null);
        setIsLogged(false)
        localStorage.removeItem("token")
        navigate("/login")
    }

    return (
        <Stack className='header' direction="row" justifyContent="space-between">
            <Typography variant="h4" component="h4">
                UCart
            </Typography>
            <Stack direction="row" spacing={2}
            >
                {!isLoggedIn ?
                    <Stack className="large-header" alignItems="center" direction="row" spacing={2}>
                        <Typography variant="h6" component="h6">
                            Hello Guest!
                        </Typography>
                        <Button
                            component="a" href="/login"
                            variant="contained">Login</Button>
                        <Button variant="outlined"
                            component="a" href="/">Sign Up</Button>
                    </Stack>
                    :
                    <Stack className="large-header" direction="row" spacing={2} alignItems="center">
                        <Typography variant="h6" component="h6">
                            Hello {username}
                        </Typography>
                        <Button variant="text"
                            component="a" href="/create">Create Product</Button>
                        <Button variant="text"
                            component="a" href="/products">Products</Button>
                        <MenuItem
                            sx={
                                {
                                    backgroundColor: "#00845c",
                                    color: "white",
                                    borderRadius: "4px",
                                    '&:hover': {
                                        backgroundColor: '#00a278', // Example background color on hover
                                    },
                                }}
                            onClick={handleLogout}>Logout</MenuItem>

                    </Stack>
                }
            </Stack>
            <Stack className="header-small" direction="row" spacing={2} alignItems="center">
                <Typography variant="h6" component="h6">
                    {username ? `Hello ${username}` : 'Hello guest!'}
                </Typography>
                <Button
                    id="fade-button"
                    aria-controls={open ? 'fade-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <img className="menu-img" src={menu} alt="mwnu pic by freepik" />
                </Button>
            </Stack>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                {isLoggedIn ?
                    <Stack>
                        <MenuItem className='menu-item'
                            onClick={handleLogout}>Logout
                        </MenuItem>
                        <MenuItem className='menu-item'
                            component="a" href="/create"
                            onClick={handleClose}>Add Product
                        </MenuItem>
                        <MenuItem className='menu-item'
                            component="a" href="/products"
                            onClick={handleClose}> Products
                        </MenuItem>
                    </Stack> :
                    <Stack>
                        <MenuItem onClick={handleClose}
                            component="a" href="/">
                            Register</MenuItem>
                        <MenuItem onClick={handleClose}
                            component="a" href="/login"
                        >Login</MenuItem>
                    </Stack>
                }
            </Menu>

        </Stack>
    )
}