import React, { useEffect } from 'react'
import { Box, CardContent, CardHeader, Chip } from "@mui/material";
import TableComponent from "../TableComponent";

import IRCPageLoader from "../IRCPageLoader";
import { DataField, UserDataFieldBody  } from "../../model/dataField";
import { axiosClient } from '../../network/axiosClient';
import MasterHeader from '../MasterHeader';
import WriteUserData from './WriteUserData';
import IRCDeleteDialog from '../IRCDeleteDialog';


const columns = [
  {
      accessorKey: "name",
      header: "Name",
  },
  {
    accessorKey: "placeholder",
    header: "Placeholder",
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
                      
                      <Chip sx={{width: 100,}} label={row.original.variable}></Chip>
                      
                  
                  </Box>
              ),
          },
      ],
  },
  {
      accessorKey: "priority",
      header: "Priority"
  },
  {
    accessorKey: "isEditable",
    header: "IsEditable"
}
];

const UserDataField = () => {
  const [dataFields, setDataFields] = React.useState<UserDataFieldBody[]>([]);
  const [loaded, setLoaded] = React.useState(false);
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const [dataField, setDataField] = React.useState<UserDataFieldBody | null>(null);
  const [deleteDialog, setDeleteDialog] = React.useState(false);

  const getAllDataFieldAPI = async () => {
  
    return await axiosClient
      .get(`data/user`)
      .then((response: any) => setDataFields(response?.data?.data))
      .catch((error: any) => console.log(error?.response?.data));
    }

    useEffect(()=>{
      setLoaded(true)
      getAllDataFieldAPI()
      .then(()=>{
        setLoaded(false)
      })
    },[])

    const onSuccessButtonClick = () => {
      getAllDataFieldAPI();
    };

    const onEditPress = (dataField: UserDataFieldBody) => {
        setDataField(dataField);
        setOpenAddDialog(true);
      };

      const onDeteleClicked = (dataField: UserDataFieldBody) => {
        setDeleteDialog(true);
        setDataField(dataField);
    };

    const deleteUser=async (id:any) => {
  
        return await axiosClient
          .post(`data/user/delete`,{id:id})
          .then((response: any) => console.log(response))
          .catch((error: any) => console.log(error?.response?.data));
        }

    const onDelete=async(id:any)=>{
        deleteUser(id)
        .then(()=>{
            getAllDataFieldAPI()
            setDeleteDialog(false)
        })
    }
    
  return (
    <>
        <Box p={2} sx={{ backgroundColor: "white", borderRadius: 1 }}>
              <CardHeader
                  title={
                      <MasterHeader
                          title="User Data"
                          onAddClick={() => setOpenAddDialog(true)}
                      />
                  }
              />

              <CardContent>
                  {!loaded ? (
                      <TableComponent
                          columns={columns}
                          tableData={dataFields}
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
                <WriteUserData
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
                  onDelete={()=>onDelete(dataField?.id)}
                  onCancelDelete={() => setDataField(null)}
              />
          ) : null}
    </>
  )
}

export default UserDataField