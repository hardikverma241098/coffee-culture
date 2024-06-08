# Coffee Shop Management System

A comprehensive Coffee Shop Management System built with Node.js, Express.js, MongoDB, and Mongoose. This system includes user registration, login, and management functionalities with secure authentication and validation.

## Features

- User Registration and Login
- User Roles: Shop Owner, Manager, Employee
- Shop Management: Multiple locations, Opening hours, Description
- Reward Scheme: Loyalty and Subscription deals
- Secure Password Hashing
- JWT-based Authentication
- Input Validation with express-validator
- Environment Variables for sensitive data

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs
- jsonwebtoken
- express-validator
- dotenv

## Getting Started

### Prerequisites

- Node.js installed on your machine
- MongoDB installed and running
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/coffee-shop-management.git
   cd coffee-shop-management

2. Install dependencies:
    npm install

3. Create a .env file in the root of your project and add the following environment variables:
    JWT_SECRET=your_jwt_secret
    MONGO_URI=your_mongodb_uri

4. Start the server:
    node index.js
    The server will start on port 3000.

## API Endpoints

### User Registration

- **ENDPOINT**: `/api/shop/auth/register`
- **Method**: `POST`
- **Body Parameters**:
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword",
    "firstName": "John",
    "lastName": "Doe",
    "role": "owner"
  }

Response:
    201 Created on successful registration
    400 Bad Request if validation fails or email already in use

### User Login

- **ENDPOINT**: `/api/shop/auth/login`
- **Method**: `POST`
- **Body Parameters**:
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }

Response:
    200 OK with JWT token on successful login
    400 Bad Request if validation fails or invalid credentials

### Customer Registration

- **ENDPOINT**: `/api/customer/auth/register`
- **Method**: `POST`
- **Body Parameters**:
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword",
    "firstName": "John",
    "lastName": "Doe"
  }

Response:
    201 Created on successful registration
    400 Bad Request if validation fails or email already in use

### Customer Login

- **ENDPOINT**: `/api/customer/auth/login`
- **Method**: `POST`
- **Body Parameters**:
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }

Response:
    200 OK with JWT token on successful login
    400 Bad Request if validation fails or invalid credentials


## Models

### User

- `email`: String, required, unique
- `password`: String, required
- `firstName`: String, required
- `lastName`: String, required
- `role`: String, required, enum ['Shop Owner', 'Manager', 'Employee']
- `shop`: ObjectId, reference to Shop

### Shop

- `name`: String, required
- `openingHours`: String, required
- `locations`: [String], required
- `description`: String, required
- `loyaltyDeal`: ObjectId, reference to LoyaltyDeal
- `subscriptionDeals`: [ObjectId], reference to SubscriptionDeal

### LoyaltyDeal

- `reward`: String, required
- `stampsRequired`: Number, required

### SubscriptionDeal

- `variant`: String, required
- `drinkAllowance`: Number, required
- `price`: Number, required
- `coffeeTypes`: [String], required

### LoyaltyCard

- `customer`: ObjectId, reference to User
- `shop`: ObjectId, reference to Shop
- `stampsCollected`: Number, required
- `totalStampsCollected`: Number, required
- `stampHistory`: [
  {
    `date`: Date,
    `shop`: ObjectId, reference to Shop,
    `stampType`: String
  }
]

### SubscriptionCard

- `customer`: ObjectId, reference to User
- `shop`: ObjectId, reference to Shop
- `subscriptionDeal`: ObjectId, reference to SubscriptionDeal
- `drinksCompleted`: Number, required
- `isActive`: Boolean, required

## Security Measures

- Passwords are hashed using bcryptjs before storing them in the database.
- JWT tokens are used for authenticating users and are signed with a secure secret.
- Rate limiting can implemented in future versions to prevent brute-force attacks on the login endpoint.
- Helmet can used to set various HTTP headers for app security.
- CORS can configured to restrict which domains can access the API.

