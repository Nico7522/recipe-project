import App from "../App";
import RecipesList from "../containers/recipes/recipes-list";

import AboutPage from "../pages/about/about-page";
import AdminPage from "../pages/admin/admin-page";
import AdminCommentsPage from "../pages/admin/pages/admin-comments";
import AdminRecipesPage from "../pages/admin/pages/admin-recipes";
import AdminUserPage from "../pages/admin/pages/admin-users";
import HomePage from "../pages/home/home.page";
import RecipeCreatePage from "../pages/recipes/recipe-create.pages";
import RecipeDetailsPage from "../pages/recipes/recipe-details.page";
import RecipeListPage from "../pages/recipes/recipe-list.page";
import ProductListPage from "../pages/recipes/recipe-list.page";
import RecipeSearchPage from "../pages/recipes/recipe-search-page";
import TopRecipePage from "../pages/recipes/recipe-top";
import AllRecipesPage from "../pages/recipes/recipes-all";
import AllRecipes from "../pages/recipes/recipes-all";
import RecipesPage from "../pages/recipes/recipes-page";
import LoginPage from "../pages/user/login/login-page";
import ProfilPage from "../pages/user/profil/profil-page";
import RegisterPage from "../pages/user/register/register-page";

export const routes = [
  {
    path: "",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "recipes",
        element: <RecipesPage />,
        children: [
          {
            path: "all",
            element: <AllRecipesPage />,
            children: [
              { path: "", element: <RecipeListPage /> },
              { path: "search", element: <RecipeSearchPage /> },
            ],
          },
          {
            path: ":recipeId",
            element: <RecipeDetailsPage />,
          },
          {
            path: "create",
            element: <RecipeCreatePage />,
          },
          {
            index: true,
            path: "top",
            element: <TopRecipePage />,
          },
          // {
          //     path: 'search',
          //     element: <RecipeSearchPage />
          // },
        ],
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "user",
        children: [
          {
            index: true,
            element: <LoginPage />,
          },
          {
            path: "signin",
            element: <LoginPage />,
          },
          {
            path: "signup",
            element: <RegisterPage />,
          },
          {
            path: "profil/:userId",
            element: <ProfilPage />,
          },
        ],
      },
      {
        path: "admin",
        children: [
          {
            index: true,
            element: <AdminPage />,
          },
          {
            path: "recipes",
            element: <AdminRecipesPage />,
          },
          {
            path: "comments",
            element: <AdminCommentsPage />,
          },
          {
            path: "users",
            element: <AdminUserPage />,
          },
        ],
      },
    ],
  },
];
