import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecipeDetail from "./pages/RecipeDetail";
import CreateRecipe from "./pages/CreateRecipe";
import Profile from "./pages/Profile";
import ProfileCompletion from "./pages/ProfileCompletion";
import About from "./pages/About";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />

        {/* Protected Routes */}
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <CreateRecipe />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/complete-profile"
          element={
            <PrivateRoute>
              <ProfileCompletion />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
