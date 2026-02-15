# Entity Relationship Diagram (ERD)

## Overview

This document presents the Entity Relationship Diagram for the Food Delivery Platform database schema. The schema is designed to support a multi-tenant food delivery platform similar to Lieferando/Uber Eats.

## Database Schema Diagram

```mermaid
erDiagram
    LANG {
        varchar(20) CODE PK
        varchar(100) ENG_NAME
        varchar(100) LOCAL_NAME
    }
    
    COUNTRY {
        varchar(20) CODE PK
        varchar(100) DEF_LANG_CODE FK
    }
    
    COUNTRY_VAL {
        varchar(20) CODE PK
        varchar(100) LANG_CODE PK,FK
        varchar(500) NAME
    }
    
    REF_DATA {
        varchar(100) CODE PK
        varchar(100) TYPE_CODE FK
        boolean IS_DISABLED
    }
    
    REF_DATA_VAL {
        varchar(100) CODE PK,FK
        varchar(100) LANG_CODE PK,FK
        varchar(100) VALUE
        varchar(3000) DESCRIPTION
    }
    
    CUST {
        varchar(100) ID PK
        varchar(500) FIRST_NAME
        varchar(500) LAST_NAME
        varchar(500) EMAIL UK
        varchar(20) COUNTRY_CODE FK
        varchar(100) ZIP
        varchar(500) STREET
        varchar(500) HNO
        varchar(1000) AREA
        varchar(100) CITY
        varchar(100) STATE
        varchar(500) PHONE
        varchar(500) MOBILE
        varchar(100) LANG_CODE FK
        boolean IS_DISABLED
        timestamp CREATE_DATE
        varchar(50) CREATE_USER
    }
    
    REST {
        varchar(100) ID PK
        varchar(500) NAME UK
        varchar(100) CUST_ID FK
        varchar(500) STREET
        varchar(500) HNO
        varchar(1000) AREA
        varchar(100) CITY
        varchar(100) STATE
        varchar(100) ZIP
        varchar(20) COUNTRY_CODE FK
        decimal(14-9) LONGITUDE
        decimal(14-9) LATITUDE
    }
    
    REST_CUISINE {
        varchar(100) REST_ID PK,FK
        varchar(500) CUISINE_CODE PK,FK
    }
    
    PROP_SET {
        bigint PROP_SET_ID PK
        varchar(200) NAME
        varchar(3000) DESCRIPTION
    }
    
    PROP_SET_PARENT {
        bigint PROP_SET_ID PK,FK
        bigint PARENT_PROP_SET_ID PK,FK
    }
    
    PROP_SET_PROP {
        bigint PROP_SET_PROP_ID PK
        bigint PROP_SET_ID FK
        varchar(200) NAME
        varchar(200) DISPLAY_NAME
        int DISPLAY_ORDER
        varchar(50) TYPE_CODE
        varchar(3000) VALID_VALUES
        boolean IS_OPTIONAL
        boolean IS_DISABLED
    }
    
    PROP_SET_PROP_VAL {
        bigint PROP_SET_PROP_VAL_ID PK
        bigint PROP_SET_PROP_ID FK
        varchar(50) INST_ID
        varchar(3000) VALUE
    }
    
    AUDIT_LOG {
        varchar(100) AUDIT_ID PK
        varchar(20) ACTION
        timestamp ACTION_DATE
        varchar(100) ACTION_USER
        varchar(100) OBJ_TYPE
        varchar(100) OBJ_ID
        varchar(500) OBJ_NAME
        varchar(500) FILTER_VALUE
        clob ACTION_DETAILS
    }
    
    %% Core Relationships
    COUNTRY ||--o{ COUNTRY_VAL : "has translations"
    COUNTRY ||--|| LANG : "has default language"
    COUNTRY_VAL }o--|| LANG : "in language"
    
    REF_DATA ||--o| REF_DATA : "has type"
    REF_DATA ||--o{ REF_DATA_VAL : "has translations"
    REF_DATA_VAL }o--|| LANG : "in language"
    
    CUST }o--|| COUNTRY : "resides in"
    CUST }o--|| LANG : "prefers language"
    
    REST }o--|| CUST : "owned by"
    REST }o--|| COUNTRY : "located in"
    REST ||--o{ REST_CUISINE : "serves"
    REST_CUISINE }o--|| REF_DATA : "cuisine type"
    
    PROP_SET ||--o{ PROP_SET_PARENT : "has parents"
    PROP_SET ||--o{ PROP_SET_PROP : "has properties"
    PROP_SET_PARENT }o--|| PROP_SET : "parent"
    PROP_SET_PROP ||--o{ PROP_SET_PROP_VAL : "has values"
```

