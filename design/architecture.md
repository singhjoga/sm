# System Architecture

## Overview

The Food Delivery Platform follows a layered, API-first architecture designed to support scalability, maintainability, and future microservices migration.

## High-Level Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        WEB[Web Browser]
        MOBILE[Mobile App - Future]
    end
    
    subgraph "CDN / Load Balancer"
        CDN[CDN / CloudFront]
        LB[Load Balancer]
    end
    
    subgraph "Presentation Layer"
        ANGULAR[Angular UI]
        VUE[Vue.js UI - Recommended]
    end
    
    subgraph "API Gateway - Future"
        GATEWAY[API Gateway / Kong]
    end
    
    subgraph "Application Layer"
        subgraph "Spring Boot Application"
            REST_API[REST Controllers]
            WS[WebSocket Controller]
            SECURITY[Security Layer - OAuth2]
            
            subgraph "Business Logic"
                REST_SVC[Restaurant Service]
                MENU_SVC[Menu Service]
                ORDER_SVC[Order Service]
                CUST_SVC[Customer Service]
                PAYMENT_SVC[Payment Service]
                NOTIF_SVC[Notification Service]
            end
            
            subgraph "Data Access Layer"
                REPO[JPA Repositories]
                LIQUIBASE[Liquibase Migration]
            end
        end
    end
    
    subgraph "Data Layer"
        DB[(MariaDB / H2)]
        CACHE[(Redis Cache - Future)]
    end
    
    subgraph "External Services"
        KEYCLOAK[Keycloak IAM]
        PAYMENT_GW[Payment Gateway]
        EMAIL[Email Service]
        SMS[SMS Service]
        MAPS[Maps API]
    end
    
    subgraph "Infrastructure"
        LOGS[Logging / ELK]
        MONITOR[Monitoring]
        BACKUP[Backup Service]
    end
    
    WEB --> CDN
    MOBILE --> LB
    CDN --> ANGULAR
    CDN --> VUE
    LB --> GATEWAY
    
    ANGULAR --> REST_API
    VUE --> REST_API
    ANGULAR --> WS
    VUE --> WS
    
    GATEWAY -.Future.-> REST_API
    
    REST_API --> SECURITY
    WS --> SECURITY
    SECURITY --> KEYCLOAK
    
    REST_API --> REST_SVC
    REST_API --> MENU_SVC
    REST_API --> ORDER_SVC
    REST_API --> CUST_SVC
    
    REST_SVC --> REPO
    MENU_SVC --> REPO
    ORDER_SVC --> REPO
    CUST_SVC --> REPO
    PAYMENT_SVC --> PAYMENT_GW
    NOTIF_SVC --> EMAIL
    NOTIF_SVC --> SMS
    
    REPO --> DB
    LIQUIBASE --> DB
    REPO -.Future.-> CACHE
    
    REST_SVC --> MAPS
    ORDER_SVC --> NOTIF_SVC
    ORDER_SVC --> PAYMENT_SVC
    
    REST_API --> LOGS
    REST_API --> MONITOR
    DB --> BACKUP
    
    style VUE fill:#42b883
    style ANGULAR fill:#dd0031
    style KEYCLOAK fill:#4d4d4d
    style DB fill:#003545
