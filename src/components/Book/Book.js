import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import dateFormat from 'dateformat'
// import { rooms } from '../Home/Home.js'

const Book = () => {
    const { bedType } = useParams();
    const getUser = localStorage.getItem('loggedIn')
    const [bookRoom, setBookRoom] = useState([])
    const [customer, setCustomer] = useState([])
    const [userToken, setUserToken] = useState([])
    const now = new Date();
    const today = dateFormat(now);
    useEffect(() => {
        axios.get('http://localhost:3001/rooms')
            .then((response) => response.data)
            .then((data) => setBookRoom(data))
    }, [])

    useEffect(() => {
        axios.get('http://localhost:3001/users')
            .then((response) => response.data)
            .then((data) => setCustomer(data))
    }, [])
    useEffect(() => {
        axios.get('http://localhost:3001/booked/?token=' + getUser)
            .then((response) => response.data)
            .then((data) => setUserToken(data))
    }, [])
    console.log(userToken)
    userToken.map((token) => console.log(token.bedType))
    let name = ''
    let email = ''
    for (let i = 0; i < customer.length; i++) {
        if (localStorage.getItem('loggedIn') == customer[i].token) {
            name = customer[i].values.name
            email = customer[i].values.email
            console.log(name)
        }
    }
    let roomBook = {}
    let taken = 0
    for (let i = 0; i < bookRoom.length; i++) {
        if (bookRoom[i].bedType == bedType) {
            roomBook = bookRoom[i]
        }
    }
    if (userToken.map(x => x.roomTaken)) {
        console.log('yes')
    }
    const handleClick = (type) => {
        console.log(type)
        // axios.get(`http://localhost:3001/booked?token=${getUser}&bedType=${type}`)
        //     .then(res => console.log(res.data))
        if (roomBook.seat == 0) {
            alert('Rooms not available for booking!')
        }
        else {
            fetch(`http://localhost:3001/rooms/${roomBook.id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    seat: roomBook.seat - 1
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
                .then(data => {
                    if (data) {
                        setTimeout(function () {
                            alert('You have sucessfully booked a room')
                            if (alert) {
                                window.location.reload()
                            }

                        }, 1000);
                    }
                })


            // if (userToken.map(token => token.bedType == type)) {
            //     fetch(`http://localhost:3001/booked?token=${getUser}`, {
            //         method: 'PATCH',
            //         body: JSON.stringify({
            //             bedType: type,
            //             roomTaken: userToken.roomTaken + 1
            //         }),
            //         headers: {
            //             'Content-Type': 'application/json'
            //         }
            //     }).then(response => response.json())
            //         .then(data => {
            //             if (data) {
            //                 setTimeout(function () {
            //                     alert('You have sucessfully booked a room')
            //                     if (alert) {
            //                         window.location.reload()
            //                     }

            //                 }, 3000);
            //             }
            //         })

            // } else {
                fetch('http://localhost:3001/booked', {
                    method: 'POST',
                    body: JSON.stringify({
                        name: name,
                        author: email,
                        bedType: bedType,
                        token: getUser,
                        date: today,
                        roomTaken: taken + 1
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
        // }
    }
    console.log(localStorage.getItem('loggedIn'))
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>
            <div className='d-flex flex-wrap justify-content-center container my-5 pt-5'>
                <div className="col-6">
                    <img style={{ width: '400px' }} src={roomBook.imgUrl} alt="" />
                </div>
                <div className="col-6 text-left">
                    <h4>{roomBook.title}</h4>
                    <p>{roomBook.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam dignissimos blanditiis soluta, harum mollitia sint. Maxime perspiciatis ducimus impedit nobis esse adipisci earum amet eveniet molestiae soluta, minus expedita omnis?</p>
                    <div className="d-flex justify-content-between">
                        <div>
                            <p className='font-weight-bold'>Room Characteristics : </p>
                            <ol>
                                <li>No of bed : {roomBook.bed}</li>
                                <li>Capacity : {roomBook.capacity}</li>
                            </ol>
                        </div>
                        <h1>${roomBook.price}</h1>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <h5>Number Of Rooms Available : {roomBook.seat == 0 ? 'N/A' : roomBook.seat}</h5>
                        <button className='btn btn-primary' onClick={() => handleClick(roomBook.bedType)}>Book A Room Now</button>
                    </div>
                    <small>Address : 33/2 Sir Iqbal Road, Khulna</small> <br />
                    <small>phone : +880145793475</small>
                </div>
            </div>
        </div>
    );
};

export default Book;