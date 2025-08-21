import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventList from "./components/EventList";
import CreateEvent from "./components/CreateEvent";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <h1>Event RSVP App</h1>
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/create" element={<CreateEvent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