```

## Architecture Layers

### 1. Client Layer

#### Web Browser
- Primary interface for all user types
- Responsive design for mobile and desktop
- Progressive Web App (PWA) capabilities

#### Mobile App (Future)
- Native iOS and Android applications
- Shares the same REST API as web clients
- Push notification support

### 2. Content Delivery & Load Balancing

#### CDN (Content Delivery Network)
- Serves static assets (JS, CSS, images)
- Reduces latency for global users
- Caching for frontend bundles

#### Load Balancer
- Distributes traffic across multiple backend instances
- Health checks and auto-scaling
- SSL/TLS termination

### 3. Presentation Layer

#### Vue.js UI (Recommended)
- **Location**: `/ui-vue`
- Modern, reactive UI framework
- Component-based architecture
- PrimeVue component library
- Vuex for state management
- Vue Router for navigation

#### Angular UI (Legacy)
- **Location**: `/ui`
- Current implementation
- Angular Material components
- Maintained for backward compatibility

**Decision**: Continue development with Vue.js for better performance and developer experience

### 4. API Gateway (Future Enhancement)

- Centralized entry point for all API requests
- Request routing and composition
- Rate limiting and throttling
- API versioning
- Request/response transformation
- Authentication delegation

### 5. Application Layer (Spring Boot)

#### REST Controllers
- RESTful API endpoints
- JSON request/response
- OpenAPI/Swagger documentation
- Input validation
- Exception handling

#### WebSocket Controller
- Real-time bidirectional communication
- Order status updates
- Live notifications
- Restaurant availability updates

#### Security Layer
- OAuth2 Resource Server
- JWT token validation
- Role-based access control (RBAC)
- Integration with Keycloak
- CSRF protection
- CORS configuration

#### Business Logic Layer

**Services Pattern**:
- Encapsulates business logic
- Transaction management
- Business rule validation
- Service-to-service communication

**Key Services**:
- **Restaurant Service**: Restaurant CRUD, search, configuration
- **Menu Service**: Menu and menu item management
- **Order Service**: Order processing, status management
- **Customer Service**: User management, profiles
- **Payment Service**: Payment processing integration
- **Notification Service**: Email, SMS, push notifications

#### Data Access Layer
- **Spring Data JPA**: Object-relational mapping
- **Repository Pattern**: Data access abstraction
- **Liquibase**: Database version control and migration
- **Entity Classes**: Domain model
- **Custom Queries**: Complex query support

### 6. Data Layer

#### MariaDB (Production)
- Primary relational database
- ACID compliance
- Master-slave replication (future)
- Automated backups

#### H2 (Development/Testing)
- In-memory database
- Fast test execution
- Development environment

#### Redis Cache (Future)
- Session management
- Frequently accessed data caching
- Real-time features support
- Rate limiting counters

### 7. External Services

#### Keycloak (IAM)
- Identity and Access Management
- User authentication
- Single Sign-On (SSO)
- User federation
- OAuth2/OIDC provider

#### Payment Gateway
- Stripe / PayPal integration
- PCI DSS compliance
- Tokenized payments
- Webhook handling

#### Email Service
- SendGrid / AWS SES
- Transactional emails
- Order confirmations
- Marketing emails

#### SMS Service
- Twilio
- Order status notifications
- OTP verification

#### Maps API
- Google Maps
- Restaurant location
- Delivery address validation
- Distance calculation
- Geocoding

### 8. Infrastructure Layer

#### Logging
- SLF4J + Logback
- Structured logging
- ELK Stack (future): Elasticsearch, Logstash, Kibana
- Centralized log aggregation

#### Monitoring
- Spring Boot Actuator
- Health checks
- Metrics collection
- Application Insights / Prometheus (future)

#### Backup Service
- Automated database backups
- Point-in-time recovery
- Disaster recovery plan

## Component Interaction Flows

### User Authentication Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant Keycloak
    
    User->>Frontend: Access Application
    Frontend->>Keycloak: Redirect to Login
    User->>Keycloak: Enter Credentials
    Keycloak->>Keycloak: Validate Credentials
    Keycloak->>Frontend: Return JWT Token
    Frontend->>Frontend: Store Token
    Frontend->>API: API Request + JWT Token
    API->>API: Validate Token
    API->>Frontend: Protected Resource
```

### Order Placement Flow

```mermaid
sequenceDiagram
    participant Customer
    participant Frontend
    participant API
    participant OrderService
    participant PaymentService
    participant NotificationService
    participant Restaurant
    participant PaymentGateway
    
    Customer->>Frontend: Place Order
    Frontend->>API: POST /api/orders
    API->>OrderService: Create Order
    OrderService->>OrderService: Validate Order
    OrderService->>PaymentService: Process Payment
    PaymentService->>PaymentGateway: Charge Customer
    PaymentGateway->>PaymentService: Payment Confirmed
    PaymentService->>OrderService: Payment Success
    OrderService->>NotificationService: Send Notifications
    NotificationService->>Customer: Order Confirmation (Email/SMS)
    NotificationService->>Restaurant: New Order Alert
    OrderService->>API: Order Created
    API->>Frontend: Order Response
    Frontend->>Customer: Order Confirmation
```

