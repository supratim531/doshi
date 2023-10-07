import React from 'react';
import { axiosClient } from '../../../network/axiosClient';

import { Box, Button, Grid, CardContent, CardHeader, Typography, TextField} from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';

import MasterHeader from "../../../component/MasterHeader";
import TableComponent from "../../../component/TableComponent";
import IRCSnackbar from '../../../component/IRCSnackbar';

import { EditText } from "../../../component/EditText";

import { useAppDispatch, useAppSelector } from "../../../reduxStore/hooks";

import { allThreshold } from "../../../network/store/threshold/allThreshold";
import { allBusinessUser } from "../../../network/store/business/allBusinessUser";

import { Threshold, SimpleThresholdBody } from '../../../model/threshold';
import { 
	Business, 
	BusinessUser, 
	BusinessUserBody, 
	WriteBusinessThreshold, 
	BusinessIdBody, 
	WriteResponse,
	BusinessThreshold,
	BusinessThresholdResponse
} from '../../../model/business';

import AddPeopleDialog from './AddPeopleDialog';

import BusinessDetails from './business_details/BusinessDetails';

import FinancialDetails from './FinancialDetails';

import RegulatorDetails from './regulator_details/RegulatorDetails';

const columns = [
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        accessorKey: "role",
        header: "Role"
    },
    {
        accessorKey: "email",
        header: "Email"
    },
];


const BusinessDetailsPage = () => {

	const {state} = useLocation();
	const business: Business = state; 

	const navigate = useNavigate()
	const dispatch = useAppDispatch();
	
	const [businessUsers, setBusinessUsers] = React.useState<BusinessUser[]>([]);
	const allBusinessUserSlice = useAppSelector((state) => state.allBusinessUser);

	const [addPeopleDialog, setAddPeopleDialog] = React.useState(false); 

	const [thresholds, setThresholds] = React.useState<BusinessThreshold[]>([]);

	const [response, setResponse] = React.useState<WriteResponse | null>(null);
    const [snackbar, setSnackbar] = React.useState(false);

	React.useEffect(() => {
        if(allBusinessUserSlice.businessUserList.data !== undefined){
            setBusinessUsers(allBusinessUserSlice.businessUserList.data)
        }
    }, [allBusinessUserSlice]);
	
    React.useEffect(() => {

    	if(business === null){
    		navigate('/business');
    	}

    	if(business?.id !== undefined){
    		const businessUserBody = {
    			id: business.id,
    		} as BusinessUserBody
    		dispatch(allBusinessUser(businessUserBody));
    	}
    }, []);


    React.useEffect(() => {
        if(response !== null){
            setSnackbar(true);
            
        }
    }, [response]);

    const updateBusinessThreshold = async (payload: WriteBusinessThreshold) => {
        
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
    		thresholds: thresholdString,
    	} as WriteBusinessThreshold;

    	updateBusinessThreshold(writeBusinessThresholdBody);
    }


    const refreshBusinessUser = () => {
    	const businessUserBody = {
    		id: business.id,
    	} as BusinessUserBody
    	dispatch(allBusinessUser(businessUserBody));
    }

	return(

			<Grid
				spacing={2} 
				container>
				<Grid
					md={7}
					sm={12}
					item>
					<Box 
						p={2}
						sx={{ 
							backgroundColor: "white", 
							borderRadius: 1, 
							minHeight: '80vh', 
						}}>
						<CardHeader
                            title={
                                <Typography variant="h4">{business?.name}</Typography>
                            }
                        />

                        <CardContent>
													
													<RegulatorDetails business={business} />

                        	<BusinessDetails business={business} />
                        	
                        	<FinancialDetails business={business} />
                        
                        </CardContent>

					</Box>
				</Grid>

				<Grid
					md={5}
					sm={12}
					item>
					<Box 
						p={2}
						sx={{ 
							backgroundColor: "white", 
							borderRadius: 1,  
						}}>
						<CardHeader
                            title={
                                <MasterHeader
                                    title="Team Members"
                                    onAddClick={() => setAddPeopleDialog(true)}
                                />
                            }
                        />
												

                        <CardContent>
                        	<TableComponent
                            columns={columns}
                            tableData={businessUsers} />
                        </CardContent>
					</Box>
				</Grid>

						{/*DIALOG*/}
                        {addPeopleDialog ? (
                            <AddPeopleDialog
                            	businessId={business?.id}
                                dialogState={addPeopleDialog}
                                setDialogState={setAddPeopleDialog}
                                onSuccessButtonClick={refreshBusinessUser}
                            />
                        ) : null}

                        {response!==null?(
			                    <IRCSnackbar
			                        open={snackbar}
			                        setOpen={setSnackbar}
			                        message={response?.message}
			                        status={response?.status} />
			                ):null}
			</Grid>
	);
}

export default BusinessDetailsPage;
