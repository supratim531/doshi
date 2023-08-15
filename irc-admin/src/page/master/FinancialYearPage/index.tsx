import React from 'react';

import { Box, CardContent, CardHeader } from "@mui/material";

import MasterHeader from '../../../component/MasterHeader';

import WriteFYDialog from './WriteFYDialog';

import TableComponent from "../../../component/TableComponent";

import IRCPageLoader from '../../../component/IRCPageLoader';
import IRCDeleteDialog from "../../../component/IRCDeleteDialog";
import IRCSnackbar from '../../../component/IRCSnackbar';


import { FinancialYear, SimpleFinancialYearBody, WriteFinancialYearResponse } from '../../../model/financialYear';
import { getAllFinancialYearAPI, deleteFinancialYear } from '../../../network/financial-year';


const columns = [
    {
        accessorKey: "financial_year",
        header: "Financial Year",
    },
    {
        accessorKey: "assesment_year",
        header: "Assesment Year",
    }
];


const FinancialYearPage = () => {

    const [financialYears, setFinancialYears] = React.useState<FinancialYear[]>([]);

    const [openAddDialog, setOpenAddDialog] = React.useState(false);
    const [deleteDialog, setDeleteDialog] = React.useState(false);

    const [financialYear, setFinancialYear] = React.useState<FinancialYear | null>(null);    
    const [loaded, setLoaded] = React.useState(false);

    const [response, setResponse] = React.useState<WriteFinancialYearResponse | null>(null);
    const [snackbar, setSnackbar] = React.useState(false);

    React.useEffect(() => {
        setLoaded(true);
        getAllFinancialYearAPI(setFinancialYears)
        .then(() => {
            setLoaded(false)
        })
    }, [])

    React.useEffect(() => {
        if(response !== null){
            setSnackbar(true);
            if(response.status === 201 || response.status === 202){
                onSuccessButtonClick();
                if(financialYear === null){
                    // clear();
                }
                
            }
        }
    }, [response]);

    const onEditPress = (financialYear: FinancialYear) => {
        setFinancialYear(financialYear);
        setOpenAddDialog(true);
    }

    const onDeteleClicked = (threshold: any) => {
        setDeleteDialog(true);
        setFinancialYear(threshold);
    };

    const onDelete = () => {
        setDeleteDialog(false);
        const deleteRequest = {
            id: financialYear?.id,
        } as SimpleFinancialYearBody;
        deleteFinancialYear(deleteRequest, setResponse);
        setFinancialYear(null);
    }

    const onSuccessButtonClick = () => {
        getAllFinancialYearAPI(setFinancialYears);
    }

    return(
        <>
            
            <Box
                p={2} 
                sx={{backgroundColor: 'white',borderRadius: 1}}>
                <CardHeader
                    title={
                        <MasterHeader
                            title="Financial Year"
                            onAddClick={() => setOpenAddDialog(true)} />
                    }
                />
                <CardContent>
                    {!loaded ? (
                        <TableComponent
                            columns={columns}
                            tableData={financialYears}
                            onEdit={onEditPress}
                            onDelete={onDeteleClicked} />
                    ):<IRCPageLoader />}
                </CardContent>
                    
            </Box>

            {/*DIALOG*/}
            {openAddDialog?(
                <WriteFYDialog
                    dialogState={openAddDialog}
                    setDialogState={setOpenAddDialog}
                    financialYear={financialYear}
                    setFinancialYear={setFinancialYear}
                    onSuccessButtonClick={onSuccessButtonClick}
                />) : null}
            
            {/*DIALOG*/}
            {deleteDialog?(
                <IRCDeleteDialog
                    title="Financial Year"
                    name={financialYear?.financial_year}
                    dialogState={deleteDialog}
                    setDialogState={setDeleteDialog}
                    onDelete={onDelete}
                    onCancelDelete={() => setFinancialYear(null)}
                />) : null}
            {response!==null?(
                    <IRCSnackbar
                        open={snackbar}
                        setOpen={setSnackbar}
                        message={response?.message}
                        status={response?.status} />
                ):null}
        </>
    );
}

export default FinancialYearPage;