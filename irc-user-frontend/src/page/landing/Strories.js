import { Box, Typography } from '@mui/material';
import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import QuoteLeft from './images/quoteIcon.png'
import QuoteRight from './images/Quote-right.png'
const data = [
    {
        title: 'Head of Information Technology, dans',
        content: 'We selected eMudhra based on their extensive expertise and quality products. The deployment experience solidified our decision in that we were able to quickly adapt our PDF-based process to '
    },
    {
        title: 'Vice President – Corporate Asia, Barclays',
        content: 'Our sincere thanks to emSigner team for all support extended to us to sail India core banking re-platforming smoothly in a tight schedule. '
    },
    {
        title: 'HR Head – Amazon',
        content: 'eMudhra was instrumental in helping us move completely paperless in our HR processes. We are happy that this enables us to reduce our carbon footprint on a positive note. '
    },
    {
        title: 'Managing Director - Softnet Solutions, Peru',
        content: 'We are sure that the partnership with eMudhra will not only enhance our leadership in Peru, but it will also allow the expansion of digital security services nationwide and throughout the region. '
    }

]
const Strories = () => {
    return (
        <Box sx={{ padding: '50px 0', backgroundColor: '#f7efff' }} >
            <Typography gutterBottom variant='h4' sx={{textAlign:'center'}} >Victims of NON - COMPLIANCE & How we helped them</Typography>
            <Carousel variant="dark"  >
                {
                    data.map((item) => {
                        return (
                            <Carousel.Item interval={1000}>
                                <Box sx={{ maxWidth: '800px', margin: '40px auto', minHeight: '250px',padding:'50px', backgroundColor: 'white' }} >
                                    
                                    <Typography gutterBottom sx={{ textAlign: 'center', fontSize: '1.6rem' }} >
                                    <img style={{margin:' 5px'}} width={40}  src={QuoteLeft} alt="" />
                                    {item.content}
                                    <img style={{margin:'5px 5px'}} width={40}  src={QuoteRight} alt="" />
                                    </Typography>
                                    <Typography gutterBottom sx={{ textAlign: 'center', fontSize: '1.2rem' }} >{item.title}</Typography>
                                    
                                </Box>
                            </Carousel.Item>
                        )
                    })
                }
            </Carousel>
        </Box>
    )
}

export default Strories
