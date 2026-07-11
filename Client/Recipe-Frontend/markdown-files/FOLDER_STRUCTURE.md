# Recipe-Frontend Folder Structure Map

```
recipe-frontend/
│
├── 📄 Configuration & Build Files
│   ├── package.json              # Dependencies and scripts
│   ├── package-lock.json         # Locked dependency versions
│   ├── vite.config.js            # Vite build configuration
│   ├── eslint.config.js          # ESLint rules
│   ├── vercel.json               # Vercel deployment config
│   ├── index.html                # HTML entry point
│   ├── .env                      # Environment variables (local)
│   ├── .gitignore                # Git ignore rules
│   └── README.md                 # Project documentation
│
├── 📁 public/
│   ├── favicon.svg               # Website favicon
│   └── icons.svg                 # SVG icons collection
│
├── 📁 src/                        # Main source code directory
│   ├── main.jsx                  # React app entry point
│   ├── App.jsx                   # Root component
│   ├── App.css                   # Global app styles
│   ├── index.css                 # Global styles
│   │
│   ├── 📁 api/                   # API integration
│   │   └── axios.js              # Axios instance & config
│   │
│   ├── 📁 components/            # Reusable UI components
│   │   ├── Navbar.jsx            # Navigation bar
│   │   ├── SearchBar.jsx         # Recipe search component
│   │   ├── RecipeCard.jsx        # Recipe display card
│   │   └── PrivateRoute.jsx      # Protected route wrapper
│   │
│   ├── 📁 pages/                 # Full page components (routes)
│   │   ├── Home.jsx              # Home page
│   │   ├── Login.jsx             # Login page
│   │   ├── Register.jsx          # Registration page
│   │   ├── Profile.jsx           # User profile page
│   │   ├── ProfileCompletion.jsx # Profile setup page
│   │   ├── CreateRecipe.jsx      # Recipe creation page
│   │   ├── RecipeDetail.jsx      # Individual recipe details
│   │   └── About.jsx             # About page
│   │
│   ├── 📁 context/               # React Context (state management)
│   │   └── AuthContext.jsx       # Authentication context
│   │
│   └── 📁 assets/                # Static assets
│       ├── hero.png              # Hero image
│       ├── react.svg             # React logo
│       └── vite.svg              # Vite logo
│
├── 📁 node_modules/              # Installed dependencies (generated)
├── 📁 dist/                      # Build output (generated)
│
└── 📊 Quick Reference
    • Config: Top-level config files
    • Public: Static assets served as-is
    • Source: All React code in src/
    • API: Backend communication (axios)
    • Components: Reusable UI pieces
    • Pages: Route-level components
    • Context: Global state management
    • Assets: Images and resources
```

## Directory Purposes

| Directory       | Purpose                                         |
| --------------- | ----------------------------------------------- |
| **api/**        | Centralized API client configuration with Axios |
| **components/** | Reusable UI components (Navbar, Cards, etc.)    |
| **pages/**      | Full-page components mapped to routes           |
| **context/**    | React Context for global state (Authentication) |
| **assets/**     | Static images and resources                     |
| **public/**     | Static files served directly                    |

## Key Files

| File                    | Purpose                        |
| ----------------------- | ------------------------------ |
| `main.jsx`              | React app bootstrap            |
| `App.jsx`               | Root component & routing setup |
| `App.css` / `index.css` | Global styles                  |
| `vite.config.js`        | Build tool configuration       |
| `package.json`          | Project dependencies & scripts |
