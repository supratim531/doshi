import React from 'react';
import { axiosClient } from '../../../network/axiosClient';


import { Box, Checkbox, FormControlLabel, FormGroup, Grid, Typography } from "@mui/material";

import JoditEditor from 'jodit-react';

import { EditText, EditTextDropdown, EditTextFYDropdown } from "../../../component/EditText";
import IRCMultipleDropDown from "../../../component/IRCMultipleDropDown";

import WriteDialog from "../../../component/WriteDialog";
import IRCSnackbar from '../../../component/IRCSnackbar';


import { SimpleRegulator } from "../../../model/regulator";
import { SimpleAct, SimpleRegulatorActBody } from "../../../model/act";
import { SimpleSection, SimpleActSectionBody } from "../../../model/section";
import { SimpleForm } from "../../../model/form";

import { Record, RecordBody, WriteRecordResponse } from '../../../model/record';

import { SimpleTaxPayer } from '../../../model/taxPayer';


import { Threshold, ThresholdBody } from "../../../model/threshold";
import { FinancialYear } from "../../../model/financialYear";

import { Frequency } from '../../../model/frequency';

import { FormType } from "../../../model/form";

import IRCDatePicker from "../../../component/IRCDatePicker";
import dayjs from "dayjs";
import HTMLEditor from "../../../component/HTMLEditor";

import { allRegulatorSimple } from '../../../network/regulator';
import { allActSimple } from '../../../network/act';
import { allSectionSimple } from '../../../network/section';
import { allFormSimple } from '../../../network/form';
import { getAllFinancialYearAPI } from '../../../network/financial-year';
import { allTaxPayerSimple } from '../../../network/taxpayer';
import { getAllFrequencyAPI } from '../../../network/frequency';
import { CheckBox } from '@mui/icons-material';
import { getState } from '../../../network/state';
import { State } from '../../../model/state';


type Props = {
  dialogState?: boolean;
  setDialogState?: any;
  record?: Record | any;
  setRecord?: any;
  onSuccessButtonClick: any;
};

const formTypes = [
    {
        id: "odd",
        name: "ODD (On Due Date)",
    },
    {
        id: "even",
        name: "Even (Event Based)",
    },
] as FormType[];

