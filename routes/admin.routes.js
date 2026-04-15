const express = require('express');
const router = express.Router();

const { verifyToken, isAdmin } = require('../middleware/auth.middleware');
const bookingController = require('../controllers/booking.controller');

router.get('/bookings', verifyToken, isAdmin, bookingController.getAllBookings);



module.exports = router;