const express = require("express");
const mongoose = require("mongoose");
const Prometheus = require('prom-client');

const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGO_URI || "mongodb://db:27017/mydatabase";

// --- Metrics Setup ---
const metricsInterval = Prometheus.collectDefaultMetrics();
const appCallsTotal = new Prometheus.Counter({ name: 'MERN_APP_web_app_calls', help: 'API calls' });
const dbCallsFailTotal = new Prometheus.Counter({ name: 'MERN_APP_db_connection_failures', help: 'DB failures' });
const dbCallsSuccessTotal = new Prometheus.Counter({ name: 'MERN_APP_db_connection_successes', help: 'DB successes' });
const metricsReadTotal = new Prometheus.Counter({ name: 'MERN_APP_metrics_read_total', help: 'Metrics reads' });

// --- Schema Setup ---
const userSchema = new mongoose.Schema({ name: String }, { timestamps: true });
const User = mongoose.model("User", userSchema);

const app = express();

// --- Database Connection Logic ---
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true // Stops the deprecation warning in your logs
};

const conn = () => {
    // Adding .catch() here is the most important part to stop the crash
    mongoose.connect(mongoUri, options)
        .catch(err => {
            // This is just the initial handshake error handling
        });
};

const db = mongoose.connection;

db.on("error", err => {
    console.log("Database connection error. Retrying in 5s...");
    dbCallsFailTotal.inc(); 
    setTimeout(conn, 5000); // Retry logic
});

db.once("open", () => {
    dbCallsSuccessTotal.inc();
    console.log("Successfully connected to the database");

    // Seed data ONLY after connection is established
    const user = new User({ name: "Pedro Tavares" });
    user.save()
        .then(u => console.log(`${u.name} saved to database`))
        .catch(e => console.log("Seeding failed:", e));
});

// Start initial connection
conn();

// --- Routes ---
app.get("/welcome", async (req, res) => {
    try {
        const users = await User.find().exec();
        appCallsTotal.inc();
        res.send(`Hello Client! Record found for: ${users[0]?.name || "No records"}`);
    } catch (err) {
        res.status(500).send("Error fetching from DB");
    }
});

app.get("/metrics", (req, res) => {
    metricsReadTotal.inc();
    res.set('Content-Type', Prometheus.register.contentType);
    res.send(Prometheus.register.metrics());
});

// --- Start the Server ---
// Updated: Added '0.0.0.0' to ensure Codespaces/Docker can route the traffic
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running and listening on http://0.0.0.0:${port}`);
});