```mermaid
graph TD
    subgraph Client_Tier [Client Tier]
        React[React Terminal UI]
    end

    subgraph Logic_Tier [Logic Tier - Node.js]
        Express[Express Server]
        PromClient[prom-client]
        StressEngine[Stress Test Logic]
    end

    subgraph Data_Tier [Data Tier]
        Mongo[(MongoDB)]
    end

    subgraph Monitoring_Stack [Monitoring Stack]
        Prom[Prometheus Server]
        Grafana[Grafana Dashboard]
    end

    %% Connections
    React -->|POST /user/add| Express
    React -->|POST /stress?n=X| StressEngine
    StressEngine -->|Parallel Connections| Mongo
    Express -->|Update Counters| PromClient
    Prom -->|Scrape /metrics| PromClient
    Grafana -->|Query| Prom