## Entity Descriptions

### Core Entities

#### LANG (Language)
- Stores supported languages for the platform
- Enables multi-language support across the application
- Referenced by country, customer, and reference data translations

#### COUNTRY
- Stores country information
- Links to default language for each country
- Supports international expansion

#### COUNTRY_VAL
- Multi-language translations for country names
- Composite primary key (CODE, LANG_CODE)

### Reference Data

#### REF_DATA
- Generic reference/lookup data table
- Self-referencing for type hierarchies
- Used for cuisines, order statuses, payment methods, etc.
- Supports enablement/disablement

#### REF_DATA_VAL
- Multi-language translations for reference data
- Provides descriptions in multiple languages

### User Management

#### CUST (Customer)
- Core user entity (can be consumers, restaurant operators, or platform operators)
- Stores personal information and address
- Links to country and preferred language
- Includes audit fields (CREATE_DATE, CREATE_USER)
- Email is unique across the platform

### Restaurant Management

#### REST (Restaurant)
- Restaurant entity
- Owned by a CUST (restaurant operator)
- Contains location information including geocoordinates
- Unique restaurant name constraint
- Links to country for location

#### REST_CUISINE
- Many-to-many relationship between restaurants and cuisines
- Allows restaurants to be tagged with multiple cuisine types
- References REF_DATA for cuisine definitions

### Configuration System

#### PROP_SET (Property Set)
- Flexible configuration system
- Allows dynamic property definitions
- Can be used for restaurant settings, menu item modifiers, etc.

#### PROP_SET_PARENT
- Enables property set inheritance
- Allows hierarchical configuration

#### PROP_SET_PROP (Property Set Property)
- Defines individual properties within a property set
- Includes display information, type, validation rules
- Supports optional and required properties

#### PROP_SET_PROP_VAL (Property Set Property Value)
- Stores actual values for properties
- Links to specific instances via INST_ID
- Flexible VARCHAR storage for different value types

### Audit & Compliance

#### AUDIT_LOG
- Comprehensive audit trail
- Tracks all important actions in the system
- Stores user, timestamp, object type, and details
- Supports compliance requirements (GDPR, etc.)

## Future Entity Additions

Based on the requirements documentation, the following entities should be added:

