import React, { useEffect, useState } from "react";
import { axiosClient } from "../../network/axiosClient";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import IRCSnackbar from "../../component/IRCSnackbar";

const Profile = () => {
    const [load, setLaod] = useState(false);
    const [response, setResponse] = useState(null);
    const [snackbar, setSnackbar] = React.useState(false);
    const [userDataField, setUserDataField] = useState([]);

    const dataLoad = () => {
        setLaod(true);
        profileData()
            .then((res) => {
                setUserDataField(res.data.data)
                setLaod(false)
            })
            .catch((err) => {
                console.log(err)
                setLaod(false)
            })
    }

    const setValueInAccounts = (value, index) => {
        const newState = userDataField && userDataField.map((userDataField, ind) => {
            if (ind === index) {
                return { ...userDataField, value: value };
            }
            return userDataField;
        });

        setUserDataField(newState);
    }

    useEffect(() => {
        dataLoad()
    }, []);

    React.useEffect(() => {
        if (response !== null) {
            setSnackbar(true);

        }
    }, [response]);

    const profileData = async () => {
        const data = await axiosClient.post(`data/user/data`)
        return data
    }

    const updateUserDataField = async payload => {
        return await axiosClient
            .post(`data/user/data/update`, payload)
            .then((response) => setResponse(response.data))
            .catch((error) => setResponse(error.response.data));
    }

    const updateUserDataFieldOnClick = () => {
        var dataFieldString = ""
        userDataField && userDataField.map((dataField, index) => {
            dataFieldString += dataField.id + ":" + dataField.value;
            if (index < userDataField.length - 1) {
                dataFieldString += ","
            }
        });

        const writeUserDFBody = {
            data_field: dataFieldString,
        };

        updateUserDataField(writeUserDFBody);
    }

    return (
        <Grid
            py={1}
            container
            spacing={2}>

            <Grid
                mb={4}
                md={12}
                sm={12}
                item
                sx={{
                    display: 'flex',
                }}
            >
                <Box sx={{ flexGrow: 1, }}>
                    <Typography variant="h5">My Profile</Typography>
                </Box>
                <Button
                    sx={{
                        marginLeft: 'auto',
                    }}
                    variant="contained"
                    onClick={updateUserDataFieldOnClick}
                >
                    Update
                </Button>
            </Grid>

            {
                userDataField && userDataField.map((userDataField, index) => {
                    return (
                        <Grid
                            md={4}
                            sm={6}
                            item
                        >
                            <TextField
                                disabled={userDataField.isEditable === 0}
                                label={userDataField.name}
                                variant="outlined"
                                size="medium"
                                value={userDataField.value === null ? '' : userDataField.value}
                                onChange={(e) => setValueInAccounts(e.target.value, index)}
                                placeholder={userDataField.placeholder === null ? '' : userDataField.placeholder}
                                fullWidth
                            />
                        </Grid>
                    )
                })
            }

            {response !== null ? (
                <IRCSnackbar
                    open={snackbar}
                    setOpen={setSnackbar}
                    message={response?.message}
                    status={response?.status}
                />
            ) : null}

        </Grid>
    );
}

export default Profile;
