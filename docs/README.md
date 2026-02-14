# Documentation

## Requirements

The production requirements for the Food Delivery Platform are organized in the `requirements/` folder.

### Getting Started

Start with the [Requirements Index](./requirements/index.md) which provides:
- Overview of the platform
- Links to stakeholder-specific requirements
- Non-functional requirements
- Glossary of terms

### Stakeholder-Specific Requirements

Requirements are divided into separate documents for each stakeholder:

1. **[Platform Operator Requirements](./requirements/platform_operator_requirements.md)**
   - Platform management and configuration
   - User and restaurant account administration
   - Financial management and reporting
   - Operations and support
   - Marketing and promotions

2. **[Restaurant Operator Requirements](./requirements/restaurant_operator_requirements.md)**
   - Account and profile management
   - Menu management
   - Order processing
   - Delivery configuration (NEW)
   - Financial operations
   - Marketing and customer engagement

3. **[Consumer Requirements](./requirements/consumer_requirements.md)**
   - Account management
   - Restaurant discovery and search
   - Ordering process
   - Order tracking and management
   - Post-order activities
   - Loyalty and rewards
   - Customer support

Each document includes:
- **Use Case Summary Table** with Priority, Release Version, and Status columns
- Detailed use case descriptions with actors, preconditions, and flows
- Business rules and alternative flows where applicable

### Document Organization

```
docs/
├── README.md (this file)
└── requirements/
    ├── index.md (main entry point)
    ├── platform_operator_requirements.md
    ├── restaurant_operator_requirements.md
    ├── consumer_requirements.md
    └── requirements_v1_archive.md (original consolidated document)
```

### Recent Enhancements (v2.0)

- Created subfolder structure for better organization
- Divided requirements into stakeholder-specific documents
- Added use case summary tables with priority and release version tracking
- Added UC-RO-018: Configure Delivery Settings (delivery times, areas, and charges)
- Maintained backward compatibility by archiving original requirements document
