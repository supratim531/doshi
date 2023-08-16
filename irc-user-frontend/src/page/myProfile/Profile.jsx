import { useEffect, useState } from "react"
import { axiosClient } from "../../network/axiosClient"
import { EditText } from "../../component/EditText";
import { Grid } from "@mui/material";
import MasterHeader from "../../component/MasterHeader";
import IRCPageLoader from "../../component/IRCPageLoader";

const Profile = () => {
    const [data, setData] = useState(null);
    const [load, setLaod] = useState(false);

    const dataLoad = () => {
        setLaod(true);
        profileData()
            .then((res) => {
                setData(res.data.data)
                setLaod(false)
            })
            .catch((err) => {
                console.log(err)
                setLaod(false)
            })
    }

    useEffect(() => {
        dataLoad()
    }, []);

    return (
        <>
            {
                load ? <IRCPageLoader /> :
                    <>
                        <MasterHeader title="My Profile" onpUdateClick={() => { }} />
                        <Grid container pt={1} spacing={2}>
                            {data?.length && data.map((v, i) =>
                                <EditText md={4} key={v.id} name={v.name} placeholder={v.placeholder} disabled={v.isEditable ? false : true} />
                            )}
                        </Grid>
                    </>
            }
        </>
    );
}

const profileData = async () => {
    const data = await axiosClient.get(`data/user`);
    return data;
}

export default Profile;
