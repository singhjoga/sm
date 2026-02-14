# Restaurant Operator Requirements

## Use Case Summary

| Use Case ID | Use Case Name | Priority | Release Version | Status |
|-------------|---------------|----------|----------------|---------|
| UC-RO-001 | Register Restaurant Account | High | v1.0 | Planned |
| UC-RO-002 | Manage Restaurant Profile | High | v1.0 | Planned |
| UC-RO-003 | Configure Operating Hours | High | v1.0 | Planned |
| UC-RO-004 | Create and Update Menu Items | High | v1.0 | Planned |
| UC-RO-005 | Manage Menu Categories | High | v1.0 | Planned |
| UC-RO-006 | Configure Item Modifiers and Options | Medium | v1.0 | Planned |
| UC-RO-007 | Manage Item Availability | High | v1.0 | Planned |
| UC-RO-008 | Receive New Orders | High | v1.0 | Planned |
| UC-RO-009 | Process Orders | High | v1.0 | Planned |
| UC-RO-010 | Handle Order Cancellations | High | v1.0 | Planned |
| UC-RO-011 | Manage Delivery Operations | High | v1.0 | Planned |
| UC-RO-012 | View Sales Reports | Medium | v1.0 | Planned |
| UC-RO-013 | Review Payment Settlements | High | v1.0 | Planned |
| UC-RO-014 | Configure Payment Methods | High | v1.0 | Planned |
| UC-RO-015 | Create Restaurant Promotions | Medium | v1.1 | Planned |
| UC-RO-016 | Respond to Customer Reviews | Medium | v1.1 | Planned |
| UC-RO-017 | Manage Loyalty Programs | Low | v1.2 | Planned |
| UC-RO-018 | Configure Delivery Settings | High | v1.0 | Planned |

---

## 1. Account and Profile Management

### UC-RO-001: Register Restaurant Account
**Actor**: Restaurant Operator  
**Description**: Create a new restaurant account on the platform.  
**Preconditions**: Restaurant is not already registered  
**Main Flow**:
1. Operator accesses registration page
2. Operator provides restaurant details (name, address, contact, documents)
3. Operator submits registration
4. System validates information
5. System submits application for platform operator approval
6. Operator receives confirmation email

### UC-RO-002: Manage Restaurant Profile
**Actor**: Restaurant Operator  
**Description**: Update restaurant information, photos, and business details.  
**Preconditions**: Restaurant account is active  
**Main Flow**:
1. Operator accesses profile settings
2. Operator updates information (description, photos, contact, hours)
3. System validates changes
4. System saves and publishes updates
5. Changes are reflected on consumer-facing pages

### UC-RO-003: Configure Operating Hours
**Actor**: Restaurant Operator  
**Description**: Set restaurant opening hours and special schedules.  
**Preconditions**: Restaurant account is active  
**Main Flow**:
1. Operator accesses operating hours settings
2. Operator sets regular business hours
3. Operator adds special hours (holidays, closures)
4. System saves schedule
5. System uses schedule to control order acceptance

---

## 2. Menu Management

### UC-RO-004: Create and Update Menu Items
**Actor**: Restaurant Operator  
**Description**: Add, modify, or remove items from the restaurant menu.  
**Preconditions**: Restaurant account is active  
**Main Flow**:
1. Operator accesses menu management interface
2. Operator creates new item or selects existing item
3. Operator enters/updates item details (name, description, price, image)
4. Operator sets dietary information and allergens
5. System validates and saves item
6. System publishes updated menu to consumers

### UC-RO-005: Manage Menu Categories
**Actor**: Restaurant Operator  
**Description**: Organize menu items into categories.  
**Preconditions**: Restaurant account is active  
**Main Flow**:
1. Operator creates menu categories (appetizers, mains, desserts, etc.)
2. Operator assigns items to categories
3. Operator sets category order/priority
4. System saves category structure
5. System displays organized menu to consumers

### UC-RO-006: Configure Item Modifiers and Options
**Actor**: Restaurant Operator  
**Description**: Set up customization options for menu items.  
**Preconditions**: Menu items exist  
**Main Flow**:
1. Operator selects menu item
2. Operator creates modifier groups (size, toppings, sides)
3. Operator defines options within each group (small/medium/large)
4. Operator sets pricing for options
5. System saves modifiers
6. Consumers can customize items when ordering

### UC-RO-007: Manage Item Availability
**Actor**: Restaurant Operator  
**Description**: Control which items are available for ordering.  
**Preconditions**: Menu items exist  
**Main Flow**:
1. Operator views menu inventory
2. Operator marks items as available or unavailable
3. System updates item status immediately
4. System hides unavailable items from consumer menu or marks as sold out

---

## 3. Order Management

### UC-RO-008: Receive New Orders
**Actor**: Restaurant Operator  
**Description**: Get notified of new customer orders.  
**Preconditions**: Restaurant is open and accepting orders  
**Main Flow**:
1. Consumer places order
2. System notifies restaurant (sound, notification, display)
3. Operator views order details (items, special instructions, delivery info)
4. Operator accepts or rejects order
5. System notifies consumer of acceptance

