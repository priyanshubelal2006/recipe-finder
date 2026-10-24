import axios from "axios";
import  { useEffect, useState } from "react";
import RecipeCard from "../Components/RecipeCard";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  async function fetchRecipes(skipCount, query) {
    setLoading(true);
    try {
      let url = `https://dummyjson.com/recipes?limit=6&skip=${skipCount}`;
      if (query) {
        url = `https://dummyjson.com/recipes/search?limit=6&skip=${skipCount}&q=${query}`;
      }
      const { data } = await axios.get(url);
      setRecipes((prev) =>
        skipCount === 0 ? data.recipes : [...prev, ...data.recipes],
      );
      setTotal(data.total);
    } catch (error) {
      setErrorMsg("Please try again later.");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchRecipes(0);
  }, []);

  function handleSearch(e) {
    // console.log(e.target);
    e.preventDefault();

    const form = new FormData(e.target);
    let query = form.get("query").trim();
    console.log("sfsdf");
    setSearchQuery(query);
    // if (query) {
    fetchRecipes(0, query);
    // }
  }

  if (errorMsg) {
    return (
      <main className="max-w-6xl px-4 py-8 mx-auto">
        <p className="text-center text-accent">{errorMsg}</p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl px-4 py-8 mx-auto">
      <form
        onSubmit={handleSearch}
        className="flex max-w-md gap-2 mx-auto mb-8"
      >
        <input
          type="text"
          name="query"
          placeholder="Search recipes..."
          className="flex-1 px-3 py-2 border rounded outline-none border-border bg-card text-text focus:border-accent"
        />
        <button
          type="submit"
          className="px-4 py-2 font-medium text-white rounded bg-accent hover:bg-accent-hover"
        >
          Search
        </button>
      </form>

      {loading && <p className="py-6 text-center text-muted">Loading...</p>}
      {!loading && recipes.length === 0 && (
        <p className="py-6 text-center text-muted">{`No recipes found for '${searchQuery}'`}</p>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {recipes.length < total && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => fetchRecipes(recipes.length, searchQuery)}
            className="px-6 py-2 font-medium text-white rounded bg-accent hover:bg-accent-hover"
          >
            Load More
          </button>
        </div>
      )}
    </main>
  );
}

export default Home;