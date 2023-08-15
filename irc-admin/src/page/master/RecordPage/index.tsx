import React from 'react';

import { Box, CardContent, CardHeader, Chip } from "@mui/material";

import MasterHeader from '../../../component/MasterHeader';
import TableComponent from "../../../component/TableComponent";
import IRCPageLoader from '../../../component/IRCPageLoader';
import IRCDeleteDialog from "../../../component/IRCDeleteDialog";

import WriteRecordDialog from './WriteRecordDialog';

import { Record } from '../../../model/record';
import { axiosClient } from '../../../network/axiosClient';

const columns = [
    {
        accessorKey: "form.act.regulator.name",
        header: "Regulator",
    },
    {
        accessorKey: "form.name",
        header: "Form",
    },
    {
        accessorKey: "form_type",
        header: "Form Type",
    },

    {
        accessorKey: "frequency.name",
        header: "Frequency",
    },

    {
        accessorKey: "date_from",
        header: "From",
    },
    {
        accessorKey: "date_to",
        header: "To"
    }
];

const RecordPage = () => {

   const [records, setRecords] = React.useState<Record[]>([]);

    const [openAddDialog, setOpenAddDialog] = React.useState(false);
    const [deleteDialog, setDeleteDialog] = React.useState(false);
    const [record, setRecord] = React.useState<Record | null>(null);

    const [loaded, setLoaded] = React.useState(false);

    React.useEffect(() => {
        setLoaded(true);
        getAllRecordAPI()
        .then(() => {
            setLoaded(false)
        })
    }, [])

    const getAllRecordAPI = async () => {
    
        return await axiosClient
          .get(`record`)
          .then((response: any) => {setRecords(response?.data?.data)})
          .catch((error: any) => console.log(error?.response?.data));
    }
    
    const onEditPress = (record: Record) => {
        setRecord(record);
        setOpenAddDialog(true);
    }

    // const onDeteleClicked = (record: any) => {
    //     setDeleteDialog(true);
    //     setRecord(record);
    // };

    // const onDelete = () => {
    //     setDeleteDialog(false);
    //     const deleteRequest = {
    //         id: record?.id,
    //     } as SimpleRecordBody;
    //     dispatch(deleteRecord(deleteRequest));
    //     dispatch(allRecord(true));
    //     setRecord(null);
    // }

    const onSuccessButtonClick = () => {
        getAllRecordAPI();
    }

	return(
        <>
            
            <Box
                p={2} 
                sx={{backgroundColor: 'white',borderRadius: 1}}>
                <CardHeader
                    title={
                        <MasterHeader
                            title="Record Master"
                            onAddClick={() => setOpenAddDialog(true)} />
                    }
                />
                <CardContent>
                    {!loaded ? (
                        <TableComponent
                            columns={columns}
                            tableData={records}
                            onEdit={onEditPress}
                        />
                            
                    ):<IRCPageLoader />}

                </CardContent>   

            </Box>

            {/*DIALOG*/}
            {openAddDialog?(
                <WriteRecordDialog
                    record={record}
                    setRecord={setRecord}
                    dialogState={openAddDialog}
                    setDialogState={setOpenAddDialog}
                    onSuccessButtonClick={onSuccessButtonClick}
                />) : null}
            
        </>
    );
}

export default RecordPage;