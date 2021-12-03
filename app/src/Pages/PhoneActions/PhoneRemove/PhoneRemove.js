import * as React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {deletePhone} from "../../../routes/routes";
import AlertDialog from "../../../Components/AlertDialog/AlertDialog";


export default function PhoneRemove(props){
    const [remove, setRemove] = React.useState(false)

    async function removePhone(response){
        if(response) {
            await deletePhone(props.id);
            props.removePhoneFromList(props.id)
        }
        setRemove(false);
    }

    let alertDialog = <AlertDialog title={"Are you sure you want to remove this phone from the catalog?"} text={"This action is irreversible."} setResponse={removePhone}/>;
    function handleClick(){
        setRemove(true);
    }

    return(
        <div>
            <IconButton onClick={handleClick} aria-label="remove">
                <DeleteIcon />
            </IconButton>
            {remove?alertDialog:null}
        </div>
    )
}
