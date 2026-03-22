# 🛒 ShopVerse – Full-Stack E-Commerce Platform

A modern, production-ready full-stack e-commerce web application built with the **MERN** stack (MongoDB, Express.js, React, Node.js). It features secure JWT-based authentication, an admin dashboard for product and user management, a shopping cart, product search and filtering, and full Vercel deployment support.

🌐 **Live Demo:** [https://shopverse.sangammundhe.site](https://shopverse5756.onrender.com)

---

## 📚 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [API Reference](#api-reference)
- [Database Models](#database-models)
- [Authentication](#authentication)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### 🧑 User
- Register and log in with email & password
- Secure cookie-based JWT authentication
- Browse products across multiple categories
- Search products by name
- Filter products by category and price
- View detailed product pages
- Add products to cart, update quantities, and remove items
- View real-time cart item count

### 🛠️ Admin
- View and manage all registered users
- Update user roles (GENERAL / ADMIN)
- Add new products with images, price, description, and category
- Edit existing products
- View all products in an admin dashboard

### 🗂️ Product Categories
- 📱 Mobiles
- 🎧 Airpods / Earphones
- ❄️ Refrigerators
- 🔊 Speakers
- ⌚ Watches

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite 5, Redux Toolkit, React Router v6 |
| **Styling** | TailwindCSS 3, PostCSS, Autoprefixer |
| **State Management** | Redux Toolkit + React Context API |
| **HTTP Client** | Axios (with credentials) |
| **UI Utilities** | React Icons, React Toastify, Moment.js |
| **Backend** | Node.js, Express 4 (ES Modules) |
| **Database** | MongoDB with Mongoose ODM |
| **Authentication** | JWT (jsonwebtoken) + bcryptjs |
| **Middleware** | CORS, Cookie Parser, Dotenv |
| **Deployment** | Vercel (frontend & backend), Render (backend fallback) |

---

## 📁 Project Structure

```
fullstack-eccomerce/
├── backend/                        # Express API server
│   ├── config/
│   │   └── dbconfig.js             # MongoDB connection setup
│   ├── controller/
│   │   ├── user/                   # Auth & user controllers
│   │   │   ├── userSignUp.controller.js
│   │   │   ├── userLogin.controller.js
│   │   │   ├── userLogout.controller.js
│   │   │   ├── userDetails.controller.js
│   │   │   ├── allUsers.controller.js
│   │   │   └── updateUser.controller.js
│   │   └── product/                # Product & cart controllers
│   │       ├── uploadProduct.controller.js
│   │       ├── getProduct.controller.js
│   │       ├── updateProduct.controller.js
│   │       ├── productCategory.controller.js
│   │       ├── categoryWiseProduct.controller.js
│   │       ├── productDetails.controller.js
│   │       ├── searchProduct.controller.js
│   │       ├── filterProduct.controller.js
│   │       ├── addToCart.controller.js
│   │       ├── countAddToCart.controller.js
│   │       ├── viewCartProduct.controller.js
│   │       ├── UpdateCartProduct.controller.js
│   │       └── deleteCartProduct.controller.js
│   ├── middleware/
│   │   └── authToken.js            # JWT verification middleware
│   ├── helper/
│   │   └── permission.js           # Role-based access control
│   ├── model/
│   │   ├── user.model.js           # User schema
│   │   ├── product.model.js        # Product schema
│   │   └── cartProduct.js          # Cart schema
│   ├── route/
│   │   └── index.js                # All API routes
│   ├── index.js                    # App entry point
│   ├── package.json
│   └── vercel.json                 # Vercel deployment config
│
├── frontend/                       # React + Vite SPA
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   ├── pages/                  # Page-level components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── SignUp.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── AdminPanel.jsx
│   │   │   ├── AllProducts.jsx
│   │   │   ├── SearchProduct.jsx
│   │   │   ├── CategoryProduct.jsx
│   │   │   └── ProductDetails.jsx
│   │   ├── store/                  # Redux store & slices
│   │   ├── routes/                 # React Router configuration
│   │   ├── common/                 # API base URL config
│   │   ├── helpers/                # Utility functions (e.g., price formatter)
│   │   ├── context/                # Cart count context
│   │   ├── App.jsx                 # Root component
│   │   └── main.jsx                # React entry point
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── vercel.json                 # Vercel SPA rewrite rules
│
└── resoures/                       # Sample product seed data (JSON)
    ├── airdopes.js
    ├── mobile.js
    ├── refrigerator.js
    ├── speaker.js
    └── watches.js
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- A **MongoDB** database (MongoDB Atlas recommended)

---

### Environment Variables

Create a `.env` file inside the `backend/` directory:

```env
PORT=5000
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
SECRET_TOKEN_KEY=your_super_secret_jwt_key
CORS_ORIGIN=http://localhost:5173
```

| Variable | Description |
|---|---|
| `PORT` | Port the Express server listens on (default: `5000`) |
| `MONGO_URL` | Full MongoDB connection string |
| `SECRET_TOKEN_KEY` | Secret used to sign JWT tokens |
| `CORS_ORIGIN` | Allowed frontend origin for CORS |

> **Note:** The frontend API base URL is configured in `frontend/src/common/index.jsx`. Update `backendDomain` to point to your backend (e.g., `http://localhost:5000` for local development).

---

### Installation

Clone the repository and install dependencies for both frontend and backend:

```bash
# Clone the repo
git clone https://github.com/Sangam5756/fullstack-eccomerce.git
cd fullstack-eccomerce

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

---

### Running the App

**Start the backend server (development):**

```bash
cd backend
npm run dev        # Uses nodemon for hot-reload
# Server runs at http://localhost:5000
```

**Start the frontend dev server:**

```bash
cd frontend
npm run dev        # Vite dev server
# App runs at http://localhost:5173
```

**Build the frontend for production:**

```bash
cd frontend
npm run build      # Output in frontend/dist/
```

---

## 📡 API Reference

**Base URL:** `http://localhost:5000/api` (or your deployed backend URL)

> Endpoints marked 🔒 require a valid JWT token sent via cookie.

### 🔐 Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `POST` | `/signup` | – | Register a new user |
| `POST` | `/login` | – | Login and receive auth cookie |
| `GET` | `/user-details` | 🔒 | Get the logged-in user's profile |
| `GET` | `/user-Logout` | – | Logout and clear the auth cookie |

### 👥 Users (Admin only)

| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `GET` | `/all-users` | 🔒 | Fetch all registered users |
| `POST` | `/update-user` | 🔒 | Update a user's role or info |

### 📦 Products

| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `POST` | `/add-product` | 🔒 | Add a new product (Admin) |
| `GET` | `/get-product` | – | Fetch all products |
| `POST` | `/edit-product` | 🔒 | Edit an existing product (Admin) |
| `GET` | `/getProduct-category` | – | Get all unique categories |
| `POST` | `/category-products` | – | Get products by category |
| `POST` | `/product-details` | – | Get a single product by ID |
| `GET` | `/search` | – | Search products by name (`?q=query`) |
| `POST` | `/filterProduct` | – | Filter products by category / price |

### 🛒 Cart

| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `POST` | `/add-to-cart` | 🔒 | Add a product to the cart |
| `GET` | `/countAddToCartProduct` | 🔒 | Get the number of items in cart |
| `GET` | `/viewCartProduct` | 🔒 | View all cart items |
| `POST` | `/UpdateCartProduct` | 🔒 | Update item quantity in cart |
| `POST` | `/delteCartProduct` | 🔒 | Remove an item from the cart |

---

## 🗄️ Database Models

### User
```js
{
  name:       String,   // required
  email:      String,   // required, unique
  password:   String,   // bcrypt hashed
  profilePic: String,
  role:       String,   // "GENERAL" | "ADMIN"
  createdAt:  Date,
  updatedAt:  Date
}
```

### Product
```js
{
  productName:  String,
  brandName:    String,
  category:     String,
  productImage: [String],  // Array of image URLs
  description:  String,
  price:        Number,
  sellingPrice: Number,
  createdAt:    Date,
  updatedAt:    Date
}
```

### Cart
```js
{
  productId: String,   // ref: "product"
  quantity:  Number,
  userId:    String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔒 Authentication

This project uses **JWT (JSON Web Token)** authentication with HTTP-only cookies.

**Flow:**

1. **Sign Up** — User submits name, email, and password. Password is hashed with `bcryptjs` (salt rounds: 10). User is created with role `GENERAL`.
2. **Login** — Credentials are verified. A signed JWT is generated (expires in **8 hours**) and stored in an HTTP-only cookie named `token`.
3. **Protected Routes** — The `authToken` middleware reads and verifies the cookie on every request. The decoded `userId` is attached to `req.userId`.
4. **Logout** — The `token` cookie is cleared on the server side.
5. **Admin Access** — The `permission` helper checks that `user.role === "ADMIN"` before allowing admin operations.

---

## ☁️ Deployment

Both the frontend and backend are configured for **Vercel** deployment.

### Backend (Vercel)

`backend/vercel.json`:
```json
{
  "version": 2,
  "builds": [{ "src": "index.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "index.js" }]
}
```

Set the required environment variables (`MONGO_URL`, `SECRET_TOKEN_KEY`, `CORS_ORIGIN`) in the Vercel project settings.

### Frontend (Vercel)

`frontend/vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

This ensures React Router handles all client-side navigation correctly.

### Production URLs

| Service | URL |
|---|---|
| Frontend | [https://shopverse.sangammundhe.site](https://shopverse.sangammundhe.site) |
| Backend API | [https://fullstack-eccomerce.vercel.app](https://fullstack-eccomerce.vercel.app) |
| Backend (fallback) | [https://shopverse5756backend.onrender.com](https://shopverse5756backend.onrender.com) |

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create a new feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to your branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
