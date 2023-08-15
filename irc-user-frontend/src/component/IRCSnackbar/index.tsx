import React from 'react';
import { Alert, Snackbar } from "@mui/material";

type Props = {
	message: string,
	open: any,
	setOpen: any,
	status: number,
}

const IRCSnackbar = ({message, open, setOpen, status}: Props) => {

	const [severity, setSeverity] = React.useState("success");

	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    	if (reason === 'clickaway') {
      		return;
    	}

    	setOpen(false);
  	};

  	
  	if(status >= 400){
		return(
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
	            <Alert 
	            	onClose={handleClose}
	            	severity="error"
	            	variant="filled"
	            	sx={{ width: '100%' }}>
	                {message}
	            </Alert>
	        </Snackbar>
		);  		
  	} else if(status >= 200){
		return(
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
	            <Alert 
	            	onClose={handleClose}
	            	severity="success"
	            	variant="filled"
	            	sx={{ width: '100%' }}>
	                {message}
	            </Alert>
	        </Snackbar>
		);  		
  	} else {
		return(
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
	            <Alert 
	            	onClose={handleClose}
	            	severity="info"
	            	sx={{ width: '100%' }}>
	                {message}
	            </Alert>
	        </Snackbar>
		);  		
  	}

}

export default IRCSnackbar;