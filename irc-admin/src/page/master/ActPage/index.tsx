import React from 'react';

import { Box, CardContent, CardHeader, Chip } from "@mui/material";

import WriteActDialog from './WriteActDialog';

import MasterHeader from '../../../component/MasterHeader';
import IRCDeleteDialog from '../../../component/IRCDeleteDialog';
import TableComponent from "../../../component/TableComponent";
import IRCPageLoader from '../../../component/IRCPageLoader';
import IRCSnackbar from '../../../component/IRCSnackbar';
import IRCColoredChip from "../../../component/IRCColoredChip";

import { Regulator, SimpleRegulatorBody } from '../../../model/regulator';
import { MRT_ColumnDef } from 'material-react-table';

import { getAllActAPI, deleteAct } from '../../../network/act';
import { Act, SimpleActBody, WriteActResponse } from '../../../model/act';


const ActPage = () => {

    const columns = React.useMemo<MRT_ColumnDef<Act>[]>(
        () => [
            {
                accessorKey: "name",
                header: "Name",
            },
            {
                id: 'regulator',
                header: "",
                columns: [
                    {
                        header: 'Color',
                        Cell: ({ row }: any) => (
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "1rem",
                                }}
                            >  
                                
                                <IRCColoredChip 
                                    backgroundColor={row.original.regulator.color_code} 
                                    label={row.original.regulator.name} />
                                
                            
                            </Box>
                        ),
                    },
                ],
            },
            {
                accessorKey: "remarks",
                header: "Remarks"
            }
        ],
        [],
    );

   const [acts, setActs] = React.useState<Act[]>([]);
   const [loaded, setLoaded] = React.useState(false)

    const [openAddDialog, setOpenAddDialog] = React.useState(false);
    const [deleteDialog, setDeleteDialog] = React.useState(false);

    const [regulator, setRegulator] = React.useState<Regulator | null>(null);

    const [act, setAct] = React.useState<Act | null>(null);

    const [response, setResponse] = React.useState<WriteActResponse | null>(null);
    const [snackbar, setSnackbar] = React.useState(false);

    React.useEffect(() => {
        setLoaded(true);
        getAllActAPI(setActs)
        .then(() => {
            setLoaded(false)
        })
    }, [])

    React.useEffect(() => {
        if(response !== null){
            setSnackbar(true);
            if(response.status === 201 || response.status === 202){
                onSuccessButtonClick();
                if(act === null){
                    // clear();
                }
                
            }
        }
    }, [response]);

    
    
    const onEditPress = (act: Act) => {
        setAct(act);
        setOpenAddDialog(true);
    }

    const onDeteleClicked = (act: any) => {
        setDeleteDialog(true);
        setAct(act);
    };

    const onDelete = () => {
        setDeleteDialog(false);
        const deleteRequest = {
            id: act?.id,
        } as SimpleActBody;
        deleteAct(deleteRequest, setResponse);
        
        setAct(null)
    }

    const onSuccessButtonClick = () => {
        getAllActAPI(setActs)
    }

    return(

        <>
            
            <Box
                p={2} 
                sx={{backgroundColor: 'white',borderRadius: 1}}>
                <CardHeader
                    title={
                        <MasterHeader
                            title="Act Master"
                            onAddClick={() => setOpenAddDialog(true)} />
                    }
                />
                <CardContent>

                    {!loaded?(
                        
                        <TableComponent
                            columns={columns}
                            tableData={acts}
                            onEdit={onEditPress}
                            onDelete={onDeteleClicked} />

                    ):<IRCPageLoader />}

                </CardContent>
                    
            </Box>
            
            {/*DIALOG*/}
            {openAddDialog?(
                <WriteActDialog
                    act={act}
                    setAct={setAct}
                    dialogState={openAddDialog}
                    setDialogState={setOpenAddDialog}
                    onSuccessButtonClick={onSuccessButtonClick}
                />) : null}

            {/*DIALOG*/}
            {deleteDialog?(
                <IRCDeleteDialog
                    title="Act"
                    name={act?.name}
                    dialogState={deleteDialog}
                    setDialogState={setDeleteDialog}
                    onDelete={onDelete}
                    onCancelDelete={() => setAct(null)}
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

export default ActPage;