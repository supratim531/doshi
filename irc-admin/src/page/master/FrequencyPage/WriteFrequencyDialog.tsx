import React from 'react';
import { Grid } from "@mui/material";

import { EditText, EditTextDropdown } from '../../../component/EditText';
import WriteDialog from '../../../component/WriteDialog';
import IRCSnackbar from '../../../component/IRCSnackbar';

import { addFrequency, updateFrequency } from '../../../network/frequency';
import { Frequency, FrequencyBody, WriteFrequencyResponse } from '../../../model/frequency';

type Props = {
    dialogState?: boolean;
    setDialogState?: any;
    frequency: Frequency | null;
    setFrequency: any;
    onSuccessButtonClick: any;
};

interface FrequencyType {
    id: string;
    name: string;
}

const frequencyTypes = [
    {
        id: 'even',
        name: 'Even (Event Based)'
    },
    {
        id: 'odd',
        name: 'ODD (On Due Date)'
    }
];

const WriteFrequencyDialog = ({ dialogState, setDialogState, frequency, setFrequency, onSuccessButtonClick }: Props) => {
    const [name, setName] = React.useState<string>("");
    const [days, setDays] = React.useState<number | null>(null);
    const [months, setMonths] = React.useState<number | null>(null);
    const [years, setYears] = React.useState<string | null | undefined>("");
    const [hours, setHours] = React.useState<number | null>(null);
    const [minutes, setMinutes] = React.useState<number | null>(null);
    const [remarks, setRemarks] = React.useState<string | null>(null);

    const [frequencyType, setFrequencyType] = React.useState<FrequencyType | null>(null);
    const [response, setResponse] = React.useState<WriteFrequencyResponse | null>(null);
    const [snackbar, setSnackbar] = React.useState(false);

    React.useEffect(() => {

        if (frequency !== null) {
            setName(frequency.name);
            var ft = frequencyTypes.find(obj => {
                return obj.id === frequency.frequency_type
            });
            setFrequencyType(ft as FrequencyType | null);
            setDays(frequency.days);
            setMonths(frequency.months);
            setYears(frequency.years?.toString());
            setHours(frequency.hours);
            setMinutes(frequency.minutes);
            setRemarks(frequency.remarks);
        }

    }, []);

    React.useEffect(() => {
        if (response !== null) {
            setSnackbar(true);
            if (response.status === 201 || response.status === 202) {
                onSuccessButtonClick();
                if (frequency === null) {
                    clear();
                }
            }
        }
    }, [response]);

    function successBtnClick() {
        if (frequency != null) {
            const frequencyReq = {
                id: frequency.id,
                name: name,
                frequency_type: frequencyType?.id,
                days: days,
                months: months,
                years: years,
                hours: hours,
                minutes: minutes,
                remarks: remarks,
            } as FrequencyBody;
            updateFrequency(frequencyReq, setResponse);
        }
        else {
            const frequencyReq = {
                name: name,
                frequency_type: frequencyType?.id,
                days: days,
                months: months,
                years: years,
                hours: hours,
                minutes: minutes,
                remarks: remarks,
            } as FrequencyBody;
            addFrequency(frequencyReq, setResponse);
        }
    }

    function onFrequencyTypeSelected(frequencyType: FrequencyType) {
        setFrequencyType(frequencyType);
    }

    function clear() {
        setFrequency(null);
        setName("");
        setFrequencyType(null);
        setDays(null);
        setMonths(null);
        setYears("");
        setHours(null);
        setMinutes(null);
        setRemarks(null);
    }

    const cancel = () => {
        clear();
        setResponse(null);
        setSnackbar(false);
    }

    return (
        <WriteDialog
            title={frequency ? "Update Frequency" : "Add Frequency"}
            dialogState={dialogState}
            setDialogState={setDialogState}
            successText={frequency ? "Update" : "Add"}
            onSuccess={successBtnClick}
            onCancel={cancel}
        >

            <Grid
                container
                pt={1}
                spacing={2}
            >

                <EditText
                    label="Name"
                    placeholder="e.g. 1 Year"
                    value={name}
                    setStateValue={setName}
                    md={12}
                    required
                />

                <EditTextDropdown
                    label="Frequency Type"
                    placeholder="e.g. ODD (On Due Date)"
                    value={frequencyType}
                    onChange={onFrequencyTypeSelected}
                    md={6}
                    options={frequencyTypes}
                    required
                />

                <EditText
                    label="Days"
                    placeholder="e.g. 30"
                    value={days}
                    setStateValue={setDays}
                    md={6}
                />

                <EditText
                    label="Months"
                    placeholder="e.g. 12"
                    value={months}
                    setStateValue={setMonths}
                    md={6}
                />

                <EditText
                    label="Years"
                    placeholder="e.g. 1"
                    value={years}
                    setStateValue={setYears}
                    md={6}
                />

                <EditText
                    label="Hours"
                    placeholder="e.g. 48"
                    value={hours}
                    setStateValue={setHours}
                    md={6}
                />

                <EditText
                    label="Minutes"
                    placeholder="e.g. 60"
                    value={minutes}
                    setStateValue={setMinutes}
                    md={6}
                />
                <EditText
                    label="Remarks"
                    placeholder={"Write something about " + name}
                    value={remarks}
                    setStateValue={setRemarks}
                    md={12}
                    multiline
                    minRows={5}
                />

            </Grid>

            {response !== null ? (
                <IRCSnackbar
                    open={snackbar}
                    setOpen={setSnackbar}
                    message={response?.message}
                    status={response?.status} />
            ) : null}

        </WriteDialog>
    );
}

export default WriteFrequencyDialog;
