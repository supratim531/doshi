import React from 'react';

import { Box, Grid, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { Business } from '../../model/business';

// type Props = {
// 	business: Business,
// }

type Props = {
	business: any
}

const IRCBusinessCard = ({business}: Props) => {

	const navigate = useNavigate();

	const onCardClicked = () => {
		navigate(business.uri);
		// navigate('/business-details', { state: business });
	}

	return (
		<Grid item 
			md={4}
			sm={4}
		>
			<Box
				p={2}
				sx={{
					display: 'flex',
					flexDirection: 'row',
					boxShadow: '1px 3px 6px 0px rgba(120,120,120,0.4)', 
					justifyContent:"center",
					alignItems:"center",
					borderRadius: 1,
					height: 150, 
					cursor: 'pointer'
				}}
				onClick={onCardClicked}
				>

				<Box sx={{

				}}>
					<Typography style={{
						fontSize: 28,
						lineHeight: "28px",
						fontWeight:550
					}}>{business.name}</Typography>
					
				</Box>
			</Box>
		</Grid>
	);
}

export default IRCBusinessCard;