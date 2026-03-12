const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Prometheus = require('prom-client');

const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGO_URI || "mongodb://db:27017/test"; // Use 'db' for docker-compose

const app = express();
app.use(cors({
    origin: "*", // During development, this is the safest "wide open" setting
    origin: true,
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(express.json());

/**
 * PROMETHEUS METRICS SETUP
 */
const metricsInterval = Prometheus.collectDefaultMetrics();

const appCallsTotal = new Prometheus.Counter({
    name: 'MERN_APP_web_app_calls',
    help: 'Total number of welcome API calls'
});

const userAddTotal = new Prometheus.Counter({
    name: 'MERN_APP_user_add_total',
    help: 'Total number of users added to the database'
});

const dbCallsFailTotal = new Prometheus.Counter({
    name: 'MERN_APP_db_connection_failures',
    help: 'Total number of server->db connection failures'
});

const dbCallsSuccessTotal = new Prometheus.Counter({
    name: 'MERN_APP_db_connection_successes',
    help: 'Total number of server->db connection successes'
});

const httpRequestDurationMicroseconds = new Prometheus.Histogram({
    name: 'MERN_APP_http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 5, 15, 50, 100, 200, 500]
});

const dbTotalConnections = new Prometheus.Counter({
    name: 'MERN_APP_db_connections',
    help: 'Total number of server->db connections'
});

/**
 * DATABASE CONFIGURATION
 */
const userSchema = new mongoose.Schema({
    name: String
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

const connectWithRetry = () => {
    mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Stress")
            dbTotalConnections.inc()
            dbCallsSuccessTotal.inc();
            console.log("MongoDB connected successfully");
        })
        .catch(err => {
            console.log("Stress")
            dbTotalConnections.inc()
            dbCallsFailTotal.inc();
            console.error("MongoDB connection failed, retrying in 5s...", err);
            setTimeout(connectWithRetry, 5000);
        });
};

connectWithRetry();

/**
 * ROUTES
 */

// Middleware to measure request duration
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        httpRequestDurationMicroseconds
            .labels(req.method, req.route ? req.route.path : req.path, res.statusCode)
            .observe(duration);
    });
    next();
});

// GET: Basic connectivity check (used by your React Header status badge)
app.get("/", (req, res) => {
    appCallsTotal.inc();
    res.status(200).send("Infrastructure API Online");
});

// GET: Welcome and fetch users
app.get("/welcome", async (req, res) => {
    appCallsTotal.inc();
    const users = await User.find().sort({ createdAt: -1 }).limit(10);
    res.send({ message: "Data retrieved", data: users });
});

// POST: Add new user (Used by your AddUserPage.js)
app.post("/user/add", async (req, res) => {
    appCallsTotal.inc();
    try {
        const newUser = new User({ name: req.body.name });
        await newUser.save();
        userAddTotal.inc(); // Increment custom metric for Grafana spike
        res.status(201).send({ message: "Node provisioned successfully" });
    } catch (err) {
        res.status(500).send({ error: "Provisioning failed" });
    }
});

// GET: Metrics endpoint for Prometheus to scrape
app.get("/metrics", async (req, res) => {
    appCallsTotal.inc();
    res.set('Content-Type', Prometheus.register.contentType);
    res.send(await Prometheus.register.metrics());
});

app.post("/stress", async (req, res) => {
    {
        let n = req.body.stressLevel || 10;
        for(i = 0; i < n; i++){
        mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            dbTotalConnections.inc()
            dbCallsSuccessTotal.inc();
            console.log("MongoDB connected successfully");
        })
        .catch(err => {
            dbTotalConnections.inc()
            dbCallsFailTotal.inc();
            console.error("MongoDB connection failed, retrying in 5s...", err);
            setTimeout(connectWithRetry, 5000);
        });
        }
        res.status(200).send({ message: `Stress test initiated for ${n} connections` });
    }
});

app.listen(port, () => console.log(`Backend listening on port ${port}`));