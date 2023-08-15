import React from 'react';
import { addRegulator, updateRegulator } from '../../../network/regulator';

import { Alert, Grid, Collapse } from "@mui/material";

import WriteDialog from '../../../component/WriteDialog';
import { EditText, EditTextColor } from '../../../component/EditText';
import IRCSnackbar from '../../../component/IRCSnackbar';


import { Regulator, RegulatorBody, WriteRegulatorResponse } from '../../../model/regulator';

type Props = {
    dialogState?: boolean;
    setDialogState?: any;
    regulator?: Regulator | any;
    setRegulator?: any;
    onSuccessButtonClick?: any;
};

const WriteRegulatorDialog = ({dialogState, setDialogState, regulator, setRegulator, onSuccessButtonClick} : Props) => {
	
    const [name, setName] = React.useState<string>("");
    const [color, setColor] = React.useState<string>("#1976d2");
    const [variable, setVariable] = React.useState<string>("");
    const [remarks, setRemarks] = React.useState<string | null>(null);

    const [response, setResponse] = React.useState<WriteRegulatorResponse | null>(null);
    const [snackbar, setSnackbar] = React.useState(false);


    // SETTING DATA TO TEXTFIELDS IF IT IS UPDATE
    React.useEffect(() => {

        if(regulator != null){
            setName(regulator.name);
            setColor(regulator.color_code);
            setVariable(regulator.variable);
            setRemarks(regulator.remarks);
        }

    }, []);

    
    React.useEffect(() => {
        if(response !== null){
            setSnackbar(true);
            if(response.status === 201 || response.status === 202){
                onSuccessButtonClick();
                if(regulator === null){
                    clear();
                }
                
            }
        }
    }, [response]);


    
    function successBtnClick() {

        if(regulator != null){
            const updateRegulatorBody = {
                id: regulator.id,
                name: name,
                color_code: color,
                variable: variable,
                remarks: remarks
            } as RegulatorBody;

            updateRegulator(updateRegulatorBody, setResponse);
        }
        else{
            const addRegulatorBody = {
                name: name,
                color_code: color,
                variable: variable,
                remarks: remarks
            } as RegulatorBody;

            addRegulator(addRegulatorBody, setResponse);
        }

    }

    function clear(){
        setRegulator(null);
        setName("");
        setColor("#1976d2");
        setVariable("");
        setRemarks("");
    }

    const cancel = () => {
        clear();
        setResponse(null);
        setSnackbar(false);
    }

	return(
		<WriteDialog
            title={regulator?"Update Regulator":"Add Regulator"}
            dialogState={dialogState}
            setDialogState={setDialogState}
            successText={regulator?"Update":"Add"}
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
                    placeholder="e.g. Income Tax"
                    value={name}
                    setStateValue={setName}
                    md={6}
                    required
                />

                <EditTextColor
                    label="Color"
                    value={color}
                    setStateValue={setColor}
                    md={6}
                    required
                />

                <EditText
                    label="Variable"
                    placeholder="e.g. 'gst' for GST"
                    value={variable}
                    setStateValue={setVariable}
                    md={12}
                    required
                />

                <EditText
                    label="Remarks"
                    value={remarks}
                	setStateValue={setRemarks}
                    placeholder={name?"Write something about "+name+"...":null}
                    md={12}
                    multiline
                    minRows={4}
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

export default WriteRegulatorDialog;