import React, { useState, useEffect } from 'react'

//css
import './App.css';

//components
import Nav from './components/Nav/Nav'
import Reservations from './components/Reservations/Reservations';
import Edit from './components/Edit/Edit';
import Footer from './components/Footer/Footer';

//MUI
import { Container } from '@mui/material';
import { Grid } from "@material-ui/core";

function App() {
  const [reservations, setReservations] = useState([])
  const [reservationSelected, setReservationSelected] = useState([])
  const [isUpdate, setIsUpdate] = useState(false)

  useEffect(() => {

    loadReservations()

  }, [])


  const loadReservations = async () => {
    const res = await fetch('http://localhost:5000/reservations');
    const data = await res.json();

    setReservations(data)
  }

  const getSelectedReservation = (res) => {
    setReservationSelected([res])
  }

  const initialNewReservation = () => {
    setIsUpdate(false)
    setReservationSelected([])
  }

  return (
    <div className='container-fluid'>
      <Nav />

      <Container className='container' >

        {/* <img src={logo} alt="logo" /> */}
        <Grid container style={{ marginTop: "3em" }}>

          <Reservations
            reservations={reservations}
            setReservations={setReservations}
            getSelectedReservation={getSelectedReservation}
            initialNewReservation={initialNewReservation}
            setIsUpdate={setIsUpdate}
          />
          <Edit
            reservations={reservations}
            setReservations={setReservations}
            reservationSelected={reservationSelected}
            setIsUpdate={setIsUpdate}
            isUpdate={isUpdate}
          />
        </Grid>
      </Container>
      <Footer />
    </div >
  );
}

export default App;
