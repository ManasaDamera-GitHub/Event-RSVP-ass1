import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventList from './components/EventList';
import CreateEvent from './components/CreateEvent';
import EditEvent from './components/EditEvent';

function App() {
  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <h1>Event RSVP App</h1>
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/edit/:id" element={<EditEvent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
