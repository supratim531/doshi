import React from 'react';
import {
  Button,
  Grid,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";


type Props = {
    title: string;
    onAddClick?: any;
    onpUdateClick?:any;
}

const MasterHeader = ({title, onAddClick,onpUdateClick} : Props) => {
	return(
		<Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}>

            <Grid item>
              	<h2>{title}</h2>
            </Grid>
               
            {onAddClick || onpUdateClick?(
                <Grid item>
                    {onAddClick&&<button
                        className='btn btn-primary m-1'
                        style={{height: 50, justifyContent: 'center', display: 'flex', alignItems: 'center'}}
                        onClick={onAddClick}>
                            <AddIcon style={{marginRight: 4, fontSize: 24,}} />
                            <span style={{fontSize: 16,}}>Add</span>
                    </button>}
                    {onpUdateClick&&<button
                        className='btn btn-primary m-1'
                        style={{height: 50, justifyContent: 'center', display: 'flex', alignItems: 'center'}}
                        onClick={onpUdateClick}>
                            <AddIcon style={{marginRight: 4, fontSize: 24,}} />
                            <span style={{fontSize: 16,}}>Update</span>
                    </button>}
                </Grid>
            ):null}
            
        </Grid>
	);
}

export default MasterHeader;