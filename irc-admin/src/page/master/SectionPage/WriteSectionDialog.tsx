import React from 'react';
import { axiosClient } from '../../../network/axiosClient';

import { Grid } from "@mui/material";

import { EditText, EditTextDropdown } from '../../../component/EditText';
import WriteDialog from '../../../component/WriteDialog';
import IRCSnackbar from '../../../component/IRCSnackbar';

import { SimpleRegulator } from '../../../model/regulator';
import { SimpleAct, SimpleRegulatorActBody } from '../../../model/act';
import { Section, SectionBody, WriteSectionResponse } from '../../../model/section';

import { allRegulatorSimple } from '../../../network/regulator';
import { allActSimple } from '../../../network/act';
import { addSection, updateSection } from '../../../network/section';

type Props = {
    dialogState?: boolean | any;
    setDialogState?: any;
    section: Section | null;
    setSection: any;
    onSuccessButtonClick?: any;
};

const WriteSectionDialog = ({dialogState, setDialogState, section, setSection, onSuccessButtonClick} : Props) => {
    
    const [regulators, setRegulators] = React.useState<SimpleRegulator[]>([]);
    const [acts, setActs] = React.useState<SimpleAct[]>([]);

    React.useEffect(() => {
        allRegulatorSimple(setRegulators);
    }, []);

	const [name, setName] = React.useState<string>("");
    const [regulator, setRegulator] = React.useState<SimpleRegulator | null>(null);
    const [act, setAct] = React.useState<SimpleAct | null>(null);
    const [remarks, setRemarks] = React.useState<string | null>();

    const [chapterNumber, setChapterNumber] = React.useState<string | null>(null);
    const [sectionNumber, setSectionNumber] = React.useState<string | null>(null);
    const [subSectionNumber, setSubSectionNumber] = React.useState<string | null>(null);
    const [clauseNumber, setClauseNumber] = React.useState<string | null>(null);
    const [subClauseNumber, setSubClauseNumber] = React.useState<string | null>(null);
    
    const [response, setResponse] = React.useState<WriteSectionResponse | null>(null);
    const [snackbar, setSnackbar] = React.useState(false);


    React.useEffect(() => {
        if(section !== null){
            setName(section.name);
            const sr = {id: section.act.regulator.id, name: section.act.regulator.name} as SimpleRegulator;
            setRegulator(sr);
            const sa = {id: section.act.id, name: section.act.name} as SimpleAct;
            setAct(sa);
            setChapterNumber(section.chapter_number);
            setSectionNumber(section.subtitle_number);
            setSubSectionNumber(section.sub_subtitle_number);
            setClauseNumber(section.clause_number);
            setSubClauseNumber(section.sub_clause_number);
            setRemarks(section.remarks);

            const simpleActBody = {
                regulator_id: section.act.regulator.id
            } as SimpleRegulatorActBody;

            allActSimple(simpleActBody, setActs);
        }
    }, []);

    const onRegulatorSelected = (simpleRegulator: SimpleRegulator | null) => {
        setRegulator(simpleRegulator);
        setActs([]);
        setAct(null);
        if(simpleRegulator == null){
            setActs([]);
            setAct(null);
        }else{
            const simpleActBody = {
                regulator_id: simpleRegulator.id
            } as SimpleRegulatorActBody;

            allActSimple(simpleActBody, setActs);
        }
    }

    const onActSelected = (simpleAct: SimpleAct | null) => {
        setAct(simpleAct);
    }

    React.useEffect(() => {
        if(response !== null){
            setSnackbar(true);
            if(response.status === 201 || response.status === 202 || response.status === 200){
                onSuccessButtonClick();
                if(section === null){
                    clear();
                }
                
            }
        }
    }, [response]);


    function successBtnClick() {

        if(section !== null){
            const regulatorReq = {
                id: section.id,
                name: name,
                chapter_number: chapterNumber,
                subtitle_number: sectionNumber,
                sub_subtitle_number: subSectionNumber,
                clause_number: clauseNumber,
                sub_clause_number: subClauseNumber,
                act_id: act?.id,
                remarks: remarks
            } as SectionBody;

            updateSection(regulatorReq, setResponse);    
        } else {
            const regulatorReq = {
                name: name,
                chapter_number: chapterNumber,
                subtitle_number: sectionNumber,
                sub_subtitle_number: subSectionNumber,
                clause_number: clauseNumber,
                sub_clause_number: subClauseNumber,
                act_id: act?.id,
                remarks: remarks
            } as SectionBody;
            
            addSection(regulatorReq, setResponse);
        }
    }

    const clear = () => {
        setSection(null);
        setName("");
        setRegulator(null);
        setAct(null);
        setChapterNumber("");
        setSectionNumber("");
        setSubSectionNumber("");
        setClauseNumber("");
        setSubClauseNumber("");
        setRemarks(null);
        setActs([]);
    }

    const cancel = () => {
        clear();

        setResponse(null);
        setSnackbar(false);
    }

	return(
		<WriteDialog
            title={section?"Update Section":"Add Section"}
            dialogState={dialogState}
            setDialogState={setDialogState}
            successText={section?"Update":"Add"}
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
                    placeholder="e.g. Appointment of Director"
                    value={name}
                    setStateValue={setName}
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
                    placeholder="e.g. Income Tax"
                    value={act}
                    onChange={onActSelected}
                    options={acts}
                    md={6}
                    required
                />

                <EditText
                    label="Chapter Number"
                    placeholder="e.g. 1"
                    value={chapterNumber}
                    setStateValue={setChapterNumber}
                    md={6}
                />
                <EditText
                    label="Section Number"
                    placeholder="e.g. 1"
                    value={sectionNumber}
                    setStateValue={setSectionNumber}
                    md={6}
                />

                <EditText
                    label="Sub Section Number"
                    placeholder="e.g. 1"
                    value={subSectionNumber}
                    setStateValue={setSubSectionNumber}
                    md={4}
                />

                <EditText
                    label="Clause Number"
                    placeholder="e.g. 1"
                    value={clauseNumber}
                    setStateValue={setClauseNumber}
                    md={4}
                />
                <EditText
                    label="Sub Clause Number"
                    placeholder="e.g. 1"
                    value={subClauseNumber}
                    setStateValue={setSubClauseNumber}
                    md={4   }
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

export default WriteSectionDialog;