### Real-time Order Status Update

```mermaid
sequenceDiagram
    participant Restaurant
    participant API
    participant OrderService
    participant WebSocket
    participant Customer
    
    Restaurant->>API: Update Order Status
    API->>OrderService: Update Status
    OrderService->>OrderService: Save to Database
    OrderService->>WebSocket: Broadcast Update
    WebSocket->>Customer: Push Status Update
    Customer->>Customer: Display Update
```

## Data Flow Architecture

```mermaid
graph LR
    subgraph "Client"
        UI[UI Components]
        STATE[State Management]
    end
    
    subgraph "API Layer"
        CTRL[Controllers]
        VAL[Validation]
        SEC[Security]
    end
    
    subgraph "Business Layer"
        SVC[Services]
        RULES[Business Rules]
    end
    
    subgraph "Data Layer"
        REPO[Repositories]
        ENT[Entities]
    end
    
    subgraph "Database"
        DB[(Database)]
    end
    
    UI -->|HTTP Request| CTRL
    CTRL -->|Validate| VAL
    VAL -->|Authorize| SEC
    SEC -->|Invoke| SVC
    SVC -->|Apply| RULES
    SVC -->|Access| REPO
    REPO -->|ORM| ENT
    ENT -->|SQL| DB
    
    DB -->|Results| ENT
    ENT -->|Map| REPO
    REPO -->|Return| SVC
    SVC -->|DTO| CTRL
    CTRL -->|JSON| UI
    UI -->|Update| STATE
```

## Deployment Architecture

### Current (Development)

```mermaid
graph TB
    subgraph "Developer Machine"
        FE[Frontend - npm run serve]
        BE[Backend - Spring Boot]
        DB[H2 Database]
        KC[Keycloak - Docker]
    end
    
    FE -->|localhost:8080| BE
    BE -->|JDBC| DB
    BE -->|OAuth2| KC
```

### Recommended (Production)

```mermaid
graph TB
    subgraph "AWS Cloud"
        subgraph "CDN"
            CF[CloudFront]
        end
        
        subgraph "Load Balancer"
            ALB[Application Load Balancer]
        end
        
        subgraph "EC2 / ECS"
            APP1[App Instance 1]
            APP2[App Instance 2]
            APP3[App Instance N]
        end
        
        subgraph "Database"
            RDS[(RDS MariaDB)]
            REPLICA[(Read Replica)]
        end
        
        subgraph "Cache"
            REDIS[(ElastiCache Redis)]
        end
        
        subgraph "Storage"
            S3[S3 Bucket]
        end
        
        subgraph "IAM"
            KCC[Keycloak Cluster]
        end
    end
    
    CF --> ALB
    ALB --> APP1
    ALB --> APP2
    ALB --> APP3
    
    APP1 --> RDS
    APP2 --> RDS
    APP3 --> RDS
    
    APP1 --> REDIS
    APP2 --> REDIS
    APP3 --> REDIS
    
    RDS --> REPLICA
    
    APP1 --> S3
    APP2 --> S3
    APP3 --> S3
    
    APP1 --> KCC
    APP2 --> KCC
    APP3 --> KCC
```

## Security Architecture

```mermaid
graph TB
    subgraph "Security Layers"
        subgraph "Network Security"
            FW[Firewall]
            WAF[Web Application Firewall]
        end
        
        subgraph "Application Security"
            TLS[TLS/HTTPS]
            AUTH[Authentication]
            AUTHZ[Authorization]
            VALID[Input Validation]
        end
        
        subgraph "Data Security"
            ENC[Encryption at Rest]
            TRANS[Encryption in Transit]
            MASK[Data Masking]
        end
        
        subgraph "Compliance"
            PCI[PCI DSS]
            GDPR[GDPR]
            AUDIT[Audit Logs]
        end
    end
    
    FW --> WAF
    WAF --> TLS
    TLS --> AUTH
    AUTH --> AUTHZ
    AUTHZ --> VALID
    
    VALID --> ENC
    ENC --> TRANS
    TRANS --> MASK
    
    MASK --> PCI
    PCI --> GDPR
    GDPR --> AUDIT
```

