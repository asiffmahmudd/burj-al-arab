import React, { createContext } from 'react';
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
import { AuthProvider } from './Context/AuthContext';
import Bookings from './components/Bookings/Bookings';

export const UserContext = createContext();

function App() {

  return (
      <AuthProvider>
        <Router>
            <Header/>
            <Switch>
              <Route path="/home">
                <Home />
              </Route>
              <PrivateRoute path="/bookings">
                <Bookings/>
              </PrivateRoute>
              <Route path="/login">
                <Login />
              </Route>
              <PrivateRoute path="/book/:bedType">
                <Book />
              </PrivateRoute>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
        </Router>
      </AuthProvider>
  );
}

export default App;
