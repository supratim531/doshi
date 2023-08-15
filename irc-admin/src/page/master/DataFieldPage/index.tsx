import { Box, Card, CardContent, CardHeader, Grid } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom'
import IRCBusinessCard from "../../../component/IRCBusinessCard";
import BusinessDataField from "../../../component/IRCDataField/BusinessDataField";
import MasterHeader from "../../../component/MasterHeader";


const DataPage = () => {
    const businesses:any = [
        {
            name: "Business Data",
            pan: "GKBPM1521D",
            uri: "/business-data"
        },
        {
            name: "User Data",
            pan: "GKBPM1521D",
            uri: "/user-data"
        }
    ];
    const navigate=useNavigate();

    const handelClick=(e:any)=>{
        let ischecked=e.target.checked
        let val=e.target.value

        if(val==="BusinessData" && ischecked===true){
            navigate("/business-data");
        }
        else if(val==="UserData" && ischecked===true){
            navigate("/user-data");
        }
    }

  	return (
        <>
            <Box p={2} sx={{ backgroundColor: "white", borderRadius: 1 }}>
                <CardHeader
                    title={
                        <MasterHeader
                            title="Business"
                        />
                    }
                />
                        
                <CardContent sx={{minHeight: '80vh'}}>
                    
                    <Grid container spacing={2}>
                        {
                            businesses?.map((business: any) => (<IRCBusinessCard key={business.pan} business={business} />))
                        }
                    </Grid>

                </CardContent>
            </Box>
        </>
        // <>
        // <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",marginTop:30}}>
        //         <Card variant="outlined" sx={{ width: 320,boxShadow: 2,padding:"7px" ,display:"flex",justifyContent:"space-around" }}>
        //             <div>
        //                 <Checkbox value="BusinessData" onClick={(e)=>handelClick(e)}/>
        //                 <label htmlFor="">BusinessData</label>
        //             </div>
        //             <div>
        //                 <Checkbox value="UserData" onClick={(e)=>handelClick(e)}/>
        //                 <label htmlFor="">UserData</label>
        //             </div>
        //         </Card>
        // </div>

      
        // </>
    )
};

export default DataPage;
