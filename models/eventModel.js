const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    popularity: { type: Number, default: 0 },
    coordinates: { type: { lat: Number, lng: Number }, required: true },
    ratings: [{ userId: mongoose.Schema.Types.ObjectId, rating: Number }],
});

module.exports = mongoose.model('Event', eventSchema);