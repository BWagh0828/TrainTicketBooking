const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/booking.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const { bookingLimiter } = require('../middleware/rateLimiter.middleware');

// 🔥 Apply limiter
router.post('/', verifyToken, bookingLimiter, bookingController.createBooking);
router.get('/', verifyToken, bookingLimiter, bookingController.getBookings);
router.put('/cancel/:id', verifyToken, bookingLimiter, bookingController.cancelBooking);
router.get('/cancelled', verifyToken, bookingController.getCancelledTickets);
router.get('/history', verifyToken, bookingController.getPreviousBookings);
router.get('/seats', verifyToken, bookingController.getAvailableSeats);
router.delete('/delete/:id', verifyToken, bookingLimiter, bookingController.deleteBooking);

module.exports = router;