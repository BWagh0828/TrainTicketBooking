const cron = require('node-cron');
const { pool } = require('../config/db.config');

const startBookingExpiryJob = () => {
    // Runs every 10 minutes
    cron.schedule('*/10 * * * *', async () => {
        try {
            console.log("⏰ Running Booking Expiry Job...");

            await pool.request().execute('sp_ExpireBookings');

            console.log("✅ Expired bookings updated");
        } catch (err) {
            console.error("❌ Cron Error:", err.message);
        }
    });
};

module.exports = startBookingExpiryJob;