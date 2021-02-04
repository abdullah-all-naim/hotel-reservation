import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Book from './components/Book/Book';
import Header from './components/Header/Header';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import RoomBooked from './components/RoomBooked/RoomBooked';

function App() {
  return (
    <div className="text-center">
      <Router>
        <Header />
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <PrivateRoute exact path="/booked" component={RoomBooked} />
        <PrivateRoute exact path="/book/:bedType" component={Book} />
      </Router>
    </div>
  );
}

export default App;
