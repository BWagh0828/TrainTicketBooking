const rateLimit = require('express-rate-limit');

// 🔹 General limiter
const generalLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 min
    max: 100, // 100 requests per minute
    message: {
        success: false,
        message: "Too many requests, please try again later"
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// 🔹 Login limiter (STRICT)
const loginLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5, // only 5 login attempts
    message: {
        success: false,
        message: "Too many login attempts, try after 1 minute"
    }
});

// 🔹 Booking limiter
const bookingLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10, // only 10 booking requests per minute
    message: {
        success: false,
        message: "Too many booking requests"
    }
});

module.exports = {
    generalLimiter,
    loginLimiter,
    bookingLimiter
};