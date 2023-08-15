import { Box, CircularProgress, Grid } from "@mui/material";

const IRCPageLoader = () => {
  return (
    <Box
      p={2}
      sx={{ backgroundColor: "white", borderRadius: 1, height: "60vh" }}
    >
      <Grid
        container
        direction="row"
        sx={{ height: "100%" }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <CircularProgress color="inherit" size={32} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default IRCPageLoader;
