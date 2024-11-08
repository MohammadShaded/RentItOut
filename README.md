# RentItOut 
![download](https://github.com/user-attachments/assets/8dcec20e-65ae-4e43-adb2-763012a28109)


- [Project Overview](#Project-Overview)
- [Core Features](#Core-Features)
- [Technology Stack](#Technology-Stack)





# Project Overview

The **RentItOut** project is a peer-to-peer rental platform built with Node.js, Express, and MySQL (hosted on AWS RDS). The platform enables users to list, browse, and rent items securely, supporting sustainable consumption by allowing users to share items instead of purchasing them. The platform architecture follows a Model-Route-Controller (MRC) design, promoting modularity and maintainability.

---

### Team Members
- **Mohammad Shadid**
- **Baha Alawneh**
- **Nassar Harashi**
- **Ayman Abu Hijle**

# Core Features

1. **User Authentication**
   - **Email & Password Login**: Secure user login and registration using email and password.
   - **OAuth 2.0 with Google**: Simplifies the login process with Google sign-in using OAuth 2.0, allowing users to access the platform with their Google account securely.

2. **Item Management**
   - **CRUD Operations**: Users with the "Owner" role can create, read, update, and delete items. Each item includes details such as name, description, category, and rental price.
   - **Trending Items**: Lists popular or highly-rated items for easier discovery by other users.
   - **Favorites**: Users can add items to a favorites list, allowing quick access to frequently viewed or rented items.

3. **Rental Management**
   - **Rental Transactions**: Users can create rental transactions, specifying the rental duration, associated fees, and payment terms.
   - **Status Tracking**: Rental transactions have multiple statuses (active, completed, canceled) to allow users and admins to track the lifecycle of each rental.

4. **Location Services**
   - **Distance Calculation**: The Matrix V2 API calculates the real-time distance between a user’s location and item location, enabling users to see items nearby or within a certain radius.
   - **Location-Based Search**: Users can filter items based on geographic location to find nearby rental options, making transactions more accessible and convenient.

5. **Payment Processing**
   - **Secure Payments**: Facilitates payments for rentals, ensuring that transactions are secure and logged in the database.
   - **Refunds**: Users can request refunds if certain conditions are met, and admins can review and approve these requests.
   - **Transaction History**: Users can view a history of their payments and transactions for easy tracking.

---

## Technical Architecture

### Technology Stack

- **Backend**: Built with Node.js and Express.js, providing a scalable and efficient backend server.
- **Database**: MySQL, hosted on AWS RDS, which offers managed, secure, and scalable storage for application data.
- **Authentication**: JWT-based authentication for secure session management, along with Google OAuth 2.0 for optional Google sign-in.
- **Documentation**: Swagger and Apidog for API documentation and easy testing of endpoints.
- **Third-Party Integrations**:
   - **OAuth 2.0**: Allows users to sign in securely using their Google accounts.
   - **Matrix V2 API**: Provides real-time distance calculations for improved location-based filtering.
