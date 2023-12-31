import React from 'react';
import { axiosClient } from '../../../network/axiosClient';

import { Grid } from "@mui/material";

import { EditText, EditTextDropdown } from '../../../component/EditText';
import WriteDialog from '../../../component/WriteDialog';
import IRCSnackbar from '../../../component/IRCSnackbar';

import { Form, FormBody, FormType, WriteFormResponse } from '../../../model/form';
import { SimpleRegulator } from '../../../model/regulator';
import { SimpleAct, SimpleRegulatorActBody } from '../../../model/act';
import { SimpleSection, SimpleActSectionBody } from '../../../model/section';

import { allRegulatorSimple } from '../../../network/regulator';
import { allActSimple } from '../../../network/act';
import { allSectionSimple } from '../../../network/section';
import { addForm, updateForm } from '../../../network/form';
import IRCMultipleDropDown from '../../../component/IRCMultipleDropDown';


type Props = {
    dialogState?: boolean | any;
    setDialogState?: any;
    form: Form | null;
    setForm: any;
    onSuccessButtonClick: any;
};

const formTypes = [
    {
        id: 'form',
        name: 'Form'
    },
    {
        id: 'return',
        name: 'Return'
    },
    {
        id: 'compliance',
        name: 'Compliance'
    },
    {
        id: 'declaration',
        name: 'Declaration'
    },
    {
        id: 'register',
        name: 'Register'
    }
] as FormType[];

const WriteFormDialog = ({ dialogState, setDialogState, form, setForm, onSuccessButtonClick }: Props) => {

    const [regulators, setRegulators] = React.useState<SimpleRegulator[]>([]);
    const [acts, setActs] = React.useState<SimpleAct[]>([]);
    const [sections, setSections] = React.useState<SimpleSection[]>([]);

    React.useEffect(() => {
        allRegulatorSimple(setRegulators);
    }, []);

    const [name, setName] = React.useState<string>("");
    const [formType, setFormType] = React.useState<FormType | null>(null);
    const [regulator, setRegulator] = React.useState<SimpleRegulator | null>(null);
    const [act, setAct] = React.useState<SimpleAct | null>(null);
    const [section, setSection] = React.useState<SimpleSection[]>([]);
    const [remarks, setRemarks] = React.useState<string | null>();

    const [response, setResponse] = React.useState<WriteFormResponse | null>(null);
    const [snackbar, setSnackbar] = React.useState(false);

    React.useEffect(() => {
        if (form !== null) {

            setName(form.name);
            const sr = { id: form?.act?.regulator?.id, name: form?.act?.regulator?.name } as SimpleRegulator;
            //const ft = { id: form.id, name: form.form_type } as FormType;
            const ft=formTypes.find(e=>e.id===form.form_type) as FormType;
            setFormType(ft);
            setRegulator(sr);
            const sa = { id: form?.act?.id, name: form?.act?.name } as SimpleAct;
            setAct(sa);
            
            const simpleActBody = {
                regulator_id: form.act.regulator.id
            } as SimpleRegulatorActBody;
            allActSimple(simpleActBody, setActs);

            const simpleSectionBody = {
                act_id: form.act.id
            } as SimpleActSectionBody;
            allSectionSimple(simpleSectionBody, setSections);

            
            setSection(form?.sections);
            setRemarks(form.remarks);
        }
    }, [form]);

    const onRegulatorelected = (simpleRegulator: SimpleRegulator | null) => {
        setRegulator(simpleRegulator);
        setActs([]);
        setAct(null);
        setSections([]);
        setSection([]);
        if (simpleRegulator !== null) {
            const simpleActBody = {
                regulator_id: simpleRegulator.id
            } as SimpleRegulatorActBody;

            allActSimple(simpleActBody, setActs);
        }
    }

    const onActSelected = (simpleAct: SimpleAct | null) => {
        setAct(simpleAct);
        setSections([]);
        setSection([]);
        if (simpleAct !== null) {
            const simpleSectionBody = {
                act_id: simpleAct.id
            } as SimpleActSectionBody;
            allSectionSimple(simpleSectionBody, setSections);
        }
    }

    const onSectionSelected = (simpleSection: SimpleSection[]) => {
        setSection(simpleSection);
    }

    React.useEffect(() => {
        if (response !== null) {
            setSnackbar(true);
            if (response.status === 201 || response.status === 202) {
                onSuccessButtonClick();
                if (form === null) {
                    clear();
                }

            }
        }
    }, [response]);


    function successBtnClick() {

        if (form !== null) {
            const selectedSection = section.map((item) => item.id).toString();
            const formRequest = {
                id: form.id,
                name: name,
                form_type: (formType?.id)?.toString(),
                sections: selectedSection,
                remarks: remarks
            } as FormBody;
            updateForm(formRequest, setResponse);
        } else {
            const selectedSection = section.map((item) => item.id).toString();
            const formRequest = {
                name: name,
                form_type: (formType?.id)?.toString(),
                sections: selectedSection,
                remarks: remarks
            } as FormBody;

            addForm(formRequest, setResponse);
        }

    }

    const clear = () => {
        setName("");
        setFormType(null);
        setRegulator(null);
        setAct(null);
        setSection([]);
        setRemarks(null);
        setActs([]);
        setSections([]);
        setForm(null);
    }

    const cancel = () => {
        clear();

        setResponse(null);
        setSnackbar(false);
    }

    return (
        <WriteDialog
            title={form ? "Update Form" : "Add Form"}
            dialogState={dialogState}
            setDialogState={setDialogState}
            successText={form ? "Update" : "Add"}
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
                    placeholder="e.g. ITR V"
                    value={name}
                    setStateValue={setName}
                    md={6}
                    required
                />
                <EditTextDropdown
                    label="Form Type"
                    placeholder="e.g. Return"
                    value={formType}
                    onChange={(sformType: FormType | null) => setFormType(sformType)}
                    options={formTypes}
                    md={6}
                    required
                />
                <EditTextDropdown
                    label="Regulator"
                    placeholder="e.g. Income Tax"
                    value={regulator}
                    onChange={onRegulatorelected}
                    options={regulators}
                    md={6}
                    required
                />
                <EditTextDropdown
                    label="Act"
                    placeholder="e.g. Income Tax Act"
                    value={act}
                    onChange={onActSelected}
                    options={acts}
                    md={6}
                    required />
                <IRCMultipleDropDown
                    label="Section"
                    placeholder="e.g. Return Filing"
                    value={section}
                    onChange={onSectionSelected}
                    options={sections}
                    md={12}
                    required />
                <EditText
                    label="Remarks"
                    value={remarks}
                    setStateValue={setRemarks}
                    placeholder={name ? "Write something about " + name + "..." : null}
                    multiline
                    minRows={4}
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
}

export default WriteFormDialog;
