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

#### Header.jsx
- **Description**: The `Header` component displays a welcome message and user profile information. It includes a profile image, a greeting message, and a "Get Started" button.
- **Features**: 
  - Displays user name if logged in, otherwise shows "Developer".
  - Shows a verification badge if the user's account is verified.
  - Uses Tailwind CSS for styling.

#### Navbar.jsx
- **Description**: The `Navbar` component provides navigation links and user account options. It adapts to both desktop and mobile views.
- **Features**: 
  - Displays user initials and name if logged in.
  - Provides options to verify email and logout.
  - Includes a mobile menu toggle for smaller screens.
  - Uses `react-toastify` for notifications.
  - Utilizes `useContext` to access global state from `AppContext`.

#### Login.jsx
- **Description**: The `Login` component handles user authentication, allowing users to sign up or log in.
- **Features**: 
  - Provides a form for user registration and login.
  - Manages authentication state using context.
  - Displays notifications for success or error using `react-toastify`.

#### VerifyEmail.jsx
- **Description**: The `VerifyEmail` component allows users to input a verification code sent to their email.
- **Features**: 
  - Provides a form with inputs for entering a verification code.
  - Automatically focuses on the next input field upon entry.
  - Handles paste events to fill in the code quickly.
  - Includes a button to resend the verification code.
  - Uses `react-router-dom` for navigation.

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
