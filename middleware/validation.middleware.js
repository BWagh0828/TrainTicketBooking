exports.validateAuth = (req, res, next) => {
    const { email, password } = req.body;

    // 🔥 Email Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 🔥 Password Regex (Min 6 chars, 1 letter, 1 number, 1 special character)
    const passwordRegex = /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    // Email validation
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Invalid email format"
        });
    }

    // Password validation
    if (!password || !passwordRegex.test(password)) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 6 characters and contain letters, numbers, and special characters"
        });
    }

    next();
};