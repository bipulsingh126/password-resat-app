# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Client Folder Documentation

### Overview
The `Client` folder contains the front-end part of the application. It includes all the necessary files for building and running the client-side interface using React and Vite.

### Key Components

- **`index.html`**: The main HTML file that serves as the entry point for the client-side application.

- **`src` Directory**: Contains the source code for the React components, styles, and other assets.

- **`public` Directory**: Holds static files such as images and fonts that are directly served by the server.

- **Configuration Files**: Includes configuration files like `eslint.config.js`, `tailwind.config.js`, and `vite.config.js` for setting up the development environment.

- **Package Files**: `package.json` and `package-lock.json` manage the project's dependencies and scripts.

### Pages and Components

- **`src/pages` Directory**: Contains the main pages of the application such as `Home`, `Login`, `ResetPassword`, and `VerifyEmail`. Each page is a React component responsible for rendering specific views.

- **`src/components` Directory**: Houses reusable React components that are shared across different pages, promoting modularity and code reuse.

#### ResetPassword.jsx
- **Description**: The `ResetPassword` component handles the password reset process, guiding users through steps to reset their password via email verification.
- **Features**: 
  - Multi-step form for email input, OTP verification, and new password entry.
  - Timer for OTP expiration.
  - Uses `axios` for API requests and `react-toastify` for notifications.
  - Navigation to login page upon successful password reset.

#### VerfiyEmail.jsx
- **Description**: The `VerfiyEmail` component allows users to verify their email address by entering a code sent to their email.
- **Features**: 
  - Input fields for entering a 6-digit verification code.
  - Timer for code expiration and option to resend the code.
  - Uses `axios` for API requests and `react-toastify` for notifications.
  - Redirects to home page upon successful verification.

#### EmailVerify.jsx
- **Description**: The `EmailVerify` component provides a simple message prompting users to check their email for verification.
- **Features**: 
  - Displays a static message indicating that an email verification is required.
  - Can be used as a placeholder or informational component.

### Core Files

- **`AppContext.jsx`**: Provides a context for managing global state across the application.
  - **Features**:
    - Manages user authentication state and user data.
    - Provides functions to fetch user data and authentication status.
    - Uses `axios` for API requests with credentials.
    - Displays notifications for success or error using `react-toastify`.

- **`App.jsx`**: The root component of the application responsible for setting up routes and rendering the main layout. It includes the `ToastContainer` for displaying notifications and defines routes for `Home`, `Login`, `ResetPassword`, and `VerifyEmail`.

- **`main.jsx`**: The entry point for the React application, where the root component is rendered into the DOM. It wraps the `App` component with `BrowserRouter` for routing and `AppContextProvider` for state management.

- **`index.css`**: Contains global styles for the application, defining the look and feel across all components.

### Environment Configuration

- **`.env`**: Contains environment variables for the application. For example, `VITE_BACKEND_URL` is used to specify the backend server URL, which is essential for API requests.

### Tailwind Configuration

- **`tailwind.config.js`**: Configures Tailwind CSS for the project. It extends the default theme with custom animations and keyframes, and specifies the content files for purging unused styles.

### Dependency Management

- **`package.json`**: Lists the project's dependencies, scripts, and metadata, serving as a manifest for the application.

- **`package-lock.json`**: Locks the versions of dependencies to ensure consistent installs across different environments.

### Assets and Public Resources

- **`assets.js`**: Manages the import and export of static assets like images and icons used throughout the application.

- **`public` Directory**: Contains static files that are directly accessible via the server, such as HTML files, images, and fonts.

### Development
To start the client-side development server, navigate to the `Client` directory and run the appropriate npm commands as specified in the `package.json`.
