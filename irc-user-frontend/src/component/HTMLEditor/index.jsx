import React from 'react';
import JoditEditor from 'jodit-react';
import { Grid, Typography } from '@mui/material';

const HTMLEditor = ({ value, setValue, placeholder, md }) => {
	// const config = React.useMemo(
	// 	{
	// 		readonly: false, // all options from https://xdsoft.net/jodit/docs/,
	// 		placeholder: placeholder || 'Start typings...'
	// 	},
	// 	[placeholder]
	// );

	return (
        <Grid
            pl={2}
            my={2}
            md={md}>
                <Typography variant='h6' mb={2}>Description</Typography>
                <JoditEditor
                    value={value}
                    style={{width: '100%',}}
                    tabIndex={4} // tabIndex of textarea
                    onBlur={newContent => setValue(newContent)} // preferred to use only this option to update the content for performance reasons
                    onChange={newContent => console.log(newContent)}
                />
        </Grid>
	);
};

export default HTMLEditor;