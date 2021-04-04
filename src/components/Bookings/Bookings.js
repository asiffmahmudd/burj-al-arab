import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [bookings, setBookings] = useState([]);
    
    useEffect(() =>{
        fetch('http://localhost:4000/bookings?email='+loggedInUser.email)
        .then(res => res.json())
        .then(data => {
            setBookings(data);
        })
    }, [])
    
    return (
        <div className="container col-md-5 mt-5 b-5">
            <h3>You have {bookings.length} bookings</h3>
            <ul>
                {
                    bookings.map(booking => <li>{booking.displayName} Check in date: {(new Date(booking.checkInDate).toDateString('dd/mm/yy'))} Check out date: {(new Date(booking.checkOutDate).toDateString('dd/mm/yy'))}</li>)
                }
            </ul>
        </div>
    );
};

export default Bookings;