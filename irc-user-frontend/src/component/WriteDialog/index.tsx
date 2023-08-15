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
  title: string;
  dialogState: boolean;
  setDialogState: any;
  successText: string;
  onSuccess: any;
  onCancel: any;
  children: any;
};

const WriteDialog = ({
  title,
  dialogState,
  setDialogState,
  successText,
  onSuccess,
  onCancel,
  children,
}: Props) => {
  return (
    <Dialog open={dialogState}>
      <DialogTitle>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Grid item>
            <Typography variant="h5">{title}</Typography>
          </Grid>
          <Grid item>
            <IconButton
              onClick={() => {
                setDialogState(false);
                onCancel();
              }}
            >
              <CancelRoundedIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>

      <DialogContent sx={{ width: "100%", minWidth: 400, maxWidth: 600 }}>
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
          spacing={1}
        >
          <Grid item>
            <Button
              variant="text"
              onClick={() => {
                setDialogState(false);
                onCancel();
              }}
            >
              <Typography>Cancel</Typography>
            </Button>
          </Grid>

          <Grid item>
            <Button variant="contained" onClick={onSuccess}>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <Typography>{successText}</Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default WriteDialog;