```mermaid
erDiagram
    MENU {
        varchar(100) ID PK
        varchar(100) REST_ID FK
        varchar(500) NAME
        varchar(3000) DESCRIPTION
        boolean IS_ACTIVE
        timestamp EFFECTIVE_FROM
        timestamp EFFECTIVE_TO
    }
    
    MENU_CATEGORY {
        varchar(100) ID PK
        varchar(100) MENU_ID FK
        varchar(500) NAME
        varchar(3000) DESCRIPTION
        int DISPLAY_ORDER
        boolean IS_ACTIVE
    }
    
    MENU_ITEM {
        varchar(100) ID PK
        varchar(100) CATEGORY_ID FK
        varchar(500) NAME
        varchar(3000) DESCRIPTION
        decimal(10-2) BASE_PRICE
        varchar(3) CURRENCY_CODE
        varchar(500) IMAGE_URL
        boolean IS_VEGETARIAN
        boolean IS_VEGAN
        boolean IS_GLUTEN_FREE
        boolean IS_AVAILABLE
        int PREP_TIME_MINUTES
        int DISPLAY_ORDER
    }
    
    MENU_ITEM_MODIFIER_GROUP {
        varchar(100) ID PK
        varchar(100) MENU_ITEM_ID FK
        varchar(200) NAME
        boolean IS_REQUIRED
        int MIN_SELECTION
        int MAX_SELECTION
        int DISPLAY_ORDER
    }
    
    MENU_ITEM_MODIFIER {
        varchar(100) ID PK
        varchar(100) MODIFIER_GROUP_ID FK
        varchar(200) NAME
        decimal(10-2) PRICE_ADJUSTMENT
        boolean IS_DEFAULT
        int DISPLAY_ORDER
    }
    
    CUST_ORDER {
        varchar(100) ID PK
        varchar(100) CUST_ID FK
        varchar(100) REST_ID FK
        varchar(100) ORDER_STATUS_CODE FK
        timestamp ORDER_DATE
        decimal(10-2) SUBTOTAL
        decimal(10-2) DELIVERY_FEE
        decimal(10-2) SERVICE_FEE
        decimal(10-2) TAX_AMOUNT
        decimal(10-2) DISCOUNT_AMOUNT
        decimal(10-2) TOTAL_AMOUNT
        varchar(3) CURRENCY_CODE
        varchar(100) PAYMENT_METHOD_CODE FK
        varchar(100) PAYMENT_STATUS_CODE FK
        varchar(1000) DELIVERY_ADDRESS
        varchar(500) DELIVERY_INSTRUCTIONS
        timestamp REQUESTED_DELIVERY_TIME
        timestamp ESTIMATED_DELIVERY_TIME
        timestamp ACTUAL_DELIVERY_TIME
    }
    
    ORDER_ITEM {
        varchar(100) ID PK
        varchar(100) ORDER_ID FK
        varchar(100) MENU_ITEM_ID FK
        int QUANTITY
        decimal(10-2) UNIT_PRICE
        decimal(10-2) TOTAL_PRICE
        varchar(1000) SPECIAL_INSTRUCTIONS
    }
    
    ORDER_ITEM_MODIFIER {
        varchar(100) ID PK
        varchar(100) ORDER_ITEM_ID FK
        varchar(100) MODIFIER_ID FK
        decimal(10-2) PRICE_ADJUSTMENT
    }
    
    PAYMENT {
        varchar(100) ID PK
        varchar(100) ORDER_ID FK
        decimal(10-2) AMOUNT
        varchar(3) CURRENCY_CODE
        varchar(100) PAYMENT_METHOD_CODE FK
        varchar(100) PAYMENT_STATUS_CODE FK
        varchar(500) TRANSACTION_ID
        timestamp PAYMENT_DATE
        varchar(500) GATEWAY_RESPONSE
    }
    
    REST_PAYOUT {
        varchar(100) ID PK
        varchar(100) REST_ID FK
        decimal(10-2) GROSS_SALES
        decimal(10-2) COMMISSION_AMOUNT
        decimal(10-2) ADJUSTMENT_AMOUNT
        decimal(10-2) NET_PAYOUT
        varchar(3) CURRENCY_CODE
        date PERIOD_START
        date PERIOD_END
        varchar(100) PAYOUT_STATUS_CODE FK
        timestamp PAYOUT_DATE
    }
    
    REVIEW {
        varchar(100) ID PK
        varchar(100) ORDER_ID FK
        varchar(100) CUST_ID FK
        varchar(100) REST_ID FK
        int RATING
        varchar(3000) COMMENT
        timestamp REVIEW_DATE
        varchar(100) REVIEW_STATUS_CODE FK
    }
    
    PROMOTION {
        varchar(100) ID PK
        varchar(500) CODE UK
        varchar(500) NAME
        varchar(3000) DESCRIPTION
        varchar(100) PROMO_TYPE_CODE FK
        decimal(10-2) DISCOUNT_AMOUNT
        decimal(5-2) DISCOUNT_PERCENTAGE
        decimal(10-2) MIN_ORDER_AMOUNT
        decimal(10-2) MAX_DISCOUNT_AMOUNT
        timestamp VALID_FROM
        timestamp VALID_TO
        int USAGE_LIMIT
        int USAGE_COUNT
        boolean IS_ACTIVE
    }
    
    REST ||--o{ MENU : "has"
    MENU ||--o{ MENU_CATEGORY : "contains"
    MENU_CATEGORY ||--o{ MENU_ITEM : "contains"
    MENU_ITEM ||--o{ MENU_ITEM_MODIFIER_GROUP : "has"
    MENU_ITEM_MODIFIER_GROUP ||--o{ MENU_ITEM_MODIFIER : "contains"
    
    CUST ||--o{ CUST_ORDER : "places"
    REST ||--o{ CUST_ORDER : "receives"
    CUST_ORDER ||--o{ ORDER_ITEM : "contains"
    ORDER_ITEM }o--|| MENU_ITEM : "for"
    ORDER_ITEM ||--o{ ORDER_ITEM_MODIFIER : "has"
    ORDER_ITEM_MODIFIER }o--|| MENU_ITEM_MODIFIER : "uses"
    
    CUST_ORDER ||--o{ PAYMENT : "has"
    REST ||--o{ REST_PAYOUT : "receives"
    CUST_ORDER ||--o| REVIEW : "has"
    CUST ||--o{ REVIEW : "writes"
    REST ||--o{ REVIEW : "receives"
```

