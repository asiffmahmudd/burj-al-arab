import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthContext';

const Bookings = () => {
    const {loggedInUser} = useAuth()
    const [bookings, setBookings] = useState([]);
    
    useEffect(() => {
        fetch('https://burj-al-arabb.herokuapp.com/bookings?email='+loggedInUser?.email, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => setBookings(data))
    }, [loggedInUser?.email])
    
    return (
        <div className="container col-md-5 mt-5 b-5 pt-4 pb-5">
            <h3 className="text-center">You have {bookings.length} bookings</h3>
            <ul>
                {
                    bookings.map((booking,index) => {
                        return (
                            <li key={index}>
                                {/* {booking.displayName}  */}
                                Check in date: {(new Date(booking.checkInDate).toDateString('dd/mm/yy'))} 
                                Check out date: {(new Date(booking.checkOutDate).toDateString('dd/mm/yy'))}
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
};

export default Bookings;