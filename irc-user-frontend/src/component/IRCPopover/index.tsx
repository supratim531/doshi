import * as React from 'react';
import { Avatar, Button, Typography, Grid, Popover} from '@mui/material';

import { useAppDispatch, useAppSelector } from "../../reduxStore/hooks";
import { userDetails } from '../../network/store/user/userDetails';

import LogoutComponent from '../../page/auth/LogoutComponent';

export default function IRCPopover() {

    const dispatch = useAppDispatch();

    const userDetailsSlice = useAppSelector((state) => state.userDetails);

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const [name, setName] = React.useState("")

    React.useEffect(() => {
        const d_name = localStorage.getItem('name');

        if(d_name === undefined || d_name === null){
            dispatch(userDetails(true));
        }else{
            setName(d_name);
        }
        
    }, [])

    React.useEffect(() => {
        if(name === ""){
            dispatch(userDetails(true));
        }
    }, [name])

    React.useEffect(() => {
        if(userDetailsSlice.response.data !== undefined){
            setName(userDetailsSlice?.response?.data?.name);
            localStorage.setItem('name', userDetailsSlice?.response?.data?.name);
        }

    }, [userDetailsSlice]);

    const [logout, setLogout] = React.useState(false);

    const onLogoutCancel = () => {
        setLogout(false);
    }

    return (
        <div>
            <Button aria-describedby={id} variant="text" onClick={handleClick}>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={1}>
                    <Grid item>
                        <Avatar alt="" />
                    </Grid>
                    <Grid item>
                        <Typography
                            variant="body1"
                            sx={{ color: "#ffffff", textTransform: "none" }}>
                            {name}
                        </Typography>
                    </Grid>
                </Grid>
            </Button>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Typography onClick={() => alert('my profile')} sx={{ p: 2, cursor: 'pointer', width: 150,}}>My Profile</Typography>
                <Typography onClick={() => setLogout(true)} sx={{ p: 2, cursor: 'pointer', width: 150, }}>Logout</Typography>
            </Popover>

            {logout === true?(<LogoutComponent onCancel={onLogoutCancel} />):null}
        </div>
                            
    );
}
