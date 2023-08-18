import * as React from "react";

import { CardContent, CardHeader, Box, Grid, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../reduxStore/hooks";

import { Business } from '../../../model/business';
import { allBusiness } from "../../../network/store/business/allBusiness";

import MasterHeader from "../../../component/MasterHeader";
import AddBusinessDialog from "./AddBusinessDialog";
import IRCBusinessCard from '../../../component/IRCBusinessCard';
import IRCPageLoader from '../../../component/IRCPageLoader';

const BusinessPage = () => {

    const dispatch = useAppDispatch();

    const [openAddDialog, setOpenAddDialog] = React.useState(false);

    const [businesses, setBusinesses] = React.useState<Business[]>([]);

    const allBusinessSlice = useAppSelector((state) => state.allBusiness);

    React.useEffect(() => {
        if (allBusinessSlice.businessList.data !== undefined) {
            setBusinesses(allBusinessSlice.businessList.data)
        } else {
            setBusinesses([]);
        }
    }, [allBusinessSlice]);


    React.useEffect(() => {
        dispatch(allBusiness(true));
    }, []);

    const onSuccessButtonClick = () => {
        dispatch(allBusiness(true));
    };

    return (
        <>
            {
                allBusinessSlice.loading === false ? (
                    <Box p={2} sx={{ backgroundColor: "white", borderRadius: 1 }}>
                        <CardHeader
                            title={
                                <MasterHeader
                                    title="Business"
                                    onAddClick={() => setOpenAddDialog(true)}
                                />
                            }
                        />

                        <CardContent sx={{ minHeight: '80vh' }}>

                            <Grid container spacing={2}>
                                {
                                    businesses.length > 0 ?
                                        businesses?.map((business: Business) => (<IRCBusinessCard key={business.pan} business={business} />)) :
                                        <Grid sx={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center", width: "100%" }}>
                                            <img style={{ width: "200px" }} src="/assets/svgs/nodata.svg" alt="" />
                                            <Typography>There are no businesses, kindly add your business</Typography>
                                        </Grid>
                                }
                            </Grid>

                        </CardContent>

                        {/*DIALOG*/}
                        {openAddDialog ? (
                            <AddBusinessDialog
                                dialogState={openAddDialog}
                                setDialogState={setOpenAddDialog}
                                onSuccessButtonClick={onSuccessButtonClick}
                            />
                        ) : null}
                    </Box>
                ) : (
                    <IRCPageLoader />
                )
            }
        </>
    );
}

export default BusinessPage;