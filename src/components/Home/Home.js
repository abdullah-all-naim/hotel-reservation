import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Room from '../Room/Room';
const Home = () => {
    const [room, setRoom] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3001/rooms')
            .then((response) => response.data)
            .then((data) => setRoom(data))
    }, [])
    const style = {
        display: 'flex',
        margin: '40px',
        justifyContent: 'space-between'
    }

    return (
        <div style={style}>
            {
                room.map(room => <Room key={room.bedType} room={room}></Room>)
            }
        </div>
    );
};

export default Home;