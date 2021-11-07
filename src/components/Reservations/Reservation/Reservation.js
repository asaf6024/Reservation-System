import React, { useEffect } from 'react'
//css
import './reservation.css'
//components
import EditIcon from '@mui/icons-material/Edit';
//MUI
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const Reservation = ({ sortType, setReservations, reservations, getSelectedReservation, setIsUpdate }) => {
    let counter = 0;

    // useEffect(() => {
    //     reservations.sort((a, b) => {
    //         return sortType === 'newFirst' ?
    //             new Date(b.dateOfReservation) - new Date(a.dateOfReservation)
    //             : new Date(a.dateOfReservation) - new Date(b.dateOfReservation)
    //     })
    // })

    const deleteReservation = async (id) => {
        await fetch(`http://localhost:5000/reservations/${id}`, {
            method: 'DELETE'
        })

        setReservations(reservations.filter(res => res.id !== id))
        setIsUpdate(false)
    }

    const printReservation = reservations.map((res, index) => {
        counter++;

        return (
            <React.Fragment key={res.id}>
                <div className='reservarionIcons'>
                    <HighlightOffIcon
                        onClick={() => deleteReservation(res.id)}
                        titleAccess='מחיקה'
                    />
                    <EditIcon
                        onClick={() => getSelectedReservation(res)}
                        titleAccess='עריכה'
                    />
                </div>
                <h3>הזמנה {counter}</h3>

                <p>{res.firstName} {res.lastName}</p>
                <p>{new Date(res.dateOfReservation).toLocaleDateString('he-IL', { hour12: false })}</p>
                {index !== reservations.length - 1 && <hr />}
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
