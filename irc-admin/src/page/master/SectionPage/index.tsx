import React from 'react';

import { Box, CardContent, CardHeader } from "@mui/material";

import MasterHeader from '../../../component/MasterHeader';

import WriteSectionDialog from './WriteSectionDialog';

import TableComponent from "../../../component/TableComponent";
import IRCPageLoader from "../../../component/IRCPageLoader";
import IRCDeleteDialog from "../../../component/IRCDeleteDialog";
import IRCSnackbar from '../../../component/IRCSnackbar';
import IRCColoredChip from "../../../component/IRCColoredChip";

import { Section, SimpleSectionBody, WriteSectionResponse } from '../../../model/section';
import { getAllSectionAPI, deleteSection } from '../../../network/section';


const columns = [
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
                            backgroundColor={row.original.act.regulator.color_code} 
                            label={row.original.act.regulator.name} />
                        
                    
                    </Box>
                ),
            },
        ],
    },
    {
        accessorKey: "act.name",
        header: "Act",
    },
    {
        accessorKey: "remarks",
        header: "Remarks"
    }
];


const SectionPage = () => {

    const [sections, setSections] = React.useState<Section[]>([]);

    const [openAddDialog, setOpenAddDialog] = React.useState(false);
    const [deleteDialog, setDeleteDialog] = React.useState(false);
    
    const [section, setSection] = React.useState<Section | null>(null);

    const [loaded, setLoaded] = React.useState(false);

    const [response, setResponse] = React.useState<WriteSectionResponse | null>(null);
    const [snackbar, setSnackbar] = React.useState(false);

    React.useEffect(() => {
        setLoaded(true)
        getAllSectionAPI(setSections)
        .then(() => {
            setLoaded(false)
        })
    }, [])

    React.useEffect(() => {
        if(response !== null){
            setSnackbar(true);
            if(response.status === 201 || response.status === 202){
                onSuccessButtonClick();
                if(section === null){
                    // clear();
                }
                
            }
        }
    }, [response]);

    
    const onEditPress = (section: Section) => {
        setSection(section);
        setOpenAddDialog(true);
    }

    const onDeteleClicked = (section: any) => {
        setDeleteDialog(true);
        setSection(section);
    };

    const onDelete = () => {
        setDeleteDialog(false);
        const deleteRequest = {
            id: section?.id,
        } as SimpleSectionBody;
        deleteSection(deleteRequest, setResponse);
        setSection(null)
    }

    const onSuccessButtonClick = () => {
        getAllSectionAPI(setSections);
    }

    return(
        <>
            
            <Box
                p={2} 
                sx={{backgroundColor: 'white',borderRadius: 1}}>
                <CardHeader
                    title={
                        <MasterHeader
                            title="Section Master"
                            onAddClick={() => setOpenAddDialog(true)} />
                    }
                />
                <CardContent>
                    {!loaded ? (
                        <TableComponent
                            columns={columns}
                            tableData={sections}
                            onEdit={onEditPress}
                            onDelete={onDeteleClicked} />
                    ):<IRCPageLoader />}
                </CardContent>

            </Box>

            {/*DIALOG*/}
            {openAddDialog?(
                <WriteSectionDialog
                    dialogState={openAddDialog}
                    setDialogState={setOpenAddDialog}
                    section={section}
                    setSection={setSection}
                    onSuccessButtonClick={onSuccessButtonClick}
                />) : null}
                    
            {/*DIALOG*/}
            {deleteDialog?(
                <IRCDeleteDialog
                    title="Section"
                    name={section?.name}
                    dialogState={deleteDialog}
                    setDialogState={setDeleteDialog}
                    onDelete={onDelete}
                    onCancelDelete={() => setSection(null)}
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

export default SectionPage;