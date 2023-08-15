import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { GitHub, Instagram, Mail, MailLock, MailOutline, Phone, WhatsApp } from '@mui/icons-material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Footer() {
    return (
        <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
            <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
                <div className='me-5 d-none d-lg-block'>
                    <span style={{ color: '#001E64' }} >Get connected with us on social networks:</span>
                </div>

                <div>
                    <a href='' className='me-4 text-reset'>
                        <FacebookIcon sx={{ color: '#001E64' }} />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <TwitterIcon sx={{ color: '#001E64' }} />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <GoogleIcon sx={{ color: '#001E64' }} />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <Instagram sx={{ color: '#001E64' }} />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <LinkedInIcon sx={{ color: '#001E64' }} />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <GitHub sx={{ color: '#001E64' }} />
                    </a>
                </div>
            </section>

            <section className=''>
                <MDBContainer className='text-center text-md-start mt-5'>
                    <MDBRow className='mt-3' style={{ color: '#001E64' }} >
                        <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
                            <p  >
                                <a href='#!' className='text-reset'>
                                    ABC
                                </a>
                            </p>
                            <p  >
                                <a href='#!' className='text-reset'>
                                    PQR
                                </a>
                            </p>
                            <p  >
                                <a href='#!' className='text-reset'>
                                    XYZ
                                </a>
                            </p>
                            <p  >
                                <a href='#!' className='text-reset'>
                                    SRS
                                </a>
                            </p>
                        </MDBCol>

                        <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Pricing
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Settings
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Orders
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Help
                                </a>
                            </p>
                        </MDBCol>

                        <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                            <p>
                                <LocationOnIcon />
                                Shree Krishna Square, 2A, Grant Lane, 7th Floor, Suite No. 7-I, Kolkata – 700012 , West Bengal, India
                            </p>
                            <p>
                                <EmailIcon />
                                 info@instade.co.in              </p>
                            <p>
                                <Phone /> +91 033 2984 0022
                            </p>
                            <p>
                                <WhatsApp />
                                +91 9903 9898 13
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        </MDBFooter>
    );
}