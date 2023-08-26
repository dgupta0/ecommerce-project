import { Typography, Button, Menu, MenuItem, Fade, Stack } from '@mui/material';
import * as React from 'react';
import menu from "../assets/list.png"
import { useContext, useState } from 'react';
import LoginContext from '../context/LoginContext';
import axios from "axios"
import path from '../config';
import { enqueueSnackbar } from 'notistack'



export default function Header() {
    const { isLoggedIn } = useContext(LoginContext);
    const [username, setUsername] = useState("")
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    React.useEffect(() => {
        async function getUsername() {
            try {
                const token = localStorage.getItem("userToken")
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
        getUsername()
    }, [isLoggedIn])

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
                        <Button variant="contained">Login</Button>
                        <Button variant="outlined">Sign Up</Button>
                    </Stack>
                    :
                    <Stack className="large-header" direction="row" spacing={2} alignItems="center">
                        <Typography variant="h6" component="h6">
                            Hello {username}
                        </Typography>
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
                            onClick={handleClose}>Logout</MenuItem>
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
                            onClick={handleClose}>Logout
                        </MenuItem>
                    </Stack> :
                    <Stack>
                        <MenuItem onClick={handleClose}>Register</MenuItem>
                        <MenuItem onClick={handleClose}>Login</MenuItem>
                    </Stack>
                }
            </Menu>

        </Stack>
    )
}