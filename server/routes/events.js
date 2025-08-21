const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// POST /api/events - Create event
router.post("/", async (req, res) => {
  try {
    const { title, date, description } = req.body;
    const newEvent = new Event({ title, date, description });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/events - List events (sorted by date ascending for upcoming first)
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/events/:id - Update event
router.put("/:id", async (req, res) => {
  try {
    const { title, date, description } = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { title, date, description },
      { new: true } // return updated event
    );
    if (!updatedEvent)
      return res.status(404).json({ message: "Event not found" });
    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/events/:id/rsvp - RSVP to an event
router.post("/:id/rsvp", async (req, res) => {
  try {
    const { response } = req.body; // 'yes', 'no', 'maybe'
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (response === "yes") event.yesCount += 1;
    else if (response === "no") event.noCount += 1;
    else if (response === "maybe") event.maybeCount += 1;
    else return res.status(400).json({ message: "Invalid response" });

    await event.save();
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/events/:id - Delete event
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
