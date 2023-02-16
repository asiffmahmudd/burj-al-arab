import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { serverURL } from '../../serverUrl';

const Bookings = () => {
    const {loggedInUser} = useAuth()
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true)
        fetch(serverURL+'/bookings?email='+loggedInUser?.email, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            if (!res.ok) {
                alert(res.statusText);
                setLoading(false)
                return res.json()
            }
            else
                return res.json()
        })
        .then(data => {
            setBookings(data)
            setLoading(false)
        })
    }, [loggedInUser?.email])
    
    return (
        <div className="row mt-5 b-5 pt-4 pb-5">
            {   
                loading &&
                <h3 className="text-center text-warning col-md-12">Loading.....</h3>    
            }
            {
                !loading && 
                <>
                    <h3 className="text-center col-md-12">You have {bookings.length} bookings</h3>
                    <div className="col-md-5 mx-auto">
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
                </>
            }
            
            
        </div>
    );
};

export default Bookings;