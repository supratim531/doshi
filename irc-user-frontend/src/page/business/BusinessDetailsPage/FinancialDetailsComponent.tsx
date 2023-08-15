import React from 'react';

import { axiosClient } from '../../../network/axiosClient';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box, Button, Grid, TextField } from "@mui/material";

import { 
	Business, 
	BusinessIdBody, 
	WriteResponse,
	BusinessThreshold,
	BusinessThresholdResponse
} from '../../../model/business';

import IRCSnackbar from '../../../component/IRCSnackbar';

import { FinancialYear } from '../../../model/financialYear';

type FinancialDetailsComponentProps = {
	business: Business,
    financialYear: FinancialYear,
}

const FinancialDetailsComponent = ({
	business,
    financialYear
}: FinancialDetailsComponentProps) => {

	const navigate = useNavigate();

    const [thresholds, setThresholds] = React.useState<BusinessThreshold[]>([]);

    const [response, setResponse] = React.useState<WriteResponse | null>(null);
    const [snackbar, setSnackbar] = React.useState(false);

    const getAllBusinessThreshold = async (payload: any) => {
        
        return await axiosClient
            .post(`business/my/threshold`,payload)
            .then((response: any) => setThresholds(response.data.data))
            .catch((error: any) => setThresholds(error.response.data));
    }

	React.useEffect(() => {

    	if(business === null){
    		navigate('/business');
    	}

    	if(business?.id !== undefined){
    		
    		const businessIdBody = {
    			id: business.id,
                financial_year_id: financialYear.id
    		} as any;

    		getAllBusinessThreshold(businessIdBody);
    	}
    }, []);

    const setValueInAccounts = (data: number, index: number) => {

    	const newState = thresholds.map((threshold: BusinessThreshold, ind: number) => {
	      	if (ind === index) {
	        	return {...threshold, value: data};
	      	}
	      	return threshold;
	    });

    	setThresholds(newState);
    }

    React.useEffect(() => {
        if(response !== null){
            setSnackbar(true);
            
        }
    }, [response]);
    
    const updateBusinessThreshold = async (payload: any) => {
        
        return await axiosClient
            .post(`business/my/threshold/update`,payload)
            .then((response: any) => setResponse(response.data))
            .catch((error: any) => setResponse(error.response.data));
    }

    const saveAccounts = () => {
        var thresholdString = ""
        thresholds.map((threshold: BusinessThreshold, index: number) => {
            
            thresholdString += threshold.id + ":" + threshold.value;
            if(index < thresholds.length - 1){
                thresholdString += ","
            }
        });

        const writeBusinessThresholdBody = {
            id: business.id,
            financial_year_id: financialYear.id,
            thresholds: thresholdString,
        } as any;

        updateBusinessThreshold(writeBusinessThresholdBody);
    }

    console.log("APNA COLLEGE - Financial:", thresholds);

	return(
		<Grid 
            py={1}
            container 
            spacing={2}>
			
            {
                thresholds?.map((threshold: BusinessThreshold, index: number) => {
                    return(

                        <Grid
                            md={6}
                            sm={6}
                            item
                        >
                            <TextField
                                label={threshold.name}
                                variant="outlined"
                                size="medium"
                                value={threshold.value === null ? '' : threshold.value}
                                placeholder={"e.g. 10000"}
                                onChange={(e) => setValueInAccounts(Number(e.target.value), index)}
                                fullWidth
                                required
                            />
                        </Grid>
               
                    )
                })
            }

            <Grid
                md={12}
                sm={12}
                item
                sx={{
                    display: 'flex',
                }}
            >
                <Box sx={{flexGrow: 1,}}></Box>
                <Button
                    onClick={saveAccounts}
                    sx={{
                        marginLeft: 'auto',
                    }}
                    variant="contained">
                    Save
                </Button>
            </Grid>
            {response!==null?(
                <IRCSnackbar
                    open={snackbar}
                    setOpen={setSnackbar}
                    message={response?.message}
                    status={response?.status} />
            ):null}
		</Grid>
	)
}

export default FinancialDetailsComponent;