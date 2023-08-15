import React from 'react';

import { Box, CardContent, CardHeader } from "@mui/material";
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import MasterHeader from '../../../component/MasterHeader';

import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";

import TableComponent from "../../../component/TableComponent";
import IRCPageLoader from '../../../component/IRCPageLoader';


import { User } from '../../../model/user';
import { axiosClient } from '../../../network/axiosClient';
import { ExportToCsv } from 'export-to-csv';


const UserPage = () => {

    const [users, setUsers] = React.useState<User[]>([]);
    const [loaded, setLoaded] = React.useState(false)

    const getAllUserAPI = async () => {
        setLoaded(true)
        return await axiosClient
            .get(`admin/users`)
            .then((response: any) => {
                setUsers(response?.data?.data)
                setLoaded(false)
            })
            .catch((error: any) => {
                console.log('user-error:', error)
                setLoaded(false)
            });
    }

    React.useEffect(() => {
        getAllUserAPI()
    }, [])


    React.useEffect(() => {
        console.log('This is users: ', users)
    }, [users])

    const columns = React.useMemo<MRT_ColumnDef<User>[]>(
        () => [

            {
                accessorKey: "name",
                header: "Name",
            },
            {
                accessorKey: "email",
                header: "Email",
            },
        ], []
    );

    const csvOptions = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        useBom: true,
        useKeysAsHeaders: false,
        headers: columns.map((c: any) => c.header),
    };

    const csvExporter = new ExportToCsv(csvOptions);
    const handleExportData = () => {
        csvExporter.generateCsv(users);
    };

    return (
        <>
            <Box
                sx={{ backgroundColor: 'white', borderRadius: 1 }}>
                <CardHeader
                    title={
                        <MasterHeader
                            title="Users" />
                    }
                />
                <CardContent>
                    {!loaded ? (
                        <MaterialReactTable
                            columns={columns}
                            data={users !== undefined ? users : [] as User[]}
                            renderTopToolbarCustomActions={({ table }: any) => (
                                <Box
                                    sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}
                                >

                                    <button
                                        className="btn btn-primary m-1"
                                        //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                                        onClick={handleExportData}

                                    >
                                        <FileDownloadIcon style={{ marginRight: 8 }} />
                                        Export All Data
                                    </button>
                                </Box>
                            )}
                        />
                    ) : <IRCPageLoader />}
                </CardContent>
            </Box>

        </>
    );
}

export default UserPage;