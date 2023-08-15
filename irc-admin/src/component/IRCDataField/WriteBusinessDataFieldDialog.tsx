import React from "react";
import { axiosClient } from '../../network/axiosClient';

import { Grid } from "@mui/material";

import { EditText } from "../EditText";
import WriteDialog from "../WriteDialog";
import IRCSnackbar from '../IRCSnackbar';


import { Regulator, SimpleRegulator } from "../../model/regulator";
import IRCMultipleDropDown from "../IRCMultipleDropDown";
import { TaxPayer, TaxPayerBody, WriteTaxPayerResponse, SimpleTaxPayer } from "../../model/taxPayer";
import { DataField, DataFieldBody } from '../../model/dataField';

import { allRegulatorSimple } from '../../network/regulator';
import { allTaxPayerSimple } from '../../network/taxpayer';

type Props = {
    dialogState?: boolean;
    setDialogState?: any;
    dataField: DataField | null;
    setDataField: any;
    onSuccessButtonClick: any;
};

const WriteBusinessDataField = ({ dialogState, setDialogState, dataField, setDataField, onSuccessButtonClick }: Props) => {

    const [regulators, setRegulators] = React.useState<SimpleRegulator[]>([]);
    const [taxPayers, setTaxPayers] = React.useState<SimpleTaxPayer[]>([]);

    React.useEffect(() => {
        allRegulatorSimple(setRegulators);
        allTaxPayerSimple(setTaxPayers);
    }, []);

    // React.useEffect(() => {
    //     if (allRegulatorSimpleSlice.regulatorList !== undefined) {
    //       setRegulators(allRegulatorSimpleSlice.regulatorList);
    //     }
    // }, [allRegulatorSimpleSlice]);

    // React.useEffect(() => {
    //     if(allTaxPayerSimpleSlice.taxPayerList !== undefined){
    //         setTaxPayers(allTaxPayerSimpleSlice.taxPayerList)
    //     }
    // }, [allTaxPayerSimpleSlice]);

    const [name, setName] = React.useState<string>("");
    const [panLetter, setPanLetter] = React.useState<string>("");
    const [placeholder, setPlaceholder] = React.useState<string | null>(null);
    const [variable, setVariable] = React.useState("");
    const [priority, setPriority] = React.useState(0);
    const [regulator, setRegulator] = React.useState<SimpleRegulator[]>([]);
    const [taxPayer, setTaxPayer] = React.useState<SimpleTaxPayer[]>([]);
    const [remarks, setRemarks] = React.useState<string | null>(null);

    const [response, setResponse] = React.useState<WriteTaxPayerResponse | null>(null);
    const [snackbar, setSnackbar] = React.useState(false);

    React.useEffect(() => {
        console.log('useEffect: DataField:', dataField);

        if (dataField !== null) {
            setName(dataField.name);
            setPlaceholder(dataField.placeholder);
            setVariable(dataField.variable);
            setRemarks(dataField.remarks);
            setTaxPayer(dataField.tax_payers as SimpleTaxPayer[])
            setRegulator(dataField.regulators as SimpleRegulator[]);
        }
    }, [])

    const onRegulatorSelected = (simpleRegulator: SimpleRegulator[]) => {
        setRegulator(simpleRegulator);
    };

    const onTaxPayerSelected = (simpleTaxPayer: SimpleTaxPayer[]) => {
        setTaxPayer(simpleTaxPayer)
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

    React.useEffect(() => {
        allTaxPayerSimple(setTaxPayers);
    }, []);

    const addDataField = async (payload: DataFieldBody) => {

        return await axiosClient
            .post(`data`, payload)
            .then((response: any) => setResponse(response.data))
            .catch((error: any) => setResponse(error.response.data));
    }

    const updateTaxPayer = async (payload: TaxPayerBody) => {

        return await axiosClient
            .post(`taxpayer/update`, payload)
            .then((response: any) => setResponse(response.data))
            .catch((error: any) => setResponse(error.response.data));
    }

    function successBtnClick() {
        console.log('onUpdate: DataField:', dataField);
        const selectedRegulator = regulator.map((item) => item.id).toString();
        const selectedTaxPayer = taxPayer.map((item) => item.id).toString();

        if (dataField != null) {
            const dataFieldReq = {
                id: dataField.id,
                name: name,
                pan_letter: "G",
                regulators: selectedRegulator,
                remarks: remarks
            } as TaxPayerBody;
            updateTaxPayer(dataFieldReq);

        } else {
            const dataFieldReq = {
                name: name,
                placeholder: placeholder,
                variable: variable,
                priority: priority,
                regulators: selectedRegulator,
                tax_payers: selectedTaxPayer,
                remarks: remarks
            } as DataFieldBody;
            addDataField(dataFieldReq);
        }
    }

    function clear() {
        setName("");
        setPlaceholder("");
        setVariable("");
        setPriority(0);
        setRegulator([]);
        setTaxPayer([]);
        setRemarks("");

        setDataField(null);
    }

    const cancel = () => {
        clear()
        setResponse(null);
        setSnackbar(false);
    }

    return (
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
                    placeholder="e.g. Enter your CIN..."
                    value={placeholder}
                    setStateValue={setPlaceholder}
                    md={6}
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

                <IRCMultipleDropDown
                    label="Regulator"
                    placeholder="e.g. Regulator"
                    value={regulator}
                    onChange={onRegulatorSelected}
                    options={regulators}
                    md={12}
                    required
                />

                <IRCMultipleDropDown
                    label="Tax Payer"
                    placeholder="e.g. Limited Liability Partnership"
                    value={taxPayer}
                    onChange={onTaxPayerSelected}
                    options={taxPayers}
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

            {response !== null ? (
                <IRCSnackbar
                    open={snackbar}
                    setOpen={setSnackbar}
                    message={response?.message}
                    status={response?.status} />
            ) : null}

        </WriteDialog>
    );
};

export default WriteBusinessDataField;
