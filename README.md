# Spyder Mama - Food Delivery Platform

A comprehensive food delivery platform similar to Lieferando/Uber Eats, connecting consumers with restaurants for seamless online food ordering and delivery.

![Logo](logo.PNG)

## 📋 Overview

Spyder Mama is a multi-tenant food delivery platform that enables:
- **Consumers** to discover restaurants, order food, and track deliveries
- **Restaurant Operators** to manage menus, process orders, and grow their business
- **Platform Operators** to manage the entire ecosystem and facilitate transactions

## 🏗️ Architecture

The platform follows a modern, layered architecture:
- **Frontend**: Vue.js 3 (recommended) / Angular 12
- **Backend**: Spring Boot 2.4.5 (Java 11)
- **Database**: MariaDB (production) / H2 (development)
- **Authentication**: Keycloak (OAuth2/OpenID Connect)
- **API Documentation**: Swagger/OpenAPI

## 📚 Documentation

### Requirements
- **[Requirements Index](./docs/requirements/index.md)** - Complete functional requirements
- **[Platform Operator Requirements](./docs/requirements/platform_operator_requirements.md)**
- **[Restaurant Operator Requirements](./docs/requirements/restaurant_operator_requirements.md)**
- **[Consumer Requirements](./docs/requirements/consumer_requirements.md)**

### Design Documentation
- **[Design Overview](./design/README.md)** - Design documentation index
- **[Technical Stack](./design/technical-stack.md)** - Technology choices and recommendations
- **[Entity Relationship Diagram](./design/erd.md)** - Database schema with Mermaid diagrams
- **[System Architecture](./design/architecture.md)** - High-level architecture and component interactions
- **[API Design](./design/api-design.md)** - RESTful API specifications
- **[Deployment Architecture](./design/deployment.md)** - Infrastructure and deployment strategies

## 🚀 Quick Start

### Prerequisites

- **Java 11** or higher
- **Node.js 14+** and npm
- **Maven 3.6+**
- **Git**
- **Docker** (optional, for Keycloak)

### Backend Setup

```bash
# Navigate to API folder
cd api

# Build the application
mvn clean package

# Run the application
mvn spring-boot:run

# The API will be available at http://localhost:8080
```

### Frontend Setup (Vue.js - Recommended)

```bash
# Navigate to Vue.js UI folder
cd ui-vue

# Install dependencies
npm install

# Run development server
npm run serve

# The application will be available at http://localhost:8081
```

### Frontend Setup (Angular - Legacy)

```bash
# Navigate to Angular UI folder
cd ui

# Install dependencies
npm install

# Run development server
npm start

# The application will be available at http://localhost:4200
```

### Keycloak Setup (Authentication)

```bash
# Run Keycloak in Docker
docker run -p 8090:8080 \
  -e KEYCLOAK_USER=admin \
  -e KEYCLOAK_PASSWORD=admin123 \
  quay.io/keycloak/keycloak:latest

# Access Keycloak admin console at http://localhost:8090
```

## 📁 Project Structure

```
sm/
├── api/                    # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/      # Java source code
│   │   │   └── resources/ # Configuration and database migrations
│   │   └── test/          # Unit and integration tests
│   └── pom.xml            # Maven configuration
│
├── ui-vue/                # Vue.js frontend (recommended)
│   ├── src/
│   │   ├── components/    # Vue components
│   │   ├── views/         # Page views
│   │   ├── router/        # Vue Router configuration
│   │   └── store/         # Vuex state management
│   └── package.json
│
├── ui/                    # Angular frontend (legacy)
│   ├── src/
│   │   ├── app/           # Angular components and modules
│   │   └── assets/        # Static assets
│   └── package.json
│
├── docs/                  # Documentation
│   └── requirements/      # Functional requirements
│
├── design/                # Design documentation
│   ├── README.md
│   ├── technical-stack.md
│   ├── erd.md
│   ├── architecture.md
│   ├── api-design.md
│   └── deployment.md
│
└── README.md              # This file
```

## 🔑 Key Features

### For Consumers
- Restaurant discovery and search
- Menu browsing with filters (vegetarian, vegan, etc.)
- Order placement with customizations
- Real-time order tracking
- Review and rating system
- Loyalty programs and promotions

