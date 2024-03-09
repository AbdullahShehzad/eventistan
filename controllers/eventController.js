const Event = require('../models/eventModel');

// Create an event
exports.createEvent = async (req, res) => {
    const { name, location, date, description, organizer } = req.body;
    try {
        const newEvent = new Event({
            name,
            location,
            date,
            description,
            organizer, // This would be the user's ID who is creating the event
        });

        const event = await newEvent.save();
        res.json(event);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// List all events
exports.listEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ date: -1 });
        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.searchEvents = async (req, res) => {
    const { searchTerm, sortBy } = req.query;
    let sortOptions = {};

    if (sortBy === 'popularity') {
        sortOptions = { 'metrics.popularity': -1 };
    }

    try {
        const events = await Event.find({
            name: { $regex: searchTerm, $options: 'i' },
        }).sort(sortOptions);

        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

