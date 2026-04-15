const app = require('./app');
const { connectDB } = require('./config/db.config');
const startBookingExpiryJob = require('./services/cron.service');


const PORT = process.env.PORT || 3000;

(async () => {
    await connectDB();

    startBookingExpiryJob(); // 🔥 Start cron

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})();