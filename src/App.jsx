import React from "react";
import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "./components/layout/layout";
import HomePage from "./pages/HomePage";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import AuthProvider from "./components/auth/Auth";
import RecipeItem from "./components/RecipeItem/RecipeItem";
import Profile from "./pages/Profile";
import GridPage from "./pages/GridPage";
import NotFound from "./pages/NotFound";

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
            <Route path="recipes" element={<GridPage />} />
            <Route path="recipes/:id" element={<RecipeItem />} />
            <Route path="recipes/my-recipes" element={<GridPage />} />
            <Route path="products" element={<GridPage />} />
            <Route path="products/my-products" element={<GridPage />} />
            <Route path="log-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="profile" element={<Profile />} />
            <Route path="what-to-cook" element={<GridPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
