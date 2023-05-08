import App from "../App";
import RecipesList from "../containers/recipes/recipes-list";
import HomePage from "../pages/home/home.page";
import RecipeDetailsPage from "../pages/recipes/recipe-details.page";
import RecipesPage from "../pages/recipes/recipes-page";

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
            }
        ]
    }
]