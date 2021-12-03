import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';

import PhoneRemove from '../PhoneActions/PhoneRemove/PhoneRemove'
import IconButton from "@mui/material/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PhoneModal from "../PhoneActions/PhoneModal/PhoneModal";
import {editPhone} from "../../routes/routes";
import PhoneInfo from "../PhoneActions/PhoneInfo/PhoneInfo";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

export default function PhoneList(props){
    let phone = props.phone;
    const [open, setOpen] = React.useState(false);


    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <Paper key={phone.id} sx={{ p: 2, margin: 'auto', width: 'auto', flexGrow: 1, borderTop: '2px solid #ededed' }}>
            <Grid container spacing={2} sx={{flexWrap: 'nowrap'}}>
                <Grid item>
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                        <Img alt="complex" src={phone.imageFileName} />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="subtitle1" component="div">
                                {phone.name}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {phone.manufacturer}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {phone.description}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Stack direction="row" spacing={1}>
                                <IconButton onClick={handleClick} aria-label="info">
                                    <InfoOutlinedIcon />
                                </IconButton>
                                <PhoneModal type='edit' id={phone.id} phone={phone} setPhone={props.editPhone} saveData={editPhone}/>
                                <PhoneRemove id={phone.id} removePhoneFromList={props.removePhoneFromList}/>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" component="div">
                            {phone.price}€
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <PhoneInfo phone={phone} />
            </Collapse>
        </Paper>

    )
}