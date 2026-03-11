import React, { Component } from "react";
import axios from "axios";

class App extends Component {
    state = {
        serverStatus: "FETCHING DETAILS",
        // List of specific monitoring panels from Grafana
        metrics: [
            { id: 1, name: "Network Traffic", panelId: "1" },
            { id: 2, name: "CPU Usage", panelId: "2" },
            { id: 3, name: "Database Load", panelId: "3" }
        ]
    };

    componentDidMount = async () => {
        try {
            const res = await axios.get("/welcome");
            this.setState({ serverStatus: "ONLINE ✅" });
        } catch (error) {
            console.log("Server not responding", error);
        }
    };

    render() {
        return (
            <div className="App" style={{ textAlign: 'center', padding: '20px' }}>
                <h1>Server Status: {this.state.serverStatus}</h1>
                <hr />
                
                {/* Mapping through your monitoring list */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    {this.state.metrics.map(metric => (
                        <div key={metric.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
                            <h3>{metric.name}</h3>
                            <iframe
                                src={`http://localhost:3001/d-solo/your-uid?orgId=1&panelId=${metric.panelId}&refresh=5s`}
                                width="100%"
                                height="250"
                                frameBorder="0"
                            ></iframe>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default App;
