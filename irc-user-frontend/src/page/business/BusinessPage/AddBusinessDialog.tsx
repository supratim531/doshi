import React from "react";
import { axiosClient } from '../../../network/axiosClient';

import { Grid } from "@mui/material";

import { EditText, EditTextDropdown } from "../../../component/EditText";
import WriteDialog from "../../../component/WriteDialog";
import IRCSnackbar from '../../../component/IRCSnackbar';

import { useAppDispatch, useAppSelector } from "../../../reduxStore/hooks";

import { simpleTaxPayer } from "../../../network/store/taxPayer/simpleTaxPayer";

import { SimpleTaxPayer } from "../../../model/taxPayer";
import { BusinessBody, BusinessErrorResponse, WriteBusinessResponse } from '../../../model/business';

type Props = {
    dialogState: boolean;
    setDialogState?: any;
    onSuccessButtonClick: any;
};

const AddBusinessDialog = ({ dialogState, setDialogState, onSuccessButtonClick }: Props) => {
    const dispatch = useAppDispatch();

    const [name, setName] = React.useState("");
    const [pan, setPan] = React.useState("");
    const [taxPayer, setTaxPayer] = React.useState<SimpleTaxPayer | null>(null);
    const [taxPayers, setTaxPayers] = React.useState<SimpleTaxPayer[]>([]);

    const [cin, setCin] = React.useState("");

    const [response, setResponse] = React.useState<WriteBusinessResponse | null>(null);
    const [snackbar, setSnackbar] = React.useState(false);

    const simpleTaxPayerSlice = useAppSelector((state) => state.simpleTaxPayer);

    React.useEffect(() => {
        if(pan.length === 10){
           dispatch(simpleTaxPayer({ params: { pan: pan } } as any));
        }
    }, [pan])

    React.useEffect(() => {
        if(simpleTaxPayerSlice.taxPayerList !== undefined){
            setTaxPayers(simpleTaxPayerSlice.taxPayerList)
        }
    }, [simpleTaxPayerSlice]);


    

    function onTaxPayerSelected(taxPayer: SimpleTaxPayer | null) {
        setTaxPayer(taxPayer)
    }

    React.useEffect(() => {
        if(response !== null){
            setSnackbar(true);
            if(response.status === 201 || response.status === 202){
                onSuccessButtonClick();
                
                clear();

                setDialogState(false);
                
                
            }
        }
    }, [response]);

    const addBusiness = async (payload: any) => {
    
        return await axiosClient
            .post(`business/create`, payload)
            .then((response: any) => setResponse(response.data))
            .catch((error: any) => setResponse(error.response.data));
    }

    function successBtnClick() {

        const addBusinessRequest = {
            pan: pan,
            name: name,
            taxpayer_id: taxPayer?.id,
            cin: cin,
        } as BusinessBody;

        addBusiness(addBusinessRequest);
    }

    const clear = () => {
        setPan("");
        setName("");
        setTaxPayer(null);

    };

    return (
        <WriteDialog
            title={"Add Your Business"}
            dialogState={dialogState}
            setDialogState={setDialogState}
            successText={"Add"}
            onSuccess={successBtnClick}
            onCancel={clear}
        >
            <Grid container pt={1} spacing={2}>
                
                <EditText
                    label="PAN (Permanent Account Number)"
                    placeholder="e.g. XXXXXXXXXX"
                    value={pan}
                    setStateValue={setPan}
                    md={12}
                    required
                />

                <EditText
                    label="Name"
                    placeholder="e.g. Instade Business Services LLP"
                    value={name}
                    setStateValue={setName}
                    md={12}
                    required
                />

                {pan.length === 10 && pan[3] === 'C'?(
                    <EditText
                        label="CIN (Company Identification Number)"
                        placeholder="e.g. xxxxxxxxxxxxxxxx"
                        value={cin}
                        setStateValue={setCin}
                        md={12}
                        required
                    />
                ):null}

                {pan.length === 10?(

                    <EditTextDropdown
                        label="Tax Payer"
                        placeholder="e.g. Limited Liability Partnership"
                        value={taxPayer}
                        onChange={onTaxPayerSelected}
                        md={12}
                        options={taxPayers}
                        required
                    />

                ):null}
            
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

export default AddBusinessDialog;
