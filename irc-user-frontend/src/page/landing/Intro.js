import React from 'react'
import image from './images/icons8-flight-64.png'
import { Box, Button, Typography } from '@mui/material'

const Intro = () => {
    return (
        <Box sx={{ backgroundColor: '#e8f5fd'}}>
            <Box sx={{ padding: '50px', maxWidth: '500px' }}>
                <Typography sx={{ fontSize: '2rem',fontWeight:'400'}} gutterBottom >We empower you to deliver the best</Typography>
                <Typography variant='h2' sx={{  fontSize: '2.8rem' }} gutterBottom >Paperless Experiences</Typography>
                <Typography sx={{ fontSize: '1.2rem' }} gutterBottom >Automate onboarding, invoicing and contracts with eSignatures, Workflows and AI. With emSigner, you can get up and running in hours, not weeks.</Typography>
                <Box sx={{margin:'20px 0',display:{
                    xs:'column',
                    md:'row'
                }}} >

                    <Button variant='contained' sx={{margin:'10px',borderRadius:5,padding:'10px 20px',backgroundColor:'#0034ac'}} >
                        Get Started
                    </Button>
                    <Button variant='outlined'  sx={{margin:'10px',borderRadius:5,padding:'10px 20px',color:'#0034ac',border:'1px solid #1c00ac'}} >
                        Request a Demo
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default Intro
