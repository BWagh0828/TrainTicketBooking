const bookingService = require('../services/booking.service');

// ✅ CREATE BOOKING
exports.createBooking = async (req, res, next) => {
    try {
        const { from, to, price, fromDate, toDate, seatNo } = req.body;



        // 🔥 Validation
        if (!from || !to || !price || !fromDate || !toDate || !req.body.trainNumber) {
            return res.status(400).json({
                success: false,
                message: "All fields including trainNumber are required"
            });
        }

        const result = await bookingService.createBooking(req.user.id, req.body);

        res.json({
            success: true,
            data: result
        });

    } catch (err) {
        next(err);
    }
};

// ✅ GET ACTIVE BOOKINGS
exports.getBookings = async (req, res, next) => {
    try {
        const result = await bookingService.getBookings(req.user.id);

        res.json({
            success: true,
            data: result
        });

    } catch (err) {
        next(err);
    }
};

// ✅ CANCEL BOOKING
exports.cancelBooking = async (req, res, next) => {
    try {
        const bid = parseInt(req.params.id);

        if (!bid) {
            return res.status(400).json({
                success: false,
                message: "Invalid booking ID"
            });
        }

        const result = await bookingService.cancelBooking(bid, req.user.id);

        res.json({
            success: true,
            data: result
        });

    } catch (err) {
        next(err);
    }
};

// ✅ GET CANCELLED BOOKINGS
exports.getCancelledTickets = async (req, res, next) => {
    try {
        const result = await bookingService.getCancelledTickets(req.user.id);

        res.json({
            success: true,
            data: result
        });

    } catch (err) {
        next(err);
    }
};

// ✅ GET PREVIOUS BOOKINGS
exports.getPreviousBookings = async (req, res, next) => {
    try {
        const result = await bookingService.getPreviousBookings(req.user.id);

        res.json({
            success: true,
            data: result
        });

    } catch (err) {
        next(err);
    }
};

// ✅ DELETE BOOKING
exports.deleteBooking = async (req, res, next) => {
    try {
        const bid = Number(req.params.id);

        if (!bid) {
            return res.status(400).json({
                success: false,
                message: "Invalid booking ID"
            });
        }


        const result = await bookingService.deleteBooking(bid, req.user?.id);



        res.json({
            success: true,
            data: result
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.getAllBookings = async (req, res, next) => {
    try {
        const result = await bookingService.getAllBookings();

        res.json({
            success: true,
            data: result
        });

    } catch (err) {
        next(err);
    }
};

exports.getAvailableSeats = async (data) => {
    const result = await pool.request()
        .input('FromPlace', sql.VarChar, data.from)
        .input('ToPlace', sql.VarChar, data.to)
        .input('FromDate', sql.Date, data.fromDate)
        .execute('sp_GetBookedSeats');

    return result.recordset;
};