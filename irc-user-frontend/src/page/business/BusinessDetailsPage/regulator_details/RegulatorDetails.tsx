import * as React from 'react';

import { styled } from '@mui/material/styles';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

import { Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, Typography } from '@mui/material';

import { axiosClient } from '../../../../network/axiosClient';
import { BusinessRegulator, SimpleRegulator } from '../../../../model/regulator';

import IRCSnackbar from '../../../../component/IRCSnackbar';

// const useStyles = makeStyles({
//     typography: {
//         fontFamily: [
//             'Poppins',
//             'sans-serif'
//         ].join(','),
//     },
// });

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const rg = [
    {
        id: 1,
        name: "Income Tax",
        checked: true,
        default: true
    },
    {
        id: 2,
        name: "MCA",
        checked: false,
        default: false
    },
    {
        id: 3,
        name: "RBI",
        checked: false,
        default: false
    },
    {
        id: 4,
        name: "GST",
        checked: true,
        default: true
    }
]

export default function RegulatorDetails({ business }: any) {

    const [regulators, setRegulators] = React.useState<BusinessRegulator[]>([]);

    const [snackbar, setSnackbar] = React.useState(false);

    React.useEffect(() => {
        getRegulatorsFromAPI()
    }, [])


    // React.useEffect(() => {
    //     if (allFinancialYearSlice.financialYearList.data !== undefined) {
    //         setFinancialYears(allFinancialYearSlice.financialYearList.data);
    //     }
    // }, [allFinancialYearSlice]);

    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    };

    const getRegulatorsFromAPI = async () => {
        return await axiosClient
            .post(`regulator/simple`, true)
            .then((response: any) => setRegulators(rg))
            .catch((error: any) => console.log(error.response.data));
    }

    const regulatorCheckChange = (e: any, regulator: BusinessRegulator) => {
        const index = regulators.findIndex(object => {
            return object.id === regulator.id;
        })
        if (index !== -1) {
            regulators[index].checked = e.target.checked
        }
    }

    const saveRegulator = () => {
        var regulatorString = ""
        regulators.map((regulator: BusinessRegulator, index: number) => {

            regulatorString += regulator.id + ":" + regulator.checked;
            if (index < regulators.length - 1) {
                regulatorString += ","
            }
        });

        console.log(regulatorString);
        setSnackbar(true);
    }

    return (
        <Box
            py={2}>
            <div>
                <Typography variant="h5" mb={2}>Regulator Details</Typography>

                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary>
                        <Typography>Compliant Regulator</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container>
                            {
                                regulators.map((regulator: BusinessRegulator) => (
                                    <Grid item md={4} sm={4}>
                                        <FormControlLabel control={<Checkbox onChange={(e) => regulatorCheckChange(e, regulator)} defaultChecked={regulator.checked} disabled={regulator.default} />} label={regulator.name} />
                                    </Grid>
                                ))
                            }

                            <Grid
                                md={12}
                                sm={12}
                                item
                                sx={{
                                    display: 'flex',
                                }}
                            >
                                <Box sx={{ flexGrow: 1, }}></Box>
                                <Button
                                    onClick={saveRegulator}
                                    sx={{
                                        marginLeft: 'auto',
                                    }}
                                    variant="contained">
                                    Save
                                </Button>
                            </Grid>

                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </div>

            {snackbar !== false ? (
                <IRCSnackbar
                    open={snackbar}
                    setOpen={setSnackbar}
                    message={"Something went wrong!"}
                    status={400} />
            ) : null}
        </Box>
    );
}