### UC-RO-009: Process Orders
**Actor**: Restaurant Operator  
**Description**: Prepare orders and update order status.  
**Preconditions**: Order has been accepted  
**Main Flow**:
1. Operator views active orders
2. Operator starts preparing order
3. Operator updates order status (preparing, ready)
4. System notifies consumer of status changes
5. If delivery, system notifies delivery partner

### UC-RO-010: Handle Order Cancellations
**Actor**: Restaurant Operator  
**Description**: Cancel orders when necessary.  
**Preconditions**: Active order exists  
**Main Flow**:
1. Operator selects order to cancel
2. Operator provides cancellation reason
3. System processes cancellation
4. System issues refund to consumer
5. System notifies consumer of cancellation

### UC-RO-011: Manage Delivery Operations
**Actor**: Restaurant Operator  
**Description**: Coordinate with delivery partners for order fulfillment.  
**Preconditions**: Order is ready for delivery  
**Main Flow**:
1. Operator marks order as ready
2. System assigns delivery partner
3. Operator hands order to delivery person
4. Operator confirms handoff in system
5. System tracks delivery progress

---

## 4. Delivery Configuration

### UC-RO-018: Configure Delivery Settings
**Actor**: Restaurant Operator  
**Description**: Define delivery times, delivery areas, and delivery charge options for the restaurant.  
**Preconditions**: Restaurant account is active  
**Main Flow**:
1. Operator accesses delivery settings
2. Operator configures delivery times:
   - Standard delivery time (e.g., 30-45 minutes)
   - Express delivery options (if available)
   - Delivery time by distance ranges
3. Operator defines delivery areas:
   - Postal codes or ZIP codes served
   - Radius from restaurant location
   - Specific neighborhoods or zones
   - Delivery area maps/boundaries
4. Operator sets delivery charge options:
   - Fixed delivery fee
   - Distance-based delivery charges
   - Minimum order value for delivery
   - Free delivery threshold
   - Delivery fee by zone/area
5. System validates delivery configuration
6. System saves delivery settings
7. System applies delivery rules during checkout for consumers
8. System displays delivery information on restaurant profile

**Alternative Flows**:
- **A1**: Operator can set different delivery charges for different zones
- **A2**: Operator can configure time-based delivery fees (e.g., higher fees during peak hours)
- **A3**: Operator can temporarily disable delivery to specific areas

**Business Rules**:
- Delivery areas must not conflict with platform's service regions
- Minimum order value cannot be higher than platform maximum limit
- Delivery fees must comply with local regulations
- Changes to delivery settings take effect immediately for new orders

---

## 5. Financial Operations

### UC-RO-012: View Sales Reports
**Actor**: Restaurant Operator  
**Description**: Access sales data and performance metrics.  
**Preconditions**: Restaurant account is active  
**Main Flow**:
1. Operator accesses reports section
2. Operator selects report type and date range
3. System generates report (daily sales, popular items, revenue trends)
4. Operator views and analyzes data
5. Operator exports report if needed

### UC-RO-013: Review Payment Settlements
**Actor**: Restaurant Operator  
**Description**: Track incoming payments from the platform.  
**Preconditions**: Restaurant has completed orders  
**Main Flow**:
1. Operator accesses financial dashboard
2. Operator views settlement schedule and amounts
3. Operator reviews transaction details
4. Operator verifies payment receipts
5. Operator downloads settlement statements

### UC-RO-014: Configure Payment Methods
**Actor**: Restaurant Operator  
**Description**: Set up bank account for receiving payments.  
**Preconditions**: Restaurant account is active  
**Main Flow**:
1. Operator accesses payment settings
2. Operator enters bank account information
3. System validates banking details
4. System saves payment method
5. Future settlements are sent to configured account

---

## 6. Marketing and Customer Engagement

### UC-RO-015: Create Restaurant Promotions
**Actor**: Restaurant Operator  
**Description**: Launch special offers and discounts.  
**Preconditions**: Restaurant account is active  
**Main Flow**:
1. Operator creates new promotion
2. Operator defines discount type and value
3. Operator sets validity period and conditions
4. System activates promotion
5. Promotion is displayed to consumers
6. System applies discount during checkout

### UC-RO-016: Respond to Customer Reviews
**Actor**: Restaurant Operator  
**Description**: Engage with customer feedback and ratings.  
**Preconditions**: Customer has left a review  
**Main Flow**:
1. Operator views customer reviews
2. Operator reads review and rating
3. Operator writes response to review
4. System publishes response
5. Response is visible to consumers

### UC-RO-017: Manage Loyalty Programs
**Actor**: Restaurant Operator  
**Description**: Set up customer loyalty and rewards programs.  
**Preconditions**: Restaurant account is active  
**Main Flow**:
1. Operator creates loyalty program
2. Operator defines reward rules (points per order, redemption options)
3. System activates program
4. System tracks customer participation
5. System applies rewards during checkout
