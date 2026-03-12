```mermaid
graph LR
    subgraph UI [React Frontend]
        Terminal[Terminal UI]
        StressBtn[Stress Test Button]
    end

    subgraph App [Backend API]
        Node[Node.js / Express]
        Metrics[(In-Memory Metrics)]
    end

    subgraph Infrastructure
        DB[(MongoDB)]
        Prom[Prometheus]
        Grafana[Grafana]
    end

    %% Flow
    Terminal -->|API Call| Node
    StressBtn -->|Query Params| Node
    Node -->|Stress Connections| DB
    Node -->|Update State| Metrics
    Prom -.->|Scrape /metrics| Metrics
    Grafana -.->|Query| Prom



