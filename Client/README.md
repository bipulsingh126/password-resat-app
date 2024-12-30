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

### Core Files

- **`App.jsx`**: The root component of the application responsible for setting up routes and rendering the main layout.

- **`main.jsx`**: The entry point for the React application, where the root component is rendered into the DOM.

- **`index.css`**: Contains global styles for the application, defining the look and feel across all components.

### Dependency Management

- **`package.json`**: Lists the project's dependencies, scripts, and metadata, serving as a manifest for the application.

- **`package-lock.json`**: Locks the versions of dependencies to ensure consistent installs across different environments.

### Assets and Public Resources

- **`assets.js`**: Manages the import and export of static assets like images and icons used throughout the application.

- **`public` Directory**: Contains static files that are directly accessible via the server, such as HTML files, images, and fonts.

### Development
To start the client-side development server, navigate to the `Client` directory and run the appropriate npm commands as specified in the `package.json`.
