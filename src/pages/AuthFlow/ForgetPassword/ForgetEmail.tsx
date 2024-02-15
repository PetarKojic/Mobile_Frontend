import React, { useState } from 'react'

import { CenterContent, Container, ErrorText, HeadingTop, Position, PositionCol, SubContainer, SubHeading } from '../AuthStyles'

import Input from '../../../components/Input'
import { Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import useMediaQuery from '../../../hooks/MediaQuery'
import { useFormik } from 'formik'
import * as Yup from "yup";
import ButtonComp from '../../../components/Button'
import Myuser from '../../../store/AuthStates'
import { observer } from 'mobx-react-lite'
import {ForgetPasswordAccount } from '../../../api'
import BottomLink from '../../../components/BottomLink'
import { notifyError, notifySuccess } from '../../../components/Toastifycom'


const ForgetEmail = () => {
    const navigate = useNavigate()

    const [load, setLoad] = useState(false)
    const isMobile = useMediaQuery('(min-width: 950px)');

    const initialValues = {
        email: '',


    }
    const validationSchema = Yup.object({


        email: Yup.string()
            .email('Enter a valid email')
            .required('Email is required'),
      
    });
    const { values, errors, handleSubmit, handleChange } = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log('values', values)
            setLoad(true)
            ForgetPasswordAccount(values.email).then(e=>{
                setLoad(false)
                if(e.status == true)
                {
                    notifySuccess(e.message)
                }
                else{
                    notifyError(e.message)
                }
            }).catch(err=>{
                notifyError("Network Error Detected.")
            })
           
        },
    });

    return (
        <Container>
            <SubContainer>
                <CenterContent>
                    <HeadingTop>Passwort vergessen?</HeadingTop>
                    <SubHeading>Bitte geben Sie Ihre E-Mail-Adresse ein und wir senden Ihnen einen Link, womit Sie Ihr Passwort zurücksetzen können.</SubHeading>
                    <form onSubmit={handleSubmit}>
                    <div style={{ marginTop: 10 }}>
                        <Input id={'email'} width={'100%'} label='E-Mail-Adresse' value={values.email} onChange={handleChange} placeholder='max.mustermann01@gmail.com'  />
                         <ErrorText>{errors.email}</ErrorText>
                    </div>
                    <ButtonComp load={load} fontSize={'14px'} title='Link senden' onClick={() => ''} width={'100%'} />
                    </form>
                    <BottomLink title='Nicht vergessen?' title1='Einloggen' onClick={() => '/login'} to='/login' />
                </CenterContent>
                </SubContainer>
        </Container>
    )
}

export default observer(ForgetEmail) 
