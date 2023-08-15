import React from 'react';

import { Grid } from "@mui/material";

import { EditText } from '../../../component/EditText';
import WriteDialog from '../../../component/WriteDialog';
import IRCSnackbar from '../../../component/IRCSnackbar';

import { Threshold, ThresholdBody, WriteThresholdResponse } from '../../../model/threshold';
import { addThreshold, updateThreshold } from '../../../network/threshold';

type Props = {
    dialogState?: boolean;
    setDialogState?: any;
    threshold?: Threshold | any;
    setThreshold?: any;
    onSuccessButtonClick: any;
};

const WriteThresholdDialog = ({dialogState, setDialogState, threshold, setThreshold, onSuccessButtonClick} : Props) => {

	const [name, setName] = React.useState<string>("");
    const [variable, setVariable] = React.useState<string>("");
    const [remarks, setRemarks] = React.useState<string | null>(null);

    const [response, setResponse] = React.useState<WriteThresholdResponse | null>(null);
    const [snackbar, setSnackbar] = React.useState(false);

    React.useEffect(() => {

        if(threshold !== null){
            setName(threshold.name);
            setVariable(threshold.variable);
            setRemarks(threshold.remarks);
        }

    }, []);

    React.useEffect(() => {
        if(response !== null){
            setSnackbar(true);
            if(response.status === 201 || response.status === 202){
                onSuccessButtonClick();
                if(threshold === null){
                    clear();
                }
                
            }
        }
    }, [response]);


    function successBtnClick() {
        if(threshold !== null){
            const thresholdRequest = {
                id: threshold.id,
                name: name,
                variable: variable,
                remarks: remarks
            } as ThresholdBody;
            updateThreshold(thresholdRequest, setResponse);
        }
        else{
            const thresholdRequest = {
                name: name,
                variable: variable,
                remarks: remarks
            } as ThresholdBody;
            addThreshold(thresholdRequest, setResponse);
        }
    }

    function clear(){
        setThreshold(null);
        setName("");
        setVariable("");
        setRemarks(null);
    }

    const cancel = () => {
        clear();

        setResponse(null);
        setSnackbar(false);
    }

	return(
		<WriteDialog
            title={threshold?"Update Threshold":"Add Threshold"}
            dialogState={dialogState}
            setDialogState={setDialogState}
            successText={threshold?"Update":"Add"}
            onSuccess={successBtnClick}
            onCancel={cancel}
        >

        	<Grid
                container
                pt={1}
                spacing={2}
            >

                <EditText
                    label="Name"
                    placeholder="e.g. Turnover"
                    value={name}
                    setStateValue={setName}
                    md={6}
                    required
                />

                <EditText
                    label="Variable"
                    placeholder="e.g. 'turnover' for Turnover"
                    value={variable}
                    setStateValue={setVariable}
                    md={6}
                    required
                />

                <EditText
                    label="Remarks"
                    placeholder={"Write something about " + name}
                    value={remarks}
                    setStateValue={setRemarks}
                    md={12}
                    multiline
                    minRows={5}
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
}

export default WriteThresholdDialog;