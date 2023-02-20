import React from "react";
import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "./components/layout/layout";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import RecipesPage from "./pages/RecipesPage";
import SignIn from "./pages/SignIn";
import RecipeItem from "./pages/RecipeItem";

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
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="recipes" element={<RecipesPage />} />
          <Route path="recipes/:id" element={<RecipeItem />} />
          <Route path="recipes/my-recipes" element={<RecipesPage />} />
          <Route path="sign-in" element={<SignIn />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
