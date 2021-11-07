import React, { useEffect, useState } from 'react'
//css
import './reservations.css'

//components
import Reservation from './Reservation/Reservation';

//MUI
import { Grid } from "@material-ui/core";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import SortIcon from '@mui/icons-material/Sort';
import TextField from '@material-ui/core/TextField'

const Reservations = ({ setReservations, reservations, getSelectedReservation, initialNewReservation, setIsUpdate }) => {
    const [sortType, setSortType] = useState(null)
    const [search, setSearch] = useState('')

    return (
        <Grid item lg={4} md={4} sm={4} xs={12} className='reservationsList'>

            <Grid item xs={12}>
                <div className='mainDetailsOfReservations'>
                    <h2>רשימת הזמנות</h2>
                    <p>מספר הזמנות: {reservations.length}</p>

                    <div>
                        <TextField
                            type='search'
                            variant='outlined'
                            className='search'
                            value={search}
                            placeholder='חפש....'
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className='rowOfButtons'>
                        <ControlPointIcon className='addReservationBtn'
                            onClick={() => initialNewReservation()}
                            titleAccess='הוספה'
                        />
                        <div className='sortBtn'>
                            <SortIcon
                                onClick={() => sortType === 'newFirst' ? setSortType('oldFirst') : setSortType('newFirst')}
                            />
                            <br />
                            <span style={{}}>
                                {
                                    sortType === null ? '' :
                                        sortType === 'newFirst' ? 'מהחדש לישן' : 'מהישן לחדש'
                                }
                            </span>
                        </div>
                    </div>
                </div>
                <hr style={{ borderTop: '2px solid #fcb948' }} />

                <Reservation
                    sortType={sortType}
                    setReservations={setReservations}
                    reservations={
                        reservations
                            .filter(res => {
                                if (search === '')
                                    return res;
                                else if (
                                    res.firstName.toLowerCase().includes(search.toLowerCase())
                                    || res.lastName.toLowerCase().includes(search.toLowerCase())
                                    || res.dateOfReservation.includes(search)
                                )
                                    return res;
                            }).sort((a, b) => {
                                return sortType === 'newFirst' ?
                                    new Date(b.dateOfReservation) - new Date(a.dateOfReservation)
                                    : new Date(a.dateOfReservation) - new Date(b.dateOfReservation)
                            })
                    }
                    getSelectedReservation={getSelectedReservation}
                    setIsUpdate={setIsUpdate}
                />
            </Grid>

        </Grid>
    )
}

export default Reservations
