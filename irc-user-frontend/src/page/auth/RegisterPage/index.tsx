import * as React from 'react';

import { Avatar, Alert, Button, Box, Paper, TextField, Typography, Grid } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import Copyright from '../../../component/Copyright';
import { useNavigate, Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../reduxStore/hooks";
import { register } from '../../../network/store/auth/register';

import { RegisterBody, AuthResponseData } from '../../../model/auth';


const RegisterPage = () => {

    const dispatch = useAppDispatch();

    let navigate = useNavigate();

    const token = localStorage.getItem("token");

    if (token) {
        navigate("/dashboard");
    }

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

    const [loginResponseData, setRegisterResponseData] = React.useState<AuthResponseData | null>(null);
    const [successResponse, setSuccessResponse] = React.useState<string | null>(null);
    const [errorResponse, setErrorResponse] = React.useState<string | null>(null);

    const registerSlice = useAppSelector((state) => state.register);

    React.useEffect(() => {
        if (registerSlice.response.data !== undefined) {
            setRegisterResponseData(registerSlice.response.data);
            setSuccessResponse(registerSlice.response.message);
            setErrorResponse(null);
        }

        if (registerSlice.error.message !== undefined) {
            setErrorResponse(registerSlice.error.message);
        }
    }, [registerSlice]);

    const onRegisterBtnClick = () => {

        const registerBody = {
            name: name,
            email: email,
            password: password,
            password_confirmation: confirmPassword,
        } as RegisterBody;

        setErrorResponse(null);
        setSuccessResponse(null);

        dispatch(register(registerBody));
    };

    React.useEffect(() => {
        if (loginResponseData !== null && (loginResponseData.user_type === "user" || loginResponseData.user_type === "admin")) {
            localStorage.setItem("token", loginResponseData.token);
            localStorage.setItem("user_type", loginResponseData.user_type);

            setTimeout(() => {

                window.location.reload();

            }, 1000);
        }
    }, [loginResponseData]);

    const onEnterKeyPress = (e: any) => {
        if (e.key === "Enter") {
            onRegisterBtnClick();
        }
    }

    return (

        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>

                    <Box sx={{ mt: 1, width: '100%', }}>
                        <TextField
                            label="Name"
                            autoComplete="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            margin="normal"
                            required
                            fullWidth
                            onKeyDown={e => onEnterKeyPress(e)}
                            autoFocus
                        />

                        <TextField
                            label="Email Address"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            margin="normal"
                            required
                            fullWidth
                            onKeyDown={e => onEnterKeyPress(e)}
                        />

                        <TextField
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            margin="normal"
                            required
                            fullWidth
                            onKeyDown={e => onEnterKeyPress(e)}
                        />

                        <TextField
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            margin="normal"
                            sx={{ mb: 2 }}
                            required
                            fullWidth
                            onKeyDown={e => onEnterKeyPress(e)}
                        />

                        {errorResponse !== null && errorResponse !== '' ? <Alert sx={{ width: '100%', }} severity="error">{errorResponse}</Alert> : null}
                        {successResponse !== null && successResponse !== '' ? <Alert sx={{ width: '100%', }} severity="success">{successResponse}</Alert> : null}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={onRegisterBtnClick}
                            onKeyDown={e => onEnterKeyPress(e)}
                            sx={{ mt: 2, mb: 2, height: 45, }}
                        >
                            <Typography>Register</Typography>
                        </Button>

                        <Grid container sx={{ width: '100%' }}>

                            <Grid md={12} item>
                                <center>
                                    Already have an account?&nbsp;
                                    <Link to="../login">Login</Link>
                                </center>
                            </Grid>
                        </Grid>

                        <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}

export default RegisterPage;
