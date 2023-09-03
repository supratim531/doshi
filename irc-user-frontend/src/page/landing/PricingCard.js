import React from "react";
import flight from './images/icons8-flight-64.png'
import DoneIcon from '@mui/icons-material/Done';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material'

const PricingCard = (props) => {
    const list = props.list
    return (

        <Grid item sx={{ display: 'flex', gap: '10px', justifyContent: 'space-around' }} >
            {/* <Grid item xs={12} sm={6} md={4} lg={3} xl={3} sx={{ display: 'flex', justifyContent: 'center',backgroundColor:"yellow"}} > */}
            <Box
                sx={{
                    margin: "20px 20px",
                    // maxWidth: '200px',
                    padding: "12px",
                    border: "1px solid grey",
                    borderRadius: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    ":hover": {
                        border: '2px solid purple'
                    },
                    backgroundColor: 'white',
                }}
            >
                <Avatar
                    alt="Remy Sharp"
                    src="https://resources.emsigner.com/emsigner//Assets/images/Advanced-Plan.png"
                    sx={{ width: 70, height: 70, margin: "10px" }}
                />
                <Typography sx={{ fontSize: "1.3rem" }} gutterBottom>
                    {props.title}
                </Typography>
                <Typography gutterBottom>
                    <span>INR </span>
                    <span style={{ fontSize: "1.3rem" }}>{props.price}</span>
                </Typography>
                <Typography
                    sx={{ fontSize: "0.7rem", textAlign: "center" }}
                    gutterBottom
                >
                    {props.discount}
                </Typography>
                <Button
                    variant="contained"
                    sx={{ borderRadius: 5, padding: "5px 20px", margin: "20px", backgroundColor: '#0034ac' }}
                >
                    Buy Now
                </Button>

                {
                    list.map((item) => {
                        return (
                            <Box sx={{ alignSelf: 'start', display: 'flex', margin: '3px 0' }} >

                                <DoneIcon sx={{ color: "green", margin: '0 3px ' }} />
                                <Typography sx={{ fontSize: "0.8rem" }}>
                                    {item}
                                </Typography>
                            </Box>
                        )
                    })
                }
                <Button
                    variant="contained"
                    sx={{ borderRadius: 5, margin: '20px' }}
                >
                    Free Trial
                </Button>
            </Box>
        </Grid>

    );
};

export default PricingCard;
