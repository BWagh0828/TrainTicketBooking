const redis = require('redis');

const client = redis.createClient({
    url: 'redis://127.0.0.1:6379'
});

client.on('connect', () => {
    console.log("Redis connecting...");
});

client.on('ready', () => {
    console.log("✅ Redis READY (Actual working connection)");
});

client.on('error', (err) => {
    console.error("❌ Redis Error:", err.message);
});

(async () => {
    try {
        await client.connect();
    } catch (err) {
        console.log("Redis not available");
    }
})();

module.exports = client;