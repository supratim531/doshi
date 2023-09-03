import { Box, Typography } from '@mui/material'
import React from 'react'

const PowerfulPlatform = () => {
    return (
        <Box py={5}>
            <Box sx={{ maxWidth: '580px', margin: 'auto', padding: '20px' }} >
                <Typography sx={{ fontSize: '2.5rem', textAlign: 'center' }} gutterBottom >Powerful Platform</Typography>
                <Typography sx={{ fontSize: '1.4rem', textAlign: 'center', fontWeight: 'light' }} gutterBottom >that helps you delight customers and optimize cost.We are not just another simple compliance solution</Typography>
            </Box>
            <Box sx={{
                justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: {
                    xs: 'column',
                    md: 'row'
                }
            }} >
                <Box sx={{ padding: '25px', width: '280px', backgroundColor: '#e8f6fd', margin: '20px', }} >
                    <Typography sx={{ fontSize: '1.5rem' }} gutterBottom >Single Platform</Typography>
                    <Typography sx={{ fontSize: '0.9rem' }} gutterBottom >One platform with everything you need to maintain Regulators, Compliance, Due Dates, Applicability thresholds, notifications, CRM, automations, integrations, regular updates, integrated dashboards</Typography>
                    <a style={{ textDecoration: 'none', color: '#0034ac' }} href="">Learn More  </a>
                </Box>

                <Box sx={{ padding: '25px', width: '280px', height:'275px', backgroundColor: '#fed6d6', margin: '20px', }} >
                    <Typography sx={{ fontSize: '1.5rem', fontWeight: 'light' }} gutterBottom >Anywhere, Anytime</Typography>
                    <Typography sx={{ fontSize: '0.9rem' }} gutterBottom >Electronically maintain compliance anywhere in the world at any point of time using our global trust service backbone</Typography>
                    <a style={{ textDecoration: 'none', color: '#0034ac' }} href="">Learn More  </a>
                </Box>
                <Box sx={{ padding: '25px', width: '280px', height:'275px', backgroundColor: '#f0e0ff', margin: '20px', }} >
                    <Typography sx={{ fontSize: '1.5rem', fontWeight: 'light' }} gutterBottom >Reliable and Secure</Typography>
                    <Typography sx={{ fontSize: '0.9rem' }} gutterBottom >Highly reliable and available with hosting on AWS delivering 99.9% availability</Typography>
                    <a style={{ textDecoration: 'none', color: '#0034ac' }} href="">Learn More  </a>
                </Box>
            </Box>
        </Box>
    )
}

export default PowerfulPlatform
