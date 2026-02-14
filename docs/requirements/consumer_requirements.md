# Consumer Requirements

## Use Case Summary

| Use Case ID | Use Case Name | Priority | Release Version | Status |
|-------------|---------------|----------|----------------|---------|
| UC-C-001 | Register Account | High | v1.0 | Planned |
| UC-C-002 | Login to Account | High | v1.0 | Planned |
| UC-C-003 | Manage Profile | High | v1.0 | Planned |
| UC-C-004 | Manage Delivery Addresses | High | v1.0 | Planned |
| UC-C-005 | Manage Payment Methods | High | v1.0 | Planned |
| UC-C-006 | Browse Restaurants | High | v1.0 | Planned |
| UC-C-007 | Search for Restaurants | High | v1.0 | Planned |
| UC-C-008 | View Restaurant Details | High | v1.0 | Planned |
| UC-C-009 | View Restaurant Reviews | Medium | v1.0 | Planned |
| UC-C-010 | Browse Menu | High | v1.0 | Planned |
| UC-C-011 | Add Items to Cart | High | v1.0 | Planned |
| UC-C-012 | Manage Cart | High | v1.0 | Planned |
| UC-C-013 | Apply Promo Codes | Medium | v1.0 | Planned |
| UC-C-014 | Place Order | High | v1.0 | Planned |
| UC-C-015 | Track Order Status | High | v1.0 | Planned |
| UC-C-016 | Track Delivery Location | Medium | v1.0 | Planned |
| UC-C-017 | Contact Restaurant | Medium | v1.0 | Planned |
| UC-C-018 | Contact Delivery Driver | Medium | v1.0 | Planned |
| UC-C-019 | Cancel Order | High | v1.0 | Planned |
| UC-C-020 | Receive Order | High | v1.0 | Planned |
| UC-C-021 | Rate and Review Order | Medium | v1.1 | Planned |
| UC-C-022 | Request Refund | High | v1.0 | Planned |
| UC-C-023 | Reorder Previous Orders | Medium | v1.1 | Planned |
| UC-C-024 | View Order History | High | v1.0 | Planned |
| UC-C-025 | Earn Loyalty Points | Low | v1.2 | Planned |
| UC-C-026 | Redeem Rewards | Low | v1.2 | Planned |
| UC-C-027 | Manage Favorite Restaurants | Medium | v1.1 | Planned |
| UC-C-028 | Contact Support | High | v1.0 | Planned |
| UC-C-029 | Access Help Center | Medium | v1.0 | Planned |

---

## 1. Account Management

### UC-C-001: Register Account
**Actor**: Consumer  
**Description**: Create a new consumer account on the platform.  
**Preconditions**: User does not have an existing account  
**Main Flow**:
1. User accesses registration page
2. User provides personal information (name, email, phone, password)
3. User accepts terms and conditions
4. System validates information
5. System creates account
6. System sends verification email
7. User verifies email address

### UC-C-002: Login to Account
**Actor**: Consumer  
**Description**: Authenticate and access personal account.  
**Preconditions**: User has registered account  
**Main Flow**:
1. User enters credentials (email/password)
2. System validates credentials
3. System authenticates user
4. System displays user dashboard

### UC-C-003: Manage Profile
**Actor**: Consumer  
**Description**: Update personal information and preferences.  
**Preconditions**: User is logged in  
**Main Flow**:
1. User accesses profile settings
2. User updates information (name, phone, email, preferences)
3. System validates changes
4. System saves updated profile
5. User receives confirmation

### UC-C-004: Manage Delivery Addresses
**Actor**: Consumer  
**Description**: Add, edit, or delete saved delivery addresses.  
**Preconditions**: User is logged in  
**Main Flow**:
1. User accesses address management
2. User adds new address or edits existing address
3. User provides address details (street, city, postal code)
4. System validates address
5. System saves address
6. User can set default delivery address

### UC-C-005: Manage Payment Methods
**Actor**: Consumer  
**Description**: Add, update, or remove payment methods.  
**Preconditions**: User is logged in  
**Main Flow**:
1. User accesses payment settings
2. User adds new payment method (card, PayPal, etc.)
3. User enters payment details
4. System validates and securely stores payment information
5. User can set default payment method

---

## 2. Restaurant Discovery and Search

