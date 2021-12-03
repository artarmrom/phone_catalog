import * as React from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {ListItemIcon} from "@mui/material";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Fade from "@material-ui/core/Fade";
import {makeStyles} from "@material-ui/core/styles";
import CloseIcon from '@mui/icons-material/Close';
import PhoneTextfield from './PhoneTextfield'
import ImageCropper from '../../../Components/ImageCropper/ImageCropper';
import getCroppedImg from '../../../Components/ImageCropper/CropperFunction';
import firestore from '../../../settings/firebase';
import firebase from 'firebase';

import './phoneModal.css'
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflowY: 'scroll'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        alignSelf: 'baseline'
    }
}));

export default function PhoneModal(props){
    const classes = useStyles();
    const [name, setName] = React.useState('');
    const [manufacturer, setManufacturer] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [color, setColor] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [screen, setScreen] = React.useState('');
    const [processor, setProcessor] = React.useState('');
    const [ram, setRam] = React.useState('');
    const [phoneImage, setPhoneImage] = React.useState();
    const [croppedAreaPixels, setCroppedAreaPixels] = React.useState();
    const [croppedImageData, setCroppedImageData] = React.useState();
    const [errorTextName, setErrorTextName] = React.useState('');
    const [errorTextManufacturer, setErrorTextManufacturer] = React.useState('');
    const [errorTextDescription, setErrorTextDescription] = React.useState('');
    const [errorTextColor, setErrorTextColor] = React.useState('');
    const [errorTextPrice, setErrorTextPrice] = React.useState('');
    const [errorTextScreen, setErrorTextScreen] = React.useState('');
    const [errorTextProcessor, setErrorTextProcessor] = React.useState('');
    const [errorTextRam, setErrorTextRam] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {setOpen(false);};
    const changeName = (e) => {if(e.target.value!==''){setName(e.target.value)}else{setName(e.target.value);setErrorTextName('Empty field')}};
    const changeManufacturer = (e) => {if(e.target.value!==''){setManufacturer(e.target.value)}else{setManufacturer(e.target.value);setErrorTextManufacturer('Empty field')}};
    const changeDescription = (e) => {if(e.target.value!==''){setDescription(e.target.value)}else{setDescription(e.target.value);setErrorTextDescription('Empty field')}};
    const changeColor = (e) => {if(e.target.value!==''){setColor(e.target.value)}else{setColor(e.target.value);setErrorTextColor('Empty field')}};
    const changePrice = (e) => {if(!isNaN(parseInt(e.target.value)) && e.target.value!==''){setPrice(parseInt(e.target.value));setErrorTextPrice('')}else if(e.target.value===''){setPrice(e.target.value);setErrorTextPrice('Empty field')}else{setPrice(e.target.value);setErrorTextPrice('Must be number')}};
    const changeScreen = (e) => {if(e.target.value!==''){setScreen(e.target.value)}else{setScreen(e.target.value);setErrorTextScreen('Empty field')}};
    const changeProcessor = (e) => {if(e.target.value!==''){setProcessor(e.target.value)}else{setProcessor(e.target.value);setErrorTextProcessor('Empty field')}};
    const changeRam = (e) => {if(!isNaN(parseInt(e.target.value)) && e.target.value!==''){setRam(parseInt(e.target.value));setErrorTextRam('')}else if(e.target.value===''){setRam(e.target.value);setErrorTextRam('Empty field')}else{setRam(e.target.value);setErrorTextRam('Must be number')}};
    const changePhoneImage = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.addEventListener("load",()=>{
            setPhoneImage(reader.result)
        })
    };

    React.useEffect(()=>{
        if(props.type==='edit'){
            setData()
        }
    },[props.phone])

    React.useEffect(()=>{
        if(phoneImage && croppedAreaPixels){
            showCroppedImage(phoneImage,croppedAreaPixels)
        }
    },[phoneImage, croppedAreaPixels])

    function getResizeValues(croppedArea, croppedAreaPixels) {
        setCroppedAreaPixels(croppedAreaPixels)
    }

    const showCroppedImage = async (phoneImageInput, croppedAreaInput) => {
        try {
            console.log(phoneImageInput)
            console.log(croppedAreaInput)
            const croppedImage = await getCroppedImg(
                phoneImageInput,
                croppedAreaInput,
            )
            console.log(croppedImage)
            const reader = new FileReader();
            reader.readAsDataURL(croppedImage)
            reader.addEventListener("load",()=>{
                setCroppedImageData(croppedImage)
            })
        } catch (error) {
            console.error(error)
        }
    }

    const cleanData = () =>{
        setName('')
        setDescription('')
        setManufacturer('')
        setColor('')
        setPrice('')
        setScreen('')
        setProcessor('')
        setRam('')
        setCroppedImageData(undefined)
        setPhoneImage(undefined)
    }

    const setData = () =>{
        setName(props.phone.name)
        setDescription(props.phone.description)
        setManufacturer(props.phone.manufacturer)
        setColor(props.phone.color)
        setPrice(props.phone.price)
        setScreen(props.phone.screen)
        setProcessor(props.phone.processor)
        setRam(props.phone.ram)
        setPhoneImage(props.phone.imageFileName)
    }

    const storagePhone = async () =>{
        let object={};
        object.id=props.id;
        object.name=name;
        object.manufacturer=manufacturer;
        object.description=description;
        object.color=color;
        object.price=price;
        object.screen=screen;
        object.processor=processor;
        object.ram=ram;
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(name.trim()+'.png');
        await fileRef.put(croppedImageData);
        object.imageFileName = await fileRef.getDownloadURL();
        cleanData()
        props.saveData(object);
        props.setPhone(object)
        handleClose()
    }

    let button;

    if(props.type==="create"){
         button = <List onClick={handleOpen} component="div" disablePadding style={{marginLeft:'1%'}}>
            <ListItemButton>
                <ListItemIcon >
                    <AddCircleIcon />
                </ListItemIcon>
                <ListItemText primary={'Add new phone'} />
            </ListItemButton>
        </List>
    }else if(props.type==='edit'){
        button =
            <IconButton onClick={handleOpen} aria-label="remove">
                <EditIcon/>
            </IconButton>
    }


    const checkAllData = () => {
        let check = name !== '' && manufacturer !== '' && description !== '' && color !== '' && errorTextPrice === '' && screen !== '' && processor !== '' && errorTextRam === '' && croppedImageData;
        return check
    }

    return(
        <div>
            {button}
            <Modal
                open={open}
                onClose={handleClose}
                className={classes.modal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Fade in={open}>
                    <div id="modal-div" className={classes.paper}>
                        <div id='top-modal-div' className='top-modal-div'>
                            <h2 className='create-phone-title'>Create new phone</h2>
                            <CloseIcon onClick={handleClose} className=""/>
                        </div>
                        <div>
                            <PhoneTextfield handleChange={changeName} value={name} text="Name" placeholder="Insert name" error={name===''} errorText={errorTextName}/>
                            <PhoneTextfield handleChange={changeManufacturer} value={manufacturer} text="Manufacturer" placeholder="Insert manufacturer" error={manufacturer===''} errorText={errorTextManufacturer}/>
                            <PhoneTextfield handleChange={changeDescription} value={description} text="Description" placeholder="Insert description" error={description===''} errorText={errorTextDescription}/>
                            <PhoneTextfield handleChange={changeColor} value={color} text="Color" placeholder="Insert color" error={color===''} errorText={errorTextColor}/>
                            <PhoneTextfield handleChange={changePrice} value={price} text="Price" placeholder="Insert price" error={price!==undefined} errorText={errorTextPrice}/>
                            <PhoneTextfield handleChange={changeScreen} value={screen} text="Screen" placeholder="Insert screen" error={screen===''} errorText={errorTextScreen}/>
                            <PhoneTextfield handleChange={changeProcessor} value={processor} text="Processor" placeholder="Insert processor" error={processor===''} errorText={errorTextProcessor}/>
                            <PhoneTextfield handleChange={changeRam} value={ram} text="RAM" placeholder="Insert ram" error={ram!==undefined} errorText={errorTextRam}/>
                            <Button variant="text" component="label">Upload phone image<input className='resource-input-rrhh' type="file" accept="image/png" onChange={changePhoneImage} alt="Insert phone image" hidden/></Button>
                            <div>
                                {phoneImage !== undefined ? <ImageCropper getResizeValues={getResizeValues} phoneImage={phoneImage}/>:null}
                            </div>
                            <div className='buttons-group'>
                                {checkAllData()?
                                    <Button onClick={storagePhone} variant="contained" >Confirm</Button>:
                                    <Button disabled>Confirm</Button>
                                }
                                <Button onClick={handleClose} variant="outlined">Cancel</Button>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}