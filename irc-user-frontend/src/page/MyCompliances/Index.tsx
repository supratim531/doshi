import React from "react";

import { Box, CardContent, CardHeader, Chip } from "@mui/material";

import MasterHeader from '../../component/MasterHeader';
import TableComponent from "../../component/TableComponent";
import IRCPageLoader from '../../component/IRCPageLoader';

import { EditTextDropdown } from "../../component/EditText";

import { useAppDispatch, useAppSelector } from "../../reduxStore/hooks";
import { allBusiness } from "../../network/store/business/allBusiness";
import { myRecord } from "../../network/store/record/myRecord";

import { Business } from '../../model/business';
import { Record } from '../../model/record';
import ClickableTable from "../AllCompliances/ClickableTable";
import RegulatorSidePanel from "../AllCompliances/RegulatorSidePanel";

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
        if(allBusinessSlice.businessList.data !== undefined){
            setBusinesses(allBusinessSlice.businessList.data)
            setBusiness(businesses[0]?businesses[0]:null);
        }
    }, [allBusinessSlice]);

  
    React.useEffect(() => {
        dispatch(allBusiness(true));
    }, []);

    React.useEffect(() => {
        if(business !== null){
            dispatch(myRecord({id: business.id} as any));
        }
    }, [business]);

    React.useEffect(() => {
        if(myRecordSlice.recordList.data !== undefined){
            setRecords(myRecordSlice.recordList.data);
            console.log(myRecordSlice.recordList.data);
        }
    }, [myRecordSlice]);


    const onBusinessSelected = (business: Business | null) => {
        setBusiness(business);
    }

    const onClick = (data: any) => {
        console.log(data)
        setRecord(data)
        setOpenPanel(true)
    }

    return(
        <>
            
            <Box
                p={2} 
                sx={{backgroundColor: 'white',borderRadius: 1}}>
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
                                    sx={{width: 250,}}
                                    options={businesses}
                                />
                            )}
                        />
                    }
                />
                <CardContent>
                    {myRecordSlice.loading === false?(            
                        // <TableComponent
                        //     columns={columns}
                        //     tableData={records}
                        // />
                        <ClickableTable
                            columns={columns}
                            tableData={records}
                            onClick={onClick}
                        />

                    ):<IRCPageLoader />}

                </CardContent>

            </Box>
            
            <RegulatorSidePanel
                record={record}
                status={openPanel}
                setStatus={setOpenPanel} />
        </>
    );
}

export default MyCompliances;