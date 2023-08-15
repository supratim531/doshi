import { Chip } from "@mui/material";

type CProps = {
    backgroundColor: string;
    label?: string;
}
const IRCColoredChip = ({backgroundColor, label} : CProps) => {
    const rbg = backgroundColor.replace('#', '').match(/.{1,2}/g);
    let sum = 0;
    rbg?.map(hex => sum += parseInt(hex, 16));

    let color: string = "#000000";
    if(sum < 355){
        color = "#ffffff";
    }
    return(
        <Chip sx={{width: 100, backgroundColor: backgroundColor, color: color}} label={label?label:backgroundColor}></Chip>
    );
}

export default IRCColoredChip;