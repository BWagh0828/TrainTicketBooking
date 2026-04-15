const express = require('express');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const bookingRoutes = require('./routes/booking.routes');
const adminRoutes = require('./routes/admin.routes');

const logger = require('./middleware/logger.middleware');
const errorHandler = require('./middleware/error.middleware');


const cors = require('cors');

const app = express();

app.use(cors()); // ✅ VERY IMPORTANT
app.use(express.json());


app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
    res.send("🚀 Train Ticket Booking API Running");
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);

// Error handler
app.use(errorHandler);

module.exports = app;