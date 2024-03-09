const Ticket = require('../models/ticketModel');

// Purchase a ticket
exports.purchaseTicket = async (req, res) => {
    const { eventId, userId } = req.body;
    try {
        const newTicket = new Ticket({
            event: eventId,
            user: userId,
        });

        const ticket = await newTicket.save();
        res.json(ticket);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};