const WriteRecordDialog = ({
    dialogState,
    setDialogState,
    record,
    setRecord,
    onSuccessButtonClick,
}: Props) => {

    const [regulators, setRegulators] = React.useState<SimpleRegulator[]>([]);
    const [acts, setActs] = React.useState<SimpleAct[]>([]);
    const [sections, setSections] = React.useState<SimpleSection[]>([]);
    const [forms, setForms] = React.useState<SimpleForm[]>([]);

    const [financialYears, setFinancialYears] = React.useState<FinancialYear[]>([]);

    const [taxPayers, setTaxPayers] = React.useState<SimpleTaxPayer[]>([]);

    const [frequencies, setFrequencies] = React.useState<Frequency[]>([]);

    const[willNotify,setWillNotify]=React.useState<boolean>(true);

    const [formType, setFormType] = React.useState<FormType | null>(null);
    const [regulator, setRegulator] = React.useState<SimpleRegulator | null>(null);
    const [act, setAct] = React.useState<SimpleAct | null>(null);
    const [section, setSection] = React.useState<SimpleSection | null>(null);
    const [form, setForm] = React.useState<SimpleForm | null>(null);

    const [financialYear, setFinancialYear] = React.useState<FinancialYear | null>(null);

    const [fromDate, setFromDate] = React.useState("");
    const [toDate, setToDate] = React.useState("");

    const [taxPayer, setTaxPayer] = React.useState<SimpleTaxPayer[]>([]);

    const [state, setState] = React.useState<State[]>([]);
    const [states, setStates] = React.useState<any[]>([]);
    
    const [actualDate, setActualDate] = React.useState("");

    const [frequency, setFrequency] = React.useState<Frequency | null>(null);

    const [threshold, setThreshold] = React.useState("");

    const [description, setDescription] = React.useState<string | null>(null);


    const [extendedDueDate1, setExtendedDueDate1] = React.useState("");
    const [extendedDueDateR1, setExtendedDueDateR1] = React.useState("");

    const [extendedDueDate2, setExtendedDueDate2] = React.useState("");
    const [extendedDueDateR2, setExtendedDueDateR2] = React.useState("");

    const [extendedDueDate3, setExtendedDueDate3] = React.useState("");
    const [extendedDueDateR3, setExtendedDueDateR3] = React.useState("");

    const [extendedDueDate4, setExtendedDueDate4] = React.useState("");
    const [extendedDueDateR4, setExtendedDueDateR4] = React.useState("");

    const [extendedDueDate5, setExtendedDueDate5] = React.useState("");
    const [extendedDueDateR5, setExtendedDueDateR5] = React.useState("");

    const [response, setResponse] = React.useState<WriteRecordResponse | null>(null);
    const [snackbar, setSnackbar] = React.useState(false);

    React.useEffect(() => {
        allRegulatorSimple(setRegulators);
        getAllFinancialYearAPI(setFinancialYears);
        allTaxPayerSimple(setTaxPayers);
        getAllFrequencyAPI(setFrequencies);
        getState(setStates)
    }, []);

    React.useEffect(() => {
        if(record !== null){

            const fa = {id: record.form.id, name: record.form.name} as SimpleForm;
            setForm(fa);

            const sr = {id: record.form.act.regulator.id, name: record.form.act.regulator.name} as SimpleRegulator;
            setRegulator(sr);
            const ft = formTypes.find(o => o.id === record.form_type) as FormType;
            setFormType(ft);
            const sa={id: record.form.act.id, name: record.form.act.name} as SimpleAct;
            setAct(sa)

            record?.states?.map((v:any,i:number)=>{
                setState(p=>[...p,v])
            })
            
            record.tax_payers?.map((v:State,i:number)=>{
                setTaxPayer(p=>[...p,v])
            })

            setExtendedDueDate1(record.extended_due_date_1)
            setExtendedDueDateR1(record.extended_due_date_remark_1)

            setExtendedDueDate2(record.extended_due_date_2)
            setExtendedDueDateR2(record.extended_due_date_remark_2)

            setExtendedDueDate3(record.extended_due_date_3)
            setExtendedDueDateR3(record.extended_due_date_remark_3)

            setExtendedDueDate4(record.extended_due_date_4)
            setExtendedDueDateR4(record.extended_due_date_remark_4)

            setExtendedDueDate5(record.extended_due_date_5)
            setExtendedDueDateR5(record.extended_due_date_remark_5)

            setDescription(record.description)
       
            const ss = {id: record.form.sections[0].id, name: record.form.sections[0].name} as SimpleSection;
            setSection(ss);

            setFinancialYear(record.financial_year);

            setFromDate(record.date_from);
            setToDate(record.date_to);

            setActualDate(record.actual_date);

            setFrequency(record.frequency);

            setThreshold(record.threshold);
        }
    }, []);
    
    const onFormTypeSelected = (formType: FormType | null) => {
        setFormType(formType);
    };

    const onRegulatorSelected = (simpleRegulator: SimpleRegulator | null) => {
        setRegulator(simpleRegulator);
        setActs([]);
        setAct(null)
        setSections([]);
        setSection(null);
        setForms([]);
        setForm(null);

        if (simpleRegulator !== null) {
            const simpleActBody = {
                regulator_id: simpleRegulator?.id,
            } as SimpleRegulatorActBody;
            allActSimple(simpleActBody, setActs);
        }
    };

    const onActSelected = (simpleAct: SimpleAct | null) => {
        setAct(simpleAct);
        setSections([]);
        setSection(null);
        setForms([]);
        setForm(null);
        if (simpleAct !== null) {
            const simpleSectionBody = {
                act_id: simpleAct.id,
            } as SimpleActSectionBody;
            allSectionSimple(simpleSectionBody, setSections);
        }
    };

    const onSectionSelected = (simpleSection: SimpleSection | null) => {
        setSection(simpleSection);
        setForms([]);
        setForm(null);
        if (simpleSection !== null) {
            const simpleFormBody = {
                sections: simpleSection.id,
            } as any;
            allFormSimple(simpleFormBody, setForms);
        }
    };

    const onFormSelected = (simpleForm: SimpleForm | null) => {
        setForm(simpleForm);
    };

    const onFYSelected = (fy: FinancialYear | null) => {
        setFinancialYear(fy);
    };

    const onTaxPayerSelected = (taxPayer: SimpleTaxPayer[]) => {
        setTaxPayer(taxPayer)
    }

    const onStateSelected = (state: State[]) => {
        setState(state)
    }

    const onFrequencySelected = (frequency: Frequency | null) => {
        setFrequency(frequency)
    }

    React.useEffect(() => {
        if(response !== null){
            setSnackbar(true);
            if(response.status === 201 || response.status === 202){
                onSuccessButtonClick();
                if(record === null){
                    clear();
                }
                
            }
        }
    }, [response]);

    const addRecord = async (payload: RecordBody) => {
        
        return await axiosClient
            .post(`record`,payload)
            .then((response: any) => setResponse(response.data))
            .catch((error: any) => setResponse(error.response.data));
    }
    console.log(record)

    const updateRecord = async (payload: RecordBody) => {
        
        return await axiosClient
            .post(`record/update`,payload)
            .then((response: any) => setResponse(response.data))
            .catch((error: any) => setResponse(error.response.data));
    }

    function successBtnClick() {
        const selectedTP = taxPayer.map((item) => item.id).toString();
        const selectedState = state.map((item) => item.id).toString();

        if (record != null) {
            
            const recordReq = {
                id: record.id,
                form_type: formType?.id,
                states:selectedState,
                form_id: form?.id,
                financial_year_id: financialYear?.id,
                date_from: fromDate,
                date_to: toDate,
                actual_date: actualDate,
                tax_payers: selectedTP,
                frequency_id: frequency?.id,
                willNotify:willNotify,
                threshold: threshold, 
                description: description,
                extended_due_date_1: extendedDueDate1,
                extended_due_date_remark_1: extendedDueDateR1,
                extended_due_date_2: extendedDueDate2,
                extended_due_date_remark_2: extendedDueDateR2,
                extended_due_date_3: extendedDueDate3,
                extended_due_date_remark_3: extendedDueDateR3,
                extended_due_date_4: extendedDueDate4,
                extended_due_date_remark_4: extendedDueDateR4,
                extended_due_date_5: extendedDueDate5,
                extended_due_date_remark_5: extendedDueDateR5,
            } as RecordBody;
            updateRecord(recordReq);
        } else {
            const recordReq = {
                form_type: formType?.id,
                form_id: form?.id,
                financial_year_id: financialYear?.id,
                date_from: fromDate,
                date_to: toDate,
                states:selectedState,
                actual_date: actualDate,
                tax_payers: selectedTP,
                frequency_id: frequency?.id,
                threshold: threshold, 
                willNotify:willNotify,
                description: description,
                extended_due_date_1: extendedDueDate1,
                extended_due_date_remark_1: extendedDueDateR1,
                extended_due_date_2: extendedDueDate2,
                extended_due_date_remark_2: extendedDueDateR2,
                extended_due_date_3: extendedDueDate3,
                extended_due_date_remark_3: extendedDueDateR3,
                extended_due_date_4: extendedDueDate4,
                extended_due_date_remark_4: extendedDueDateR4,
                extended_due_date_5: extendedDueDate5,
                extended_due_date_remark_5: extendedDueDateR5,
            } as RecordBody;
            addRecord(recordReq);
        }
    }

    const clear = () => {

        setRegulator(null);
        setRegulators([]);

        setAct(null);
        setActs([]);

        setSection(null);
        setSections([]);

        setForm(null);
        setForms([]);

        setDescription(null);
    }

    const cancel = () => {
        clear();

        setResponse(null);
        setSnackbar(false);
    }
    console.log(response)
    
    return (
        <WriteDialog
            title={record ? "Update Record" : "Add Record"}
            dialogState={dialogState}
            setDialogState={setDialogState}
            successText={record ? "Update" : "Add"}
            onSuccess={successBtnClick}
            onCancel={cancel}
        >
        
            <Grid container pt={1} spacing={2} md={12}>
                <EditTextDropdown
                    label="Compliance Type"
                    placeholder="e.g. ODD"
                    value={formType}
                    onChange={onFormTypeSelected}
                    options={formTypes}
                    md={12}
                    required
                />
                <EditTextDropdown
                    label="Regulator"
                    placeholder="e.g. Income Tax"
                    value={regulator}
                    onChange={onRegulatorSelected}
                    options={regulators}
                    md={6}
                    required
                />

                <EditTextDropdown
                    label="Act"
                    placeholder="e.g. Income Tax Act, 2010"
                    value={act}
                    onChange={onActSelected}
                    options={acts}
                    md={6}
                    required
                />

                <EditTextDropdown
                    label="Section"
                    placeholder="e.g. Section 24"
                    value={section}
                    onChange={onSectionSelected}
                    options={sections}
                    md={6}
                    required
                />

                <EditTextDropdown
                    label="Form"
                    placeholder="e.g. ITR-V"
                    value={form}
                    onChange={onFormSelected}
                    options={forms}
                    md={6}
                    required
                />


                <EditTextFYDropdown
                    label="Financial Year"
                    placeholder="e.g. Income Tax"
                    value={financialYear}
                    onChange={onFYSelected}
                    options={financialYears}
                    md={6}
                    required
                />

                <EditText
                    label="Assessment Year"
                    placeholder=""
                    value={financialYear !== null ? financialYear.assesment_year : ""}
                    setStateValue={() => {}}
                    md={6}
                    required
                    readOnly
                />

                {formType?.id === "odd"? (
                    <>
                        <IRCDatePicker 
                            label="From Date"
                            value={fromDate}
                            setStateValue={setFromDate}
                        />

                        <IRCDatePicker 
                            label="To Date"
                            value={toDate}
                            setStateValue={setToDate}
                        />    
                    </>
                ) : null}
                


                <IRCMultipleDropDown
                    label="Tax Payer"
                    placeholder="e.g. Limited Liability Partnership"
                    value={taxPayer}
                    onChange={onTaxPayerSelected}
                    options={taxPayers}
                    md={12}
                    required
                />

                <IRCMultipleDropDown
                    label="States"
                    placeholder="e.g. Delhi, Maharashtra, West Bengal ..."
                    value={state}
                    onChange={onStateSelected}
                    options={states}
                    md={12}
                    required
                />

                
                {formType?.id === "odd"? (
                    <IRCDatePicker 
                        label="Actual Due Date"
                        value={actualDate} 
                        setStateValue={setActualDate}
                    />
                ) : null}

                <EditTextDropdown
                    label="Frequency"
                    placeholder="e.g. Month"
                    value={frequency}
                    onChange={onFrequencySelected}
                    options={frequencies}
                    md={6}
                    required
                />

                <EditText
                    label="Days"
                    placeholder="e.g. 28"
                    value={frequency?.days?frequency?.days:0}
                    setStateValue={() => {}}
                    md={6}
                    required
                />

                <EditText
                    label="Months"
                    placeholder="e.g. 6"
                    value={frequency?.months?frequency?.months:0}
                    setStateValue={() => {}}
                    md={6}
                    required
                />

                <EditText
                    label="Years"
                    placeholder="e.g. 2"
                    value={frequency?.years?frequency?.years:0}
                    setStateValue={() => {}}
                    md={6}
                    required
                />

                <EditText
                    label="Hours"
                    placeholder="e.g. 48"
                    value={frequency?.hours?frequency?.hours:0}
                    setStateValue={() => {}}
                    md={6}
                    required
                />

                <EditText
                    label="Minutes"
                    placeholder="e.g. 120"
                    value={frequency?.minutes?frequency?.minutes:0}
                    setStateValue={() => {}}
                    md={6}
                    required
                />

                <EditText
                    label="Threshold"
                    value={threshold}
                    setStateValue={setThreshold}
                    placeholder={"e.g. turnover > 10000 and profit > 5000"}
                    multiline
                    minRows={4}
                />
                <Grid 
			        md={6}
                    sm={6}
                    xs={6}
			        item>
                <FormGroup>
                    <Typography>Will send notification ?</Typography>
                    <Box sx={{
                        display:"flex",
                        gap:3
                    }}>
                    <FormControlLabel  control={<Checkbox checked={willNotify?true:false} onClick={(e)=>setWillNotify(true)}/>} label="Yes" />
                    <FormControlLabel  control={<Checkbox checked={willNotify?false:true} value={false} onClick={(e)=>setWillNotify(false)}/>} label="No" />
                    </Box>
                </FormGroup>
                </Grid>

                <HTMLEditor
                    value={description}
                    setValue={setDescription}
                    placeholder={"Enter the description..."}
                    header="Description"
                    md={12}
                />
                
                <IRCDatePicker 
                    label="Extended Due Date 1"
                    value={extendedDueDate1}
                    setStateValue={setExtendedDueDate1}
                />

                <HTMLEditor
                    value={extendedDueDateR1}
                    setValue={setExtendedDueDateR1}
                    placeholder="Remarks..."
                    header={"1. Remarks"}
                    md={12}
                />

                <IRCDatePicker 
                    label="Extended Due Date 2"
                    value={extendedDueDate2} 
                    setStateValue={setExtendedDueDate2}
                />
                <HTMLEditor
                    value={extendedDueDateR2}
                    setValue={setExtendedDueDateR2}
                    placeholder="Remarks..."
                    header={"2. Remarks"}
                    md={12}
                />

                <IRCDatePicker 
                    label="Extended Due Date 3"
                    value={extendedDueDate3}
                    setStateValue={setExtendedDueDate3}
                />

                <HTMLEditor
                    value={extendedDueDateR3}
                    setValue={setExtendedDueDateR3}
                    placeholder="Remarks..."
                    header={"3. Remarks"}
                    md={12}
                />

                <IRCDatePicker 
                    label="Extended Due Date 4"
                    value={extendedDueDate4}
                    setStateValue={setExtendedDueDate4}
                />

                <HTMLEditor
                    value={extendedDueDateR4}
                    setValue={setExtendedDueDateR4}
                    placeholder="Remarks..."
                    header={"4. Remarks"}
                    md={12}
                />

                <IRCDatePicker 
                    label="Extended Due Date 5"
                    value={extendedDueDate5}
                    setStateValue={setExtendedDueDate5}
                />

                <HTMLEditor
                    value={extendedDueDateR5}
                    setValue={setExtendedDueDateR5}
                    placeholder="Remarks..."
                    header={"5. Remarks"}
                    md={12}
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

export default WriteRecordDialog;
