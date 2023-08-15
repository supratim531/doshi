import React from "react";

import { Box, CardHeader, CardContent } from "@mui/material";

import MasterHeader from "../../component/MasterHeader";

const DashboardPage = () => {
    return (
        <>
            {
                // allBusinessSlice.loading === false ? (
                    <Box p={2} sx={{ backgroundColor: "white", borderRadius: 1 }}>
                        <CardHeader
                            title={
                                <MasterHeader
                                    title="Dashboard"
                                />
                            }
                        />
                        
                        <CardContent>
                            
                        
                        </CardContent>

                        
                    </Box>
                // ) : (
                //     <IRCPageLoader />
                // )
            }
        </>
    );
};

export default DashboardPage;
