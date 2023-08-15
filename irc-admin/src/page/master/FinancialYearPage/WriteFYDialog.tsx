import React from 'react';
import { axiosClient } from '../../../network/axiosClient';

import { Grid } from "@mui/material";

import { EditText, EditTextColor } from '../../../component/EditText';
import WriteDialog from '../../../component/WriteDialog';
import IRCSnackbar from '../../../component/IRCSnackbar';


import { FinancialYear, FinancialYearBody, WriteFinancialYearResponse } from '../../../model/financialYear';

import { addFinancialYear, updateFinancialYear } from '../../../network/financial-year';

type Props = {
    dialogState?: boolean;
    setDialogState?: any;
    financialYear?: FinancialYear | any;
    setFinancialYear?: any;
    onSuccessButtonClick?: any;
};

const WriteFYDialog = ({dialogState, setDialogState, financialYear, setFinancialYear, onSuccessButtonClick} : Props) => {

	const [financialYearText, setFinancialYearText] = React.useState<string>("");
    const [assessmentYear, setAssesmentYear] = React.useState<string>("");

    const [response, setResponse] = React.useState<WriteFinancialYearResponse | null>(null);
    const [snackbar, setSnackbar] = React.useState(false);

    React.useEffect(() => {

        if(financialYear != null){
            setFinancialYearText(financialYear.financial_year);
            setAssesmentYear(financialYear.assesment_year);
        }

    }, []);


    React.useEffect(() => {
        if(response !== null){
            setSnackbar(true);
            if(response.status === 201 || response.status === 202){
                onSuccessButtonClick();
                if(financialYear === null){
                    clear();
                }
                
            }
        }
    }, [response]);

    function successBtnClick() {
        if(financialYear != null){
            const financialYearReq = {
                id: financialYear.id,
                financial_year: financialYearText,
                assesment_year: assessmentYear
            } as FinancialYearBody;

            updateFinancialYear(financialYearReq, setResponse);
        }
        else{
            const financialYearReq = {
                financial_year: financialYearText,
                assesment_year: assessmentYear
            } as FinancialYearBody;
            
            addFinancialYear(financialYearReq, setResponse);
        }
    }

    function clear(){
        setFinancialYear("");
        setAssesmentYear("");
        setFinancialYear(null);
    }

    const cancel = () => {
        clear();

        setResponse(null);
        setSnackbar(false);
    }

	return(
		<WriteDialog
            title={financialYear?"Update Financial Year":"Add Financial Year"}
            dialogState={dialogState}
            setDialogState={setDialogState}
            successText={financialYear?"Update":"Add"}
            onSuccess={successBtnClick}
            onCancel={cancel}
        >

        	<Grid
                container
                pt={1}
                spacing={2}
            >

                <EditText
                    label="Financial Year"
                    placeholder="e.g. 2022-2023"
                    value={financialYearText}
                    setStateValue={setFinancialYearText}
                    md={12}
                    required
                />

                <EditText
                    label="Assessment Year"
                    placeholder="e.g. 2023-2024"
                    value={assessmentYear}
                    setStateValue={setAssesmentYear}
                    md={12}
                    required
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

export default WriteFYDialog;