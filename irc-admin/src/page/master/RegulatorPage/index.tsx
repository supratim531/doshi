import React from 'react';

import { Box, CardContent, CardHeader, Chip } from "@mui/material";

import WriteRegulatorDialog from './WriteRegulatorDialog';

import MasterHeader from '../../../component/MasterHeader';
import IRCDeleteDialog from '../../../component/IRCDeleteDialog';
import TableComponent from "../../../component/TableComponent";
import IRCPageLoader from '../../../component/IRCPageLoader';

import { Regulator, SimpleRegulatorBody, WriteRegulatorResponse } from '../../../model/regulator';

import IRCColoredChip from '../../../component/IRCColoredChip';
import IRCSnackbar from '../../../component/IRCSnackbar';

import { getAllRegulatorsAPI, deleteRegulator } from '../../../network/regulator';



const columns = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        id: 'color_code',
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

                        <IRCColoredChip backgroundColor={row.original.color_code} />


                    </Box>
                ),
            },
        ],
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

                        <Chip sx={{ width: 100, }} label={row.original.variable}></Chip>


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


const RegulatorPage = () => {

    const [regulators, setRegulators] = React.useState<Regulator[]>([]);

    const [openAddDialog, setOpenAddDialog] = React.useState(false);
    const [deleteDialog, setDeleteDialog] = React.useState(false);

    const [loaded, setLoaded] = React.useState(false)

    const [regulator, setRegulator] = React.useState<Regulator | null>(null);

    const [response, setResponse] = React.useState<WriteRegulatorResponse | null>(null);
    const [snackbar, setSnackbar] = React.useState(false);

    React.useEffect(() => {
        setLoaded(true);
        getAllRegulatorsAPI(setRegulators)
        .then(() => {
            setLoaded(false)
        })
    }, [])

    React.useEffect(() => {
        if (response !== null) {
            setSnackbar(true);
            if (response.status === 201 || response.status === 202) {
                onSuccessButtonClick();
                if (regulator === null) {
                    clear();
                }

            }
        }
    }, [response]);

    const onEditPress = (regulator: Regulator) => {
        setRegulator(regulator);
        setOpenAddDialog(true);
    }

    const onDeteleClicked = (regulator: any) => {
        setRegulator(regulator);
        setDeleteDialog(true);
    };

    const onDelete = () => {
        setDeleteDialog(false);
        const deleteRequest = {
            id: regulator?.id,
        } as SimpleRegulatorBody;
        deleteRegulator(deleteRequest, setResponse);
        setRegulator(null);
    }

    const onSuccessButtonClick = () => {
        getAllRegulatorsAPI(setRegulators);
    }

    const clear = () => {
        setRegulator(null);
    }

    return (
        <>

            <Box
                p={2}
                sx={{ backgroundColor: 'white', borderRadius: 1 }}>
                <CardHeader
                    title={
                        <MasterHeader
                            title="Regulator Master"
                            onAddClick={() => setOpenAddDialog(true)} />
                    }
                />
                <CardContent>

                    {!loaded ? (

                        <TableComponent
                            columns={columns}
                            tableData={regulators}
                            onEdit={onEditPress}
                            onDelete={onDeteleClicked} />

                    ) : <IRCPageLoader />}

                </CardContent>
            </Box>


            {/*DIALOG*/}
            {openAddDialog ? (
                <WriteRegulatorDialog
                    regulator={regulator}
                    setRegulator={setRegulator}
                    dialogState={openAddDialog}
                    setDialogState={setOpenAddDialog}
                    onSuccessButtonClick={onSuccessButtonClick}
                />) : null}

            {/*DIALOG*/}
            {deleteDialog ? (
                <IRCDeleteDialog
                    title="Regulator"
                    name={regulator?.name}
                    dialogState={deleteDialog}
                    setDialogState={setDeleteDialog}
                    onDelete={onDelete}
                    onCancelDelete={() => setRegulator(null)}
                />) : null}
            {response !== null ? (
                <IRCSnackbar
                    open={snackbar}
                    setOpen={setSnackbar}
                    message={response?.message}
                    status={response?.status} />
            ) : null}
        </>
    );
}

export default RegulatorPage;