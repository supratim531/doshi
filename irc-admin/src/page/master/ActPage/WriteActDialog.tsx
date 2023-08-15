import React from 'react';
import { addAct, updateAct } from '../../../network/act';

import { Grid } from "@mui/material";

import { EditText, EditTextDropdown } from '../../../component/EditText';
import WriteDialog from '../../../component/WriteDialog';
import IRCSnackbar from '../../../component/IRCSnackbar';

import { Act, ActBody, WriteActResponse } from '../../../model/act';
import { SimpleRegulator } from '../../../model/regulator';

import { allRegulatorSimple } from '../../../network/regulator';


type Props = {
    dialogState?: boolean;
    setDialogState?: any;
    act?: Act | any;
    setAct?: any;
    onSuccessButtonClick: any;
};

const WriteActDialog = ({dialogState, setDialogState, act, setAct, onSuccessButtonClick} : Props) => {
    
	const [name, setName] = React.useState<string>("");
    const [regulator, setRegulator] = React.useState<number | null>(null);
    const [remarks, setRemarks] = React.useState<string | null>(null);

    const [simpleRegulator, setSimpleRegulator] = React.useState<SimpleRegulator | null>(null);
    
    const [simpleRegulators, setSimpleRegulators] = React.useState<SimpleRegulator[]>([])

    const [response, setResponse] = React.useState<WriteActResponse | null>(null);
    const [snackbar, setSnackbar] = React.useState(false);

    React.useEffect(() => {
        allRegulatorSimple(setSimpleRegulators);
    }, [])
    

    React.useEffect(() => {

        if(act != null){
            setName(act.name);
            const sr = {
                id: act.regulator.id,
                name: act.regulator.name
            } as SimpleRegulator;
            setRegulator(act.regulator.id);
            setSimpleRegulator(sr);
            setRemarks(act.remarks);
        }

    }, []);

    const onRegulatorSelected = (simple_regulator: SimpleRegulator|null) => {
        setSimpleRegulator(simple_regulator);
        if(simple_regulator == null){
            setRegulator(null);
        }else{
            setRegulator(simple_regulator.id);
        }
    }

    React.useEffect(() => {
        if(response !== null){
            setSnackbar(true);
            if(response.status === 201 || response.status === 202){
                onSuccessButtonClick();
                if(act === null){
                    clear();
                }
                
            }
        }
    }, [response]);


    

    function successBtnClick() {
        if(act != null){
            const actRequest = {
                id: act.id,
                name: name,
                regulator_id: regulator,
                remarks: remarks
            } as ActBody;

            console.log(actRequest);
            updateAct(actRequest, setResponse);
        }
        else{
            const actRequest = {
                name: name,
                regulator_id: regulator,
                remarks: remarks
            } as ActBody;
            addAct(actRequest, setResponse);
        }
    }

    const clear = () => {
        setAct(null);
        setName("");
        setSimpleRegulator(null);
        setRegulator(null);
        setRemarks(null);
    }

    const cancel = () => {
        clear();

        setResponse(null);
        setSnackbar(false);
    }


	return(
		<WriteDialog
            title={act?"Update Act":"Add Act"}
            dialogState={dialogState}
            setDialogState={setDialogState}
            successText={act?"Update":"Add"}
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
                    placeholder="e.g. Company Act, 2013"
                    value={name}
                    setStateValue={setName}
                    md={6}
                    required
                />

                <EditTextDropdown
                    label="Regulator"
                    placeholder="e.g. Income Tax"
                    value={simpleRegulator}
                    onChange={onRegulatorSelected}
                    md={6}
                    options={simpleRegulators}
                    required
                />

                <EditText
                    label="Remarks"
                    value={remarks}
                	setStateValue={setRemarks}
                    placeholder={name?"Write something about "+name+"...":null}
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

export default WriteActDialog;