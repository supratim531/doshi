import React from 'react';
import WriteDialog from '../WriteDialog';

import { Typography } from '@mui/material';

type Props = {
	title: string;
	name?: string | null;
	dialogState: boolean;
	setDialogState: any;
	onDelete: any;
	onCancelDelete: any;
}

const IRCDeleteDialog = ({ title, name, dialogState, setDialogState, onDelete, onCancelDelete } : Props) => {

	const onCancel = () => {
		setDialogState(false);
		onCancelDelete();
	}

	return(
		<WriteDialog
			title={"Delete "+ title}
		    dialogState={dialogState}
		    setDialogState={setDialogState}
		    successText={"Delete"}
		    onSuccess={onDelete}
		    onCancel={onCancel}>

		    <Typography variant="h6">
		    	Do you really want to delete {name?name:"this"} from {title}?
		    </Typography>

		</WriteDialog>
	);
}

export default IRCDeleteDialog;