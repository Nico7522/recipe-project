import App from "../App";
import RecipesList from "../containers/recipes/recipes-list";
import AboutPage from "../pages/about/about-page";
import AdminPage from "../pages/admin/admin-page";
import AdminCommentsPage from "../pages/admin/pages/admin-comments";
import AdminRecipesPage from "../pages/admin/pages/admin-recipes";
import HomePage from "../pages/home/home.page";
import RecipeCreatePage from "../pages/recipes/recipe-create.pages";
import RecipeDetailsPage from "../pages/recipes/recipe-details.page";
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
                element: <HomePage />
            },
            {
                path: "recipes",
                element: <RecipesPage />,
                children: [
                    {
                        index: true,
                        element: <RecipesList />
                    },
                    {
                        path: ":recipeId",
                        element: <RecipeDetailsPage />
                    },
                    {
                        path: 'create',
                        element: <RecipeCreatePage />
                    }
                ]
            },
            {
                path: 'about',
                element: <AboutPage />
            },
            {
                path: 'user',
                children : [
                    {
                        index: true,
                        element: <LoginPage />
                    },
                    {
                        path: 'signin',
                        element: <LoginPage />
                    },
                    {
                        path: 'signup',
                        element: <RegisterPage />
                    },
                    {
                        path: 'profil/:userId',
                        element: <ProfilPage />
                    }
                ]
            },
            {
                path: 'admin',
                children: [
                    {
                        index: true,
                        element: <AdminPage />
                    },
                    {
                        path: 'recipes',
                        element: <AdminRecipesPage />
                    },
                    {
                        path: 'comments',
                        element: <AdminCommentsPage />
                    }
                ]
            }
        ]
    }
]