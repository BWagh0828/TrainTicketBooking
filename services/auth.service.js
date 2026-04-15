const { pool, sql } = require('../config/db.config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (data) => {
    const hashed = await bcrypt.hash(data.password, 10);

    await pool.request()
        .input('Name', sql.VarChar, data.name)
        .input('Email', sql.VarChar, data.email)
        .input('Password', sql.VarChar, hashed)
        .input('Role', sql.VarChar, data.role || 'User')
        .execute('sp_RegisterUser');

    return { message: "User registered" };
};

exports.login = async (data) => {
    const result = await pool.request()
        .input('Email', sql.VarChar, data.email)
        .execute('sp_LoginUser');

    const user = result.recordset[0];

    if (!user) throw { status: 404, message: "User not found" };

    const valid = await bcrypt.compare(data.password, user.Password);

    if (!valid) throw { status: 401, message: "Invalid password" };

    const token = jwt.sign(
        { id: user.Id, role: user.Role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return {
        token,
        user: {
            id: user.Id,
            name: user.Name,
            role: user.Role
        }
    };
};