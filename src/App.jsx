import React from "react";
import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "./components/layout/layout";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import RecipesPage from "./pages/RecipesPage";
import RecipeItem from "./pages/RecipeItem";
import MyRecipesPage from "./pages/MyRecipesPage";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import AuthProvider from "./components/auth/Auth";
import MyProductsPage from "./pages/MyProductsPage";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1, // повторяти при помилці
        staleTime: Infinity,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="recipes" element={<RecipesPage />} />
            <Route path="recipes/:id" element={<RecipeItem />} />
            <Route path="recipes/my-recipes" element={<MyRecipesPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/my-products" element={<MyProductsPage />} />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
          </Route>
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
