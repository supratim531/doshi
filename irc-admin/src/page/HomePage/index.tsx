import React from 'react';

import { axiosClient } from '../../network/axiosClient';

import {
  Box,
  Button,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

import DashboardComponent from './DashboardComponent';

export interface DashboardContentResponse {
  status: number
  message: string
  data: DashboardContent
}

export interface DashboardContent {
  user_count: number
  record_count: number
  record_odd: number
  record_even: number
  business_count: number
}

const DashboardPage = () => {

    const [response, setResponse] = React.useState<DashboardContent | null>(null);

    const getDashboard = async (payload: any) => {
    
        return await axiosClient
          .get(`dashboard/admin`, payload)
          .then((response: any) => setResponse(response.data.data))
          .catch((error: any) => setResponse(error.response.data));
    }

    React.useEffect(() => {
        getDashboard(true);
    }, [])
	
    const [name, setName] = React.useState<string|null>(null)

    React.useEffect(() => {
        var full_name = localStorage.getItem('name')
        if(full_name !== null){
            setName(full_name.split(" ")[0])
        }
    }, [])


    return(
		<Box
            p={2} 
            sx={{backgroundColor: 'white',borderRadius: 1}}>
          	<CardHeader 
                title={
                    <Box>
                        <Typography variant="h5" sx={{fontWeight: 'bold'}}>Hello Admin</Typography>
                        <Typography variant="body2">Here's what's happening with your admin panel today.</Typography>
                    </Box>
                }
            />
            <CardContent>

                {
                    response!==null?(
                        <Grid container pt={1} spacing={2}>
                            <DashboardComponent title="No. of Users Registered" data={response.user_count} />

                            <DashboardComponent title="No. of Records" data={response.record_count} />

                            <DashboardComponent title="No. of ODD Compliance" data={response.record_odd} />

                            <DashboardComponent title="No. of EVEN Compliance" data={response.record_even} />

                            <DashboardComponent title="No. of Business Created" data={response.business_count} />

                            
                        </Grid>                                    
                    ):null
                }

            </CardContent>

            
        </Box>
	);
}

export default DashboardPage;