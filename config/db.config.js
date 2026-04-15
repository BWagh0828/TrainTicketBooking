const sql = require('mssql/msnodesqlv8');



const config = {
    connectionString: `
    Driver={ODBC Driver 18 for SQL Server};
    Server=localhost\\SQLEXPRESS;
    Database=TrainDB;
    Trusted_Connection=yes;
    Encrypt=yes;
    TrustServerCertificate=yes;
`
};

const pool = new sql.ConnectionPool(config);

const connectDB = async () => {
    try {
        await pool.connect();
        console.log("SQL Connected");
    } catch (err) {
        console.error("DB Error:", err);
    }
};

module.exports = { sql, pool, connectDB };