## Scalability Strategy

### Horizontal Scaling
- Multiple application instances behind load balancer
- Stateless application design
- Session storage in Redis
- Database connection pooling

### Vertical Scaling
- Increase instance size for database
- Optimize queries and indexes
- Connection pool tuning

### Caching Strategy
- Redis for session management
- Application-level caching
- HTTP caching headers
- CDN for static content

### Database Optimization
- Read replicas for read-heavy operations
- Query optimization
- Index optimization
- Partitioning for large tables (future)

## Future Microservices Architecture

```mermaid
graph TB
    subgraph "API Gateway"
        GATEWAY[Kong / AWS API Gateway]
    end
    
    subgraph "Microservices"
        AUTH_SVC[Auth Service]
        REST_SVC[Restaurant Service]
        MENU_SVC[Menu Service]
        ORDER_SVC[Order Service]
        PAYMENT_SVC[Payment Service]
        NOTIF_SVC[Notification Service]
        USER_SVC[User Service]
    end
    
    subgraph "Databases"
        AUTH_DB[(Auth DB)]
        REST_DB[(Restaurant DB)]
        MENU_DB[(Menu DB)]
        ORDER_DB[(Order DB)]
        USER_DB[(User DB)]
    end
    
    subgraph "Message Queue"
        KAFKA[Kafka / RabbitMQ]
    end
    
    GATEWAY --> AUTH_SVC
    GATEWAY --> REST_SVC
    GATEWAY --> MENU_SVC
    GATEWAY --> ORDER_SVC
    GATEWAY --> USER_SVC
    
    AUTH_SVC --> AUTH_DB
    REST_SVC --> REST_DB
    MENU_SVC --> MENU_DB
    ORDER_SVC --> ORDER_DB
    USER_SVC --> USER_DB
    
    ORDER_SVC --> KAFKA
    PAYMENT_SVC --> KAFKA
    NOTIF_SVC --> KAFKA
    
    ORDER_SVC -.Event.-> PAYMENT_SVC
    PAYMENT_SVC -.Event.-> NOTIF_SVC
```

## Design Principles

### 1. Separation of Concerns
- Clear layer boundaries
- Single responsibility principle
- Loose coupling

### 2. API-First Design
- Well-defined REST API
- OpenAPI documentation
- Versioning strategy

### 3. Stateless Application
- No server-side sessions
- JWT-based authentication
- Scalable horizontally

### 4. Security by Design
- Defense in depth
- Principle of least privilege
- Secure by default

### 5. Observability
- Comprehensive logging
- Metrics and monitoring
- Distributed tracing (future)

### 6. Resilience
- Graceful degradation
- Circuit breakers (future)
- Retry mechanisms
- Timeout handling

## Technology Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | Vue.js 3 | UI Framework |
| UI Components | PrimeVue | Component Library |
| Backend | Spring Boot 2.4 | Application Framework |
| Database | MariaDB | Primary Data Store |
| Cache | Redis (Future) | Performance |
| Authentication | Keycloak | IAM |
| API Docs | Swagger/OpenAPI | Documentation |
| Build (BE) | Maven | Dependency Management |
| Build (FE) | npm / Vue CLI | Frontend Build |
| ORM | Spring Data JPA | Data Access |
| Migration | Liquibase | Schema Management |

## Conclusion

This architecture provides:
- **Scalability**: Can grow from MVP to enterprise scale
- **Maintainability**: Clear separation of concerns
- **Flexibility**: Easy to add new features
- **Security**: Multiple layers of protection
- **Performance**: Optimized data access and caching
- **Future-proof**: Ready for microservices migration

The architecture balances current needs (monolithic simplicity) with future requirements (microservices scalability).
