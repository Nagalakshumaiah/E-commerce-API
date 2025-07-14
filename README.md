
# React Shop - Modern E-commerce Platform

React Shop is a feature-rich e-commerce front-end application built with modern web technologies. It demonstrates a complete user flow from browsing products to placing an order, along with a separate administrative interface for managing the product catalog. The application is designed to be self-contained, running entirely in the browser with a mock API that simulates backend services.

## ✨ Features

- **Dynamic Product Listings:** Browse a paginated list of products.
- **Search & Filtering:** Instantly search for products by name or category.
- **Role-Based Access Control:**
    - **Customer View:** Browse products, add items to the cart, and check out.
    - **Admin View:** Full CRUD (Create, Read, Update, Delete) capabilities for products.
- **Authentication:** Secure login system using a simulated JWT stored in `localStorage`.
- **Shopping Cart:** A fully functional cart to add, update quantities, or remove items.
- **Responsive UI:** A clean, responsive, and intuitive interface built with **Tailwind CSS**.
- **Modal-Driven Interface:** Seamless user experience with modals for login, cart management, and product forms.
- **Centralized State Management:** Uses React Context API to manage global application state like user session, products, and cart.
- **Localized Currency:** Prices are displayed in Indian Rupees (₹) with appropriate formatting.

## 🚀 Tech Stack

- **React 19:** For building the user interface with modern features like Hooks and Context.
- **TypeScript:** For static typing, ensuring code quality and maintainability.
- **Tailwind CSS:** A utility-first CSS framework for rapid and responsive UI development.
- **No Build Step:** The project runs directly in the browser using ES modules via `esm.sh` and an `importmap` in `index.html`, eliminating the need for complex build configurations like Webpack or Vite.

## 📁 Project Structure

The project is organized into logical directories to maintain a clean and scalable codebase.

```
/
├── components/         # Reusable React components
│   ├── AdminView.tsx
│   ├── CartView.tsx
│   ├── Header.tsx
│   ├── icons.tsx
│   ├── LoginView.tsx
│   ├── Modal.tsx
│   ├── ProductCard.tsx
│   └── ProductForm.tsx
├── context/            # React Context for global state management
│   └── AppContext.tsx
├── services/           # Mock API for data fetching and manipulation
│   └── api.ts
├── App.tsx             # Main application component, handles routing and layout
├── constants.ts        # Initial mock data (products, users)
├── index.html          # The single HTML entry point
├── index.tsx           # Root of the React application
├── types.ts            # Shared TypeScript types and interfaces
└── README.md           # You are here!
```

## ▶️ How to Run the Application

Since this project has no build dependencies, you can run it by serving the files with any simple static web server.

1.  **Clone the repository or download the files.**
2.  **Navigate to the project directory** in your terminal.
3.  **Start a local server.** Here are a few common ways:

    **Using Python:**
    ```bash
    # For Python 3
    python -m http.server
    ```

    **Using Node.js (with `serve` package):**
    ```bash
    # Install serve globally if you haven't already
    npm install -g serve

    # Run the server
    serve
    ```

4.  **Open your browser** and navigate to the local address provided by the server (e.g., `http://localhost:8000` or `http://localhost:3000`).

## 🔑 User Roles & Credentials

The application supports two user roles. You can log in with the following credentials to test the different views:

-   **Admin User:**
    -   **Username:** `admin`
    -   **Permissions:** Can view all products, add new products, edit existing ones, and delete them. Has access to the "Admin" view.

-   **Customer User:**
    -   **Username:** `customer`
    -   **Permissions:** Can view products, add them to the cart, and check out. Does not see admin controls.

## 🛠️ API Simulation (`services/api.ts`)

The backend is simulated in the `services/api.ts` file.
-   **Data Source:** The API is initialized with mock data from `constants.ts`.
-   **Data Persistence:**
    -   Product data (add, update, delete) is stored **in-memory** and will reset on page refresh.
    -   User authentication status is persisted in **`localStorage`**. The user object is Base64 encoded to simulate a JWT, allowing the session to survive page reloads.
-   **Asynchronous Behavior:** All API functions are `async` and return `Promise`s to mimic real-world network latency.

This setup allows for a complete and interactive front-end development experience without requiring a live backend.