### UC-C-006: Browse Restaurants
**Actor**: Consumer  
**Description**: Explore available restaurants in the area.  
**Preconditions**: User has provided location  
**Main Flow**:
1. User enters or confirms delivery address
2. System displays restaurants available for that location
3. User views restaurant list with ratings, cuisine types, delivery times
4. User filters restaurants by cuisine, rating, delivery fee, etc.
5. User sorts results by distance, rating, or delivery time

### UC-C-007: Search for Restaurants
**Actor**: Consumer  
**Description**: Find specific restaurants or cuisines using search.  
**Preconditions**: User has provided location  
**Main Flow**:
1. User enters search query (restaurant name, cuisine type, dish)
2. System searches restaurants and menu items
3. System displays matching results
4. User refines search with filters
5. User selects restaurant from results

### UC-C-008: View Restaurant Details
**Actor**: Consumer  
**Description**: Access detailed information about a restaurant.  
**Preconditions**: User has selected a restaurant  
**Main Flow**:
1. User clicks on restaurant
2. System displays restaurant profile (description, hours, location)
3. User views restaurant ratings and reviews
4. User sees delivery time and minimum order information
5. User views full menu

### UC-C-009: View Restaurant Reviews
**Actor**: Consumer  
**Description**: Read reviews and ratings from other customers.  
**Preconditions**: User is viewing restaurant details  
**Main Flow**:
1. User accesses reviews section
2. System displays customer reviews with ratings
3. User filters reviews by rating or date
4. User reads review content and restaurant responses

---

## 3. Ordering Process

### UC-C-010: Browse Menu
**Actor**: Consumer  
**Description**: View restaurant menu and item details.  
**Preconditions**: User has selected a restaurant  
**Main Flow**:
1. System displays restaurant menu by categories
2. User browses menu items
3. User views item details (description, price, image, allergens)
4. User sees available customization options

### UC-C-011: Add Items to Cart
**Actor**: Consumer  
**Description**: Select menu items for ordering.  
**Preconditions**: User is viewing restaurant menu  
**Main Flow**:
1. User selects menu item
2. User customizes item with available options
3. User specifies quantity
4. User adds item to cart
5. System updates cart total
6. User continues shopping or proceeds to checkout

### UC-C-012: Manage Cart
**Actor**: Consumer  
**Description**: Review and modify items in shopping cart.  
**Preconditions**: User has items in cart  
**Main Flow**:
1. User accesses cart
2. User reviews items and prices
3. User modifies quantities or removes items
4. User adds special instructions if needed
5. System recalculates total
6. User proceeds to checkout when ready

### UC-C-013: Apply Promo Codes
**Actor**: Consumer  
**Description**: Use discount codes or vouchers.  
**Preconditions**: User has items in cart  
**Main Flow**:
1. User enters promo code at checkout
2. System validates promo code
3. System applies discount to order
4. System displays updated total with savings
5. User sees discount breakdown in order summary

### UC-C-014: Place Order
**Actor**: Consumer  
**Description**: Complete order and submit for processing.  
**Preconditions**: User has items in cart and meets minimum order value  
**Main Flow**:
1. User proceeds to checkout
2. User selects or confirms delivery address
3. User selects delivery time (ASAP or scheduled)
4. User selects payment method
5. User reviews order summary
6. User confirms and places order
7. System processes payment
8. System sends order to restaurant
9. System displays order confirmation

---

## 4. Order Tracking and Management

### UC-C-015: Track Order Status
**Actor**: Consumer  
**Description**: Monitor order preparation and delivery progress.  
**Preconditions**: User has placed an order  
**Main Flow**:
1. User accesses active order
2. System displays order status (accepted, preparing, ready, in delivery)
3. User views estimated delivery time
4. System updates status in real-time
5. User receives notifications on status changes

### UC-C-016: Track Delivery Location
**Actor**: Consumer  
**Description**: View real-time location of delivery.  
**Preconditions**: Order is out for delivery  
**Main Flow**:
1. User accesses order tracking
2. System displays delivery person location on map
3. User views estimated arrival time
4. System updates location in real-time
5. User receives notification when delivery is near

### UC-C-017: Contact Restaurant
**Actor**: Consumer  
**Description**: Communicate with restaurant about order.  
**Preconditions**: User has an active order  
**Main Flow**:
1. User accesses order details
2. User selects contact restaurant option
3. User sends message or calls restaurant
4. Restaurant receives and responds to communication
5. Issue is resolved

