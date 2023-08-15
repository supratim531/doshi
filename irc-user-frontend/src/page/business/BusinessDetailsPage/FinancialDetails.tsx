import * as React from 'react';

import { styled } from '@mui/material/styles';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

import { Box, Typography } from '@mui/material';

import FinancialDetailsComponent from './FinancialDetailsComponent';

import { useAppDispatch, useAppSelector } from "../../../reduxStore/hooks";
import { allFinancialYear } from "../../../network/store/financialYear/allFinancialYear";

import { FinancialYear } from '../../../model/financialYear';

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

export default function FinancialDetails({business}: any) {
    
    const dispatch = useAppDispatch();
    const allFinancialYearSlice = useAppSelector((state) => state.allFinancialYear);
    const [financialYears, setFinancialYears] = React.useState<FinancialYear[]>([]);

    React.useEffect(() => {
        dispatch(allFinancialYear(true));
    }, [])


    React.useEffect(() => {
        if(allFinancialYearSlice.financialYearList.data !== undefined){
            setFinancialYears(allFinancialYearSlice.financialYearList.data);
        }
    }, [allFinancialYearSlice]);

    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <Box
            py={2}>
            <div>
                {financialYears.length !== 0 ? (
                    <Typography variant="h5" mb={2}>Financial Details</Typography>
                ) : null}
                
                {financialYears.map((financialYear: FinancialYear, index: number) => (
                    <Accordion expanded={expanded === 'panel'+(index+1)} onChange={handleChange('panel'+(index+1))}>
                        <AccordionSummary>
                            <Typography>Financial Year {financialYear.financial_year}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FinancialDetailsComponent 
                                business={business}
                                financialYear={financialYear}
                            />
                        </AccordionDetails>
                    </Accordion>
                ))}
                
            </div>
        </Box>
    );
}
