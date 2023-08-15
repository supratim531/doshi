import React from 'react';
import {
  Grid,
  TextField,
  Autocomplete,
} from "@mui/material";

import {
  MuiColorInput,
  MuiColorInputValue,
  MuiColorInputColors,
  MuiColorInputFormat,
} from "mui-color-input";


export const EditText = (props) => {
	return(
		<Grid 
			md={props.md?props.md:12}
            sm={props.md?props.md:12}
            xs={props.md?props.md:12}
			item>
            <TextField
                label={props.label}
                variant="outlined"
                size="medium"
                value={props.value === null ? '' : props.value}
                placeholder={props.placeholder}
        	    onChange = {(e) => props.setStateValue(e.target.value)}
        	    fullWidth
            	{...props}
            />
        </Grid>
	);
}

export const EditTextColor = (props) => {
    	
    return(
		<Grid 
            md={props.md?props.md:12}
            item>
            <MuiColorInput
                label={props.label}
                size="medium"
                value={props.value}
                onChange={(value, _colors) => props.setStateValue(value)}
                format="hex"
                {...props}
            />

        </Grid>
	);
}


export const EditTextDropdown = (props) => {

    return(
        <Grid 
            md={props.md?props.md:12}
            sm={props.md?props.md:12}
            xs={props.md?props.md:12}
            item>

            <Autocomplete
                size="medium"
                value={props.value || ""}
                options={props.options}
                onChange={(event, newValue) => props.onChange(newValue)}
                
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={props.label}
                        size="medium"
                        placeholder={props.placeholder}
                        variant="outlined"
                        InputProps={{
                            ...params.InputProps,
                        }}
                        {...props}
                    />
                )}
                getOptionLabel={(option) => option.name || ""}
            />
        </Grid>
    )
}


export const EditTextFYDropdown = (props) => {

    return(
        <Grid 
            md={props.md?props.md:12}
            sm={props.md?props.md:12}
            xs={props.md?props.md:12}
            item>

            <Autocomplete
                size="medium"
                value={props.value || null}
                options={props.options}
                onChange={(event, newValue) => props.onChange(newValue)}
                
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={props.label}
                        size="medium"
                        placeholder={props.placeholder}
                        variant="outlined"
                        InputProps={{
                            ...params.InputProps,
                        }}
                        {...props}
                    />
                )}
                getOptionLabel={(option) => option.financial_year || ""}
            />
        </Grid>
    )
}

