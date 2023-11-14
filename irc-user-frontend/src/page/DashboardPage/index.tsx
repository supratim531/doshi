import { Box, CardHeader, CardContent } from "@mui/material";

import MasterHeader from "../../component/MasterHeader";
import TopArea from "../../component/Dashboard/TopArea";
import ChartBase from "../../component/Dashboard/ChartBase";
import { useEffect, useState } from "react";
import { axiosClient } from "../../network/axiosClient";

const DashboardPage = () => {
    const [record, setRecord] = useState<any>(null);

    const chartDetails = async () => {
        try {
            const res = await axiosClient.get("/dashboard/user");
            console.log(res);
            const data = res.data['data'];
            console.log(data);
            setRecord(data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        chartDetails();
    }, []);

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
                            <TopArea record={record} />
                        </div>
                        <div className="my-5" style={{ width: "inherit" }}>
                            <ChartBase record={record} />
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