### For Restaurant Operators
- Restaurant profile management
- Menu and pricing management
- Order processing and status updates
- Delivery configuration
- Financial reporting
- Customer engagement tools

### For Platform Operators
- Multi-restaurant management
- User account administration
- Financial management and payouts
- Commission configuration
- Analytics and reporting
- Marketing and promotions

## 🛠️ Technology Stack

### Backend
- **Framework**: Spring Boot 2.4.5
- **Language**: Java 11
- **ORM**: Spring Data JPA with Hibernate
- **Database**: MariaDB (prod), H2 (dev)
- **Migration**: Liquibase
- **Security**: Spring Security + OAuth2
- **API Docs**: Springfox Swagger 3.0
- **Build Tool**: Maven

### Frontend
- **Framework**: Vue.js 3.0.5 (recommended) / Angular 12.1.1
- **UI Library**: PrimeVue 3.2.1 / Angular Material
- **State Management**: Vuex 4.0 / RxJS
- **Routing**: Vue Router 4.0 / Angular Router
- **Build Tool**: Vue CLI / Angular CLI
- **Language**: TypeScript

### Infrastructure
- **Authentication**: Keycloak
- **API Gateway**: (Future) Kong/AWS API Gateway
- **Cache**: (Future) Redis
- **CDN**: (Future) CloudFront
- **Cloud**: AWS (recommended)

## 📊 Database Schema

The platform uses a flexible, multi-tenant database schema supporting:
- User management (consumers, restaurant operators, platform operators)
- Restaurant and menu management
- Order processing
- Payment tracking
- Reviews and ratings
- Audit logging
- Multi-language support

See the [ERD Documentation](./design/erd.md) for detailed schema diagrams.

## 🔐 Security

- **Authentication**: OAuth2/OpenID Connect via Keycloak
- **Authorization**: Role-based access control (RBAC)
- **Data Protection**: Encryption at rest and in transit
- **Compliance**: PCI DSS for payment data, GDPR for user data
- **API Security**: JWT tokens, HTTPS, CORS policies

## 🧪 Testing

### Backend Tests
```bash
cd api
mvn test
```

### Frontend Tests (Vue.js)
```bash
cd ui-vue
npm run test:unit
npm run test:e2e
```

### Frontend Tests (Angular)
```bash
cd ui
npm test
npm run e2e
```

## 📦 Building for Production

### Backend
```bash
cd api
mvn clean package
# JAR file will be in target/ folder
```

### Frontend (Vue.js)
```bash
cd ui-vue
npm run build
# Production files will be in dist/ folder
```

### Frontend (Angular)
```bash
cd ui
npm run build
# Production files will be in dist/ folder
```

## 🚢 Deployment

See the [Deployment Architecture](./design/deployment.md) for detailed deployment strategies including:
- Development environment setup
- Staging environment configuration
- Production deployment on AWS
- CI/CD pipeline with GitHub Actions
- Monitoring and logging
- Backup and disaster recovery

## 📈 Roadmap

### Version 1.0 (Current - MVP)
- ✅ User authentication and authorization
- ✅ Restaurant management
- ✅ Basic menu management
- ✅ Property set system for flexibility
- ✅ Audit logging

### Version 2.0 (Planned)
- 🔲 Complete menu management with modifiers
- 🔲 Order processing
- 🔲 Payment integration (Stripe/PayPal)
- 🔲 Review and rating system
- 🔲 Real-time order tracking via WebSocket

### Version 3.0 (Future)
- 🔲 Loyalty programs
- 🔲 Advanced promotions
- 🔲 Delivery partner integration
- 🔲 Mobile apps (iOS/Android)
- 🔲 Restaurant analytics dashboard
- 🔲 Microservices architecture migration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is proprietary software. All rights reserved.

## 👥 Team

- **Product Owner**: Platform Team
- **Development**: Full Stack Team
- **Design**: UX/UI Team

## 📞 Support

For questions or issues:
- Create an issue in the GitHub repository
- Contact: [Support Email]

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- Vue.js and Angular teams for frontend frameworks
- Keycloak team for authentication solution
- PrimeVue and Angular Material for UI components

---

**Note**: This project is under active development. Features and documentation are subject to change.

**Recommended Setup**: Vue.js frontend + Spring Boot backend for optimal performance and developer experience.
