import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditEvent = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch event details to pre-fill form
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/events`);
        const event = res.data.find((e) => e._id === id);
        if (event) {
          setTitle(event.title);
          setDate(event.date.split("T")[0]); // format YYYY-MM-DD
          setDescription(event.description);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/events/${id}`, {
        title,
        date,
        description,
      });
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Edit Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Event</button>
      </form>
      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
};

export default EditEvent;
