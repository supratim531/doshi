import React from 'react';

import '../../../component/TableComponent/modernTable.css';

import { Box, Button, CardHeader, CardContent } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ExportToCsv } from 'export-to-csv';

import { Business } from '../../../model/business';
import { axiosClient } from '../../../network/axiosClient';
import { MRT_ColumnDef, MaterialReactTable } from 'material-react-table';
import MasterHeader from '../../../component/MasterHeader';
import IRCPageLoader from '../../../component/IRCPageLoader';

const BusinessPage = () => {

    const [businesses, setBusinesses] = React.useState<Business[]>([]);
    const [loaded, setLoaded] = React.useState(false)

    const getAllBusinessesAPI = async () => {
        setLoaded(true)
        return await axiosClient
            .get(`admin/businesses`)
            .then((response: any) => {
                setBusinesses(response?.data?.data)
                setLoaded(false)
            })
            .catch((error: any) => {
                console.log('business-error:', error)
                setLoaded(false)
            });
    }

    React.useEffect(() => {
        getAllBusinessesAPI()
    }, [])


    React.useEffect(() => {
        console.log('This is Business: ', businesses)
    }, [businesses])

    const columns = React.useMemo<MRT_ColumnDef<Business>[]>(
        () => [
            {
                accessorKey: "pan",
                header: "PAN (Permanent Account Number)"
            },
            {
                accessorKey: "name",
                header: "Name"
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
        csvExporter.generateCsv(businesses);
    };

    return (
        <Box
            sx={{ backgroundColor: 'white', borderRadius: 1 }}>
            <CardHeader
                title={
                    <MasterHeader
                        title="Businesses" />
                }
            />
            <CardContent>
                {!loaded ? (
                    <MaterialReactTable
                        columns={columns}
                        data={businesses !== undefined ? businesses : [] as Business[]}

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

    );
}

export default BusinessPage;