## Design Patterns and Best Practices

### Naming Conventions
- Table names: UPPERCASE with underscores
- Primary keys: Typically ID or CODE depending on the entity
- Foreign keys: Reference column name with _ID or _CODE suffix
- Timestamps: Use TIMESTAMP type for audit trails
- Booleans: Prefix with IS_ for clarity

### Data Integrity
- Primary keys on all tables
- Foreign key constraints for referential integrity
- Unique constraints where applicable (EMAIL, NAME, etc.)
- Check constraints for valid ranges (ratings, percentages)
- NOT NULL constraints for required fields

### Internationalization (i18n)
- Separate *_VAL tables for translations
- Composite keys including LANG_CODE
- Consistent pattern across all translatable entities

### Audit Trail
- CREATE_DATE and CREATE_USER fields on main entities
- Comprehensive AUDIT_LOG table for all operations
- Indexed fields for efficient querying

### Flexibility
- PROP_SET system for dynamic configuration
- REF_DATA for extensible lookup values
- JSON/CLOB fields for flexible data storage

### Performance Considerations
- Indexes on foreign keys
- Indexes on frequently queried fields
- Composite indexes for common query patterns
- Proper data types to minimize storage

## Database Technology

### Current Implementation
- **Liquibase** for schema version control
- **MariaDB** for production
- **H2** for development/testing
- **Spring Data JPA** for data access

### Recommended Indexes (Additional)

```sql
-- Customer searches
CREATE INDEX CUST_EMAIL_IDX ON CUST(EMAIL);
CREATE INDEX CUST_PHONE_IDX ON CUST(PHONE);

-- Restaurant searches
CREATE INDEX REST_CITY_IDX ON REST(CITY);
CREATE INDEX REST_NAME_IDX ON REST(NAME);
CREATE INDEX REST_LOCATION_IDX ON REST(LATITUDE, LONGITUDE);

-- Order queries
CREATE INDEX ORDER_DATE_IDX ON CUST_ORDER(ORDER_DATE);
CREATE INDEX ORDER_STATUS_IDX ON CUST_ORDER(ORDER_STATUS_CODE);
CREATE INDEX ORDER_CUST_IDX ON CUST_ORDER(CUST_ID, ORDER_DATE);
CREATE INDEX ORDER_REST_IDX ON CUST_ORDER(REST_ID, ORDER_DATE);

-- Review queries
CREATE INDEX REVIEW_REST_IDX ON REVIEW(REST_ID, REVIEW_DATE);
CREATE INDEX REVIEW_RATING_IDX ON REVIEW(RATING);
```

## Data Model Evolution Strategy

### Version 1 (Current - MVP)
- Basic user and restaurant management
- Property set system for flexibility
- Audit logging
- Reference data framework

### Version 2 (Planned)
- Menu management
- Order processing
- Payment integration
- Reviews and ratings

### Version 3 (Future)
- Loyalty programs
- Advanced promotions
- Delivery tracking
- Restaurant analytics

## Conclusion

The ERD is designed to:
- Support multi-tenancy for restaurants
- Enable internationalization
- Provide flexibility through property sets
- Maintain data integrity through constraints
- Support audit and compliance requirements
- Scale as the platform grows

The schema follows industry best practices and is ready to support the full requirements documented in the requirements folder.
