import App from "../App";
import RecipesList from "../containers/recipes/recipes-list";
import AboutPage from "../pages/about/about-page";
import HomePage from "../pages/home/home.page";
import RecipeDetailsPage from "../pages/recipes/recipe-details.page";
import RecipesPage from "../pages/recipes/recipes-page";
import LoginPage from "../pages/user/login/login-page";
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
                    }
                ]
            }
        ]
    }
]