import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CheckinForm from './pages/CheckinForm';
import ActiveTickets from './pages/ActiveTickets';
import RevenueReport from './pages/RevenueReport';
import { ParkingProvider } from './lib/parkingContext';

export default function App(){
  return (
    <ParkingProvider>
      <div className="app-shell">
        <header className="topbar">
          <h1 className="brand">Parking Lot</h1>
          <nav className="nav">
            <NavLink to="/" end className={({isActive})=>isActive?'navlink active':'navlink'}>Dashboard</NavLink>
            <NavLink to="/checkin" className={({isActive})=>isActive?'navlink active':'navlink'}>Check-in</NavLink>
            <NavLink to="/tickets" className={({isActive})=>isActive?'navlink active':'navlink'}>Active Tickets</NavLink>
            <NavLink to="/revenue" className={({isActive})=>isActive?'navlink active':'navlink'}>Revenue</NavLink>
          </nav>
        </header>

        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/checkin" element={<CheckinForm/>} />
            <Route path="/tickets" element={<ActiveTickets/>} />
            <Route path="/revenue" element={<RevenueReport/>} />
          </Routes>
        </main>

        <footer className="footer">
          <div>© Parking Ltd — Frontend demo</div>
        </footer>
      </div>
    </ParkingProvider>
  );
}
