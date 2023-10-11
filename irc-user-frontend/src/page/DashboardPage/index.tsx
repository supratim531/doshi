
import { Box, CardHeader, CardContent } from "@mui/material";

import MasterHeader from "../../component/MasterHeader";
import TopArea from "../../component/Dashboard/TopArea";
import ChartBase from "../../component/Dashboard/ChartBase";

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

                    <CardContent sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        width: "100%",
                    }}>
                        <div style={{ width: "inherit" }}>
                            <TopArea />
                        </div>
                        <div className="my-5" style={{ width: "inherit" }}>
                            <ChartBase />
                        </div>


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
