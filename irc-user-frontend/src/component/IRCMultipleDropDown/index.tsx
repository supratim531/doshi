import { Autocomplete, Grid, TextField } from "@mui/material";

const IRCMultipleDropDown = (props: any) => {
  return (
    <Grid
      md={props.md ? props.md : 12}
      sm={props.md ? props.md : 12}
      xs={props.md ? props.md : 12}
      item
    >
      <Autocomplete
        multiple
        size="medium"
        options={props.options}
        getOptionLabel={(option: any) => option.name}
        filterSelectedOptions
        onChange={(event, newValue) => props.onChange(newValue)}
        defaultValue={props.value}
        renderInput={(params) => (
          <TextField
            {...params}
            size="medium"
            label={props.label}
            placeholder={props.placeholder}
            variant="outlined"
          />
        )}
        freeSolo
      />
    </Grid>
  );
};

export default IRCMultipleDropDown
