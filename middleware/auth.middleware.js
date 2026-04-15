const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(403).json({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};


exports.isAdmin = (req, res, next) => {
    if (!req.user || !req.user.role) {
        return res.status(403).json({ message: "Access denied" });
    }

    if (req.user.role.toLowerCase() !== "admin") {
        return res.status(403).json({ message: "Admin only" });
    }

    next();
};