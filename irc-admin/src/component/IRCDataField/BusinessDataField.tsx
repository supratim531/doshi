import React from "react";

import { Box, CardContent, CardHeader, Chip } from "@mui/material";

import MasterHeader from "../MasterHeader";

import TableComponent from "../TableComponent";

import IRCPageLoader from "../IRCPageLoader";
import IRCDeleteDialog from "../IRCDeleteDialog";

import { DataField  } from "../../model/dataField";

import WriteBusinessDataField from "./WriteBusinessDataFieldDialog";
import { axiosClient } from "../../network/axiosClient";


const columns = [
  {
      accessorKey: "name",
      header: "Name",
  },
  {
      accessorKey: "variable",
      header: "Variable",
  },

  {
      id: 'regulators',
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
                          <Chip label={item.name}></Chip>
                      ))}
                  </Box>
              ),
          },
      ],
  },

  {
      id: 'taxPayers',
      columns: [
          {
              id: 'tax_payers',
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
      accessorKey: "remarks",
      header: "Remarks",
  },
];

const BusinessDataField = () => {
  const [dataFields, setDataFields] = React.useState<DataField[]>([]);

  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const [deleteDialog, setDeleteDialog] = React.useState(false);

  const [dataField, setDataField] = React.useState<DataField | null>(null);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
      setLoaded(true);
      getAllDataFieldAPI()
      .then(() => {
          setLoaded(false)
      })
  }, []);

  const getAllDataFieldAPI = async () => {
  
      return await axiosClient
        .get(`data`)
        .then((response: any) => setDataFields(response?.data?.data))
        .catch((error: any) => console.log(error?.response?.data));
  }

  const onEditPress = (dataField: DataField) => {
    setDataField(dataField);
    setOpenAddDialog(true);
  };

  const onDeteleClicked = (dataField: DataField) => {
      setDeleteDialog(true);
      setDataField(dataField);
  };

   /*const onDelete = () => {
       setDeleteDialog(false);
       const deleteRequest = {
           id: taxPayer?.id,
       } as SimpleTaxPayerBody;
       dispatch(deleteTaxPayer(deleteRequest));
       dispatch(allTaxPayer(true));
       setTaxPayer(null);
   }*/

  const onSuccessButtonClick = () => {
    getAllDataFieldAPI();
  };

  return (
      <>
          <Box p={2} sx={{ backgroundColor: "white", borderRadius: 1 }}>
              <CardHeader
                  title={
                      <MasterHeader
                          title="Business Data"
                          onAddClick={() => setOpenAddDialog(true)}
                      />
                  }
              />
                
              <CardContent>
                  {!loaded ? (
                      <TableComponent
                          columns={columns}
                          tableData={dataFields}
                          onDelete={onDeteleClicked}
                      />
                  ) : (
                      <IRCPageLoader />
                  )}

              </CardContent>
          </Box>

          {/*DIALOG*/}
          {openAddDialog ? (
                <WriteBusinessDataField
                    dataField={dataField}
                    setDataField={setDataField}
                    dialogState={openAddDialog}
                    setDialogState={setOpenAddDialog}
                    onSuccessButtonClick={onSuccessButtonClick}
                />
            ) : null}

          {/*DIALOG*/}
          {deleteDialog?(
              <IRCDeleteDialog
                  title="Tax Payer"
                  name={dataField?.name}
                  dialogState={deleteDialog}
                  setDialogState={setDeleteDialog}
                  onDelete={() => {}}
                  onCancelDelete={() => setDataField(null)}
              />
          ) : null}
      </>
  );
};

export default BusinessDataField