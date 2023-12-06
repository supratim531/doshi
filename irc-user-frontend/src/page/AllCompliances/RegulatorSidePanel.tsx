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

	function sendEmail() {
		const subject = `${record?.form.name} ${record?.financial_year.financial_year} - IRC`;
		let body = [
			`Regulator: ${record?.form.act.regulator.name}`,
			`Act: ${record?.form.act.name}`,
			`Section: ${[record?.form.sections?.map(e => e.name)].join(", ")}`,
			`Form Name: ${record?.form.name}`,
			`Form Type: ${record?.form.form_type}`,
			`Compliance Type: ${record?.form_type}`,
			`Frequency: ${record?.frequency.name}`,
			`Frequency Type: ${record?.frequency.frequency_type}`,
			`Assesment Year: ${record?.financial_year.assesment_year}`,
			`Financial Year: ${record?.financial_year.financial_year}`,
			`Due Date: ${record?.actual_date ? record?.actual_date : "NIL"}`,
			`From Date: ${record?.date_from ? record?.date_from : "NIL"}`,
			`To Date: ${record?.date_to ? record?.date_to : "NIL"}`,
			`Tax Payers: ${[record?.tax_payers.map(e => e.name)].join(", ")}`,
			`States: ${record?.states === null || record?.states?.length === 0 ? "All States" : [record?.states?.map(e => e.name)].join(", ")}`,
			``,
			`Extended Due Date 1: ${record?.extended_due_date_1 ? record?.extended_due_date_1 : "NIL"}`,
			`Extended Due Date 1 Remarks: ${record?.extended_due_date_remark_1 ? record?.extended_due_date_remark_1 : "NIL"}`,
			`Extended Due Date 2: ${record?.extended_due_date_2 ? record?.extended_due_date_2 : "NIL"}`,
			`Extended Due Date 2 Remarks: ${record?.extended_due_date_remark_2 ? record?.extended_due_date_remark_2 : "NIL"}`,
			`Extended Due Date 3: ${record?.extended_due_date_3 ? record?.extended_due_date_3 : "NIL"}`,
			`Extended Due Date 3 Remarks: ${record?.extended_due_date_remark_3 ? record?.extended_due_date_remark_3 : "NIL"}`,
			`Extended Due Date 4: ${record?.extended_due_date_4 ? record?.extended_due_date_4 : "NIL"}`,
			`Extended Due Date 4 Remarks: ${record?.extended_due_date_remark_4 ? record?.extended_due_date_remark_4 : "NIL"}`,
			`Extended Due Date 5: ${record?.extended_due_date_5 ? record?.extended_due_date_5 : "NIL"}`,
			`Extended Due Date 5 Remarks: ${record?.extended_due_date_remark_5 ? record?.extended_due_date_remark_5 : "NIL"}`
		].join("%0D%0A");

		window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
	}

	const Info = ({ thin, title, hoverContent }: any) => {
		return (
			<div>
				<span className={thin ? "font-medium text-gray-800" : "font-bold text-gray-800"}>
					{title}{" "}
					<span title={hoverContent}>
						<svg
							className="mb-1 inline-flex cursor-pointer w-4 h-4 text-gray-700 hover:text-gray-900"
							aria-hidden="true"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
								clipRule="evenodd"
							/>
						</svg>
					</span>
				</span>
			</div>
		);
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
						<Box sx={{ borderBottom: 1, position: "sticky", top: 0, zIndex: 1, borderColor: 'divider', backgroundColor: "white", display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>
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
									<Info thin={true} title={record?.form?.act?.regulator.name} hoverContent={record?.form?.act?.regulator?.remarks} />
									{/* <Typography variant="body1" fontSize={16} fontWeight={500}>{record?.form?.act?.regulator.name} <InfoButton title={record?.form?.act?.regulator?.remarks} /></Typography> */}
								</Grid>
								<Grid item md={6}>
									{/* <Typography variant="body1" fontSize={16} fontWeight={700}>Financial Year <InfoButton title={"Applicable Financial Year"} /></Typography> */}
									<Info title={"Financial Year"} hoverContent={"Applicable Financial Year"} />
									<Typography variant="body1" fontSize={16} fontWeight={500}>{record?.financial_year.financial_year}</Typography>
								</Grid>
								<Grid item md={6}>
									{/* <Typography variant="body1" fontSize={16} fontWeight={700}>Assesment Year <InfoButton title={"Applicable Assesment Year"} /></Typography> */}
									<Info title={"Assesment Year"} hoverContent={"Applicable Assesment Year"} />
									<Typography variant="body1" fontSize={16} fontWeight={500}>{record?.financial_year.assesment_year}</Typography>
								</Grid>
								{record?.form_type !== 'even' ? (
									<Grid item md={6}>
										{/* <Typography variant="body1" fontSize={16} fontWeight={700}>From Date <InfoButton title={"Starting of the Applicable Period for the Compliance"} /></Typography> */}
										<Info title={"From Date"} hoverContent={"Starting of the Applicable Period for the Compliance"} />
										<Typography variant="body1" fontSize={16} fontWeight={500}>{formatDate(record?.date_from)}</Typography>
									</Grid>
								) : null
								}

								{record?.form_type !== 'even' ? (
									<Grid item md={6}>
										{/* <Typography variant="body1" fontSize={16} fontWeight={700}>To Date <InfoButton title={""} /></Typography> */}
										<Info title={"To Date"} hoverContent={"Ending of the Applicable Period for the Compliance"} />
										<Typography variant="body1" fontSize={16} fontWeight={500}>{formatDate(record?.date_to)}</Typography>
									</Grid>
								) : null
								}

								<Grid item md={6}>
									<Info title={"Record Form Type"} hoverContent={"Includes Returns, Forms, Certifications, Annexures, Prescribed Formats and other applicable formats. Includes Compliances which needs to be done under various Acts"} />
									<Typography variant="body1" fontSize={16} fontWeight={500}>{record?.form.form_type}</Typography>
								</Grid>
								<Grid item md={6}>
									{/* <Typography sx={{ display: "flex" }} variant="body1" fontSize={16} fontWeight={700}>Returns / Forms / Certifications <InfoButton title={"Includes Returns, Forms, Certifications, Annexures, Prescribed Formats and other applicable formats"} /></Typography> */}
									<Info title={"Returns / Forms / Certifications"} hoverContent={"Includes Returns, Forms, Certifications, Annexures, Prescribed Formats and other applicable formats"} />
									<Typography variant="body1" fontSize={16} fontWeight={500}>{record?.form.name}</Typography>
								</Grid>

								<Grid item md={6}>
									<Info title={"Frequency"} hoverContent={"The interval or applicable tenure for compliance. See the Remarks for Specific Frequency selected"} />
									<Info thin={true} title={record?.frequency.name} hoverContent={record?.frequency.remarks} />
									{/* <Typography variant="body1" fontSize={16} fontWeight={500}>{record?.frequency.name} <InfoButton title={record?.frequency.remarks} /></Typography> */}
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
									<Info title={"Actual Due Date"} hoverContent={"The date by which the particular Form or Compliances needs to be performed as prescribed in the respective act. It is also the Key date for Trigger of Alerts & Notifications"} />
									<Typography variant="body1" fontSize={16} fontWeight={500}>{formatDate(actualDueDate)}</Typography>
								</Grid>

								<Grid item md={12}>
									{/* <Typography variant="body1" fontSize={16} fontWeight={700}>Tax Payers <InfoButton title={"Includes Type of Entity or Legal Structure or Applicable type of Taxpayer, this Needs to be selected in Profile > Settings. All Notifications shall be based on the Selected &quot;Tax Payer&quot; Type across the application. E.g., If your entity is OPC (One Person Company), then you need to select the same Tax Payer Type in the Profile > Settings or, if you are a Resident - Individual, then you need to select the same in the Profile > Settings All email alerts & Push Notifications shall be triggered on the basis of this."} /></Typography> */}
									<Info title={"Tax Payers"} hoverContent={"Includes Type of Entity or Legal Structure or Applicable type of Taxpayer, this Needs to be selected in Profile > Settings. All Notifications shall be based on the Selected &quot;Tax Payer&quot; Type across the application. E.g., If your entity is OPC (One Person Company), then you need to select the same Tax Payer Type in the Profile > Settings or, if you are a Resident - Individual, then you need to select the same in the Profile > Settings All email alerts & Push Notifications shall be triggered on the basis of this"} />
									<Typography className="tax-payer-scrollbar" variant="body1" fontSize={16} fontWeight={500} sx={{ wordBreak: "break-all", maxHeight: "96px", overflowY: "scroll" }}>{getTaxPayers()}</Typography>
								</Grid>

								<Grid item md={12}>
									{/* <Typography variant="body1" fontSize={16} fontWeight={700}>Description <InfoButton title={"You may check the Description of each record for better understanding of the applicability of the compliance"} /></Typography> */}
									<Info title={"Description"} hoverContent={"You may check the Description of each record for better understanding of the applicability of the compliance"} />
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
							<div className="" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "70vh" }}>
								<div className="" style={{ paddingBottom: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
									<img style={{ width: "70%", backgroundSize: "cover", backgroundPosition: "center" }} src="https://instade.co.in/irc/assets/user/images/pro.svg" alt="" />
								</div>
								<div style={{ paddingLeft: "15px", paddingRight: "15px" }}>
									<p style={{ textAlign: "center" }}>Have you missed excluding Sundays while counting a Due Date? The magic of Event based Compliance Date Calculations is here !!!</p>
								</div>
								<p style={{ textAlign: "center", fontSize: "23px", fontWeight: "3px", color: "gray" }}>Available in Pro!</p>
								<button className="btn btn-primary notify_btn" style={{ backgroundColor: "#346cb0", height: "35px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
									<NotificationsIcon />

									Subscribe!
								</button>
							</div>
						</TabPanel>
						<TabPanel value="4">
							<div className="" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "70vh" }}>
								<div className="" style={{ paddingBottom: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
									<img style={{ width: "70%", backgroundSize: "cover", backgroundPosition: "center" }} src="https://instade.co.in/irc/assets/user/images/pro.svg" alt="" />
								</div>
								<div style={{ paddingLeft: "15px", paddingRight: "15px" }}>
									<p style={{ textAlign: "center" }}>Ahaa!!! Bored of Getting the System Generated Reminders? Customize your Reminders here!!!</p>
								</div>
								<p style={{ textAlign: "center", fontSize: "23px", fontWeight: "3px", color: "gray" }}>Available in Pro!</p>
								<button className="btn btn-primary notify_btn" style={{ backgroundColor: "#346cb0", height: "35px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
									<NotificationsIcon />

									Subscribe!
								</button>
							</div>
						</TabPanel>
					</TabContext>
				</Box>

				<Box style={{ width: "100%", display: 'flex', borderTop: '1px solid #ccc', flexDirection: 'row', justifyContent: "space-between", gap: "6px" }} pl={2} pr={4} py={2}>
					<input value={email} onChange={e => setEmail(e.target.value)} style={{ padding: "10px", flexGrow: 1, borderRadius: "4px", border: "1px solid #7c8fac", fontSize: "16px" }} type="email" placeholder="Enter Email ID" />
					{/* <a href="mailto:supratimmajumder531@gmail.com?subject=Meeting%20Agenda&body=Hi,%20let's%20discuss%20the%20agenda%20for%20our%20upcoming%20meeting">Send Email</a> */}
					<Button onClick={sendEmail} variant="contained">Share</Button>
					<Button sx={{ fontSize: "12px", cursor: "not-allowed" }} disabled variant="outlined">Mark Complete</Button>
				</Box>
			</Box>
		</SlidingPanel>
	);
}

export default RegulatorSidePanel;
