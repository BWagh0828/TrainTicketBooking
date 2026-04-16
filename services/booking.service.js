const { pool, sql } = require('../config/db.config');
const redis = require('../config/redis.config');

// ✅ CREATE BOOKING
exports.createBooking = async (userId, data) => {
    const result = await pool.request()
        .input('UserId', sql.Int, userId)
        .input('TrainNumber', sql.VarChar, data.trainNumber)
        .input('FromPlace', sql.VarChar, data.from)
        .input('ToPlace', sql.VarChar, data.to)
        .input('Price', sql.Decimal(10, 2), data.price)
        .input('FromDate', sql.Date, data.fromDate)
        .input('ToDate', sql.Date, data.toDate)
        .input('Phone', sql.VarChar, data.phone || null)
        .execute('sp_CreateBooking_V2');

    return result.recordset[0];
};

// ✅ GET ACTIVE BOOKINGS (WITH CACHE)
exports.getBookings = async (userId) => {
    const cacheKey = `booking_${userId}`;

    const cached = await redis.get(cacheKey);
    if (cached) {
        console.log("⚡ From Cache");
        return JSON.parse(cached);
    }

    const result = await pool.request()
        .input('Id', sql.Int, userId)
        .execute('sp_GetBookingsByUser');

    await redis.setEx(cacheKey, 60, JSON.stringify(result.recordset));

    return result.recordset;
};

// ✅ GET CANCELLED BOOKINGS
exports.getCancelledTickets = async (userId) => {
    const result = await pool.request()
        .input('Id', sql.Int, userId)
        .execute('sp_GetCancelledTickets');

    return result.recordset;
};

// ✅ GET PREVIOUS BOOKINGS
exports.getPreviousBookings = async (userId) => {
    const result = await pool.request()
        .input('Id', sql.Int, userId)
        .execute('sp_GetPreviousBookings');

    return result.recordset;
};

// ✅ CANCEL BOOKING
exports.cancelBooking = async (bid, userId) => {

    // ✅ Check booking first
    const check = await pool.request()
        .input('Bid', sql.Int, bid)
        .input('UserId', sql.Int, userId)
        .query(`
            SELECT Status FROM Booking
            WHERE Bid = @Bid AND UserId = @UserId
        `);

    const booking = check.recordset[0];

    if (!booking) {
        throw { status: 404, message: "Booking not found" };
    }

    if (booking.Status === 'CANCELLED') {
        throw { status: 400, message: "Ticket already cancelled" };
    }

    // ✅ Call SP
    await pool.request()
        .input('Bid', sql.Int, bid)
        .input('UserId', sql.Int, userId)
        .execute('sp_CancelBooking');

    // ✅ Clear cache
    await redis.del(`booking_${userId}`);

    return { message: "Booking cancelled successfully" };
};


// ✅ DELETE BOOKING
exports.deleteBooking = async (bid, userId) => {

    // get seat
    const booking = await pool.request()
        .input('Bid', sql.Int, bid)
        .query('SELECT SeatNo, TrainNumber FROM Booking WHERE Bid = @Bid');

    const seat = booking.recordset[0];

    if (seat) {
        await pool.request()
            .input('TrainNumber', sql.VarChar, seat.TrainNumber)
            .input('SeatNo', sql.VarChar, seat.SeatNo)
            .query(`
            UPDATE TrainDetails
            SET Status = 'AVAILABLE', PNR = NULL
            WHERE TrainNumber = @TrainNumber AND SeatNumber = @SeatNo
        `);
    }


    if (seat) {
        await pool.request()
            .input('TrainNumber', sql.VarChar, seat.TrainNumber)
            .input('SeatNo', sql.VarChar, seat.SeatNo)
            .query(`
            UPDATE TrainDetails
            SET Status = 'AVAILABLE', PNR = NULL
            WHERE TrainNumber = @TrainNumber AND SeatNumber = @SeatNo
        `);
    }

    // then delete
    await pool.request()
        .input('Bid', sql.Int, bid)
        .execute('sp_DeleteBooking');


    // ✅ SAFE CACHE CLEAR (NO ERROR EVEN IF userId MISSING)
    try {
        if (userId) {
            await redis.del(`booking_${userId}`);
        }
    } catch (err) {
        console.log("Redis error ignored:", err.message);
    }

    // ✅ ALWAYS RETURN SUCCESS
    return { message: "Booking deleted successfully" };
};

// ✅ VALIDATION (OPTIONAL)
exports.validateBooking = (booking) => {
    if (!booking) {
        throw { status: 404, message: "Booking not found" };
    }

    if (booking.Status === 'EXPIRED') {
        throw { status: 400, message: "Booking expired" };
    }
};

// ✅ View for Admin only
exports.getAllBookings = async () => {
    const result = await pool.request()
        .execute('sp_GetAllBookings');

    return result.recordset;
};