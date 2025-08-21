import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events");
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRSVP = async (id, response) => {
    try {
      await axios.post(`http://localhost:5000/api/events/${id}/rsvp`, {
        response,
      });
      fetchEvents(); // Refresh list
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`);
      fetchEvents();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Upcoming Events</h2>
      <Link to="/create">
        <button>Create New Event</button>
      </Link>
      <ul>
        {events.map((event) => (
          <li
            key={event._id}
            style={{
              marginBottom: "20px",
              border: "1px solid #ccc",
              padding: "10px",
            }}
          >
            <h3>{event.title}</h3>
            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
            <p>{event.description}</p>
            <p>
              RSVP Summary: Yes: {event.yesCount}, No: {event.noCount}, Maybe:{" "}
              {event.maybeCount}
            </p>
            <button onClick={() => handleRSVP(event._id, "yes")}>
              RSVP Yes
            </button>
            <button onClick={() => handleRSVP(event._id, "no")}>RSVP No</button>
            <button onClick={() => handleRSVP(event._id, "maybe")}>
              RSVP Maybe
            </button>
            <button onClick={() => handleDelete(event._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
