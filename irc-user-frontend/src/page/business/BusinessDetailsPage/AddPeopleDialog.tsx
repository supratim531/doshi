import React from "react";
import { axiosClient } from '../../../network/axiosClient';

import { Alert, Grid } from "@mui/material";

import { EditText, EditTextDropdown } from "../../../component/EditText";
import WriteDialog from "../../../component/WriteDialog";
import IRCSnackbar from '../../../component/IRCSnackbar';


import { AddBusinessUserBody, BusinessErrorResponse, AddBusinessUserBodyResponse } from '../../../model/business';

type Props = {
    businessId: number;
    dialogState: boolean;
    setDialogState?: any;
    onSuccessButtonClick: any;
};

const AddPeopleDialog = ({ businessId, dialogState, setDialogState, onSuccessButtonClick }: Props) => {

    const [email, setEmail] = React.useState("");

    const [response, setResponse] = React.useState<AddBusinessUserBodyResponse|null>(null);
    const [snackbar, setSnackbar] = React.useState(false);

    React.useEffect(() => {
        if(response !== null){
            setSnackbar(true);
            if(response.status === 201 || response.status === 202){
                onSuccessButtonClick();
                clear();
                
            }
        }
    }, [response]);

    const addBusinessUser = async (payload: AddBusinessUserBody) => {
    
        return await axiosClient
          .post(`business/add`, payload)
          .then((response: any) => setResponse(response.data))
          .catch((error: any) => setResponse(error.response.data));
    }
   

    function successBtnClick() {

        const addBusinessUserRequest = {
            id: businessId,
            email: email,
            role: 'admin',
        } as AddBusinessUserBody;

        addBusinessUser(addBusinessUserRequest);
        
    }

    const clear = () => {
        setEmail("");
    };

    return (
        <WriteDialog
            title={"Add Team Member"}
            dialogState={dialogState}
            setDialogState={setDialogState}
            successText={"Add"}
            onSuccess={successBtnClick}
            onCancel={clear}
        >
            <Grid container pt={1} spacing={2}>
                
                <EditText
                    label="Email Id"
                    placeholder="e.g. john@domain.com"
                    value={email}
                    setStateValue={setEmail}
                    md={12}
                    required
                />
            
            </Grid>

            {response!==null?(
                    <IRCSnackbar
                        open={snackbar}
                        setOpen={setSnackbar}
                        message={response?.message}
                        status={response?.status} />
                ):null}

        </WriteDialog>
    );
};

export default AddPeopleDialog;
