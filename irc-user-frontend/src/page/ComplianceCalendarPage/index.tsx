import React, { Children } from "react";

import { Box, CardContent, CardHeader, Chip } from "@mui/material";

import MasterHeader from '../../component/MasterHeader';
import IRCPageLoader from '../../component/IRCPageLoader';

import { EditTextDropdown } from "../../component/EditText";

import { useAppDispatch, useAppSelector } from "../../reduxStore/hooks";
import { allBusiness } from "../../network/store/business/allBusiness";
import { myRecord } from "../../network/store/record/myRecord";

import { Business } from '../../model/business';
import { Record } from '../../model/record';

import { Calendar, momentLocalizer, stringOrDate } from "react-big-calendar";

import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

type CalanderProps = {
    records: Record[],
}

const ComplianceCalander = ({ records }: CalanderProps) => {
    const localizer = momentLocalizer(moment);

    const [events, setEvents] = React.useState<any[]>([]);

    React.useEffect(() => {
        var ev = records.map((record: Record, index: number) => {
            var event = {
                id: record.id,
                title: record.form.name,
                start: new Date(record.actual_date),
                end: new Date(record.actual_date),
                colorCode: record.form.act.regulator.color_code
            } as any
            return event;
        });

        console.log('Records: ', records);
        console.log("ev", ev);
        setEvents(ev);
    }, [records])

    const handleSelect = (event: {
        start: stringOrDate;
        end: stringOrDate;
        slots: Date[] | string[];
        action: "select" | "click" | "doubleClick";
    }) => {
    };

    const EventWrapper = (props: any) => {
        const { children, value } = props;

        let result = events.filter(e => {
            return e.title === children.props.children.props.title;
        });

        children.props.style.width = "90%"
        children.props.style.marginLeft = "6px"
        children.props.style.backgroundColor = result[0].colorCode;

        return React.cloneElement(Children.only(children), {
            style: {
                ...children.props.style,
            },
        });
    };

    return (
        <Box>
            <Calendar
                selectable
                components={{
                    eventWrapper: EventWrapper
                }}
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                events={events}
                style={{ height: "70vh" }}
                step={15}
                timeslots={2}
                onSelectEvent={(event: any) => alert(event.title)}
                onSelectSlot={(event: any) => handleSelect(event)}
            />
        </Box>
    );
}


const ComplianceCalanderPage = () => {

    const dispatch = useAppDispatch();

    const [businesses, setBusinesses] = React.useState<Business[]>([]);

    const [business, setBusiness] = React.useState<Business | null>(null);

    const allBusinessSlice = useAppSelector((state) => state.allBusiness);


    const myRecordSlice = useAppSelector((state) => state.myRecord);

    const [records, setRecords] = React.useState<Record[]>([]);

    const [record, setRecord] = React.useState<Record | null>(null);


    React.useEffect(() => {
        if (allBusinessSlice.businessList.data !== undefined) {
            setBusinesses(allBusinessSlice.businessList.data)
            setBusiness(businesses[0] ? businesses[0] : null);
        }
    }, [allBusinessSlice]);


    React.useEffect(() => {
        dispatch(allBusiness(true));
    }, []);

    React.useEffect(() => {
        if (business !== null) {
            dispatch(myRecord({ id: business.id } as any));
        }
    }, [business]);

    React.useEffect(() => {
        if (myRecordSlice.recordList.data !== undefined) {
            setRecords(myRecordSlice.recordList.data);
        }
    }, [myRecordSlice]);


    const onBusinessSelected = (business: Business | null) => {
        setBusiness(business);
    }

    return (
        <>
            <Box
                p={2}
                sx={{ backgroundColor: 'white', borderRadius: 1 }}>
                <CardHeader
                    title={
                        <MasterHeader
                            title="Compliance Calander"
                            children={(
                                <EditTextDropdown
                                    label="Business"
                                    placeholder="e.g. Instade Business Service LLP"
                                    value={business}
                                    onChange={onBusinessSelected}
                                    md={12}
                                    sx={{ width: 250, }}
                                    options={businesses}
                                />
                            )}
                        />
                    }
                />
                <CardContent>
                    {myRecordSlice.loading === false ? (
                        <ComplianceCalander
                            records={records}
                        />

                    ) : <IRCPageLoader />}

                </CardContent>
            </Box>
        </>
    );
}

export default ComplianceCalanderPage;
