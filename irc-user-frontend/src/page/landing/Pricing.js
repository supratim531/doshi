import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import PricingCard from './PricingCard';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';



const data = [
    // {
    //     title: 'Essential',
    //     price: '1650',
    //     discount: '10% Discount when Billed Annually INR 5 per eSign',
    //     list: ['1 user', '10 documents signed per month', 'Upload and Sign', 'Document Store', 'Profile Management', 'Reminders and Notifications', 'Activity Logs', 'Google Drive/Dropbox Integration']

    // },
    {
        title: 'Essential',
        price: '1650',
        discount: '10% Discount when Billed Annually INR 5 per eSign',
        list: ['1 user', '10 documents signed per month', 'Upload and Sign', 'Document Store', 'Profile Management', 'Reminders and Notifications', 'Activity Logs', 'Google Drive/Dropbox Integration']

    },
    {
        title: 'Essential',
        price: '1650',
        discount: '10% Discount when Billed Annually INR 5 per eSign',
        list: ['1 user', '10 documents signed per month', 'Upload and Sign', 'Document Store', 'Profile Management', 'Reminders and Notifications', 'Activity Logs', 'Google Drive/Dropbox Integration']

    },
    {
        title: 'Essential',
        price: '1650',
        discount: '10% Discount when Billed Annually INR 5 per eSign',
        list: ['1 user', '10 documents signed per month', 'Upload and Sign', 'Document Store', 'Profile Management', 'Reminders and Notifications', 'Activity Logs', 'Google Drive/Dropbox Integration']

    }
]
const Pricing = () => {

    const [alignment, setAlignment] = React.useState('left');
    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    return (
        <Box sx={{ backgroundColor: '#e8f5fd', padding: '30px' }}  >
            <Box sx={{ margin: '40px' }}>
                <Typography sx={{ textAlign: 'center', fontSize: '1.7rem' }} gutterBottom>Subscription Plans & Pricing</Typography>
                <Typography sx={{ textAlign: 'center', fontSize: '1rem', color: 'grey' }} gutterBottom>We offer a flexible, pay-as-you-need model and are committed to building custom solutions if what you require isn't available</Typography>
                {/* <Typography sx={{textAlign:'center',fontSize:'1rem',color:'grey'}} gutterBottom>Simple & clear pricing. Start electronically signing your documents today. */}
            </Box>
            <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
                sx={{ display: 'flex', justifyContent: 'center' }}
            >
                <ToggleButton sx={{
                    borderRadius: 5, "&.Mui-selected, &.Mui-selected:hover": {
                        color: "white",
                        backgroundColor: '#0034ac'
                    },
                    padding: '5px 20px',
                    color: 'black',
                    border: '1px solid black'
                }} value="left" aria-label="left aligned">
                    Startups & SMEs
                </ToggleButton>
                <ToggleButton sx={{
                    borderRadius: 5, "&.Mui-selected, &.Mui-selected:hover": {
                        color: "white",
                        backgroundColor: '#0034ac'
                    },
                    padding: '5px 20px',
                    color: 'black',
                    border: '1px solid black'
                }} value="center" aria-label="centered">
                    Corporates
                </ToggleButton>
                <ToggleButton sx={{
                    borderRadius: 5, "&.Mui-selected, &.Mui-selected:hover": {
                        color: "white",
                        backgroundColor: '#0034ac'
                    },
                    padding: '5px 20px',
                    color: 'black',
                    border: '1px solid black'
                }} value="right" aria-label="right aligned">
                    Professionals
                </ToggleButton>
            </ToggleButtonGroup>
            <Box>
                <Grid container sx={{ display: 'flex', margin: 'auto', justifyContent: 'center' }} >
                    {
                        data.map((item) => {
                            return (
                                <PricingCard
                                    title={item.title}
                                    price={item.price}
                                    discount={item.discount}
                                    list={item.list}
                                />
                            )
                        })
                    }
                </Grid>
            </Box>
        </Box>
    )
}

export default Pricing
