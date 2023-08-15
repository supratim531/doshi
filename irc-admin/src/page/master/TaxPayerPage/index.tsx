import React from "react";

import { Box, CardContent, CardHeader, Chip } from "@mui/material";

import MasterHeader from "../../../component/MasterHeader";

import TableComponent from "../../../component/TableComponent";

import IRCPageLoader from "../../../component/IRCPageLoader";
import IRCDeleteDialog from "../../../component/IRCDeleteDialog";
import IRCSnackbar from '../../../component/IRCSnackbar';
import IRCColoredChip from "../../../component/IRCColoredChip";

import { TaxPayer, SimpleTaxPayerBody, WriteTaxPayerResponse } from "../../../model/taxPayer";
import WriteTaxPayerDialog from "./WriteTaxPayerDialog";
import { getAllTaxPayerAPI, deleteTaxPayer } from '../../../network/taxpayer';

const columns = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        id: 'reg',
        columns: [
            {
                id: 'regulator',
                header: "Regulators",
                Cell: ({ row }: any) => (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.2rem",
                        }}
                    >
                        {row.original.regulators.map((item: any) => (
                            <IRCColoredChip 
                                backgroundColor={item.color_code} 
                                label={item.name} />
                        ))}
                    </Box>
                ),
            },
        ],
    },
    {
        accessorKey: "pan_letter",
        header: "PAN 4th Letter",
    },
    {
        accessorKey: "cin_three_letter",
        header: "CIN 3 Letter",
    },
    {
        accessorKey: "remarks",
        header: "Remarks",
    },
];

const TaxPayerPage = () => {
    const [taxPayers, setTaxPayers] = React.useState<TaxPayer[]>([]);

    const [openAddDialog, setOpenAddDialog] = React.useState(false);
    const [deleteDialog, setDeleteDialog] = React.useState(false);

    const [taxPayer, setTaxPayer] = React.useState<TaxPayer | null>(null);
    const [loaded, setLoaded] = React.useState(false)

    const [response, setResponse] = React.useState<WriteTaxPayerResponse | null>(null);
    const [snackbar, setSnackbar] = React.useState(false);

    React.useEffect(() => {
        setLoaded(true);
        getAllTaxPayerAPI(setTaxPayers)
        .then(() => {
            setLoaded(false)
        })
    }, []);
    console.log(taxPayers)

     React.useEffect(() => {
        if(response !== null){
            setSnackbar(true);
            if(response.status === 201 || response.status === 202){
                onSuccessButtonClick();
                if(taxPayer === null){
                    // clear();
                }
                
            }
        }
    }, [response]);

    const onEditPress = (taxPayer: TaxPayer) => {
        setTaxPayer(taxPayer);
        setOpenAddDialog(true);
    };

    const onDeteleClicked = (taxPayer: TaxPayer) => {
        setDeleteDialog(true);
        setTaxPayer(taxPayer);
    };

    const onDelete = () => {
        setDeleteDialog(false);
        const deleteRequest = {
            id: taxPayer?.id,
        } as SimpleTaxPayerBody;
        deleteTaxPayer(deleteRequest, setResponse);
        setTaxPayer(null);
    }

    const onSuccessButtonClick = () => {
        getAllTaxPayerAPI(setTaxPayers);
    };

    return (
        <>
            <Box p={2} sx={{ backgroundColor: "white", borderRadius: 1 }}>
                <CardHeader
                    title={
                        <MasterHeader
                            title="Tax Payer"
                            onAddClick={() => setOpenAddDialog(true)}
                        />
                    }
                />

                <CardContent>
                    {!loaded ? (
                        <TableComponent
                            columns={columns}
                            tableData={taxPayers}
                            onEdit={onEditPress}
                            onDelete={onDeteleClicked}
                        />
                    ) : (
                        <IRCPageLoader />
                    )}

                </CardContent>
            </Box>

            {/*DIALOG*/}
            {openAddDialog ? (
                <WriteTaxPayerDialog
                    taxPayer={taxPayer}
                    setTaxPayer={setTaxPayer}
                    dialogState={openAddDialog}
                    setDialogState={setOpenAddDialog}
                    onSuccessButtonClick={onSuccessButtonClick}
                />
            ) : null}

            {/*DIALOG*/}
            {deleteDialog ? (
                <IRCDeleteDialog
                    title="Tax Payer"
                    name={taxPayer?.name}
                    dialogState={deleteDialog}
                    setDialogState={setDeleteDialog}
                    onDelete={onDelete}
                    onCancelDelete={() => setTaxPayer(null)}
                />
            ) : null}

            {response!==null?(
                    <IRCSnackbar
                        open={snackbar}
                        setOpen={setSnackbar}
                        message={response?.message}
                        status={response?.status} />
                ):null}
        </>
    );
};

export default TaxPayerPage;
