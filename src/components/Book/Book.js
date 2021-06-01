import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import { useAuth } from '../../Context/AuthContext';


const Book = () => {
    const {loggedInUser} = useAuth()
    const {bedType} = useParams();
    const [selectedDate, setSelectedDate] = useState({
        checkInDate : new Date(),
        checkOutDate : new Date()
    });

    const handleCheckInDate = (date) => {
        const newDate = {...selectedDate};
        newDate.checkInDate = date;
        setSelectedDate(newDate);
    };
    const handleCheckOutDate = (date) => {
        const newDate = {...selectedDate};
        newDate.checkOutDate = date;
        setSelectedDate(newDate);
    };

    const handleBooking = () => {
        const newBooking = {...loggedInUser, ...selectedDate};
        fetch('https://burj-al-arabb.herokuapp.com/addbooking',{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newBooking)  
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
    }

    return (
        <div style={{textAlign: 'center'}}>
            <h1>Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>
            

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    
                    <KeyboardDatePicker
                        margin="normal"
                        id="check-in-dialog"
                        label="Check In Date"
                        format="dd/MM/yyyy"
                        value={selectedDate.checkInDate}
                        onChange={handleCheckInDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        margin="normal"
                        id="check-out-dialog"
                        label="Check Out Date"
                        format="dd/MM/yyyy"
                        value={selectedDate.checkOutDate}
                        onChange={handleCheckOutDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
                <Link to="/"><Button onClick={handleBooking} variant="contained" color="primary">Book Now</Button></Link>
            </MuiPickersUtilsProvider>
        </div>
    );
};

export default Book;