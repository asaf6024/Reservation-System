import React from 'react'
//css
import './reservations.css'

//components
import Reservation from './Reservation/Reservation';

//MUI
import { Grid } from "@material-ui/core";
import ControlPointIcon from '@mui/icons-material/ControlPoint';

const Reservations = ({ setReservations, reservations, getSelectedReservation, initialNewReservation, setIsUpdate }) => {

    return (
        <Grid item lg={4} md={4} sm={4} xs={12} className='reservationsList'>

            <Grid item xs={12}>
                <div className='mainDetailsOfReservations'>
                    <h2>רשימת הזמנות</h2>
                    <p>מספר הזמנות: {reservations.length}</p>
                    <ControlPointIcon className='addReservationBtn'
                        onClick={() => initialNewReservation()}
                        titleAccess='הוספה'
                    />
                </div>
                <hr style={{ borderTop: '2px solid #fcb948' }} />

                <Reservation
                    setReservations={setReservations}
                    reservations={reservations}
                    getSelectedReservation={getSelectedReservation}
                    setIsUpdate={setIsUpdate}
                />
            </Grid>

        </Grid>
    )
}

export default Reservations
