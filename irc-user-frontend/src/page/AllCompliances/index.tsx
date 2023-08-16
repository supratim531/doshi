import React from "react";

import { Box, CardContent, CardHeader, Chip } from "@mui/material";

import MasterHeader from '../../component/MasterHeader';
import TableComponent from "../../component/TableComponent";
import IRCPageLoader from '../../component/IRCPageLoader';

import { useAppDispatch, useAppSelector } from "../../reduxStore/hooks";
import { allRecord } from "../../network/store/record/allRecord";

import { Record } from '../../model/record';
import ClickableTable from "./ClickableTable";
import RegulatorSidePanel from "./RegulatorSidePanel";

const columns = [
    {
        accessorKey: "form.section.act.regulator.name",
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
        id: 'reg',
        columns: [
            {
                id: 'taxPayer',
                header: "Tax Payers",
                Cell: ({ row }: any) => (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.2rem",
                        }}
                    >
                        {row.original.tax_payers.map((item: any) => (
                            <Chip label={item.name}></Chip>
                        ))}
                    </Box>
                ),
            },
        ],
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

const AllCompliances = () => {
    const dispatch = useAppDispatch();
    const allRecordSlice = useAppSelector((state) => state.allRecord);

    const [records, serRecords] = React.useState<Record[]>([]);
    const [record, setRecord] = React.useState<Record | null>(null);
    const [openPanel, setOpenPanel] = React.useState(false);

    React.useEffect(() => {
        dispatch(allRecord(true));
    }, []);

    React.useEffect(() => {
        if (allRecordSlice.recordList.data !== undefined) {
            serRecords(allRecordSlice.recordList.data);
        }
    }, [allRecordSlice]);

    const onClick = (data: any) => {
        console.log(data)
        setRecord(data)
        setOpenPanel(true)
    }

    return (
        <>
            <Box
                p={2}
                sx={{ backgroundColor: 'white', borderRadius: 1 }}>
                <CardHeader
                    title={
                        <MasterHeader
                            title="All Compliances"
                        />
                    }
                />
                <CardContent>
                    {allRecordSlice.loading === false ? (
                        <ClickableTable
                            columns={columns}
                            tableData={records}
                            onClick={onClick}
                        />

                    ) : <IRCPageLoader />}
                </CardContent>
            </Box>

            <RegulatorSidePanel
                record={record}
                status={openPanel}
                setStatus={setOpenPanel}
            />
        </>
    );
}

export default AllCompliances;
