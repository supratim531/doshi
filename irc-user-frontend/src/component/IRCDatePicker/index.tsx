import { Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs from "dayjs";

type Props = {
    label: string,
    value: string,
    setStateValue: any,
    disableOpenPicker?: boolean
}

const IRCDatePicker = ({ label, value, setStateValue, disableOpenPicker = false }: Props) => {
    const formatDate = (date: Date) => {
        var month = '' + (date.getMonth() + 1);
        var day = '' + date.getDate();
        var year = date.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    const pickDate = (date: any) => {
        console.log("Date is:", date);
        setStateValue(formatDate(date.$d));
    }

    return (
        <Grid
            md={12}
            sm={12}
            xs={12}
            item
        >
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label={label}
                    value={dayjs(new Date(value))}
                    onChange={pickDate}
                />
            </LocalizationProvider> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    disableOpenPicker={disableOpenPicker}
                    label={label}
                    value={value ? dayjs(new Date(value)) : ''}
                    onChange={pickDate}
                    format='DD-MM-YYYY'
                    slotProps={{
                        textField: {
                            error: false,
                        },
                    }}
                />
            </LocalizationProvider>
        </Grid>
    );
};

export default IRCDatePicker;
