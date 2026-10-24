import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function RecipeDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    async function fetchRecipe() {
        try {
            const { data } = await axios.get(`https://dummyjson.com/recipes/${id}`);
            setRecipe(data);

        }
        catch (error) { setErrorMessage("Could not load recipe please try again...") }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchRecipe() }, []);

    if (loading) {
        return <p>Loading..</p>
    }
    if (errorMessage) {
        return (
            <h1>{errorMessage}</h1>
        )
    }
    return (
        <main className="max-w-6xl px-4 py-8 mx-auto">
            <Link to="/" className="inline-flex items-center gap-1 mb-6 text-accent hover:underline">
                <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                </svg>
                Back to Home
            </Link>

            <div className="flex flex-col gap-8 mb-8 md:flex-row">
                <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="object-cover w-full border rounded-md md:w-1/2 h-80 border-border"
                />
                <div className="flex flex-col justify-center md:w-1/2">
                    <h1 className="mb-2 font-serif text-3xl font-bold text-text">{recipe.name}</h1>
                    <p className="mb-4 text-muted">{recipe.cuisine} - {recipe.difficulty}</p>
                    <div className="flex items-center gap-1 mb-4 font-medium">
                        <svg className="w-4 h-4 fill-accent" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <span>{recipe.rating} ({recipe.reviewCount} reviews)</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-4 mb-4 text-sm border-t border-border">
                        <p><strong>Prep time:</strong> {recipe.prepTimeMinutes} mins</p>
                        <p><strong>Cook time:</strong> {recipe.cookTimeMinutes} mins</p>
                        <p><strong>Servings:</strong> {recipe.servings}</p>
                        <p><strong>Calories:</strong> {recipe.caloriesPerServing} kcal</p>
                    </div>
                    <p className="mb-1 text-sm text-muted">
                        <strong>Meal Type:</strong> {recipe?.mealType?.join(', ')}
                    </p>
                    <p className="text-sm text-muted">
                        <strong>Tags:</strong> {recipe?.tags?.join(', ')}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 pt-8 border-t md:grid-cols-2 border-border">
                <div>
                    <h2 className="mb-4 font-serif text-xl font-bold">Ingredients</h2>
                    <ul className="pl-5 space-y-1 list-disc">
                        {recipe.ingredients?.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className="mb-4 font-serif text-xl font-bold">Instructions</h2>
                    <ol className="pl-5 space-y-2 list-decimal">
                        {recipe.instructions?.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ol>
                </div>
            </div>
        </main>
    );
}

export default RecipeDetail;