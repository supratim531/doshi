import React from "react";
import { axiosClient } from '../../network/axiosClient';

import { Grid } from "@mui/material";

import { EditText } from "../EditText";
import WriteDialog from "../WriteDialog";
import IRCSnackbar from '../IRCSnackbar';

import IRCMultipleDropDown from "../IRCMultipleDropDown";
import { TaxPayer, TaxPayerBody, WriteTaxPayerResponse, SimpleTaxPayer } from "../../model/taxPayer";
import { UserDataFieldBody } from '../../model/dataField';

type Props = {
    dialogState?: boolean;
    setDialogState?: any;
    dataField: UserDataFieldBody | null;
    setDataField: any;
    onSuccessButtonClick: any;
};

const WriteUserData = ({ dialogState, setDialogState, dataField, setDataField, onSuccessButtonClick }: Props) => {
    const [name, setName] = React.useState<string>("");
    const [placeholder, setPlaceholder] = React.useState<String | null>("");
    const [variable, setVariable] = React.useState("");
    const [priority, setPriority] = React.useState(0);
    const [isEditable, setisEditable] = React.useState(0);
    const [remarks, setRemarks] = React.useState<string | null>(null);
    
    const [snackbar, setSnackbar] = React.useState(false);
    const [response, setResponse] = React.useState<WriteTaxPayerResponse | null>(null);

    React.useEffect(() => {

        if (dataField !== null) {
            console.log(dataField)
            setName(dataField.name);
            setPlaceholder(dataField.placeholder);
            setVariable(dataField.variable);
            setPriority(dataField.priority);
            setisEditable(dataField.isEditable);
            setRemarks(dataField.remarks);
            
        }
    }, [])

    function clear() {
        setName("");
        setPlaceholder("");
        setVariable("");
        setPriority(0);
        setRemarks("");
        setisEditable(0);
        setDataField(null);
    }

    React.useEffect(() => {
        if (response !== null) {
            setSnackbar(true);
            if (response.status === 201 || response.status === 202) {
                onSuccessButtonClick();
                if (dataField === null) {
                    clear();
                }

            }
        }
    }, [response]);

    const addDataField = async (payload: UserDataFieldBody) => {

        return await axiosClient
            .post(`data/user`, payload)
            .then((response: any) => setResponse(response.data))
            .catch((error: any) => setResponse(error.response.data));
    }

    const updateField=async(payload:UserDataFieldBody)=>{
        return await axiosClient
            .post(`data/user/update`, payload)
            .then((response: any) => setResponse(response.data))
            .catch((error: any) => setResponse(error.response.data));
    }
   
    function successBtnClick() {

        if (dataField != null) {
            const dataFieldReq = {
                id: dataField.id,
                name: name,
                placeholder:placeholder,
                variable:variable,
                priority:priority,
                isEditable:isEditable,
                remarks: remarks
            } as UserDataFieldBody;
            
            updateField(dataFieldReq);
        } 
        else {
            const dataFieldReq = {
                name: name,
                placeholder: placeholder,
                variable: variable,
                priority: priority,
                isEditable:isEditable,
                remarks: remarks
            } as UserDataFieldBody;
            addDataField(dataFieldReq);
        }
            
    }

    const cancel = () => {
        clear()
        setResponse(null);
        setSnackbar(false);
    }


    return (
        <>
            <WriteDialog
            title={dataField ? "Update Data Field" : "Add Data Field"}
            dialogState={dialogState}
            setDialogState={setDialogState}
            successText={dataField ? "Update" : "Add"}
            onSuccess={successBtnClick}
            onCancel={cancel}
            >
            <Grid container pt={1} spacing={2}>
                <EditText
                    label="Name"
                    placeholder="e.g. CIN (Company Identification Number)"
                    value={name}
                    setStateValue={setName}
                    md={6}
                    required
                />
                <EditText
                    label="Placeholder"
                    placeholder="e.g. CIN (Company Identification Number)"
                    value={placeholder}
                    setStateValue={setPlaceholder}
                    md={6}
                    required
                />
                <EditText
                    label="Variable"
                    placeholder="e.g. 'cin' for CIN"
                    value={variable}
                    setStateValue={setVariable}
                    md={6}
                    required
                />
                <EditText
                    label="Prioty Number"
                    placeholder="e.g. 5"
                    value={priority}
                    setStateValue={setPriority}
                    md={6}
                />
                <EditText
                    label="IsEditable"
                    placeholder="e.g. 5"
                    value={isEditable}
                    setStateValue={setisEditable}
                    md={6}
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
            {response !== null ? (
                <IRCSnackbar
                    open={snackbar}
                    setOpen={setSnackbar}
                    message={response?.message}
                    status={response?.status} />
            ) : null}

            </WriteDialog>
        </>
  )
}

export default WriteUserData