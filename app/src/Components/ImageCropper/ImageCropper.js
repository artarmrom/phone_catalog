import Cropper from "react-easy-crop";
import React, {useCallback, useState} from "react";

/* Estilos */
import {makeStyles} from "@material-ui/core/styles";
import Slider from '@material-ui/core/Slider'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: "#fff",
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    slider: {
        padding: '22px 0px',
        marginLeft: 32,
        color: '#3fb3d4',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            alignItems: 'center',
            margin: '0 16px',
        },
    },
    sliderContainer: {
        display: 'flex',
        flex: '1',
        alignItems: 'center',
    },
    controls: {
        padding: '16px 0px 16px 0px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            alignItems: 'center',
        },
    },
    cropContainer: {
        position: 'relative',
        width: '100%',
        height: '200px'
    }
}));

export default function ImageCropper(props) {
    const classes = useStyles();

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        props.getResizeValues(croppedArea, croppedAreaPixels)
    }, [props])

    return(
        <div>
            <div className={classes.cropContainer}>
                <Cropper
                    image={props.phoneImage}
                    crop={crop}
                    zoom={zoom}
                    aspect={9 / 17}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                />
            </div>
            <div className={classes.controls}>
                <div className={classes.sliderContainer}>
                    <p>Zoom</p>
                    <Slider
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.05}
                        aria-labelledby="Zoom"
                        classes={{ root: classes.slider }}
                        onChange={(e, zoom) => setZoom(zoom)}
                    />
                </div>
            </div>
        </div>
    )
}