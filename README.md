# Recipe Platform

A modern full-stack recipe sharing platform where users can register, log in, create recipes, upload profile pictures, complete their profiles, and discover food content from others.

Live frontend: https://recipe-platform-orcin.vercel.app/

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer for file uploads

### Deployment & Services

- Frontend hosted on Vercel
- Backend hosted on Render
- Database hosted on MongoDB Atlas
- Image storage handled by Cloudinary

## Features

- Browse recipes without login
- User registration and login
- Protected routes for logged-in users
- Create and view recipes
- Recipe search and filtering
- Profile completion flow
- Profile picture upload
- User profile page with editable details
- About page for the developer
- Social media links on profile

## Project Structure

```bash
Recipe-Platform/
├── Client/
│   └── Recipe-Frontend/
│       ├── src/
│       ├── public/
│       └── package.json
├── Server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── package.json
└── README.md
```

## Local Development

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd Recipe-Platform
```

### 2. Install dependencies

Frontend:

```bash
cd Client/Recipe-Frontend
npm install
```

Backend:

```bash
cd ../../Server
npm install
```

### 3. Configure environment variables

Backend `.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Frontend `.env`:

```env
VITE_API_URL=http://localhost:5000
```

### 4. Run the app

Backend:

```bash
cd Server
npm run dev
```

Frontend:

```bash
cd Client/Recipe-Frontend
npm run dev
```

## Deployment

### Frontend

- Deployed on Vercel
- Live URL: https://recipe-platform-orcin.vercel.app/

### Backend

- Deployed on Render
- API base URL: https://recipe-platform-dvl5.onrender.com/

### Database

- MongoDB Atlas
- Used for storing users, recipes, and profile metadata

### Image Uploads

- Cloudinary
- Used for profile pictures and recipe image uploads

## Notes

- The frontend relies on the backend API via `VITE_API_URL`.
- The backend must have valid MongoDB Atlas and Cloudinary credentials in its environment variables for production deployment.
- For local development, the backend should connect to a locally running MongoDB instance or a MongoDB Atlas URI.

## Author

Sreenidhi BS
