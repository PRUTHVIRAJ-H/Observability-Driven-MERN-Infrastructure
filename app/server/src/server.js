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
app.use(express.json());

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
            console.log("Error in Moongggose creation")
        });
};

conn();

// --- Routes ---
app.post("/user/add", async (req, res) => {
    try {
        // 1. Logic: Just create and save. The global 'conn()' handled the link.
        const newUser = new User({ name: req.body.name }); 
        const savedUser = await newUser.save(); 
        
        // 2. Telemetry: Record the success for Grafana
        dbCallsSuccessTotal.inc();
        console.log(`${savedUser.name} saved to database`);

        // 3. Response: Send back the confirmation
        res.status(201).send(`${req.body.name} added to the System!`);
    } catch (err) {
        // 4. Fault Tolerance: Record the failure
        dbCallsFailTotal.inc();
        console.log("Saving failed:", err);
        res.status(500).send("Failed to add user");
    }
});


app.get("/user", async (req, res) => {
    try {
        const userName = req.query.name; // Picks 'name' from the URL
        let user;

        if (userName) {
            // Find specific user by name
            user = await User.findOne({ name: userName }).exec();
        } else {
            // Fallback: Get the latest record if no name is provided
            user = await User.findOne().sort({ createdAt: -1 }).exec();
        }

        appCallsTotal.inc(); // Telemetry: Count the API hit
        
        if (!user) {
            return res.send("Welcome! No records found in the database yet.");
        }

        res.send(`Hello Client! Record found for: ${user.name} (ID: ${user._id})`);
    } catch (err) {
        dbCallsFailTotal.inc(); // Telemetry: Count the DB error
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
