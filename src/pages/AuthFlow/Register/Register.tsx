import React, { useState } from 'react'
import TopRight from '../../../components/TopRight'
import { CenterContent, Container, ErrorText, HeadingTop, Position, PositionCol, SubContainer } from '../AuthStyles'
import Input from '../../../components/Input'
import { Grid } from '@mui/material'
import PasswordInput from '../../../components/PasswordInput'
import Button from '../../../components/Button'
import useMediaQuery from '../../../hooks/MediaQuery'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom'
import ButtonComp from '../../../components/Button'
import Myuser from '../../../store/AuthStates'
import { observer } from 'mobx-react-lite'
import { SignUpToAccount } from '../../../api'
import Toast from '../../../components/Toastifycom'
import { notifySuccess, notifyError } from '../../../components/Toastifycom'
import Loadercom from '../../../components/Loadercom'
import Swal from 'sweetalert2'
import { truncate } from 'fs'

const Register = () => {
    const [load, setLoad] = useState(false)
    const navigate = useNavigate()
    const isMobile = useMediaQuery('(min-width: 950px)');
    const initialValues = {
        email: '',
        password: '',
        confirmpass: '',
        fname: '',
        lname: ''


    }
    const validationSchema = Yup.object({


        email: Yup.string()
            .email('Gültige E-Mail-Adresse angeben')
            .required('E-Mail wird benötigt'),
        password: Yup
            .string()
            .min(8, 'Passwort sollte mindestens 8 Zeichen lang sein')
            .required('Passwort wird benötigt'),
        confirmpass: Yup.string().required("Passwort-Bestätigung wird benötigt").oneOf([Yup.ref('password'), null], 'Passwörter müssen übereinstimmen'),

        fname: Yup.string().min(3, 'Der Vorname sollte mindestens 3 Zeichen lang sein').required('Vorname wird benötigt'),
        lname: Yup.string().min(3, 'Der Nachname sollte mindestens 3 Zeichen lang sein').required('Nachname wird benötigt'),
    });
    const { values, errors, handleSubmit, handleChange } = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log('values', values)
            Myuser.setEmail(values.email)
            Myuser.setFirstname(values.fname)
            Myuser.setLastname(values.lname)
            Myuser.setPassword(values.password)
            Myuser.setconfirmpassword(values.confirmpass)
            setLoad(true)
            SignUpToAccount(values.fname, values.lname, values.email, values.password).then(e => {
                setLoad(false)
                if (e.status == false) {
                    notifyError(e.message)

                }
                else {
                    Swal.fire({
                        title: 'Account erfolgreich erstellt!',
                        text: 'Bitte überprüfen Sie Ihr Emailfach. Sie bekommen einen 4-Stelligen Code, mit welchen Sie sich verifizieren, Vielen Dank!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate(`/otpcode?email=${values.email}`)
                        }
                    });
                }
            }).catch((err) => {
                notifyError("Network Error Detected")
            })

            // setLoad(true)
            // RegisterUser(values).then((e) => {
            //     if (e.status === false) {
            //         notifyError(e.message)
            //         setLoad(false)
            //     } else {
            //         notifySuccess("Signup Successfully")
            //         setLoad(false)
            //         setTimeout(() => {

            //             navigate("/login")
            //         }, 2000)
            //     }
            // })

            // navigate("/")


        },
    });
    return (
        <Container>
            <SubContainer>
                <CenterContent>
                    <HeadingTop>Account erstellen</HeadingTop>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginTop: 10 }}>
                            <Input id={'email'} width={'100%'} label='E-Mail-Adresse' value={values.email} onChange={handleChange} placeholder='max.mustermann01@gmail.com' />
                            <ErrorText>{errors.email}</ErrorText>

                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <Grid item style={{ marginRight: '10px' }}>
                                    <Input id={'fname'} width={'98%'} label='Vorname' value={values.fname} onChange={handleChange} placeholder='Max' />
                                    <ErrorText>{errors.fname}</ErrorText>
                                </Grid>
                                <Grid item>
                                    <Input id={'lname'} width={'98%'} label='Nachname' value={values.lname} onChange={handleChange} placeholder='Mustermann' />
                                    <ErrorText>{errors.lname}</ErrorText>
                                </Grid>
                            </div>

                            <PasswordInput id={'password'} value={values.password} onChange={handleChange} label={'Passwort'} placeholder={'Ihr Passwort...'} style={{ marginTop: 5 }} />
                            <ErrorText>{errors.password}</ErrorText>

                            <PasswordInput id={'confirmpass'} value={values.confirmpass} onChange={handleChange} label={'Passwort bestätigen'} placeholder={'Ihr Passwort...'} style={{ marginTop: 5 }} />
                            <ErrorText>{errors.confirmpass}</ErrorText>

                        </div>
                        <TopRight title='Account bereits vorhanden?' title1='Einloggen' onClick={() => '/Login'} to={'/Login'} />
                        <ButtonComp fontSize={'14px'} load={load} title='Account erstellen' onClick={() => handleSubmit()} width={'100%'} />

                    </form>
                </CenterContent>
            </SubContainer>
            <Toast />
        </Container>
    )
}

export default observer(Register)
