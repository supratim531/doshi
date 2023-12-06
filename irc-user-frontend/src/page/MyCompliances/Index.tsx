import React from "react";
import { Box, CardContent, CardHeader, Chip } from "@mui/material";

import MasterHeader from '../../component/MasterHeader';
import IRCPageLoader from '../../component/IRCPageLoader';
import { EditTextDropdown } from "../../component/EditText";

import { useAppDispatch, useAppSelector } from "../../reduxStore/hooks";
import { allBusiness } from "../../network/store/business/allBusiness";
import { myRecord } from "../../network/store/record/myRecord";

import { Business } from '../../model/business';
import { Record } from '../../model/record';
import ClickableTable from "../AllCompliances/ClickableTable";
import RegulatorSidePanel from "../AllCompliances/RegulatorSidePanel";
import IRCColoredChip from "../../component/IRCColoredChip";

const columns = [
    {
        id: 'regulator',
        columns: [
            {
                id: 'regulatorName',
                accessorKey: "form.act.regulator.name",
                header: 'Regulator',
                Cell: ({ row }: any) => (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                        }}
                    >
                        <IRCColoredChip backgroundColor={row.original.form?.act?.regulator?.color_code} label={row.original.form?.act?.regulator?.name} />
                    </Box>
                ),
            },
        ],
    },
    {
        accessorKey: "form.name",
        header: "Form",
    },
    {
        accessorKey: "frequency.name",
        header: "Frequency",
    },
    {
        accessorKey: "actual_date",
        header: "Due Date"
    },
    {
        accessorKey: "form.act.name",
        header: "Act",
    },
    {
        accessorKey: "form_type",
        header: "Compliance Type",
    },
    {
        accessorKey: "form.form_type",
        header: "Form Type",
    },
    {
        accessorKey: "frequency.frequency_type",
        header: "Frequency Type",
    },
    {
        accessorKey: "financial_year.financial_year",
        header: "Financial Year",
    },
    {
        accessorKey: "financial_year.assesment_year",
        header: "Assesment Year",
    },
    {
        accessorKey: "date_from",
        header: "From",
    },
    {
        accessorKey: "date_to",
        header: "To"
    },

    // replication...

    {
        accessorKey: "extended_due_date_1",
        header: "Extended Due Date 1"
    },
    {
        accessorKey: "extended_due_date_2",
        header: "Extended Due Date 2"
    },
    {
        accessorKey: "extended_due_date_3",
        header: "Extended Due Date 3"
    },
    {
        accessorKey: "extended_due_date_4",
        header: "Extended Due Date 4"
    },
    {
        accessorKey: "extended_due_date_5",
        header: "Extended Due Date 5"
    },
    // {
    //     id: 'reg',
    //     columns: [
    //         {
    //             id: 'taxPayer',
    //             header: "Tax Payers",
    //             Cell: ({ row }: any) => (
    //                 <Box
    //                     sx={{
    //                         display: "flex",
    //                         alignItems: "center",
    //                         gap: "0.2rem",
    //                     }}
    //                 >
    //                     {row.original.tax_payers.map((item: any) => (
    //                         <Chip label={item.name}></Chip>
    //                     ))}
    //                 </Box>
    //             ),
    //         },
    //     ],
    // }
];

const MyCompliances = () => {
    const dispatch = useAppDispatch();

    const [businesses, setBusinesses] = React.useState<Business[]>([]);

    const [business, setBusiness] = React.useState<Business | null>(null);

    const allBusinessSlice = useAppSelector((state) => state.allBusiness);

    const myRecordSlice = useAppSelector((state) => state.myRecord);

    const [records, setRecords] = React.useState<Record[]>([]);

    const [record, setRecord] = React.useState<Record | null>(null);

    const [openPanel, setOpenPanel] = React.useState(false);

    React.useEffect(() => {
        if (allBusinessSlice.businessList.data !== undefined) {
            setBusinesses(allBusinessSlice.businessList.data)
            setBusiness(businesses[0] ? businesses[0] : null);
        }
    }, [allBusinessSlice]);

    React.useEffect(() => {
        dispatch(allBusiness(true));
    }, []);

    React.useEffect(() => {
        if (business !== null) {
            dispatch(myRecord({ id: business.id } as any));
        }
    }, [business]);

    React.useEffect(() => {
        if (myRecordSlice.recordList.data !== undefined) {
            setRecords(myRecordSlice.recordList.data);
            console.log(myRecordSlice.recordList.data);
        }
    }, [myRecordSlice]);

    const onBusinessSelected = (business: Business | null) => {
        setBusiness(business);
    }

    const onViewPress = (data: any) => {
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
                            title="My Compliances"
                            children={(
                                <EditTextDropdown
                                    label="Business"
                                    placeholder="e.g. Instade Business Service LLP"
                                    value={business}
                                    onChange={onBusinessSelected}
                                    md={12}
                                    sx={{ width: 250, }}
                                    options={businesses}
                                />
                            )}
                        />
                    }
                />
                <CardContent>
                    {myRecordSlice.loading === false ? (
                        <ClickableTable
                            columns={columns}
                            tableData={records}
                            onView={onViewPress}
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

export default MyCompliances;
