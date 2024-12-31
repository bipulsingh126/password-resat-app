# Server.js Documentation

## Overview
The `server.js` file is the main entry point for the server-side application. It sets up the Express server, configures middleware, connects to the database, and defines the main route handlers.

## Key Components

- **Express Setup**: The application uses Express.js as the web framework.
  ```javascript
  import express from "express";
  const app = express();
  ```

- **Middleware**: The server uses several middlewares including JSON parser, cookie parser, and CORS.
  ```javascript
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors({ credentials: true, origin: allowedOrigins }));
  ```

- **Database Connection**: The server connects to the database using the `connectDB` function.
  ```javascript
  connectDB();
  ```

- **Routes**: The server defines routes for authentication and user management.
  ```javascript
  app.use("/api/auth", authRouter);
  app.use("/api/user", userRouter);
  ```

- **Server Listening**: The server listens on a specified port and logs a message when it is running.
  ```javascript
  app.listen(port, () => console.log(`Server is running on port ${port}`));
  ```

- **Root Route**: A simple root route is defined to check if the server is running.
  ```javascript
  app.get("/", (req, res) => {
    res.send("Server is running fine ");
  });
  ```

## Environment Variables
- **PORT**: The server port is configurable via environment variables, defaulting to 4000 if not specified.
- **Allowed Origins**: The server allows CORS requests from specified origins, such as `http://localhost:5173`.

## Dependencies
- **express**: Web framework for Node.js
- **cors**: Middleware for enabling CORS
- **cookie-parser**: Middleware for parsing cookies
- **dotenv**: Loads environment variables from a `.env` file

## Server Files

### Auth Route
The `authRoute.js` file sets up the authentication routes for the application using Express Router.

#### Key Routes
- **Register**: `POST /register` - Handles user registration.
- **Login**: `POST /login` - Handles user login.
- **Logout**: `POST /logout` - Handles user logout.
- **Send Verify OTP**: `POST /send-verify-otp` - Sends a verification OTP to the user.
- **Verify Email**: `POST /verify-email` - Verifies the user's email using the OTP.
- **Check Authentication**: `GET /is-auth` - Checks if the user is authenticated.
- **Send Reset OTP**: `POST /send-reset-otp` - Sends an OTP for password reset.
- **Reset Password**: `POST /reset-password` - Resets the user's password using the OTP.

### User Authentication Middleware
The `userAuth.js` file contains middleware for authenticating users using JWT tokens.

#### Key Functionality
- Checks for the presence of a JWT token in cookies.
- Verifies the token and attaches the user ID to the request body.

### Auth Controller
The `authController.js` file contains functions for handling authentication logic.

#### Key Functions
- **register**: Registers a new user, hashes the password, and sends a welcome email.
- **login**: Authenticates a user and issues a JWT token.
- **logout**: Logs out a user by clearing the token.
- **sendVerifyOtp**: Sends an OTP for email verification.
- **verifyEmail**: Verifies the user's email using the OTP.

### User Model
The `userModel.js` file defines the schema for user data using Mongoose.

#### Key Fields
- **name**: User's name.
- **email**: User's email, must be unique.
- **password**: User's hashed password.
- **verifyotp**: OTP for email verification.
- **isAccountVerified**: Boolean status of account verification.

## Authentication Controller

The `authController.js` file handles user authentication, including registration, login, logout, and password reset functionalities. It utilizes JWT for user sessions and bcrypt for password hashing.

## User Controller

The `userController.js` file manages user-related operations, such as fetching user data and verifying account status.

## User Authentication Middleware

The `userAuth.js` middleware ensures that routes requiring authentication are protected. It verifies JWT tokens stored in cookies to confirm user identity.

## Nodemailer Configuration

The `nodemailer.js` file sets up the email service for sending verification and notification emails using SMTP.

## Authentication Routes

The `authRoute.js` file defines routes for user authentication, including registration, login, and email verification.

## User Routes

The `userRoute.js` file contains routes for user-specific actions, such as retrieving user data.

## Usage
To start the server, run:
```bash
node server.js
```
Ensure that all environment variables are set up correctly in the `.env` file.
