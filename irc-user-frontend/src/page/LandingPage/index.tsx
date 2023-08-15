import React from 'react';
import { useNavigate } from 'react-router-dom';
import img1 from './img1.png';

import { Box } from '@mui/material';

import Navbar from '../../component/Navbar';

const LandingPage = () => {

	let navigate = useNavigate();
	const token = localStorage.getItem('token');

	React.useEffect(() => {
		if(token){			
			navigate('dashboard');
		}
	}, [token])

	return(
		<Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
			<Navbar />
			<Box
                sx={{
                	flexGrow: 1,
                    backgroundImage: 'url(https://source.unsplash.com/random)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
		</Box>
	);
}

export default LandingPage;