### UC-C-018: Contact Delivery Driver
**Actor**: Consumer  
**Description**: Communicate with delivery person.  
**Preconditions**: Order is out for delivery  
**Main Flow**:
1. User accesses order tracking
2. User selects contact driver option
3. User sends message or calls driver
4. Driver receives communication
5. User provides delivery instructions or updates

### UC-C-019: Cancel Order
**Actor**: Consumer  
**Description**: Cancel order before completion.  
**Preconditions**: Order has not been prepared or is within cancellation window  
**Main Flow**:
1. User accesses active order
2. User selects cancel order option
3. User confirms cancellation
4. System validates cancellation eligibility
5. System processes cancellation
6. System issues refund if applicable
7. User receives cancellation confirmation

---

## 5. Post-Order Activities

### UC-C-020: Receive Order
**Actor**: Consumer  
**Description**: Confirm receipt of delivered order.  
**Preconditions**: Order has been delivered  
**Main Flow**:
1. Delivery person arrives with order
2. User receives order
3. User confirms delivery in app
4. System marks order as completed
5. System processes payment settlement

### UC-C-021: Rate and Review Order
**Actor**: Consumer  
**Description**: Provide feedback on order experience.  
**Preconditions**: Order has been completed  
**Main Flow**:
1. System prompts user for review
2. User rates restaurant (1-5 stars)
3. User rates delivery experience
4. User writes review comments
5. User submits review
6. System publishes review on restaurant profile

### UC-C-022: Request Refund
**Actor**: Consumer  
**Description**: Report issues and request refund for order.  
**Preconditions**: Order has been completed  
**Main Flow**:
1. User accesses order history
2. User selects order with issue
3. User selects issue type (wrong item, missing item, quality issue)
4. User provides description and evidence (photos)
5. User submits refund request
6. System notifies platform operator
7. Operator reviews and processes request
8. User receives refund decision

### UC-C-023: Reorder Previous Orders
**Actor**: Consumer  
**Description**: Quickly reorder from past orders.  
**Preconditions**: User has order history  
**Main Flow**:
1. User accesses order history
2. User selects previous order
3. User clicks reorder
4. System adds items to cart
5. User reviews and modifies if needed
6. User proceeds to checkout

### UC-C-024: View Order History
**Actor**: Consumer  
**Description**: Access past order records.  
**Preconditions**: User is logged in  
**Main Flow**:
1. User accesses order history
2. System displays list of past orders
3. User filters orders by date or restaurant
4. User selects order to view details
5. System displays full order information

---

## 6. Loyalty and Rewards

### UC-C-025: Earn Loyalty Points
**Actor**: Consumer  
**Description**: Accumulate rewards points from orders.  
**Preconditions**: Loyalty program is active  
**Main Flow**:
1. User completes order
2. System calculates loyalty points earned
3. System adds points to user account
4. User receives notification of points earned
5. User can view point balance in profile

### UC-C-026: Redeem Rewards
**Actor**: Consumer  
**Description**: Use accumulated points for discounts.  
**Preconditions**: User has sufficient loyalty points  
**Main Flow**:
1. User views available rewards
2. User selects reward to redeem
3. System deducts points from account
4. System applies discount to order
5. User completes order with discount

### UC-C-027: Manage Favorite Restaurants
**Actor**: Consumer  
**Description**: Save preferred restaurants for quick access.  
**Preconditions**: User is logged in  
**Main Flow**:
1. User views restaurant profile
2. User marks restaurant as favorite
3. System saves to favorites list
4. User can access favorites from profile
5. User receives notifications about favorite restaurants' offers

---

## 7. Customer Support

### UC-C-028: Contact Support
**Actor**: Consumer  
**Description**: Get help with platform or order issues.  
**Preconditions**: User needs assistance  
**Main Flow**:
1. User accesses help/support section
2. User selects issue category
3. User provides issue details
4. User submits support request
5. System creates ticket
6. Support team responds to request
7. Issue is resolved and ticket closed

### UC-C-029: Access Help Center
**Actor**: Consumer  
**Description**: Find answers to common questions.  
**Preconditions**: None  
**Main Flow**:
1. User accesses help center
2. System displays FAQ categories
3. User browses or searches for topics
4. User views articles and guides
5. User finds solution or contacts support if needed
