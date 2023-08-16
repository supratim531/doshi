import React from "react";

import { Box, Button, Grid, Typography } from "@mui/material";
import SlidingPanel from 'react-sliding-side-panel';
import 'react-sliding-side-panel/lib/index.css';
import { Record } from "../../model/record";

import { Close, NoEncryption } from "@mui/icons-material";

import { Parser } from 'html-to-react'
import IRCDatePicker from "../../component/IRCDatePicker";
import { Frequency } from "../../model/frequency";

type Props = {
    status: boolean;
    setStatus: any;
    record: Record | null
}

const RegulatorSidePanel = ({ status, setStatus, record }: Props) => {
    const [email, setEmail] = React.useState("");
    const [eventDate, setEventDate] = React.useState("");
    const [actualDueDate, setActualDueDate] = React.useState("");

    const getTaxPayers = () => {
        var data = record?.tax_payers.map(value => value.name);
        return data?.toString();
    }

    const close = () => {
        setStatus(false);
        setActualDueDate("");
    }

    React.useEffect(() => {
        if (record?.form_type === 'even') {
            setActualDueDate("Enter Event Date First")
        } else {
            if (record?.actual_date === undefined) {
                setActualDueDate("")
            } else {
                setActualDueDate(record?.actual_date)
            }
        }
    }, [])

    const addDate = (date: Date, frequency: Frequency) => {
        var years = frequency.years !== null ? frequency.years : 0;
        var months = frequency.months !== null ? frequency.months : 0;
        var days = frequency.days !== null ? frequency.days : 0;
        var hours = frequency.hours !== null ? frequency.hours : 0;
        var minutes = frequency.minutes !== null ? frequency.minutes : 0;
        // var newDate = new Date(date.getFullYear() + years, date.getMonth() + months, date.getDay() + days, date.getHours() + hours, date.getMinutes() + minutes)
        var newDate = date;
        newDate.setFullYear(newDate.getFullYear() + years)
        newDate.setMonth(newDate.getMonth() + months)
        newDate.setDate(newDate.getDate() + days)

        console.log("Date - " + date);
        console.log("New Date - " + newDate);
        return newDate;
    }

    const addZero = (date: number) => {
        if (date <= 9) {
            return "0" + date.toString();
        } else {
            return date.toString();
        }
    }


    React.useEffect(() => {
        if (eventDate.length == 10) {
            const d = new Date(eventDate);
            var newDate = addDate(d, record?.frequency!!)
            setActualDueDate(addZero(newDate.getDate()) + "-" + addZero(newDate.getMonth() + 1) + "-" + newDate.getFullYear().toString())
            console.log(record?.frequency)
        }
    }, [eventDate])

    return (
        <SlidingPanel
            type={'right'}
            isOpen={status}
            size={30}
        >
            <Box style={{ backgroundColor: 'white', height: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Box style={{ height: 100, borderBottom: '1px solid #ccc', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} px={2}>
                    <Typography variant="h5">Compliance</Typography>
                    <button style={{ height: 40, width: 40, borderRadius: 20, border: 'none', backgroundColor: '#efefef' }} onClick={close}>
                        <Close />
                    </button>
                </Box>
                <Box p={2} style={{ flexGrow: 1, overflow: 'hidden', overflowY: 'scroll' }}>
                    <Grid container spacing={2}>
                        <Grid item md={6}>
                            <Typography variant="body1" fontSize={16} fontWeight={700}>Record Type</Typography>
                            <Typography variant="body1" fontSize={16} fontWeight={500}>{record?.form_type}</Typography>
                        </Grid>
                        <Grid item md={6}>
                            <Typography variant="body1" fontSize={16} fontWeight={700}>Regulator</Typography>
                            <Typography variant="body1" fontSize={16} fontWeight={500}>{record?.form?.act?.regulator.name}</Typography>
                        </Grid>
                        <Grid item md={6}>
                            <Typography variant="body1" fontSize={16} fontWeight={700}>Financial Year</Typography>
                            <Typography variant="body1" fontSize={16} fontWeight={500}>{record?.financial_year.financial_year}</Typography>
                        </Grid>
                        <Grid item md={6}>
                            <Typography variant="body1" fontSize={16} fontWeight={700}>Assesment Year</Typography>
                            <Typography variant="body1" fontSize={16} fontWeight={500}>{record?.financial_year.assesment_year}</Typography>
                        </Grid>
                        {record?.form_type !== 'even' ? (
                            <Grid item md={6}>
                                <Typography variant="body1" fontSize={16} fontWeight={700}>From Date</Typography>
                                <Typography variant="body1" fontSize={16} fontWeight={500}>{record?.date_from}</Typography>
                            </Grid>
                        ) : null
                        }

                        {record?.form_type !== 'even' ? (
                            <Grid item md={6}>
                                <Typography variant="body1" fontSize={16} fontWeight={700}>To Date</Typography>
                                <Typography variant="body1" fontSize={16} fontWeight={500}>{record?.date_to}</Typography>
                            </Grid>
                        ) : null
                        }

                        <Grid item md={6}>
                            <Typography variant="body1" fontSize={16} fontWeight={700}>Return Form Type</Typography>
                            <Typography variant="body1" fontSize={16} fontWeight={500}>{record?.form.form_type}</Typography>
                        </Grid>
                        <Grid item md={6}>
                            <Typography variant="body1" fontSize={16} fontWeight={700}>Returns / Forms / Certifications</Typography>
                            <Typography variant="body1" fontSize={16} fontWeight={500}>{record?.form.name}</Typography>
                        </Grid>

                        <Grid item md={6}>
                            <Typography variant="body1" fontSize={16} fontWeight={700}>Frequency</Typography>
                            <Typography variant="body1" fontSize={16} fontWeight={500}>{record?.frequency.name}</Typography>
                        </Grid>

                        {record?.form_type === 'even' ? (
                            <Grid item md={6}>
                                <Grid container>
                                    <IRCDatePicker
                                        label="Event Date"
                                        value={eventDate}
                                        setStateValue={setEventDate}
                                    />
                                </Grid>
                            </Grid>
                        ) : null
                        }

                        <Grid item md={6}>
                            <Typography variant="body1" fontSize={16} fontWeight={700}>Actual Due Date</Typography>
                            <Typography variant="body1" fontSize={16} fontWeight={500}>{actualDueDate}</Typography>
                        </Grid>

                        <Grid item md={12}>
                            <Typography variant="body1" fontSize={16} fontWeight={700}>Tax Payers</Typography>
                            <Typography className="tax-payer-scrollbar" variant="body1" fontSize={16} fontWeight={500} sx={{ wordBreak: "break-all", height: "96px", overflowY: "scroll" }}>{getTaxPayers()}</Typography>
                        </Grid>

                        <Grid item md={12}>
                            <Typography variant="body1" fontSize={16} fontWeight={700}>Description</Typography>
                            {Parser().parse(record?.description)}
                        </Grid>
                    </Grid>
                </Box>

                <Box style={{ width: "100%", display: 'flex', borderTop: '1px solid #ccc', flexDirection: 'row', justifyContent: "space-between" }} pl={2} pr={4} py={2}>
                    <input value={email} onChange={e => setEmail(e.target.value)} style={{ padding: "10px", width: "75%", borderRadius: "4px", border: "1px solid #7c8fac", fontSize: "16px" }} type="email" placeholder="Enter Email ID" />
                    <Button onClick={() => { alert("Under Developement!") }} variant="contained">Share</Button>
                </Box>
            </Box>
        </SlidingPanel>
    );
}

export default RegulatorSidePanel;
