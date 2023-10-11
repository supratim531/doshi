import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import SlidingPanel from 'react-sliding-side-panel';
import 'react-sliding-side-panel/lib/index.css';
import { Record } from "../../model/record";

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { Close } from "@mui/icons-material";
import { Parser } from 'html-to-react'
import IRCDatePicker from "../../component/IRCDatePicker";
import { Frequency } from "../../model/frequency";
import InfoButton from "../../component/InfoButton";
import NotificationsIcon from '@mui/icons-material/Notifications';

type Props = {
    status: boolean;
    setStatus: any;
    record: Record | null
}

const RegulatorSidePanel = ({ status, setStatus, record }: Props) => {
    const [value, setValue] = React.useState('1');
    const [email, setEmail] = React.useState("");
    const [eventDate, setEventDate] = React.useState("");
    const [actualDueDate, setActualDueDate] = React.useState("");

    React.useEffect(() => {
        const keyDownHandler = (event: any) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                close();
            }
        };
        document.addEventListener('keydown', keyDownHandler);
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, []);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const getTaxPayers = () => {
        var data = record?.tax_payers.map(value => value.name);
        return data?.toString().replaceAll(',', ', ');
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
    }, [record]);

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
            var newDate = addDate(d, record?.frequency!!);
            setActualDueDate(newDate.getFullYear() + "-" + addZero(newDate.getMonth() + 1) + "-" + addZero(newDate.getDate()))
            console.log(record?.frequency)
        }
    }, [eventDate]);

    const formatDate: any = (date: any) => {
        if (date?.includes('-')) {
            let splittedDate = date.split('-');
            return `${splittedDate[2]}-${splittedDate[1]}-${splittedDate[0]}`;
        }

        return "Enter Event Date First";
    }

    return (
        <SlidingPanel
            type={'right'}
            isOpen={status}
            size={40}
        >
            <Box style={{ backgroundColor: 'white', height: '100vh', display: 'flex', flexDirection: 'column' }}>
                {/* <Box style={{ height: 100, borderBottom: '1px solid #ccc', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} px={2}>
                    <Typography variant="h5">Compliance</Typography>
                    <button style={{ height: 40, width: 40, borderRadius: 20, border: 'none', backgroundColor: '#efefef' }} onClick={close}>
                        <Close />
                    </button>
                </Box> */}
                <Box p={0} style={{ flexGrow: 1, overflowX: 'hidden', overflowY: 'scroll' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: "white", display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Details" value="1" />
                                <Tab label="Comments" value="2" />
                                <Tab label="Even Date Calculator" value="3" />
                                <Tab label="Reminders" value="4" />
                            </TabList>
                            <button style={{ height: 40, width: 40, borderRadius: 20, border: 'none', backgroundColor: '#efefef' }} onClick={close}>
                                <Close />
                            </button>
                        </Box>
                        <TabPanel value="1" sx={{ overflowX: 'scroll' }}>
                            <Grid container spacing={2}>
                                <Grid item md={6}>
                                    <Typography variant="body1" fontSize={16} fontWeight={700}>Record Type</Typography>
                                    <Typography variant="body1" fontSize={16} fontWeight={500}>{record?.form_type}</Typography>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography variant="body1" fontSize={16} fontWeight={700}>Regulator</Typography>
                                    <Typography variant="body1" fontSize={16} fontWeight={500}>{record?.form?.act?.regulator.name} <InfoButton title={record?.form?.act?.regulator?.remarks} /></Typography>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography variant="body1" fontSize={16} fontWeight={700}>Financial Year <InfoButton title={"Applicable Financial Year"} /></Typography>
                                    <Typography variant="body1" fontSize={16} fontWeight={500}>{record?.financial_year.financial_year}</Typography>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography variant="body1" fontSize={16} fontWeight={700}>Assesment Year <InfoButton title={"Applicable Assesment Year"} /></Typography>
                                    <Typography variant="body1" fontSize={16} fontWeight={500}>{record?.financial_year.assesment_year}</Typography>
                                </Grid>
                                {record?.form_type !== 'even' ? (
                                    <Grid item md={6}>
                                        <Typography variant="body1" fontSize={16} fontWeight={700}>From Date <InfoButton title={"Starting of the Applicable Period for the Compliance"} /></Typography>
                                        <Typography variant="body1" fontSize={16} fontWeight={500}>{formatDate(record?.date_from)}</Typography>
                                    </Grid>
                                ) : null
                                }

                                {record?.form_type !== 'even' ? (
                                    <Grid item md={6}>
                                        <Typography variant="body1" fontSize={16} fontWeight={700}>To Date <InfoButton title={"Ending of the Applicable Period for the Compliance"} /></Typography>
                                        <Typography variant="body1" fontSize={16} fontWeight={500}>{formatDate(record?.date_to)}</Typography>
                                    </Grid>
                                ) : null
                                }

                                <Grid item md={6}>
                                    <Typography variant="body1" fontSize={16} fontWeight={700}>Return Form Type <InfoButton title={"Includes Returns, Forms, Certifications, Annexures, Prescribed Formats and other applicable formats. Includes Compliances which needs to be done under various Acts"} /></Typography>
                                    <Typography variant="body1" fontSize={16} fontWeight={500}>{record?.form.form_type}</Typography>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography variant="body1" fontSize={16} fontWeight={700}>Returns / Forms / Certifications <InfoButton title={"Includes Returns, Forms, Certifications, Annexures, Prescribed Formats and other applicable formats"} /></Typography>
                                    <Typography variant="body1" fontSize={16} fontWeight={500}>{record?.form.name}</Typography>
                                </Grid>

                                <Grid item md={6}>
                                    <Typography variant="body1" fontSize={16} fontWeight={700}>Frequency <InfoButton title={"The interval or applicable tenure for compliance. See the Remarks for Specific Frequency selected"} /></Typography>
                                    <Typography variant="body1" fontSize={16} fontWeight={500}>{record?.frequency.name} <InfoButton title={record?.frequency.remarks} /></Typography>
                                </Grid>

                                {record?.form_type === 'even' ? (
                                    <Grid item md={6}>
                                        <Grid container>
                                            <IRCDatePicker
                                                disableOpenPicker={true}
                                                label="Event Date"
                                                value={eventDate}
                                                setStateValue={setEventDate}
                                            />
                                        </Grid>
                                    </Grid>
                                ) : null
                                }

                                <Grid item md={6}>
                                    <Typography variant="body1" fontSize={16} fontWeight={700}>Actual Due Date <InfoButton title={"The date by which the particular Form or Compliances needs to be performed as prescribed in the respective act. It is also the Key date for Trigger of Alerts & Notifications"} /></Typography>
                                    <Typography variant="body1" fontSize={16} fontWeight={500}>{formatDate(actualDueDate)}</Typography>
                                </Grid>

                                <Grid item md={12}>
                                    <Typography variant="body1" fontSize={16} fontWeight={700}>Tax Payers <InfoButton title={"Includes Type of Entity or Legal Structure or Applicable type of Taxpayer, this Needs to be selected in Profile > Settings. All Notifications shall be based on the Selected &quot;Tax Payer&quot; Type across the application. E.g., If your entity is OPC (One Person Company), then you need to select the same Tax Payer Type in the Profile > Settings or, if you are a Resident - Individual, then you need to select the same in the Profile > Settings All email alerts & Push Notifications shall be triggered on the basis of this."} /></Typography>
                                    <Typography className="tax-payer-scrollbar" variant="body1" fontSize={16} fontWeight={500} sx={{ wordBreak: "break-all", height: "96px", overflowY: "scroll" }}>{getTaxPayers()}</Typography>
                                </Grid>

                                <Grid item md={12}>
                                    <Typography variant="body1" fontSize={16} fontWeight={700}>Description <InfoButton title={"You may check the Description of each record for better understanding of the applicability of the compliance"} /></Typography>
                                    {Parser().parse(record?.description)}
                                </Grid>
                            </Grid>
                        </TabPanel>

                        {/* Rest 3 TabViews */}

                        <TabPanel value="2">
                            <Box style={{ width: "100%" }} pb={2}>
                                <div className="">Comments</div>
                                <input value={email} onChange={e => setEmail(e.target.value)} style={{ padding: "10px", width: "100%", borderRadius: "4px", border: "1px solid #7c8fac", fontSize: "16px" }} type="email" placeholder="Your comment" />
                            </Box>
                            <Button onClick={() => { alert("Under Developement!") }} variant="contained">Add</Button>
                        </TabPanel>
                        <TabPanel value="3">
                            <div className="" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",height:"70vh" }}>
                                <div className="" style={{ paddingBottom: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <img style={{ width: "70%", backgroundSize: "cover", backgroundPosition: "center" }} src="https://instade.co.in/irc/assets/user/images/pro.svg" alt="" />
                                </div>
                                <div style={{paddingLeft:"15px",paddingRight:"15px"}}>
                                    <p style={{ textAlign: "center" }}>Have you missed excluding Sundays while counting a Due Date? The magic of Event based Compliance Date Calculations is here !!!</p>
                                </div>
                                <p style={{ textAlign: "center",fontSize:"23px",fontWeight:"3px",color:"gray" }}>Available in Pro!</p>
                                <button className="btn btn-primary notify_btn" style={{backgroundColor:"#346cb0",height:"35px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                                    <NotificationsIcon/>
                                        
                                    Subscribe!
                                </button>
                            </div>
                        </TabPanel>
                        <TabPanel value="4">
                            <div className="" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",height:"70vh" }}>
                                <div className="" style={{ paddingBottom: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <img style={{ width: "70%", backgroundSize: "cover", backgroundPosition: "center" }} src="https://instade.co.in/irc/assets/user/images/pro.svg" alt="" />
                                </div>
                                <div style={{paddingLeft:"15px",paddingRight:"15px"}}>
                                    <p style={{ textAlign: "center" }}>Ahaa!!! Bored of Getting the System Generated Reminders? Customize your Reminders here!!!</p>
                                </div>
                                <p style={{ textAlign: "center",fontSize:"23px",fontWeight:"3px",color:"gray" }}>Available in Pro!</p>
                                <button className="btn btn-primary notify_btn" style={{backgroundColor:"#346cb0",height:"35px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                                    <NotificationsIcon/>
                                        
                                    Subscribe!
                                </button>
                            </div>
                        </TabPanel>
                    </TabContext>
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
