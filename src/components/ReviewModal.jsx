import React, { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Input from "./Input";
import MultilineInput from "./MultilineInput";
import { FormControl, InputLabel, MenuItem, Select, Button, Typography } from "@mui/material";
import { AddJob, AddReviewDoer, AddReviewOwner, GetCategory } from "../api";
import { notifyError, notifySuccess } from "./Toastifycom";
import Loadercom from "./Loadercom";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const labels = {
    0.5: 'Sehr schlecht!',
    1: 'Sehr schlecht!',
    1.5: 'Genügend',
    2: 'Genügend',
    2.5: 'Ok',
    3: 'Ok',
    3.5: 'Gut',
    4: 'Gut',
    4.5: 'Sehr gut!',
    5: 'Sehr gut!',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}
const ReviewModal = ({ open, onClose, jobId, own }) => {
    const [desc, setDesc] = useState('')
    const [fieldsError, setFieldsError] = useState(false);
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);
    const [load, setLoad] = useState(false)

    useEffect(() => {
        if (desc) {
            setFieldsError(false);
        }
    }, [desc]);
    const userId = localStorage.getItem('userId');

    const ClearJobs = () => {
        setDesc("")
    }

    const handleSubmit = () => {
        if (!desc) {
            setFieldsError(true);
            return;
        }


        setLoad(true)
        if (own == "Meine Jobs") {

            AddReviewOwner(value, desc, jobId).then(e => {
                setLoad(false)
                console.log(e)
                if (e.status == false) {
                    notifyError(e.message)
                }

                else {
                    onClose()
                    ClearJobs()
                    notifySuccess(e.message)

                }
            }).catch(err => {
                setLoad(false)
                notifyError("Network error detected.")

            })
        }
        else {
            AddReviewDoer(value, desc, jobId).then(e => {
                setLoad(false)
                console.log(e)
                if (e.status == false) {
                    notifyError(e.message)
                }

                else {
                    onClose()
                    ClearJobs()
                    notifySuccess(e.message)

                }
            }).catch(err => {
                setLoad(false)
                notifyError("Network error detected.")

            })

        }
    }




    return (
        <div>

            <Dialog
                onClose={onClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth

            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Ihre Bewertung
                </DialogTitle>
                <DialogContent dividers sx={{ width: '100%', margin: 'auto' }}>
                    <Typography component="legend">Bewertung</Typography>
                    <Box
                        sx={{
                            width:275,
                            display: 'flex',
                            alignItems: 'center',
                            margin: 'auto',
                            marginBottom: '2%'
                        }}
                    >
                        <Rating
                            size="large"
                            name="hover-feedback"
                            value={value}
                            getLabelText={getLabelText}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                                setHover(newHover);
                            }}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                        {value !== null && (
                            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                        )}
                    </Box>
                    <MultilineInput value={desc} onChange={(e) => setDesc(e.target.value)} label="Rezension" placeholder="Rezension eingeben" width={'100%'} />
                    {fieldsError && <p style={{ color: 'red', textAlign: 'center', marginTop: '1%' }}>Rezension ist verpflichtend!</p>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>
                        Abbrechen
                    </Button>




                    {
                        load === true ? (
                            <Loadercom />
                        ) : (
                            <Button onClick={handleSubmit}>
                                Bewertung abgeben
                            </Button>
                        )
                    }
                </DialogActions>

            </Dialog>
        </div>
    )
}
export default ReviewModal;