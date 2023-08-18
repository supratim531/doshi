import { Box, Chip, Grid, Typography } from "@mui/material";

type DashboardComponentProp = {
	title: string,
	data: number,
}

const DashboardComponent = ({ title, data }: DashboardComponentProp) => {
	return (
		<Grid item
			md={4} >
			<Box
				px={2}
				py={3}
				sx={{
					backgroundColor: '#fff',
					borderRadius: 1,
					border: '1px solid #bbb',
					height: 175,
				}}>

				<Chip
					sx={{ borderRadius: 1, fontWeight: 'bold', fontSize: 14, backgroundColor: "#32CD32" }}
					label={title}
					color="success" />

				<Typography variant="body1" sx={{ fontSize: 42, color: "#000" }}>{data}</Typography>

			</Box>
		</Grid>
	)
}

export default DashboardComponent;
