import React, { useEffect, useState } from "react";
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

function App() {
  const [token, setToken] = useState(false);

  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      let data = JSON.parse(sessionStorage.getItem("token"));
      setToken(data);
    }
  }, []);

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
          <Route path="/" element={<HomePage />} />
          <Route path="recipes" element={<RecipesPage />} />
          <Route path="recipes/:id" element={<RecipeItem />} />
          <Route
            path="recipes/my-recipes"
            element={<MyRecipesPage token={token} />}
          />
          <Route path="products" element={<ProductsPage />} />
          <Route path="sign-in" element={<SignIn setToken={setToken} />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
