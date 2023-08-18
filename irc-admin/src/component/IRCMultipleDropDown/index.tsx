import { Autocomplete, Grid, TextField } from "@mui/material";

const IRCMultipleDropDown = (props: any) => {
    
    const getOptions=(options:any[],values:any[])=>{
        const res=options.filter((e1:any)=>{
            return values?.find((e2:any)=>{
                return e1.id!==e2.id;
            })
        })
        return res;
    }

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
                options={props?.value?props.options:getOptions(props?.options,props?.value)}
                getOptionLabel={(option: any) => option.name}
                filterSelectedOptions
                onChange={(event, newValue) => props.onChange(newValue)}
                defaultValue={props.defaultValue || []}
                value={props.value || []}
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
