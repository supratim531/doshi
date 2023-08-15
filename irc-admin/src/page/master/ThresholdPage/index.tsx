import React from 'react';

import { Box, Chip, CardContent, CardHeader } from "@mui/material";

import MasterHeader from '../../../component/MasterHeader';
import TableComponent from "../../../component/TableComponent";
import IRCPageLoader from '../../../component/IRCPageLoader';
import IRCDeleteDialog from "../../../component/IRCDeleteDialog";
import IRCSnackbar from '../../../component/IRCSnackbar';

import WriteThresholdDialog from './WriteThresholdDialog';

import { Threshold, SimpleThresholdBody, WriteThresholdResponse } from '../../../model/threshold';
import { getAllThresholdAPI, deleteThreshold } from '../../../network/threshold';

const columns = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        id: 'variable',
        columns: [
            {
                header: 'Variable',
                Cell: ({ row }: any) => (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                        }}
                    >  
                        
                        <Chip sx={{width: 100,}} label={row.original.variable}></Chip>
                        
                    
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

const ThresholdPage = () => {

    const [thresholds, setThresholds] = React.useState<Threshold[]>([]);

    const [openAddDialog, setOpenAddDialog] = React.useState(false);
    const [deleteDialog, setDeleteDialog] = React.useState(false);
    const [threshold, setThreshold] = React.useState<Threshold | null>(null);

    const [loaded, setLoaded] = React.useState(false);

    const [response, setResponse] = React.useState<WriteThresholdResponse | null>(null);
    const [snackbar, setSnackbar] = React.useState(false);


    React.useEffect(() => {
        setLoaded(true);
        getAllThresholdAPI(setThresholds)
        .then(() => {
            setLoaded(false)
        })
    }, [])

    React.useEffect(() => {
        if(response !== null){
            setSnackbar(true);
            if(response.status === 201 || response.status === 202){
                onSuccessButtonClick();
                if(threshold === null){
                    // clear();
                }
                
            }
        }
    }, [response]);

    const onEditPress = (threshold: Threshold) => {
        setThreshold(threshold);
        setOpenAddDialog(true);
    }

    const onDeteleClicked = (threshold: any) => {
        setDeleteDialog(true);
        setThreshold(threshold);
    };

    const onDelete = () => {
        setDeleteDialog(false);
        const deleteRequest = {
            id: threshold?.id,
        } as SimpleThresholdBody;
        deleteThreshold(deleteRequest, setResponse);
        setThreshold(null);
    }

    const onSuccessButtonClick = () => {
        getAllThresholdAPI(setThresholds);
    }

	return(
        <>
            
            <Box
                p={2} 
                sx={{backgroundColor: 'white',borderRadius: 1}}>
                <CardHeader
                    title={
                        <MasterHeader
                            title="Threshold Master"
                            onAddClick={() => setOpenAddDialog(true)} />
                    }
                />
                <CardContent>
                    {!loaded ? (
                        <TableComponent
                            columns={columns}
                            tableData={thresholds}
                            onEdit={onEditPress}
                            onDelete={onDeteleClicked} />
                    ):<IRCPageLoader />}

                </CardContent>

            </Box>

            {/*DIALOG*/}
            {openAddDialog?(
                <WriteThresholdDialog
                    threshold={threshold}
                    setThreshold={setThreshold}
                    dialogState={openAddDialog}
                    setDialogState={setOpenAddDialog}
                    onSuccessButtonClick={onSuccessButtonClick}
                />) : null}
                    
            {/*DIALOG*/}
            {deleteDialog?(
                <IRCDeleteDialog
                    title="Threshold"
                    name={threshold?.name}
                    dialogState={deleteDialog}
                    setDialogState={setDeleteDialog}
                    onDelete={onDelete}
                    onCancelDelete={() => setThreshold(null)}
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

export default ThresholdPage;