import React from 'react';
import { useNavigate, Link } from "react-router-dom";

import { axiosClient } from '../../../network/axiosClient';
import { AuthResponse, AuthResponseData, LoginBody } from '../../../model/auth';
import IRCSnackbar from '../../../component/IRCSnackbar';

const LoginPage = () => {
    let navigate = useNavigate();

    const token = localStorage.getItem("token");
    const user_type = localStorage.getItem("user_type");

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [response, setResponse] = React.useState<any>(null);
    const [snackbar, setSnackbar] = React.useState(false);

    const [message, setMessage] = React.useState("");
    const [status, setStatus] = React.useState(0);

    React.useEffect(() => {
        if (token && user_type === "admin") {
            navigate("/");
        }
    }, []);

    React.useEffect(() => {
        if (response != null) {
            if (response?.data?.data?.user_type === "admin") {
                localStorage.setItem("token", response?.data?.data?.token);
                localStorage.setItem("user_type", response?.data?.data?.user_type);
                window.location.reload();
                setMessage(response?.data?.message);
                setStatus(201);
            } else {
                setMessage("Authentication Failed");
                setStatus(403);
            }
            setSnackbar(true);
        }
        console.log(response?.data?.data?.user_type);
    }, [response]);

    const loginAPI = async (payload: LoginBody) => {

        return await axiosClient
            .post(`auth/login`, payload)
            .then((response: any) => setResponse(response))
            .catch((error: any) => setResponse(error.response));
    }

    const login = (event: any) => {
        event.preventDefault();
        console.log(email + " : " + password);
        const loginBody = {
            email: email,
            password: password
        } as LoginBody;
        loginAPI(loginBody);
    }

    return (
        <div className="page-wrapper" >
            <div
                className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
                <div className="d-flex align-items-center justify-content-center w-100">
                    <div className="row justify-content-center w-100">
                        <div className="col-md-6 col-lg-4 col-xxl-3">
                            <div className="card mb-0">
                                <div className="card-body">
                                    <a href="./index.html" className="text-nowrap logo-img text-center d-block py-1 w-100">
                                        <img src="./assets/images/logos/instade_logo.png" width="150" alt="" />
                                    </a>
                                    <p className="text-center">Compliance Made Easy</p>
                                    <form onSubmit={login}>
                                        <div className="mb-3">
                                            <label className="form-label">Email Id</label>
                                            <input onChange={(e: any) => setEmail(e.target.value)} value={email} type="email" className="form-control" aria-describedby="emailHelp" />
                                        </div>
                                        <div className="mb-4">
                                            <label className="form-label">Password</label>
                                            <input onChange={(e: any) => setPassword(e.target.value)} value={password} type="password" className="form-control" />
                                        </div>
                                        <div className="d-none d-flex mb-4" style={{ justifyContent: "flex-end", }}>
                                            <a className="text-primary fw-bold" href="./index.html">Forgot Password ?</a>
                                        </div>
                                        <button type='submit' className="btn btn-primary w-100 py-8 fs-4 mb-2 rounded-2">Sign In</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {snackbar !== false ? (
                <IRCSnackbar
                    open={snackbar}
                    setOpen={setSnackbar}
                    message={message}
                    status={status} />
            ) : null}
        </div>
    );
}

export default LoginPage;
