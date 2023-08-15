import React from 'react';

import { Box, CardContent, CardHeader, Chip } from "@mui/material";

import MasterHeader from '../../../component/MasterHeader';

import WriteFormDialog from './WriteFormDialog';

import IRCPageLoader from '../../../component/IRCPageLoader';
import IRCDeleteDialog from "../../../component/IRCDeleteDialog";

import IRCSnackbar from '../../../component/IRCSnackbar';
import IRCColoredChip from "../../../component/IRCColoredChip";

import TableComponent from "../../../component/TableComponent";

import { Form, SimpleFormBody, WriteFormResponse } from '../../../model/form';
import { getAllFormAPI, deleteForm } from '../../../network/form';

const columns = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "form_type",
        header: "Form Type",
    },
    {
        id: 'regulator',
        header: "",
        columns: [
            {
                header: 'Sections',
                Cell: ({ row }: any) => (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.2rem",
                        }}
                    >  
    
                    {row.original.sections.map((item: any) => (
                            <Chip label={item.name}></Chip>
                        ))}   
                    
                    </Box>
                ),
            },
        ],
    },
    {
        accessorKey: "remarks",
        header: "Remarks"
    }
];


const FormPage = () => {

    const [forms, setForms] = React.useState<Form[]>([]);

    const [openAddDialog, setOpenAddDialog] = React.useState(false);
    const [deleteDialog, setDeleteDialog] = React.useState(false);

    const [form, setForm] = React.useState<Form | null>(null);
    const [loaded, setLoaded] = React.useState(false);

    const [response, setResponse] = React.useState<WriteFormResponse | null>(null);
    const [snackbar, setSnackbar] = React.useState(false);

    React.useEffect(() => {
        setLoaded(true)
        getAllFormAPI(setForms)
        .then(() => {
            setLoaded(false)
        })
    }, [])

    React.useEffect(() => {
        if(response !== null){
            setSnackbar(true);
            if(response.status === 201 || response.status === 202){
                onSuccessButtonClick();
                if(form === null){
                    // clear();
                }
                
            }
        }
    }, [response]);
    console.log(forms)
    
    const onEditPress = (form: Form) => {
        setForm(form);
        setOpenAddDialog(true);
    }

    const onDeteleClicked = (form: Form) => {
        setDeleteDialog(true);
        setForm(form);
    };

    const onDelete = () => {
        setDeleteDialog(false);
        const deleteRequest = {
            id: form?.id,
        } as SimpleFormBody;
        deleteForm(deleteRequest, setResponse);
        setForm(null);
    }

    const onSuccessButtonClick = () => {
        getAllFormAPI(setForms);
    }

    return(
        <>
            <Box
                p={2} 
                sx={{backgroundColor: 'white',borderRadius: 1}}>
                <CardHeader
                    title={
                        <MasterHeader
                            title="Form Master"
                            onAddClick={() => setOpenAddDialog(true)} />
                    }
                />
                <CardContent>
                    {!loaded ? (
                        <TableComponent
                            columns={columns}
                            tableData={forms}
                            onEdit={onEditPress}
                            onDelete={onDeteleClicked} />
                    ):(

                        <IRCPageLoader />
                    )}
                    
                </CardContent>
            </Box>

            {/*DIALOG*/}
            {openAddDialog?(
                <WriteFormDialog
                    dialogState={openAddDialog}
                    setDialogState={setOpenAddDialog}
                    form={form}
                    setForm={setForm}
                    onSuccessButtonClick={onSuccessButtonClick}
                />) : null}
            
            {/*DIALOG*/}
            {deleteDialog?(
                <IRCDeleteDialog
                    title="Form"
                    name={form?.name}
                    dialogState={deleteDialog}
                    setDialogState={setDeleteDialog}
                    onDelete={onDelete}
                    onCancelDelete={() => setForm(null)}
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

export default FormPage;