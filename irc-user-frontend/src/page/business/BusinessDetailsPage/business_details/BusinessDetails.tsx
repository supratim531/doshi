import * as React from 'react';

import { Button, Box, Grid, Typography, TextField } from '@mui/material';

import { axiosClient } from '../../../../network/axiosClient';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from "../../../../reduxStore/hooks";

import { BusinessDataField, DFWriteResponse } from '../../../../model/dataField';
import IRCSnackbar from '../../../../component/IRCSnackbar';

export default function BusinessDetails({ business }: any) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [businessDataFields, setBusinessDataFields] = React.useState<BusinessDataField[]>([]);

    const [response, setResponse] = React.useState<DFWriteResponse | null>(null);
    const [snackbar, setSnackbar] = React.useState(false);

    const getAllBusinessThreshold = async (payload: any) => {

        return await axiosClient
            .post(`data/business`, payload)
            .then((response: any) => setBusinessDataFields(response.data.data))
            .catch((error: any) => setBusinessDataFields(error.response.data));
    }

    React.useEffect(() => {
        if (response !== null) {
            setSnackbar(true);

        }
    }, [response]);

    React.useEffect(() => {
        console.log(businessDataFields);
    }, [businessDataFields]);

    const updateBusinessDataField = async (payload: any) => {

        return await axiosClient
            .post(`data/business/update`, payload)
            .then((response: any) => setResponse(response.data))
            .catch((error: any) => setResponse(error.response.data));
    }

    React.useEffect(() => {

        if (business === null) {
            navigate('/business');
        }

        if (business?.id !== undefined) {

            const businessIdBody = {
                id: business.id
            } as any;

            getAllBusinessThreshold(businessIdBody);
        }
    }, []);

    const setValueInAccounts = (data: string, index: number) => {
        const newState = businessDataFields && businessDataFields.map((businessDataField: BusinessDataField, ind: number) => {
            if (ind === index) {
                return { ...businessDataField, value: data };
            }
            return businessDataField;
        });

        setBusinessDataFields(newState);
    }

    const saveAccounts = () => {
        var dataFieldString = ""
        businessDataFields && businessDataFields.map((dataField: BusinessDataField, index: number) => {

            dataFieldString += dataField.id + ":" + dataField.value;
            if (index < businessDataFields.length - 1) {
                dataFieldString += ","
            }
        });

        const writeBusinessDFBody = {
            id: business.id,
            data_field: dataFieldString,
        } as any;

        updateBusinessDataField(writeBusinessDFBody);
    }

    return (
        <Grid
            py={1}
            container
            spacing={2}>
            <Grid
                md={12}
                sm={12}
                item
                sx={{
                    display: 'flex',
                }}
            >
                <Box sx={{ flexGrow: 1, }}>
                    <Typography variant="h5">Business Details</Typography>
                </Box>
                <Button
                    onClick={saveAccounts}
                    sx={{
                        marginLeft: 'auto',
                    }}
                    variant="contained">
                    Save
                </Button>
            </Grid>

            {
                businessDataFields && businessDataFields.map((businessDataField: BusinessDataField, index: number) => {
                    return (

                        <Grid
                            md={6}
                            sm={6}
                            item
                        >
                            <TextField
                                label={businessDataField.name}
                                variant="outlined"
                                size="medium"
                                value={businessDataField.value === null ? '' : businessDataField.value}
                                onChange={(e) => setValueInAccounts(e.target.value, index)}
                                placeholder={businessDataField.placeholder === null ? '' : businessDataField.placeholder}
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
                    status={response?.status} />
            ) : null}
        </Grid>
    );
}
