import React, { useEffect, useState, useRef } from 'react'

//css
import './edit.css'

//MUI
import { Grid } from "@material-ui/core";
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';


const Edit = ({ reservationSelected, isUpdate, setIsUpdate, setReservations, reservations }) => {
    const [headline, setHeadline] = useState('הזמנה חדשה')
    const [id, setId] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dateOfReservation, setDateOfReservation] = useState('')
    const inputRef = useRef(null);

    //initial selected a reservation by user
    useEffect(() => {

        if (reservationSelected.length > 0) {
            inputRef.current.focus();
            setIsUpdate(true)
            reservationSelected.map(res => {
                setId(res.id)
                setFirstName(res.firstName)
                setLastName(res.lastName)
                setDateOfReservation(new Date(res.dateOfReservation).toISOString().slice(0, 10))
            })
        }

    }, [reservationSelected])

    // change form mode to UPDATE/ CREATE
    useEffect(() => {
        if (isUpdate)
            setHeadline('הזמנה')

        else {
            initialInputs()
        }

    }, [isUpdate])

    const initialInputs = () => {
        setHeadline('הזמנה חדשה')
        setId('')
        setFirstName('')
        setLastName('')
        setDateOfReservation(new Date())
    }

    const updateOrAddReservation = e => {
        e.preventDefault()

        isUpdate ? updateReservation() : addReservation()
    }

    const updateReservation = async () => {

        let updatedReservation = {
            id,
            firstName,
            lastName,
            dateOfReservation
        }

        //api call for update selected reservation
        const res = await fetch(`http://localhost:5000/reservations/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updatedReservation)

        })

        const data = await res.json()

        //update reservations STATE
        setReservations(
            reservations.map(res =>
                res.id === id ?
                    { ...res, firstName: data.firstName, lastName: data.lastName, dateOfReservation: data.dateOfReservation }
                    : res
            )
        )

        // change form mode to CREATE
        setIsUpdate(false)

    }

    const addReservation = async () => {

        //create a random ID
        const id = Math.floor(Math.random() * 1000) + 1

        let newReservation = {
            id,
            firstName,
            lastName,
            dateOfReservation
        }

        //api call for add
        const res = await fetch(`http://localhost:5000/reservations/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newReservation)

        })

        const data = await res.json()

        //update reservations STATE
        setReservations([...reservations, data])

        initialInputs()

    }

    return (
        <Grid item lg={8} md={8} sm={8} xs={12} className='editRow'>

            <form onSubmit={updateOrAddReservation}>

                <Grid item lg={12} xs={12}>
                    <h1>{headline} {id}</h1>
                </Grid>

                <Grid item lg={6} md={6} xs={12} className='inputForm'>
                    <FormControl variant="standard">

                        <InputLabel htmlFor="firstName" className='labelForm'>
                            שם פרטי
                        </InputLabel>

                        <Input
                            required
                            type='text'
                            id="firstName"
                            name='firstName'
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            ref={inputRef}
                            startAdornment={
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Grid>

                <Grid item lg={6} md={6} xs={12} className='inputForm'>
                    <FormControl variant="standard">

                        <InputLabel htmlFor="lastName" className='labelForm'>
                            שם משפחה
                        </InputLabel>

                        <Input
                            required
                            type='text'
                            id="lastName"
                            name='lastName'
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            startAdornment={
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Grid>


                <Grid item lg={12} md={12} xs={12} className='inputForm'>
                    <br /> <br /> <br />
                    <FormControl variant="standard">

                        <InputLabel htmlFor="dateOfReservation" className='labelForm'>
                            תאריך
                        </InputLabel>

                        <Input
                            required
                            type='date'
                            id='dateOfReservation'
                            name='dateOfReservation'
                            value={dateOfReservation}
                            onChange={e => setDateOfReservation(e.target.value)}
                            startAdornment={
                                <InputAdornment position="start">
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Grid>

                <Grid item lg={12} md={12} xs={12} className='formButton'>

                    <Button className='submitForm' type='submit' variant="contained">{isUpdate ? 'עדכון' : 'הוספה'}</Button>
                </Grid>

            </form >
        </Grid>

    )
}

export default Edit
