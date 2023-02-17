import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/layout";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import RecipesPage from "./pages/RecipesPage";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="recipes" element={<RecipesPage />} />
        <Route path="recipes/my-recipes" element={<RecipesPage />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
}

export default App;
