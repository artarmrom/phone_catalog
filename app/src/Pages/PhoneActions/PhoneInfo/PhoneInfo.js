import {ListItem, ListItemIcon} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import * as React from "react";


export default function PhoneInfo(props){

    return(
        <List component="div" disablePadding>
            <ListItem>
                <ListItemIcon>
                    <CheckCircleIcon/>
                </ListItemIcon>
                <ListItemText primary={'Color: '+props.phone.color} />
            </ListItem>
            <Divider />
            <ListItem>
                <ListItemIcon>
                    <CheckCircleIcon/>
                </ListItemIcon>
                <ListItemText primary={'Screen size: '+props.phone.screen} />
            </ListItem>
            <Divider />
            <ListItem>
                <ListItemIcon>
                    <CheckCircleIcon/>
                </ListItemIcon>
                <ListItemText primary={'Processor: '+props.phone.processor}/>
            </ListItem>
            <Divider />
            <ListItem>
                <ListItemIcon>
                    <CheckCircleIcon/>
                </ListItemIcon>
                <ListItemText primary={props.phone.ram + 'GB RAM'}/>
            </ListItem>
        </List>
    )
}