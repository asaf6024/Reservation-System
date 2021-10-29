import React from 'react'
import { Card } from '@material-ui/core'
import './reservation.css'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';

const Reservation = ({ setReservations, reservations, getSelectedReservation, setIsUpdate }) => {
    let counter = 0;

    const deleteReservation = async (id) => {
        await fetch(`http://localhost:5000/reservations/${id}`, {
            method: 'DELETE'
        })

        setReservations(reservations.filter(res => res.id !== id))
        setIsUpdate(false)
    }

    const printReservation = reservations.map((res) => {
        counter++;
        return (
            <React.Fragment key={res.id}>
                <div className='reservarionIcons'>
                    <HighlightOffIcon
                        onClick={() => deleteReservation(res.id)}
                        titleAccess='מחיקה'
                    />
                    <EditIcon Rounded
                        onClick={() => getSelectedReservation(res)}
                        titleAccess='עריכה'
                    />
                </div>
                <h3>הזמנה {counter}</h3>
                <p>{res.firstName} {res.lastName}</p>
                <p>{new Date(res.dateOfReservation).toLocaleDateString('he-IL', { hour12: false })}</p>

                <hr />
            </React.Fragment >
        )
    })

    return (
        <div className='cardOfReservarion'>
            {reservations.length > 0 ?
                printReservation
                : <h2>רשימת ההזמנות ריקה</h2>
            }

        </div>
    )
}

export default Reservation
