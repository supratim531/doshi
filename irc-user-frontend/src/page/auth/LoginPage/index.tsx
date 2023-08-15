import * as React from 'react';

import { Avatar, Alert, Button, Box, Paper, TextField, Typography, Grid} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import Copyright from '../../../component/Copyright';
import { useNavigate, Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../reduxStore/hooks";
import { login } from '../../../network/store/auth/login';

import { LoginBody, AuthResponseData } from '../../../model/auth';




const LoginPage = () => {

    const dispatch = useAppDispatch();

    let navigate = useNavigate();

    const token = localStorage.getItem("token");

    if (token) {
        navigate("/dashboard");
        // window.location.reload();
    }

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [loginResponseData, setAuthResponseData] = React.useState<AuthResponseData | null>(null);
    const [successResponse, setSuccessResponse] = React.useState<string | null>(null);
    const [errorResponse, setErrorResponse] = React.useState<string | null>(null);

    const loginSlice = useAppSelector((state) => state.login);

    React.useEffect(() => {
        if(loginSlice.response.data !== undefined){
            setAuthResponseData(loginSlice.response.data);
            setSuccessResponse(loginSlice.response.message);
            setErrorResponse(null);
        }

        if(loginSlice.error.message !== undefined){
            setErrorResponse(loginSlice.error.message);
        }
    }, [loginSlice]);

    const onLoginBtnClick = () => {

        const loginBody = {
            email: email,
            password: password,
        } as LoginBody;
        
        setErrorResponse(null);
        setSuccessResponse(null);

        dispatch(login(loginBody));
    };

    React.useEffect(() => {
        if(loginResponseData !== null && (loginResponseData.user_type === "user" || loginResponseData.user_type === "admin")){
            localStorage.setItem("token", loginResponseData.token);
            localStorage.setItem("user_type", loginResponseData.user_type);

            setTimeout(() => {
                
                window.location.reload();                   

            }, 1000);
        }
    }, [loginResponseData]);

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
                        Login
                    </Typography>
                    
                    <Box sx={{ mt: 1, width: '100%', }}>
                        <TextField
                            label="Email Address"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            margin="normal"
                            required
                            fullWidth
                            autoFocus
                        />
                        
                        <TextField
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            margin="normal"
                            sx={{mb: 2}}
                            required
                            fullWidth
                        />

                        {errorResponse !== null && errorResponse !== ''?<Alert sx={{width: '100%',}} severity="error">{errorResponse}</Alert>: null}
                        {successResponse !== null && successResponse !== ''?<Alert sx={{width: '100%',}} severity="success">{successResponse}</Alert>: null}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={onLoginBtnClick}
                            sx={{ mt: 2,mb: 2, height: 45, }}
                        >
                            <Typography>Login</Typography>
                        </Button>
              
                        <Grid container>
                            <Grid item xs>
                                <Link to="#">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                Don't have an account?&nbsp;
                                <Link to="../register">Register</Link>
                            </Grid>
                        </Grid>

                        <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}

export default LoginPage