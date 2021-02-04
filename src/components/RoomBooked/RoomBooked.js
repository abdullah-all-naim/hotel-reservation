import axios from 'axios';
import React, { useEffect, useState } from 'react';

const RoomBooked = () => {
    const getUser = localStorage.getItem('loggedIn')
    const [user, setUser] = useState([])
    const [booked, setBooked] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3001/users/?token=' + getUser)
            .then((response) => response.data)
            .then(data => {
                console.log(data)
                setUser(data)
            })
    }, [])
    useEffect(() => {
        axios.get('http://localhost:3001/booked/?token=' + getUser)
            .then((response) => response.data)
            .then(data => {
                console.log(data)
                setBooked(data)
            })
    }, [])
    return (
        <div className='container'>
            <h1 className='mb-5'>howdy {user.map(user => user.values.name)}</h1>
            { booked.length == 0 ? <h3>You have not booked any room</h3>
                :
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Bed Type</th>
                                <th scope="col">Room Booked</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        { booked.map( booked => 
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>{booked.bedType}</td>
                                <td>{booked.roomTaken}</td>
                                <td>{booked.date}</td>
                            </tr>
                        </tbody>
                        )}
                    </table>
            }

        </div>
    );
};

export default RoomBooked;
