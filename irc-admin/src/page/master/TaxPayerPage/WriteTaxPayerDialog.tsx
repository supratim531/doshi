import React from "react";
import { axiosClient } from '../../../network/axiosClient';

import { Grid } from "@mui/material";

import { EditText } from "../../../component/EditText";
import WriteDialog from "../../../component/WriteDialog";
import IRCSnackbar from '../../../component/IRCSnackbar';


import { Regulator, SimpleRegulator } from "../../../model/regulator";
import { allRegulatorSimple } from '../../../network/regulator';

import IRCMultipleDropDown from "../../../component/IRCMultipleDropDown";
import { TaxPayer, TaxPayerBody, WriteTaxPayerResponse } from "../../../model/taxPayer";
import { addTaxPayer, updateTaxPayer } from '../../../network/taxpayer';

type Props = {
  dialogState?: boolean;
  setDialogState?: any;
  taxPayer: TaxPayer | null;
  setTaxPayer: any;
  onSuccessButtonClick: any;
};

const WriteTaxPayerDialog = ({ dialogState, setDialogState, taxPayer, setTaxPayer, onSuccessButtonClick }: Props) => {
    
    const [name, setName] = React.useState<string>("");
    const [panLetter, setPanLetter] = React.useState("");
    const [cinAbbreviations, setCinAbbreviations] = React.useState("");
    const [remarks, setRemarks] = React.useState<string | null>(null);
    const [regulators, setRegulators] = React.useState<SimpleRegulator[]>([]);
    const [regulator, setRegulator] = React.useState<SimpleRegulator[]>([]);
    
    const [response, setResponse] = React.useState<WriteTaxPayerResponse | null>(null);
    const [snackbar, setSnackbar] = React.useState(false);

    React.useEffect(() => {
        allRegulatorSimple(setRegulators);
    }, []);


    React.useEffect(() => {
        if(taxPayer !== null){
            setName(taxPayer.name);
            setPanLetter(taxPayer.pan_letter);
            setRemarks(taxPayer.remarks);

            var tempReg = [] as SimpleRegulator[];
            taxPayer.regulators.map((item) => {
                const reg = {
                    id: item.id,
                    name: item.name
                } as SimpleRegulator;
                tempReg.push(reg);
            });
            setRegulator(tempReg);
            console.log(regulator);
        }
    }, [taxPayer])

    const onRegulatorSelected = (simpleRegulator: SimpleRegulator[]) => {
        setRegulator(simpleRegulator);
    };

    React.useEffect(() => {
        if(response !== null){
            setSnackbar(true);
            if(response.status === 201 || response.status === 202){
                onSuccessButtonClick();
                if(taxPayer === null){
                    clear();
                }
                
            }
        }
    }, [response]);


    function successBtnClick() {
        const selectedRegulator = regulator.map((item) => item.id).toString();
        
        if (taxPayer != null) {
            const taxPayerReq = {
                id: taxPayer.id,
                name: name,
                pan_letter: panLetter,
                cin_three_letter:cinAbbreviations,
                regulators: selectedRegulator,
                remarks: remarks
            } as TaxPayerBody;
            updateTaxPayer(taxPayerReq, setResponse);

        } else {
            const taxPayerReq = {
                name: name,
                pan_letter: panLetter,
                cin_three_letter:cinAbbreviations,
                regulators: selectedRegulator,
                remarks: remarks
            } as TaxPayerBody;
            addTaxPayer(taxPayerReq, setResponse);
        }

    }

    function clear() {
        setName("");
        setPanLetter("");
        setCinAbbreviations("");
        setRegulator([]);
        setRemarks(null);
        setTaxPayer(null);
    }

    const cancel = () => {
        clear()

        setResponse(null);
        setSnackbar(false);
    }

    return (
        <WriteDialog
            title={taxPayer ? "Update Tax Payer" : "Add Tax Payer"}
            dialogState={dialogState}
            setDialogState={setDialogState}
            successText={taxPayer ? "Update" : "Add"}
            onSuccess={successBtnClick}
            onCancel={cancel}
        >
            <Grid container pt={1} spacing={2}>
                <EditText
                    label="Name"
                    placeholder="e.g. Sole Propritorship"
                    value={name}
                    setStateValue={setName}
                    md={12}
                    required
                />

                <EditText
                    label="PAN's 4th Letter"
                    placeholder="e.g. 'I'"
                    value={panLetter}
                    setStateValue={setPanLetter}
                    md={6}
                    required
                />

                <EditText
                    label="CIN 3 Letter Abbreviations"
                    placeholder="e.g. 'PTC'"
                    value={cinAbbreviations}
                    setStateValue={setCinAbbreviations}
                    md={6}
                />

                <IRCMultipleDropDown
                    label="Regulator"
                    placeholder="e.g. Regulator"
                    value={regulator}
                    onChange={onRegulatorSelected}
                    options={regulators}
                    md={12}
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
};

export default WriteTaxPayerDialog;
