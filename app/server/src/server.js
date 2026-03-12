const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const Prometheus = require('prom-client');

const app = express();
app.use(cors());
app.use(express.json());

const port = 4000;
const mongoUri = process.env.MONGO_URI || "mongodb://db:27017/mydatabase";

// --- Telemetry Counter ---
const registrationCounter = new Prometheus.Counter({
    registrationCounter.inc(); 
    name: 'pruthviraj_registrations_total',
    help: 'Total number of times Pruthviraj has registered'
});

// --- Database Connection ---
mongoose.connect(mongoUri)
    .then(() => console.log("Connected to MongoDB Gearbox!"))
    .catch(err => console.log("DB Connection Failed:", err));

const User = mongoose.model("User", new mongoose.Schema({ name: String }));

// --- The Working Route ---
app.post("/user/add", async (req, res) => {
    try {
        const newUser = new User({ name: req.body.name });
        await newUser.save();
        
        // This is the signal Grafana will pick up
        registrationCounter.inc(); 
        
        console.log(`User ${req.body.name} added!`);
        res.status(201).send(`Success! ${req.body.name} is now in the system.`);
    } catch (err) {
        res.status(500).send("Database Error");
    }
});

// For Prometheus to scrape the data
app.get("/metrics", async (req, res) => {
    res.set('Content-Type', Prometheus.register.contentType);
    res.send(await Prometheus.register.metrics());
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});