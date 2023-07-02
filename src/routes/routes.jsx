import App from "../App";
import AboutPage from "../pages/about/about-page";
import AdminPage from "../pages/admin/admin-page";
import AdminCommentsPage from "../pages/admin/pages/admin-comments";
import AdminRecipesPage from "../pages/admin/pages/admin-recipes";
import AdminUserPage from "../pages/admin/pages/admin-users";
import CommentUpdatePage from "../pages/comment/commentuptade-page";
import ContactPage from "../pages/contact/contact-page";
import DevelopmentPage from "../pages/development/development-page";
import HomePage from "../pages/home/home.page";
import IngredientsAllPage from "../pages/ingredients/ingredients-all-page";
import IngredientFormPage from "../pages/ingredients/ingredients-create-pages";
import IngredientsPage from "../pages/ingredients/ingredients-pages";
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
import LogoutPage from "../pages/user/logout/logout-page";
import ProfilPage from "../pages/user/profil/profil-page";
import RegisterPage from "../pages/user/register/register-page";
import ForgotPasswordPage from "../pages/user/resetpassword/forgotpassword-page";
import ResetPasswordPage from "../pages/user/resetpassword/reset-password";

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
        ],
      },
      {
        path: "ingredients",
        element: <IngredientsPage />,
        children: [
          { path: "", element: <IngredientsAllPage/> },
          { path: "create", element: <IngredientFormPage /> }
        ],
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
            path: "logout",
            element: <LogoutPage />,
          },
          {
            path: "profil/:userId",
            element: <ProfilPage />,
          },
          {
            path: "forgotpassword",
            element: <ForgotPasswordPage />,
          },
          {
            path: "resetpassword",
            element: <ResetPasswordPage />,
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
          {
            path: "development",
            element: <DevelopmentPage />,
          },
        ],
      },
      {
        path: "comment",
        children: [
          {
            path: ":commentId",
            element: <CommentUpdatePage />,
          },
        ],
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
    ],
  },
];
