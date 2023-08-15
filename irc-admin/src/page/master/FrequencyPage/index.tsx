import React from 'react';

import { Box, CardContent, CardHeader } from "@mui/material";

import MasterHeader from '../../../component/MasterHeader';

import WriteFrequencyDialog from './WriteFrequencyDialog';

import TableComponent from "../../../component/TableComponent";

import IRCPageLoader from '../../../component/IRCPageLoader';
import IRCDeleteDialog from "../../../component/IRCDeleteDialog";
import IRCSnackbar from '../../../component/IRCSnackbar';
import IRCColoredChip from "../../../component/IRCColoredChip";


import { Frequency, WriteFrequencyResponse, SimpleFrequencyBody } from '../../../model/frequency';

import { getAllFrequencyAPI, deleteFrequency } from '../../../network/frequency';

const columns = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "frequency_type",
        header: "Type",
    },
    {
        accessorKey: "days",
        header: "Days",
    },
    {
        accessorKey: "months",
        header: "Months",
    },
    {
        accessorKey: "years",
        header: "Years",
    },
    {
        accessorKey: "hours",
        header: "Hours",
    },
    {
        accessorKey: "minutes",
        header: "Minutes",
    },
    {
        accessorKey: "remarks",
        header: "Remarks"
    }
];


const FrequencyPage = () => {

    const [frequencies, setFrequencies] = React.useState<Frequency[]>([]);

    const [openAddDialog, setOpenAddDialog] = React.useState(false);
    const [deleteDialog, setDeleteDialog] = React.useState(false);

    const [frequency, setFrequency] = React.useState<Frequency | null>(null);    

    const [loaded, setLoaded] = React.useState(false);

    const [response, setResponse] = React.useState<WriteFrequencyResponse | null>(null);
    const [snackbar, setSnackbar] = React.useState(false);

    React.useEffect(() => {
        setLoaded(true);
        getAllFrequencyAPI(setFrequencies)
        .then(() => {
            setLoaded(false)
        })
    }, [])
    
    React.useEffect(() => {
        if(response !== null){
            setSnackbar(true);
            if(response.status === 201 || response.status === 202){
                onSuccessButtonClick();
                if(frequency === null){
                    // clear();
                }
                
            }
        }
    }, [response]);

    const onEditPress = (frequency: Frequency) => {
        setFrequency(frequency);
        setOpenAddDialog(true);
    }

    const onDeteleClicked = (frequency: Frequency) => {
        setDeleteDialog(true);
        setFrequency(frequency);
    }

    const onDelete = () => {
        setDeleteDialog(false);
        const deleteRequest = {
            id: frequency?.id,
        } as SimpleFrequencyBody;
        deleteFrequency(deleteRequest, setResponse);
        setFrequency(null);
    }


    const onSuccessButtonClick = () => {
        getAllFrequencyAPI(setFrequencies);
    }

    return(
        <>
            
            <Box
                p={2} 
                sx={{backgroundColor: 'white',borderRadius: 1}}>
                <CardHeader
                    title={
                        <MasterHeader
                            title="Frequency"
                            onAddClick={() => setOpenAddDialog(true)} />
                    }
                />
                <CardContent>
                    {!loaded ? (        
                        <TableComponent
                            columns={columns}
                            tableData={frequencies}
                            onEdit={onEditPress}
                            onDelete={onDeteleClicked} />
                    ):<IRCPageLoader />}
                </CardContent>
            </Box>

            {/*DIALOG*/}
            {openAddDialog?(
                <WriteFrequencyDialog
                    frequency={frequency}
                    setFrequency={setFrequency}
                    dialogState={openAddDialog}
                    setDialogState={setOpenAddDialog}
                    onSuccessButtonClick={onSuccessButtonClick}
                />) : null}

            {/*DIALOG*/}
            {deleteDialog?(
                <IRCDeleteDialog
                    title="Frequency"
                    name={frequency?.name}
                    dialogState={deleteDialog}
                    setDialogState={setDeleteDialog}
                    onDelete={onDelete}
                    onCancelDelete={() => setFrequency(null)}
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

export default FrequencyPage;