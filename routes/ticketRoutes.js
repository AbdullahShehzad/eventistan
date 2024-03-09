const express = require('express');
const { purchaseTicket } = require('../controllers/ticketController');
const router = express.Router();

router.post('/purchase', purchaseTicket);

module.exports = router;
