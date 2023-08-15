import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

import CancelRoundedIcon from "@mui/icons-material/CancelRounded";


type Props = {
  selectedItem?: FinancialYearList | any;
  addSectionsDialogEnable?: boolean | any;
  addFormsDialogUpdateState?: boolean | any;
};

const WriteDialog = ({title, dialogState, setDialogState, successText, onSuccess, onCancel, children}) => {

    return (
        <Dialog 
            open={dialogState}>
            
            <DialogTitle>

                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start">
                    
                    <Grid item>
                        <Typography variant="h5">{title}</Typography>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={() => {
                            setDialogState(false);
                            onCancel();
                        }}>
                            <CancelRoundedIcon />
                        </IconButton>
                    </Grid>
                </Grid>

            </DialogTitle>
            
            <DialogContent
                sx={{width: 600}}>
                
                {children}
            </DialogContent>
      
            <DialogActions>
                
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="flex-start"
                    mr={2}
                    my={0.5}

                    spacing={1}>
                        
                    <Grid item>
                        <button
                            className='btn btn-light m-1'
                            style={{height: 50, justifyContent: 'center', display: 'flex', alignItems: 'center'}}
                            onClick={() => {
                                setDialogState(false);
                                onCancel();
                            }}>
                                <span style={{fontSize: 16,}}>Cancel</span>
                        </button>
                    
                    </Grid>
                    
                    <Grid item>
                        <button
                            className='btn btn-primary m-1'
                            style={{height: 50, justifyContent: 'center', display: 'flex', alignItems: 'center'}}
                            onClick={onSuccess}>
                                <span style={{fontSize: 16,}}>{successText}</span>
                        </button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
  );
}


export default WriteDialog;