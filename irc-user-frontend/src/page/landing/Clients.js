import React from 'react'
import { Box, Typography } from '@mui/material'
import Delhivery from './images/Delhivery.png'
import Docusign from './images/DocuSign.png'
import Compotax from './images/CompuTaxx.png'
import Swal from './images/crop.png'
import birdLogo from './images/birdLogo.png'
import plus from './images/plusSign.jpg'
import metro from './images/metro.png'
import institute from './images/institute.png'

const data = [Delhivery, Docusign, Compotax, Swal, birdLogo, plus, metro, institute]

const Clients = () => {
    return (
        <Box py={10}  px={3} >
            <Box sx={{ maxWidth: '800px', margin: 'auto',marginBottom:'30px'}} >
                <Typography sx={{ textAlign: 'center' }} >
                    {/* <span style={{ fontSize: '1.4rem' }}>We work with</span> */}
                    // <span style={{ fontSize: '2rem' }} >We work with large Fortune 100 companies, several banks and startups </span>
                    <span style={{ fontSize: '2rem' }} >We work with large corporates, practicing professionals, and startups </span>
                    {/* <span style={{ fontSize: '1.4rem' }}>to help build seamless customer journeys that eliminate paper and leverage data for real time insights and decisions.</span> */}
                </Typography>
            </Box>
            <Box style={{ width: "80%", display: "flex", justifyContent: "center", margin: "0 auto", flexWrap: 'wrap' }} className="container row ">
                {data.map((item) => {
                    return (
                        <img
                            src={item}
                            style={{
                                margin: " 20px 20px",
                                height: "60px",
                                width: "auto",
                                maxWidth: '250px',
                                display: "inline",
                                allign: "center",
                            }}
                        />
                    );
                })}
            </Box>
        </Box>
    )
}

export default Clients;
